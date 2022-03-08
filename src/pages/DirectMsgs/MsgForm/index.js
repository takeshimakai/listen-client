import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import SocketContext from '../../../contexts/SocketContext';

import Recipient from './Recipient';

import PrimaryBtn from '../../../components/PrimaryBtn';
import SecondaryBtn from '../../../components/SecondaryBtn';

const MsgForm = ({ setThreads, setCompose }) => {
  const history = useHistory();
  const socket = useContext(SocketContext);

  const [friends, setFriends] = useState();
  const [err, setErr] = useState({ body: '', to: '' });
  const [newMsg, setNewMsg] = useState({
    isParent: true,
    subject: '',
    body: '',
    to: ''
  });

  useEffect(() => {
    socket.emit('get friends', 'accepted');

    const acceptedFriendsHandler = (friends) => setFriends(friends);

    const dmSuccessHandler = (msg) => {
      setThreads(prev => ([...prev, msg]));
      setCompose(false);
      history.push(`/messages/${msg._id}`);
    };

    const dmErrorHandler = (errors) => setErr(errors);

    socket.on('accepted friends', acceptedFriendsHandler);
    socket.on('dm success', dmSuccessHandler);
    socket.on('dm error', dmErrorHandler);

    return () => {
      socket.off('dm success', dmSuccessHandler);
      socket.off('dm error', dmErrorHandler);
      socket.off('accepted friends', acceptedFriendsHandler)
    };
  }, [socket, history, setThreads, setCompose]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewMsg(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (err) {
      setErr({ body: '', to: '' });
    }

    let errors = {};

    if (!newMsg.body) {
      errors.body = 'A message is required.';
    }

    if (!newMsg.to) {
      errors.to = 'The recipient must be on your friends list.';
    }

    if (Object.keys(errors).length > 0) {
      return setErr(errors);
    }

    socket.emit('send dm', newMsg);
  };

  return (
    <div className='z-10 fixed top-0 left-0 flex justify-center items-center h-full w-full bg-gray-200 bg-opacity-60'>
      <form
        className='flex flex-col items-center bg-gray-50 shadow-md rounded-lg p-4 sm:p-8 h-3/4 w-full sm:w-3/4 lg:w-1/2 mx-4 sm:mx-0'
        onSubmit={handleSubmit}
      >
        <Recipient friends={friends} err={err} to={newMsg.to} setNewMsg={setNewMsg} />
        <div className='w-full mb-5'>
          <label className='subtitle' htmlFor='subject'>Subject</label>
          <input
            id='subject'
            className='w-full py-1 border-b border-gray-400 focus:border-gray-700 sm:text-sm text-gray-900 bg-transparent focus:outline-none'
            name='subject'
            type='text'
            value={newMsg.subject}
            onChange={handleInput}
          />
        </div>
        <div className='flex flex-grow flex-col w-full'>
          <textarea
            className='resize-none p-2 flex-grow w-full border border-gray-400 focus:border-gray-700 rounded sm:text-sm text-gray-900 focus:outline-none'
            placeholder='Message'
            name='body'
            value={newMsg.body}
            onChange={handleInput}
          />
          <p className='error-msg'>{err.body}</p>
        </div>
        <div className='flex justify-center max-w-sm w-full space-x-2'>
          <SecondaryBtn label='Cancel' type='button' onClick={() => setCompose(false)} />
          <PrimaryBtn label='Send' disabled={friends && friends.length === 0} />
        </div>
      </form>
    </div>
  )
}

export default MsgForm;