import { useContext } from 'react';

import SocketContext from '../contexts/SocketContext';

const FriendBtns = ({ userId, friendshipStatus, setFriendshipStatus }) => {
  const socket = useContext(SocketContext);

  const send = () => {
    socket.emit('send request', userId);
    setFriendshipStatus('sent');
  };

  const cancel = () => {
    socket.emit('cancel request', userId);
    setFriendshipStatus('');
  };

  const decline = () => {
    socket.emit('decline request', userId);
    setFriendshipStatus('');
  };

  const accept = () => {
    socket.emit('accept request', userId);
    setFriendshipStatus('friends');
  };

  const unfriend = () => {
    socket.emit('unfriend', userId);
    setFriendshipStatus('');
  };

  return (
    <>
      {!friendshipStatus &&
        <button className='tertiary-btn w-40' onClick={send}>
          Send friend request
        </button>
      }
      {friendshipStatus === 'sent' &&
        <button className='tertiary-btn w-40' onClick={cancel}>
          Cancel request
        </button>
      }
      {friendshipStatus === 'received' &&
        <>
          <button className='secondary-btn' onClick={decline}>
            Decline request
          </button>
          <button className='primary-btn' onClick={accept}>
            Accept request
          </button>
        </>
      }
      {friendshipStatus === 'friends' &&
        <button className='secondary-btn w-40' onClick={unfriend}>
          Unfriend
        </button>
      }
    </>
  )
}

export default FriendBtns;