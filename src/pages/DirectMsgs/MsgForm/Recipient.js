import { useState } from 'react';

const Recipient = ({ friends, err, to, setNewMsg }) => {
  const [input, setInput] = useState(to || '');

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
        className='w-full py-1 border-b border-gray-400 focus:border-gray-700 sm:text-sm text-gray-900 bg-transparent focus:outline-none disabled:text-gray-500'
        list='to-list'
        value={friends && friends.length === 0 ? 'Your friends list is empty.' : input}
        disabled={friends && friends.length === 0}
        onChange={handleInput}
      />
      <p className='error-msg'>{err.to}</p>
      <datalist id='to-list'>
        {friends && friends.length > 0 &&
          friends.map(friend => (
            <option
              key={friend._id}
              id={friend.profile.username}
              value={friend.profile.username}
              data-friend-id={friend._id}
            />
          ))
        }
      </datalist>
    </div>
  )
}

export default Recipient;