import { useState, useEffect } from 'react';

import chevronDown from '../../assets/chevron-down-solid.svg';

const MobileOptions = ({ leaveConversation }) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const chatOptions = document.querySelector('#chat-options');
    const chevron = document.querySelector('#chevron');

    if (hidden) {
      chatOptions.classList.remove('max-h-8', 'mt-2', 'mb-4');
      chatOptions.classList.add('max-h-0');
      chevron.classList.remove('transform', 'rotate-180');
    } else {
      chatOptions.classList.remove('max-h-0');
      chatOptions.classList.add('max-h-8', 'mt-2', 'mb-4');
      chevron.classList.add('transform', 'rotate-180');
    }
  }, [hidden]);

  return (
    <div className='sm:hidden absolute w-full py-2 bg-gray-50'>
      <div
        id='chat-options'
        className='max-h-0 overflow-hidden transition-all duration-500 ease-out flex justify-center'
      >
        <button className='text-red-600 font-light text-center' onClick={leaveConversation}>
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