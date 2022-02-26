import { useState, useContext } from 'react';

import UserContext from '../../contexts/UserContext';

import postData from '../../utils/postData';
import setErrMsgs from '../../utils/setErrMsgs';

const ResetForm = ({ input, setPage, handleInput, setStep }) => {
  const { setToken } = useContext(UserContext);

  const [err, setErr] = useState({
    code: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setErr({ code: '', password: '', passwordConfirmation: '' });

      if (input.code.length !== 4) {
        return setErr(prev => ({
          ...prev,
          code: 'Verification code must contain four digits.'
        }));
      }
  
      const res = await postData('/auth/reset-password', input);

      if (!res.ok) {
        const { errors } = await res.json();
        return setErr(setErrMsgs(errors));
      }

      setToken(await res.json());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className='max-w-2xs mx-auto lg:mx-0' onSubmit={handleSubmit}>
      <p className='font-light sm:text-sm text-center mb-12'>
        Please enter your verification code to reset your password.
      </p>
      <div className='mb-1'>
        <label className='label' htmlFor='code'>Verification code</label>
        <input
          className='input'
          id='code'
          name='code'
          type='number'
          min={0}
          value={input.code}
          onChange={handleInput}
        />
        <p className='error-msg'>{err.code}</p>
      </div>
      <div className='mb-1'>
        <label className='label' htmlFor='password'>New password</label>
        <input
          className='input'
          id='password'
          name='password'
          type='password'
          value={input.password}
          onChange={handleInput}
        />
        <p className='error-msg'>{err.password}</p>
      </div>
      <div className='mb-1'>
        <label className='label' htmlFor='password-confirm'>Confirm new password</label>
        <input
          className='input'
          id='password-confirm'
          name='passwordConfirmation'
          type='password'
          value={input.passwordConfirmation}
          onChange={handleInput}
        />
        <p className='error-msg'>{err.passwordConfirmation}</p>
      </div>
      <div className='space-y-2.5'>
        <button className='secondary-btn' type='button' onClick={() => setPage('login')}>
          Cancel
        </button>
        <button className='primary-btn'>Reset password</button>
      </div>
      <p className='text-sm text-center mt-6'>Didn't receive it? <span
        className='text-blue-700 hover:text-blue-900 cursor-pointer'
        onClick={() => setStep('email')}
      >
        Send it again.
      </span></p>
    </form>
  )
}

export default ResetForm;