import { useContext } from 'react';

import SocketContext from '../contexts/SocketContext';

import PrimaryBtn from './PrimaryBtn';
import SecondaryBtn from './SecondaryBtn';
import TertiaryBtn from './TertiaryBtn';

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
      {!friendshipStatus && <TertiaryBtn label='Send friend request' onClick={send} />}
      {friendshipStatus === 'sent' && <TertiaryBtn label='Cancel request' onClick={cancel} />}
      {friendshipStatus === 'received' &&
        <>
          <SecondaryBtn label='Decline requeset' onClick={decline} />
          <PrimaryBtn label='Accept request' onClick={accept} />
        </>
      }
      {friendshipStatus === 'friends' && <SecondaryBtn label='Unfriend' onClick={unfriend} />}
    </>
  )
}

export default FriendBtns;