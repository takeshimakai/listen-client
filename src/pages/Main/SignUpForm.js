import { useState, useContext } from 'react';

import UserContext from '../../contexts/UserContext';

import postData from '../../utils/postData';
import setErrMsgs from '../../utils/setErrMsgs';
import updateTokens from '../../utils/updateTokens';

import googleIcon from '../../assets/G.png';

const SignUpForm = ({ setPage }) => {
  const { setToken } = useContext(UserContext);

  const [error, setError] = useState();
  const [input, setInput] = useState({
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await postData('/auth/signup', input);

      if (!res.ok) {
        throw res;
      }

      const { token, refreshToken } = await res.json();

      updateTokens(token, refreshToken, setToken);
    } catch (err) {
      if (err.status === 400) {
        const { errors } = await err.json();
        setError(setErrMsgs(errors));
        setInput(prev => ({ ...prev, password: '', passwordConfirmation: '' }));
        return;
      }

      console.log(err);
    }
  };

  return (
    <div className='flex flex-col justify-between max-w-2xs mx-auto lg:mx-0'>
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <div className='mb-1 w-full'>
          <label className='label' htmlFor='email-input'>Email</label>
          <input
            className='input'
            type='email'
            id='email-input'
            name='email'
            value={input.email}
            onChange={handleInput}
          />
          <p className='error-msg'>{error && error.email}</p>
        </div>
        <div className='mb-1 w-full'>
          <label className='label' htmlFor='password-input'>Password</label>
          <input
            className='input'
            type='password'
            id='password-input'
            name='password'
            value={input.password}
            onChange={handleInput}
          />
          <p className='error-msg'>{error && error.password}</p>
        </div>
        <div className='mb-1 w-full'>
          <label className='label' htmlFor='password-confirmation-input'>Password confirmation</label>
          <input
            className='input'
            type='password'
            id='password-confirmation-input'
            name='passwordConfirmation'
            value={input.passwordConfirmation}
            onChange={handleInput}
          />
          <p className='error-msg'>{error && error.passwordConfirmation}</p>
        </div>
        <input
          className='shadow-md max-w-2xs w-full h-8 rounded-md cursor-pointer bg-green-700 text-sm text-white hover:bg-green-800 active:shadow-inner-2'
          type='submit'
          value='Sign up'
        />
        <div className='flex items-center h-10 my-2 w-full'>
          <div className='flex-grow h-0 border-b border-gray-300 sm:border-gray-500' />
          <p className='px-2 text-sm text-gray-300 sm:text-gray-500 bg-transparent'>
            or
          </p>
          <div className='flex-grow h-0 border-b border-gray-300 sm:border-gray-500' />
        </div>
        <button
          className='relative border active:border-0 active:p-px shadow-md max-w-2xs w-full h-8 rounded-md bg-gray-50 text-sm text-gray-600 hover:bg-gray-200 active:shadow-inner'
          type="button"
          onClick={() => window.location.href=`${process.env.REACT_APP_API_URL}/auth/google`}
        >
          <img className='absolute inset-y-0 my-auto ml-2 h-3/5' src={googleIcon} alt='' />
          Sign up with Google
        </button>
      </form>
      <div className='flex flex-col items-center mt-11'>
        <p className='mb-1.5 text-xs text-white'>Already have an account?</p>
        <button
          className='border active:border-0 active:p-px shadow-md max-w-2xs w-full h-8 rounded-full text-gray-600 bg-gray-50 text-sm hover:bg-gray-200 active:shadow-inner'
          onClick={() => setPage('login')}
        >
          Proceed to sign in
        </button>
      </div>
    </div>
  )
}

export default SignUpForm;