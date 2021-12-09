import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import postData from '../utils/postData';
import decodeToken from '../utils/decodeToken';

const EmailVerification = () => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);

  const [input, setInput] = useState(['','','','']);
  const [error, setError] = useState();

  useEffect(() => {
    const numInputs = document.querySelectorAll('.num-input');

    const autoFocus = (e) => {
      if (e.key !== ' ' && [...Array(10).keys()].includes(Number(e.key))) {
        e.target.nextElementSibling.focus();
      }
    };

    numInputs.forEach(input => {
      input.addEventListener('keyup', autoFocus);
    });

    return () => {
      numInputs.forEach(input => input.removeEventListener('keyup', autoFocus));
    }
  }, []);

  useEffect(() => {
    if (token) {
      decodeToken(token).verified && history.replace('/dashboard');
    } else {
      history.replace('/')
    }
  }, [token, history]);

  const handleChange = (e) => {
    const { index } = e.target.dataset;
    let { value } = e.target;

    if (value.length > 1) {
      return;
    }

    setInput(prev => {
      const updated = [...prev];
      updated.splice(index, 1, value);
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const code = input.join().replace(/,/g, '');
      
      if (code.length !== 4) {
        return setError('Verification code must contain four digits.');
      }

      const res = await postData('/auth/verify', { code }, token);
      const data = await res.json();

      if (!res.ok) {
        return setError(data.msg);
      }
      
      setToken(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-full h-full flex flex-col sm:flex-row sm:items-center overflow-auto'>
      <div className='bg-image' />
      <button
        className='absolute z-20 right-4 top-2 font-light text-sm'
        onClick={() => setToken('')}
      >
        Sign out
      </button>
      <div className='relative flex items-center justify-center sm:justify-end h-2/6 sm:h-auto z-10 sm:flex-1 sm:mr-14'>
        <h1 className='logo-main'>listen</h1>
      </div>
      <div className='relative z-10 px-12 sm:px-0 flex-1 sm:ml-14'>
        <form
          className='max-w-xs mx-auto sm:mx-0 flex flex-col items-center justify-between h-full sm:h-80 pb-12 sm:pb-0'
          onSubmit={handleSubmit}
        >
          <div className='text-center'>
            <p>
              An email has been sent with a four digit verification code.
            </p>
            <p className='mt-2'>
              Please enter it below.
            </p>
            <div className='w-full text-center mt-8'>
              {input.map((el, i) => (
                <input
                  className='num-input border border-gray-400 rounded-md text-gray-900 text-xl text-center h-12 w-10 mx-1'
                  key={i}
                  type='number'
                  data-index={i}
                  value={el}
                  max='9'
                  min='0'
                  onChange={handleChange}
                />
              ))}
              <p className='error-msg'>{error && error}</p>
            </div>
          </div>
          <div className='w-full text-center space-y-4'>
            <p className='text-white sm:text-black text-sm'>
              Didn't receive it? <span className='text-blue-700 hover:text-blue-900 cursor-pointer'>Send it again.</span>
            </p>
            <input className='primary-btn' type='submit' value='Verify' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmailVerification;