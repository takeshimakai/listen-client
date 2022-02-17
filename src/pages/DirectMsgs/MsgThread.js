import { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import SocketContext from '../../contexts/SocketContext';
import UserContext from '../../contexts/UserContext';

import decodeToken from '../../utils/decodeToken';

const MsgThread = ({ threads, setThreads }) => {
  const history = useHistory();
  const { threadId } = useParams();
  const socket = useContext(SocketContext);
  const { token } = useContext(UserContext);
  const { id } = decodeToken(token);

  const [input, setInput] = useState('');
  const [thread, setThread] = useState();

  useEffect(() => {
    if (thread) {
      thread.msgs.forEach(msg => {
        if (!msg.read.includes(id)) {
          socket.emit('mark as read', msg._id);
          setThreads(prev => {
            const updatedThread = JSON.parse(JSON.stringify(thread));

            for (let i = 0; i < updatedThread.msgs.length; i++) {
              if (updatedThread.msgs[i]._id === msg._id) {
                updatedThread.msgs[i].read.push(id);
                break;
              }
            }

            const updated = [...prev];
            updated.splice(updated.findIndex(i => i._id === updatedThread._id), 1, updatedThread);
            return updated;
          });
        }
      });
    }
  }, [thread, id, socket, setThreads]);

  useEffect(() => {
    setThread(threads.find(thread => thread._id === threadId));
  }, [threadId, threads]);

  useEffect(() => {
    socket.on('dm success', (data) => {
      setThreads(prev => {
        const newThreads = [...prev];
        newThreads.splice(newThreads.findIndex(i => i._id === data._id), 1, data);
        return newThreads;
      });
    });

    return () => {
      socket.off('dm success');
    };
  }, [socket, setThreads]);

  const handleInput = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input) {
      socket.emit('send dm', {
        to: thread.users[0] === id ? thread.users[1] : thread.users[0],
        body: input,
        threadId: threadId
      });
      setInput('');
    }
  };

  const deleteThread = () => {
    socket.emit('delete thread', threadId);
    setThreads(prev => {
      const updated = [...prev];
      updated.splice(updated.findIndex(i => i._id === threadId), 1);
      return updated;
    });
    history.replace('/messages');
  };

  return (
    <div>
      <div>
        <p>{thread && thread.subject}</p>
        <button onClick={deleteThread}>Delete</button>
      </div>
      {thread && thread.msgs.map(msg => (
        <div key={msg._id}>
          <p>{msg.from.profile.username}</p>
          <p>{msg.dateSent}</p>
          <p>{msg.body}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea placeholder='Reply' value={input} onChange={handleInput} />
        <button>Send</button>
      </form>
    </div>
  )
}

export default MsgThread;