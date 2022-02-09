import { useEffect, useState, useContext } from 'react';

import SocketContext from '../contexts/SocketContext';

const FriendBtns = ({ userId }) => {
  const socket = useContext(SocketContext);

  const [friendshipStatus, setFriendshipStatus] = useState('');

  useEffect(() => {
    socket.emit('get friendship status', userId);

    socket.on('friendship status', (friendshipStatus) => {
      setFriendshipStatus(friendshipStatus);
    });

    socket.on('request canceled', ({ canceledBy }) => {
      if (userId === canceledBy) {
        setFriendshipStatus('');
      }
    });

    socket.on('request declined', ({ declinedBy }) => {
      if (userId === declinedBy) {
        setFriendshipStatus('');
      }
    });

    socket.on('request received', ({ sentBy }) => {
      if (userId === sentBy) {
        setFriendshipStatus('received');
      }
    });

    socket.on('unfriended', ({ unfriendedBy }) => {
      if (userId === unfriendedBy) {
        setFriendshipStatus('');
      }
    });

    socket.on('request accepted', ({ acceptedBy }) => {
      if (userId === acceptedBy) {
        setFriendshipStatus('friends');
      }
    });

    return () => {
      socket.off('friendship status');
      socket.off('request canceled');
      socket.off('request declined');
      socket.off('request received');
      socket.off('unfriended');
      socket.off('request accepted');
    };
  }, [socket, userId]);

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
        <button className='tertiary-btn w-40' onClick={unfriend}>
          Unfriend
        </button>
      }
    </>
  )
}

export default FriendBtns;