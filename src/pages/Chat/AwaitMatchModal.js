import { useEffect, useState } from 'react';

const AwaitMatchModal = ({ action, setAwaitMatch, setConnected, socket }) => {
  const [elapsedSec, setElapsedSec] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setElapsedSec(prev => prev + 5);
    }, 5000);

    if (elapsedSec === 20) {
      clearInterval(intervalID);
    }

    return () => clearInterval(intervalID);
  }, [elapsedSec]);

  const confirm = () => {
    setAwaitMatch(false);
    setConnected(false);
    socket.disconnect();
  };

  return (
    <div className='cursor-wait bg-gray-200 bg-opacity-60 absolute m-auto inset-0 z-10 flex justify-center items-center'>
      <div className='bg-gray-50 w-3/4 border rounded-lg shadow-md p-4 text-center'>
        <p>
          {
            (elapsedSec === 0 && "We're looking for a match...") ||
            (elapsedSec === 5 && "Hold tight, we're still looking...") ||
            (elapsedSec === 10 && "Still working on it...") ||
            (elapsedSec === 15 && "Where is everybody?") ||
            (elapsedSec === 20 && "We're sorry, we couldn't find a match.")
          }
        </p>
        {elapsedSec === 20 &&
          <>
            <p>
              {action === 'talk'
                ? "Please try again after modifying your filters or at a later time."
                : "Please try again later."
              }
            </p>
            <button className='tertiary-btn mt-6 w-40' onClick={confirm}>OK</button>
          </>
        }
      </div>
    </div>
  )
}

export default AwaitMatchModal;