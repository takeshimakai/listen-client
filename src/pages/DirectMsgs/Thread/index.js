import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SocketContext from '../../../contexts/SocketContext';
import UserContext from '../../../contexts/UserContext';

import decodeToken from '../../../utils/decodeToken';

import Input from './Input';
import MsgsContainer from './MsgsContainer';
import Subject from './Subject';

const Thread = ({ threads, setThreads }) => {
  const { threadId } = useParams();
  const socket = useContext(SocketContext);
  const { token } = useContext(UserContext);
  const { id } = decodeToken(token);

  const [thread, setThread] = useState();
  const [err, setErr] = useState('');

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
    const dmSuccessHandler = (data) => {
      setThreads(prev => {
        const newThreads = [...prev];
        newThreads.splice(newThreads.findIndex(i => i._id === data._id), 1, data);
        return newThreads;
      });
    };

    const dmErrorHandler = (data) => setErr(data.to);

    socket.on('dm success', dmSuccessHandler);
    socket.on('dm error', dmErrorHandler);

    return () => {
      socket.off('dm success', dmSuccessHandler);
      socket.off('dm error', dmErrorHandler);
    }
  }, [socket, setThreads]);

  return (
    <>
      <Subject thread={thread} setThreads={setThreads} />
      <MsgsContainer thread={thread} />
      <Input thread={thread} err={err} />
    </>
  )
}

export default Thread;