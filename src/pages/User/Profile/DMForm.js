import { useState, useEffect, useContext } from 'react';

import SocketContext from '../../../contexts/SocketContext';

const DMForm = ({ userId, username, setCompose }) => {
  const socket = useContext(SocketContext);

  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState('');
  const [input, setInput] = useState({
    isParent: true,
    subject: '',
    body: '',
    to: userId
  });

  useEffect(() => {
    socket.on('dm success', () => {
      setSuccess(true);
      setTimeout(() => setCompose(false), 2000);
    });

    socket.on('dm error', (errors) => setErr(errors.body));

    return () => {
      socket.off('dm success');
      socket.off('dm error');
    };
  }, [socket, setCompose]);

  const handleInput = (e) => {
    const { value, name } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (err) {
      setErr('');
    }

    if (!input.body) {
      return setErr('A message is required.');
    }

    socket.emit('send dm', input);
  };

  return (
    <div className='z-10 fixed inset-0 m-auto flex justify-center items-center bg-gray-200 bg-opacity-60'>
      {success
        ? <p className='flex justify-center items-center py-8 px-12 bg-gray-50 border rounded-lg shadow-md font-light sm:text-sm'>
            Message has been sent!
          </p>
        : <form
            className='flex flex-col items-center bg-gray-50 shadow-md rounded-lg p-4 sm:p-8 h-3/4 w-full sm:w-3/4 lg:w-1/2 mx-4 sm:mx-0'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col w-full mb-5'>
              <label className='subtitle' htmlFor='to'>Recipient</label>
              <input
                className='w-full py-1 border-b border-gray-400 focus:border-gray-700 sm:text-sm text-gray-900 bg-transparent focus:outline-none'
                value={username}
                readOnly
              />
            </div>
            <div className='w-full mb-5'>
              <label className='subtitle' htmlFor='subject'>Subject</label>
              <input
                id='subject'
                className='w-full py-1 border-b border-gray-400 focus:border-gray-700 sm:text-sm text-gray-900 bg-transparent focus:outline-none'
                name='subject'
                type='text'
                value={input.subject}
                onChange={handleInput}
              />
            </div>
            <div className='flex flex-grow flex-col w-full mb-1'>
              <textarea
                className='resize-none p-2 h-full w-full border border-gray-400 focus:border-gray-700 rounded sm:text-sm text-gray-900 focus:outline-none'
                placeholder='Message'
                name='body'
                value={input.body}
                onChange={handleInput}
              />
              <p className='error-msg'>{err}</p>
            </div>
            <div className='flex justify-center max-w-sm w-full'>
              <button className='secondary-btn mr-1 sm:w-40' type='button' onClick={() => setCompose(false)}>
                Cancel
              </button>
              <button className='primary-btn ml-1 sm:w-40'>Send</button>
            </div>
          </form>
          }
        </div>
  )
};

export default DMForm;