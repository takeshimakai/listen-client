import { useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';

import SocketContext from '../../../contexts/SocketContext';
import UserContext from '../../../contexts/UserContext';

import decodeToken from '../../../utils/decodeToken';

import sendIcon from '../../../assets/send.png';

const Input = ({ thread, err }) => {
  const { threadId } = useParams();
  const socket = useContext(SocketContext);
  const { token } = useContext(UserContext);
  const { id } = decodeToken(token);

  const [input, setInput] = useState('');

  const textarea = useRef();

  const handleInput = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input) {
      socket.emit('send dm', {
        to: thread.users[0] === id ? thread.users[1] : thread.users[0],
        body: input,
        threadId: threadId
      });
      setInput('');
      textarea.current.style.height = 'auto';
    }
  };

  const autoResize = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 2 + 'px';
    textarea.current.scrollTop = textarea.current.scrollHeight;
  };

  return (
    <form className='mt-3 text-right' onSubmit={handleSubmit}>
      <p className='error-msg text-left mb-1'>{err}</p>
      <textarea
        ref={textarea}
        className='resize-none max-h-44 p-2 w-full border border-gray-400 focus:border-gray-700 rounded-md sm:text-sm text-gray-900 focus:outline-none'
        placeholder='Reply'
        value={input}
        onChange={handleInput}
        onInput={autoResize}
      />
      <button className='border rounded-full border-green-700 p-1.5 shadow'>
        <img className='h-4 w-4' src={sendIcon} alt='' />
      </button>
    </form>
  )
}

export default Input;