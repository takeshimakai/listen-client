import { useEffect, useState, useContext } from 'react';

import SocketContext from '../../contexts/SocketContext';

import TertiaryBtn from '../../components/TertiaryBtn';

const AwaitMatchModal = ({ action, setAwaitMatch, setConnected }) => {
  const socket = useContext(SocketContext);
  
  const [elapsedSec, setElapsedSec] = useState(0);
  const [timeOut, setTimeOut] = useState(false);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setElapsedSec(prev => prev + 5);
    }, 5000);

    if (action === 'listen' && elapsedSec === 20) {
      setTimeOut(true);
      socket.emit('listener abort match');
    }

    if (timeOut) {
      clearInterval(intervalID);
    }

    return () => clearInterval(intervalID);
  }, [timeOut, elapsedSec, action, socket]);

  useEffect(() => {
    const onNoMatch = () => setTimeOut(true);

    socket.on('no match', onNoMatch);

    return () => socket.off('no match', onNoMatch);
  }, [socket]);

  const confirm = () => {
    setAwaitMatch(false);
    setConnected(false);
  };

  return (
    <div className={`${elapsedSec < 20 ? 'cursor-wait' : null} bg-gray-200 bg-opacity-60 fixed m-auto inset-0 z-10 flex justify-center items-center px-4`}>
      <div className='text-center bg-gray-50 border rounded-lg shadow-md p-8'>
        <p className='font-light sm:text-sm'>
          {
            (elapsedSec === 0 && "We're looking for a match...") ||
            (elapsedSec === 5 && "Hold tight, we're still looking...") ||
            (elapsedSec === 10 && "Still working on it...") ||
            (elapsedSec >= 15 && !timeOut && "Where is everybody?") ||
            (timeOut && "We're sorry, we were unable to find a match.")
          }
        </p>
        {timeOut &&
          <>
            <p className='font-light sm:text-sm mb-6'>
              {action === 'talk'
                ? "Please try again after modifying your criteria or at a later time."
                : "Please try again later."
              }
            </p>
            <TertiaryBtn label='OK' onClick={confirm} />
          </>
        }
      </div>
    </div>
  )
}

export default AwaitMatchModal;