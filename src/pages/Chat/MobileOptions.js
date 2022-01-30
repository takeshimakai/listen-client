import { useState, useEffect } from 'react';

import chevronDown from '../../assets/chevron-down-solid.svg';

const MobileOptions = () => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const chatOptions = document.querySelector('#chat-options');
    const chevron = document.querySelector('#chevron');

    if (hidden) {
      chatOptions.classList.remove('max-h-20', 'space-y-2.5', 'mt-2', 'mb-4');
      chatOptions.classList.add('max-h-0');
      chevron.classList.remove('transform', 'rotate-180');
    } else {
      chatOptions.classList.remove('max-h-0');
      chatOptions.classList.add('max-h-20', 'space-y-2.5', 'mt-2', 'mb-4');
      chevron.classList.add('transform', 'rotate-180');
    }
  }, [hidden]);

  return (
    <div className='sm:hidden absolute w-full py-2 bg-gray-50'>
      <div
        id='chat-options'
        className='overflow-hidden flex flex-col items-center space-y-2.5 transition-all duration-500 ease-out'
      >
        <button className='tertiary-btn w-40'>
          Send friend request
        </button>
        <button className='shadow-md border border-red-600 w-40 h-8 rounded-md bg-gray-50 text-sm text-red-600 hover:text-white hover:bg-red-700 active:shadow-inner'>
          Leave conversation
        </button>
      </div>
      <img
        id='chevron'
        className='h-5 opacity-70 mx-auto transition-all duration-500 ease-out'
        src={chevronDown}
        alt=''
        onClick={() => setHidden(!hidden)}
      />
    </div>
  )
}

export default MobileOptions;