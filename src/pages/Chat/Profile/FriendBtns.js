import { useEffect, useState } from 'react';

const FriendBtns = ({ socket }) => {
  const [friendshipStatus, setFriendshipStatus] = useState('');

  useEffect(() => {
    socket.emit('get friendship status');

    socket.on('friendship status', ({ friendshipStatus }) => {
      setFriendshipStatus(friendshipStatus);
    });

    return () => socket.off('friendship status');
  }, [socket]);

  return (
    <div className='mt-4 w-full text-center'>
      {!friendshipStatus &&
        <button
          className='tertiary-btn w-40'
          onClick={() => socket.emit('send request')}
        >
          Send friend request
        </button>
      }
      {friendshipStatus === 'sent' &&
        <button
          className='tertiary-btn w-40'
          onClick={() => socket.emit('delete request')}
        >
          Cancel request
        </button>
      }
      {friendshipStatus === 'received' &&
        <div className='flex w-full'>
          <button
            className='secondary-btn mr-1'
            onClick={() => socket.emit('delete request')}
          >
            Decline request
          </button>
          <button
            className='primary-btn ml-1'
            onClick={() => socket.emit('accept request')}
          >
            Accept request
          </button>
        </div>
      }
      {friendshipStatus === 'friends' &&
        <button
          className='tertiary-btn w-40'
          onClick={() => socket.emit('unfriend')}
        >
          Unfriend
        </button>
      }
    </div>
  )
}

export default FriendBtns;