import { useContext, useState } from 'react';

import UserContext from '../../contexts/UserContext';

import postData from '../../utils/postData';
import setErrMsgs from '../../utils/setErrMsgs';
import googleIcon from '../../assets/G.png';

const LoginForm = ({ setIsLogin }) => {
  const { setToken } = useContext(UserContext);

  const [input, setInput] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState();

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
    <div className='auth-container'>
      <form className='flex flex-col items-center' onSubmit={handleSignIn}>
        <div className='mb-1 max-w-2xs w-full'>
          <label className='label' htmlFor='email-input'>Email</label>
          <input
            id='email-input'
            className='input'
            type='text'
            name='email'
            value={input.email}
            onChange={handleInput}
          />
          <p className='error-msg'>{errors && errors.email}</p>
        </div>
        <div className='mb-1 max-w-2xs w-full'>
          <label className='label' htmlFor='password-input'>Password</label>
          <input
            id='password-input'
            className='input'
            type='password'
            name='password'
            value={input.password}
            onChange={handleInput}
          />
          <p className='error-msg'>{errors && errors.password}</p>
        </div>
        <input className='primary-btn' type='submit' value='Sign in' />
        <p className='mt-3.5 text-xs font-light text-blue-700 hover:text-blue-900 cursor-pointer'>
          Forgot password?
        </p>
        <div className='flex items-center h-10 my-2 max-w-2xs w-full'>
          <div className='flex-grow h-0 border-b border-gray-300 sm:border-gray-500' />
          <p className='px-2 text-sm text-gray-300 sm:text-gray-500 bg-transparent'>
            or
          </p>
          <div className='flex-grow h-0 border-b border-gray-300 sm:border-gray-500' />
        </div>
        <button
          className='secondary-btn'
          type="button"
          onClick={() => window.location.href='http://localhost:5000/api/auth/google'}
        >
          <img className='btn-icon' src={googleIcon} alt='' />
          Sign in with Google
        </button>
      </form>
      <div className='flex flex-col items-center mt-11'>
        <p className='mb-1.5 text-xs text-white'>Don't have an account?</p>
        <button className='rounded-btn' onClick={() => setIsLogin(false)}>
          Create an account
        </button>
      </div>
    </div>
  )
}

export default LoginForm;