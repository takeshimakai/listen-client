import { useEffect, useState, useContext } from 'react';

import SocketContext from '../../../contexts/SocketContext';

const Recipient = ({ to, setNewMsg }) => {
  const socket = useContext(SocketContext);

  const [friends, setFriends] = useState([]);
  const [input, setInput] = useState(to || '');

  useEffect(() => {
    socket.emit('get friends', 'accepted');

    socket.on('accepted friends', (friends) => setFriends(friends));

    return () => socket.off('accepted friends');
  }, [socket]);

  const handleInput = (e) => {
    const { value } = e.target;
    const selected = document.querySelector('#to-list').options.namedItem(value);
    let friendId = '';

    if (selected) {
      friendId = selected.dataset.friendId;
    }

    setInput(value);
    setNewMsg(prev => ({ ...prev, to: friendId }));
  };

  return (
    <div>
      <label htmlFor='to'>Recipient</label>
      <input list='to-list' value={input} onChange={handleInput} />
      <datalist id='to-list'>
        {friends.length > 0
          ? friends.map(friend => (
              <option
                key={friend._id}
                id={friend.profile.username}
                value={friend.profile.username}
                data-friend-id={friend._id}
              />
            ))
          : <option value=''>Unable to find friends</option>
        }
      </datalist>
    </div>
  )
}

export default Recipient;