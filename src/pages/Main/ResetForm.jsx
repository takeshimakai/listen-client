import { useState, useContext } from 'react';

import UserContext from '../../contexts/UserContext';

import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';

import postData from '../../utils/postData';
import setErrMsgs from '../../utils/setErrMsgs';
import updateTokens from '../../utils/updateTokens';

const ResetForm = ({ input, setInput, setAction, handleInput, setStep }) => {
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

      if (!res.ok) throw res;

      const { token, refreshToken } = await res.json();

      updateTokens(token, refreshToken, setToken);
    } catch (err) {
      if (err.status === 400) {
        const { errors } = await err.json();
        return setErr(setErrMsgs(errors));
      }

      console.log(err);
    }
  };

  return (
    <form
      className='flex flex-col'
      onSubmit={handleSubmit}
    >
      <h3 className='text-lg mb-6 text-gray-600'>
        Reset password
      </h3>
      <p className='font-light sm:text-sm mb-12'>
        Please enter your verification code to reset your password.
      </p>
      <div className='flex flex-col gap-y-4 mb-4'>
        <div className='flex flex-col gap-y-1'>
          <label className='label' htmlFor='code'>Verification code</label>
          <Input
            id='code'
            name='code'
            type='number'
            min={0}
            value={input.code}
            onChange={handleInput}
          />
          {err?.code && (
            <p className='error-msg'>{err.code}</p>
          )}
        </div>
        <div className='flex flex-col gap-y-1'>
          <label className='label' htmlFor='password'>New password</label>
          <Input
            id='password'
            name='password'
            type='password'
            value={input.password}
            onChange={handleInput}
          />
          {err?.password && (
            <p className='error-msg'>{err.password}</p>
          )}
        </div>
        <div className='flex flex-col gap-y-1'>
          <label className='label' htmlFor='password-confirm'>Confirm new password</label>
          <Input
            id='password-confirm'
            name='passwordConfirmation'
            type='password'
            value={input.passwordConfirmation}
            onChange={handleInput}
          />
          {err?.passwordConfirmation && (
            <p className='error-msg'>{err.passwordConfirmation}</p>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-y-2.5'>
        <PrimaryButton>Reset password</PrimaryButton>
        <SecondaryButton
          type='button'
          onClick={() => setAction('login')}
        >
          Cancel
        </SecondaryButton>
      </div>
      <p className='text-xs text-gray-500 mt-11 text-center'>
        Didn't receive it?
        {" "}
        <span
          className='link'
          onClick={() => {
            setStep('email');
            setInput(prev => ({
              ...prev,
              code: '',
              password: '',
              passwordConfirmation: ''
            }));
          }}
        >
          Send it again
        </span>
        .
      </p>
    </form>
  )
}

export default ResetForm;