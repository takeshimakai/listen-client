import { useEffect, useState, useContext } from 'react';

import SocketContext from '../../../contexts/SocketContext';

const FriendBtns = ({ profileId }) => {
  const socket = useContext(SocketContext);

  const [friendshipStatus, setFriendshipStatus] = useState('');

  useEffect(() => {
    socket.emit('get friendship status');
  }, [socket]);

  useEffect(() => {
    socket.on('friendship status', (friendshipStatus) => {
      setFriendshipStatus(friendshipStatus);
    });

    socket.on('request canceled', ({ canceledBy }) => {
      if (profileId === canceledBy) {
        setFriendshipStatus('');
      }
    });

    socket.on('request declined', ({ declinedBy }) => {
      if (profileId === declinedBy) {
        setFriendshipStatus('');
      }
    });

    socket.on('request received', ({ sentBy }) => {
      if (profileId === sentBy) {
        setFriendshipStatus('received');
      }
    });

    socket.on('unfriended', ({ unfriendedBy }) => {
      if (profileId === unfriendedBy) {
        setFriendshipStatus('');
      }
    });

    socket.on('request accepted', ({ acceptedBy }) => {
      if (profileId === acceptedBy) {
        setFriendshipStatus('friends');
      }
    });

    return () => {
      socket.off('friendship status');
      socket.off('request canceled');
      socket.off('request declined');
      socket.off('request received');
      socket.off('unfriended');
    };
  }, [socket, profileId]);

  const send = () => {
    socket.emit('send request', profileId);
    setFriendshipStatus('sent');
  };

  const cancel = () => {
    socket.emit('cancel request', profileId);
    setFriendshipStatus('');
  };

  const decline = () => {
    socket.emit('decline request', profileId);
    setFriendshipStatus('');
  };

  const accept = () => {
    socket.emit('accept request', profileId);
    setFriendshipStatus('friends');
  };

  const unfriend = () => {
    socket.emit('unfriend', profileId);
    setFriendshipStatus('');
  };

  return (
    <div className='mt-4 w-full text-center'>
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
        <div className='flex w-full'>
          <button className='secondary-btn mr-1' onClick={decline}>
            Decline request
          </button>
          <button className='primary-btn ml-1' onClick={accept}>
            Accept request
          </button>
        </div>
      }
      {friendshipStatus === 'friends' &&
        <button className='tertiary-btn w-40' onClick={unfriend}>
          Unfriend
        </button>
      }
    </div>
  )
}

export default FriendBtns;