import { useState } from 'react';

const Input = ({ socket, setMsgs, id }) => {
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    setMsgs(prev => [...prev, { msg: input, from: id }]);
    socket.emit('new msg', { msg: input });
    setInput('');
  };

  return (
    <form className='flex' onSubmit={sendMessage}>
      <input
        className='border w-4/5'
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className='border flex-grow'>Send</button>
    </form>
  )
}

export default Input;