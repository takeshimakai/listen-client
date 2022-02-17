import { useContext } from 'react';

import UserContext from '../../contexts/UserContext';

import formatDate from '../../utils/formatDate';
import decodeToken from '../../utils/decodeToken';

const MsgPreview = ({ subject, msg }) => {
  const { token } = useContext(UserContext);
  const { id } = decodeToken(token);

  const receivedDate = () => {
    const sentDate = new Date(msg.dateSent);
    const today = new Date();
  
    if (
      sentDate.getFullYear() === today.getFullYear() &&
      sentDate.getMonth() === today.getMonth() &&
      sentDate.getDate() === today.getDate()
    ) {
      return sentDate.toLocaleTimeString()
    } else {
      return formatDate(sentDate);
    }
  };

  return (
    <div className={`${msg.read.includes(id) ? 'border-gray-200' : 'border-green-700'} border rounded-lg shadow-md px-4 py-3 flex justify-between sm:items-center`}>
      <div className='sm:flex sm:w-5/6'>
        <p className='sm:w-1/4 sm:text-sm truncate'>{msg.from.profile.username}</p>
        <p className='sm:w-full truncate sm:text-sm'>
          {subject || 'No subject'}
          <span className='hidden sm:inline font-light text-gray-400 ml-2'>
            {msg.body}
          </span>
        </p>
      </div>
      <p className='sm:w-1/6 font-light text-xs text-right self-center'>{receivedDate()}</p>
    </div>
  )
}

export default MsgPreview;