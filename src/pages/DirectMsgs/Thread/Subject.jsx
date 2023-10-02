import { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import SocketContext from '../../../contexts/SocketContext';

import deleteIcon from '../../../assets/delete.png';

const Subject = ({ thread, setThreads }) => {
  const history = useHistory();
  const { threadId } = useParams();
  const socket = useContext(SocketContext);

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
    <div className='flex justify-between mb-4'>
      <p className='text-green-700'>{thread && thread.subject}</p>
      <button onClick={deleteThread}>
        <img className='h-5' src={deleteIcon} alt='' />
      </button>
    </div>
  )
}

export default Subject;