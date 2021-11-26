import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

import UserContext from '../contexts/UserContext';

import postData from '../utils/postData';
import setErrMsgs from '../utils/setErrMsgs';
import googleIcon from '../assets/G.png';

const LoginForm = () => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);

  const [input, setInput] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState();

  useEffect(() => {
    token && history.replace('/dashboard')
  }, [token, history]);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      const res = await postData('/auth/login', input);
      const data = await res.json();

      if (!res.ok && data.errors) {
        return setErrors(setErrMsgs(data.errors));
      }

      if (!res.ok && !data.errors) {
        return setErrors(data);
      }

      setToken(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex flex-col justify-between mb-10 md:mb-0 md:w-64 h-96 md:h-login'>
      <form onSubmit={handleSignIn}>
        <div className='mb-1'>
          <label className='login-label' htmlFor='email-input'>Email</label>
          <input
            id='email-input'
            className='login-input'
            type='text'
            name='email'
            value={input.email}
            onChange={handleInput}
          />
          <p className='error-msg'>{errors && errors.email}</p>
        </div>
        <div className='mb-1'>
          <label className='login-label' htmlFor='password-input'>Password</label>
          <input
            id='password-input'
            className='login-input'
            type='password'
            name='password'
            value={input.password}
            onChange={handleInput}
          />
          <p className='error-msg'>{errors && errors.password}</p>
        </div>
        <input
          className='primary-btn'
          type='submit'
          value='Sign in'
        />
        <div className='flex items-center h-10 my-2'>
          <div className='flex-grow h-0 border-b border-gray-300 md:border-gray-500' />
          <p className='px-2 text-sm text-gray-300 md:text-gray-500 bg-transparent'>
            or
          </p>
          <div className='flex-grow h-0 border-b border-gray-300 md:border-gray-500' />
        </div>
        <button
          className='secondary-btn'
          type="button"
          onClick={() => window.location.href='http://localhost:5000/api/auth/google'}
        >
          <img className='float-left h-3/5 ml-2' src={googleIcon} alt='' />
          Sign in with Google
        </button>
      </form>
      <div className='flex flex-col items-center'>
        <p className='mb-1.5 text-xs text-gray-100'>Don't have an account?</p>
        <button
          className='rounded-btn'
          onClick={() => window.location.href='/signup'}
        >
          Create an account
        </button>
      </div>
    </div>
  )
}

export default LoginForm;