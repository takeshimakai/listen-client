import { useState, useRef, useContext } from 'react';

import UserContext from '../../contexts/UserContext';
import SocketContext from '../../contexts/SocketContext';

import sendIcon from '../../assets/send.png';
import decodeToken from '../../utils/decodeToken';

const Input = ({ setMsgs, otherUserLeft }) => {
  const socket = useContext(SocketContext);
  const { token } = useContext(UserContext);
  const { id } = decodeToken(token);

  const [input, setInput] = useState('');

  const chatInput = useRef();

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

  const autoResize = () => {
   chatInput.current.style.height = 'auto';
   chatInput.current.style.height = chatInput.current.scrollHeight + 2 + 'px';
   chatInput.current.scrollTop = chatInput.current.scrollHeight;
  };

  return (
    <form className='relative flex mt-4 flex-shrink-0' onSubmit={sendMessage}>
      <textarea
        ref={chatInput}
        className='outline-none resize-none border border-gray-400 rounded-lg flex-grow mr-12 px-3 py-2 sm:text-sm'
        style={{ 'borderRadius': '20px' }}
        id='chat-input'
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onInput={autoResize}
        onKeyDown={submitOnEnter}
        disabled={otherUserLeft}
      />
      <button
        id='chat-submit-btn'
        className='absolute right-0 bottom-0 border rounded-full border-green-700 p-2 disabled:opacity-50'
        disabled={otherUserLeft}
      >
        <img className='h-6 sm:h-5 w-6 sm:w-5' src={sendIcon} alt='' />
      </button>
    </form>
  )
}

export default Input;