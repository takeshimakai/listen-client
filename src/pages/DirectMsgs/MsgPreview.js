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
    <div className={`${msg.read.includes(id) ? 'border-gray-200' : 'border-green-700'} border rounded-lg shadow-md px-4 py-3 flex justify-between`}>
      <div className='sm:flex sm:w-4/5'>
        <p className='sm:w-1/4 sm:text-sm truncate'>{msg.from.profile.username}</p>
        <div className='flex sm:w-3/4'>
          <div>
            <p className={`${!subject && 'italic'} text-green-700 truncate sm:text-sm`}>
              {subject || 'No subject'}
            </p>
          </div>
          <p className='hidden sm:block sm:text-sm font-light text-gray-400 ml-2 truncate'>
            {msg.body}
          </p>
        </div>
      </div>
      <p className='sm:w-1/5 font-light text-xs text-right self-center'>{receivedDate()}</p>
    </div>
  )
}

export default MsgPreview;