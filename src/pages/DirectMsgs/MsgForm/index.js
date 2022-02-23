import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import SocketContext from '../../../contexts/SocketContext';

import Recipient from './Recipient';

const MsgForm = ({ setThreads, setCompose }) => {
  const history = useHistory();
  const socket = useContext(SocketContext);

  const [err, setErr] = useState({ body: '', to: '' });
  const [newMsg, setNewMsg] = useState({
    isParent: true,
    subject: '',
    body: '',
    to: ''
  });

  useEffect(() => {
    const dmSuccessHandler = (msg) => {
      setThreads(prev => ([...prev, msg]));
      setCompose(false);
      history.push(`/messages/${msg._id}`);
    };

    const dmErrorHandler = (errors) => setErr(errors);

    socket.on('dm success', dmSuccessHandler);
    socket.on('dm error', dmErrorHandler);

    return () => {
      socket.off('dm success', dmSuccessHandler);
      socket.off('dm error', dmErrorHandler);
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
      errors.to = 'The recipient must be from your friends list.';
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
        <Recipient err={err} to={newMsg.to} setNewMsg={setNewMsg} />
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
        <div className='flex flex-grow flex-col w-full mb-1'>
          <textarea
            className='resize-none p-2 h-full w-full border border-gray-400 focus:border-gray-700 rounded sm:text-sm text-gray-900 focus:outline-none'
            placeholder='Message'
            name='body'
            value={newMsg.body}
            onChange={handleInput}
          />
          <p className='error-msg'>{err.body}</p>
        </div>
        <div className='flex justify-center max-w-sm w-full'>
          <button className='secondary-btn mr-1 sm:w-40' type='button' onClick={() => setCompose(false)}>
            Cancel
          </button>
          <button className='primary-btn ml-1 sm:w-40'>Send</button>
        </div>
      </form>
    </div>
  )
}

export default MsgForm;