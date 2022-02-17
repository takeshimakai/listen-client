import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import SocketContext from '../../../contexts/SocketContext';

import Recipient from './Recipient';

const MsgForm = ({ setThreads, setCompose }) => {
  const history = useHistory();
  const socket = useContext(SocketContext);

  const [err, setErr] = useState([]);
  const [newMsg, setNewMsg] = useState({
    isParent: true,
    subject: '',
    body: '',
    to: ''
  });

  useEffect(() => {
    socket.on('dm success', (msg) => {
      setThreads(prev => ([...prev, msg]));
      setCompose(false);
      history.push(`/messages/${msg._id}`);
    });

    return () => socket.off('dm success');
  }, [socket, history, setThreads, setCompose]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewMsg(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (err.length > 0) {
      setErr([]);
    }

    let errors = [];

    if (!newMsg.body) {
      errors.push({ param: 'body', msg: 'A message is required.' });
    }

    if (!newMsg.to) {
      errors.push({ param: 'to', msg: 'The recipient must be from your friends list.' });
    }

    if (errors.length > 0) {
      return setErr(errors);
    }

    socket.emit('send dm', newMsg);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Recipient err={err} to={newMsg.to} setNewMsg={setNewMsg} />
      <div>
        <label htmlFor='subject'>Subject</label>
        <input
          id='subject'
          name='subject'
          type='text'
          value={newMsg.subject}
          onChange={handleInput}
        />
      </div>
      <div>
        <textarea
          placeholder='Message'
          name='body'
          value={newMsg.body}
          onChange={handleInput}
        />
      </div>
      <div>
        <button type='button' onClick={() => setCompose(false)}>Cancel</button>
        <button>Send</button>
      </div>
    </form>
  )
}

export default MsgForm;