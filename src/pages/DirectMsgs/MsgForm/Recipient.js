import { useEffect, useState, useContext } from 'react';

import SocketContext from '../../../contexts/SocketContext';

const Recipient = ({ err, to, setNewMsg }) => {
  const socket = useContext(SocketContext);

  const [friends, setFriends] = useState([]);
  const [input, setInput] = useState(to || '');

  useEffect(() => {
    socket.emit('get friends', 'accepted');

    const acceptedFriendsHandler = (friends) => setFriends(friends);

    socket.on('accepted friends', acceptedFriendsHandler);

    return () => socket.off('accepted friends', acceptedFriendsHandler);
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
    <div className='flex flex-col w-full mb-1'>
      <label className='subtitle' htmlFor='to'>Recipient</label>
      <input
        className='w-full py-1 border-b border-gray-400 focus:border-gray-700 sm:text-sm text-gray-900 bg-transparent focus:outline-none'
        list='to-list'
        value={input}
        onChange={handleInput}
      />
      <p className='error-msg'>{err.to}</p>
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