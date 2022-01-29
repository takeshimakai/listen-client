import { useState, useEffect, useRef } from 'react';

import sendIcon from '../../assets/send.png';

const Input = ({ socket, setMsgs, id }) => {
  const [input, setInput] = useState('');

  const chatInput = useRef();

  useEffect(() => {
    const chatInputCopy = chatInput.current;
    const chatInputInitHeight = chatInput.current.scrollHeight + 2;
    const maxHeight = 4 * (chatInputInitHeight);

    chatInput.current.style.maxHeight = `${maxHeight}px`;

    const resize = () => {
      chatInput.current.style.height = 'auto';
      chatInput.current.style.height = `calc(${chatInput.current.scrollHeight}px + 2px)`;
      if (maxHeight < chatInput.current.scrollHeight) {
        chatInput.current.scrollTop = chatInput.current.scrollHeight;
      }
    };

    chatInput.current.addEventListener('input', resize);
    return () => chatInputCopy.removeEventListener('input', resize);
  }, []);

  const submitOnEnter = (e) => {
    if (e.code === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.querySelector('#chat-submit-btn').click();
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      setMsgs(prev => [...prev, { msg: input, from: id }]);
      socket.emit('new msg', { msg: input });
      setInput('');
      chatInput.current.style.height = 'auto';
    }
  };

  return (
    <form className='relative flex mt-4' onSubmit={sendMessage}>
      <textarea
        ref={chatInput}
        className='outline-none resize-none border border-gray-400 rounded-lg flex-grow mr-12 p-2 sm:text-sm'
        id='chat-input'
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={submitOnEnter}
      />
      <button id='chat-submit-btn' className='absolute right-0 bottom-0 border rounded-full border-green-700 p-2'>
        <img className='h-6 sm:h-5' src={sendIcon} alt='' />
      </button>
    </form>
  )
}

export default Input;