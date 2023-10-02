import { useContext, useState, useEffect } from 'react';

import SocketContext from '../contexts/SocketContext';

const useFriendshipStatus = (userID) => {
  const socket = useContext(SocketContext);

  const [friendshipStatus, setFriendshipStatus] = useState('');

  useEffect(() => {
    if (userID) {
      socket.emit('get friendship status', userID);

      const onFriendshipStatus = (status) => setFriendshipStatus(status);

      const onRequestCanceled = ({ canceledBy }) => {
        if (userID === canceledBy) {
          setFriendshipStatus('');
        }
      };

      const onRequestDeclined = ({ declinedBy }) => {
        if (userID === declinedBy) {
          setFriendshipStatus('');
        }
      };

      const onRequestReceived = ({ sentBy }) => {
        if (userID === sentBy) {
          setFriendshipStatus('received');
        }
      };

      const onUnfriended = ({ unfriendedBy }) => {
        if (userID === unfriendedBy) {
          setFriendshipStatus('');
        }
      };

      const onRequestAccepted = ({ acceptedBy }) => {
        if (userID === acceptedBy) {
          setFriendshipStatus('friends');
        }
      };

      socket.on('friendship status', onFriendshipStatus);
      socket.on('request canceled', onRequestCanceled);
      socket.on('request declined', onRequestDeclined);
      socket.on('request received', onRequestReceived);
      socket.on('unfriended', onUnfriended);
      socket.on('request accepted', onRequestAccepted);
  
      return () => {
        socket.off('friendship status', onFriendshipStatus);
        socket.off('request canceled', onRequestCanceled);
        socket.off('request declined', onRequestDeclined);
        socket.off('request received', onRequestReceived);
        socket.off('unfriended', onUnfriended);
        socket.off('request accepted', onRequestAccepted);
      };
    }
  }, [socket, userID]);

  return {
    friendshipStatus,
    setFriendshipStatus
  };
}

export default useFriendshipStatus;