import { useState, useEffect, useContext } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';

import SocketContext from '../../contexts/SocketContext';

import useWindowWidth from '../../hooks/useWindowWidth';

import MsgForm from './MsgForm';
import Thread from './Thread';
import ThreadsContainer from './ThreadsContainer';

const DirectMsgs = () => {
  const match = useRouteMatch();
  const socket = useContext(SocketContext);

  const windowWidth = useWindowWidth();
  const [threads, setThreads] = useState([]);
  const [compose, setCompose] = useState(false);
  const [page, setPage] = useState('inbox');

  useEffect(() => {
    socket.emit('get dms');

    const allDMsHandler = (data) => setThreads(data);

    const newDMHandler = (data) => {
      setThreads(prev => {
        const index = prev.findIndex(i => i._id === data._id);

        if (index !== -1) {
          const updated = [...prev];
          updated.splice(index, 1, data);
          return updated;
        }

        return [...prev, data];
      });
    };

    socket.on('all dms', allDMsHandler);
    socket.on('new dm', newDMHandler);

    return () => {
      socket.off('all dms', allDMsHandler);
      socket.off('new dm', newDMHandler);
    };
  }, [socket]);

  return (
    <div className='flex-grow max-h-screen flex flex-col pt-16 sm:pt-20 w-full sm:w-4/5 lg:w-3/5 mx-auto'>
      <Switch>
        <Route path={`${match.path}/:threadId`}>
          <Thread threads={threads} setThreads={setThreads} />
        </Route>
        <Route path={match.path}>
          {compose && <MsgForm setThreads={setThreads} setCompose={setCompose} />}
          <div className='flex justify-between mb-3 px-4 sm:px-0'>
            <div className='flex items-center'>
              <button
                className={`${page === 'inbox' && 'border-b border-gray-400 -mb-px'} w-max font-light sm:text-sm px-1`}
                onClick={() => setPage('inbox')}
              >
                Inbox
              </button>
              <button
                className={`${page === 'sent' && 'border-b border-gray-400 -mb-px'} w-max font-light sm:text-sm px-1`}
                onClick={() => setPage('sent')}
              >
                Sent
              </button>
            </div>
            <button
              className='fixed sm:relative bottom-3 right-3 sm:inset-0 w-11 sm:w-40 h-11 sm:h-8 border rounded-full border-green-700 text-green-700 text-2xl sm:text-sm shadow-md bg-gray-50 hover:text-white hover:bg-green-700 active:shadow-inner'
              onClick={() => setCompose(true)}
            >
              {windowWidth < 640 ? <span>&#65291;</span> : 'Compose'}
            </button>
          </div>
          <ThreadsContainer page={page} threads={threads} />
        </Route>
      </Switch>
    </div>
  )
}

export default DirectMsgs;