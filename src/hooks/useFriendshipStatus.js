import { useContext, useState, useEffect } from 'react';

import SocketContext from '../contexts/SocketContext';

const useFriendshipStatus = (userID) => {
  const socket = useContext(SocketContext);

  const [friendshipStatus, setFriendshipStatus] = useState('');

  useEffect(() => {
    if (userID) {
      socket.emit('get friendship status', userID);

      socket.on('friendship status', (friendshipStatus) => {
        setFriendshipStatus(friendshipStatus);
      });
  
      socket.on('request canceled', ({ canceledBy }) => {
        if (userID === canceledBy) {
          setFriendshipStatus('');
        }
      });
  
      socket.on('request declined', ({ declinedBy }) => {
        if (userID === declinedBy) {
          setFriendshipStatus('');
        }
      });
  
      socket.on('request received', ({ sentBy }) => {
        if (userID === sentBy) {
          setFriendshipStatus('received');
        }
      });
  
      socket.on('unfriended', ({ unfriendedBy }) => {
        if (userID === unfriendedBy) {
          setFriendshipStatus('');
        }
      });
  
      socket.on('request accepted', ({ acceptedBy }) => {
        if (userID === acceptedBy) {
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
    }
  }, [socket, userID]);

  return {
    friendshipStatus,
    setFriendshipStatus
  };
}

export default useFriendshipStatus;