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

      if (!res.ok) throw res;

      setStep('reset');
    } catch (err) {
      if (err.status === 400) {
        const { errors } = await err.json();
        return setErr(errors[0].msg);
      }

      if (err.status === 404) {
        const { msg } = await err.json();
        return setErr(msg);
      }

      console.log(err);
    }
  };

  return (
    <form className='max-w-2xs mx-auto lg:mx-0' onSubmit={handleSubmit}>
      <p className='font-light sm:text-sm text-center mb-12'>
        A verification code will be sent to your email. It will be necessary to reset your password.
      </p>
      <div className='mb-1'>
        <label className='label' htmlFor='email'>Email</label>
        <input
          className='input'
          id='email'
          name='email'
          type='email'
          value={email}
          onChange={handleInput}
        />
        <p className='error-msg'>{err}</p>
      </div>
      <div className='space-y-2.5'>
        <button
          className='border active:border-0 active:p-px shadow-md max-w-2xs w-full h-8 rounded-md bg-gray-50 text-sm text-gray-600 hover:bg-gray-200 active:shadow-inner'
          type='button'
          onClick={() => setPage('login')}
        >
          Cancel
        </button>
        <button className='shadow-md max-w-2xs w-full h-8 rounded-md bg-green-700 text-sm text-white hover:bg-green-800 active:shadow-inner-2'>
          Send code
        </button>
      </div>
    </form>
  )
}

export default EmailForm;