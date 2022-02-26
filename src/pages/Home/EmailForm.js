import { useState } from 'react';

import postData from '../../utils/postData';

const EmailForm = ({ email, handleInput, setStep, setPage }) => {
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (err) setErr('');

      if (!email) return setErr('Please enter an email.');

      const res = await postData('/auth/forgot-password', { email });

      if (res.status === 400) {
        const { errors } = await res.json();
        return setErr(errors[0].msg);
      }

      if (res.status === 404) {
        const { msg } = await res.json();
        return setErr(msg);
      }

      setStep('reset');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className='max-w-2xs mx-auto lg:mx-0' onSubmit={handleSubmit}>
      <p className='font-light sm:text-sm text-center mb-12'>
        We will send a verification code to your email. It will be necessary to reset your password.
      </p>
      <div className='mb-1'>
        <label className='label' htmlFor='email'>Email</label>
        <input
          className='input'
          id='email'
          name='email'
          type='text'
          value={email}
          onChange={handleInput}
        />
        <p className='error-msg'>{err}</p>
      </div>
      <div className='space-y-2.5'>
        <button className='secondary-btn' type='button' onClick={() => setPage('login')}>
          Cancel
        </button>
        <button className='primary-btn'>Send code</button>
      </div>
    </form>
  )
}

export default EmailForm;