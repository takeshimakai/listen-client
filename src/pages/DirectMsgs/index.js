import { useState, useEffect, useContext } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';

import SocketContext from '../../contexts/SocketContext';

import MsgForm from './MsgForm';
import MsgThread from './MsgThread';
import Inbox from './Inbox';
import Sent from './Sent';

const DirectMsgs = () => {
  const match = useRouteMatch();
  const socket = useContext(SocketContext);

  const [lessThan640, setLessThan640] = useState(window.innerWidth < 640);
  const [threads, setThreads] = useState([]);
  const [compose, setCompose] = useState(false);
  const [page, setPage] = useState('inbox');

  useEffect(() => {
    const updateLessThan640 = () => setLessThan640(window.innerWidth < 640);
    window.addEventListener('resize', updateLessThan640);
    return () => window.removeEventListener('resize', updateLessThan640);
  });

  useEffect(() => {
    socket.emit('get dms');

    socket.on('all dms', (data) => setThreads(data));

    socket.on('new dm', (data) => {
      setThreads(prev => {
        const index = prev.findIndex(i => i._id === data._id);

        if (index !== -1) {
          const updated = [...prev];
          updated.splice(index, 1, data);
          return updated;
        }

        return [...prev, data];
      });
    });

    return () => {
      socket.off('all dms');
      socket.off('new dm');
    };
  }, [socket]);

  return (
    <div className='pt-16 px-4 pb-4'>
      <Switch>
        <Route path={`${match.path}/:threadId`}>
          <MsgThread threads={threads} setThreads={setThreads} />
        </Route>
        <Route path={match.path}>
          {compose && <MsgForm setThreads={setThreads} setCompose={setCompose} />}
          <button onClick={() => setCompose(true)}>
            {lessThan640 ? <span>&#65291;</span> : 'Compose'}
          </button>
          <div className='md:w-3/5 md:mx-auto space-y-4'>
            {page === 'inbox' && <Inbox threads={threads} />}
            {page === 'sent' && <Sent threads={threads} />}
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default DirectMsgs;