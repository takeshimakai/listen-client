import { useState } from 'react';

import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';

import postData from '../../utils/postData';

const EmailForm = ({ email, handleInput, setStep, setAction }) => {
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
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <h3 className='text-lg mb-6 text-gray-600'>
        Forgot password
      </h3>
      <p className='font-light sm:text-sm mb-12'>
        A verification code will be sent to your email. It will be necessary to reset your password.
      </p>
      <div className='flex flex-col gap-y-1 mb-4'>
        <label className='label' htmlFor='email'>Email</label>
        <Input
          id='email'
          name='email'
          type='email'
          value={email}
          onChange={handleInput}
        />
        {err && <p className='error-msg'>{err}</p>}
      </div>
      <div className='flex flex-col gap-y-2.5'>
        <PrimaryButton>Send code</PrimaryButton>
        <SecondaryButton
          type='button'
          onClick={() => setAction('login')}
        >
          Cancel
        </SecondaryButton>
      </div>
    </form>
  )
}

export default EmailForm;