import { useContext, useState } from 'react';

import UserContext from '../../contexts/UserContext';

import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';

import postData from '../../utils/postData';
import setErrMsgs from '../../utils/setErrMsgs';
import updateTokens from '../../utils/updateTokens';

import googleIcon from '../../assets/G.png';

const LoginForm = ({ setAction }) => {
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

      if (!res.ok) {
        throw res;
      }

      const { token, refreshToken } = await res.json();

      updateTokens(token, refreshToken, setToken);
    } catch (err) {
      if (err.status === 400) {
        const { errors } = await err.json();
        return setErrors(setErrMsgs(errors));
      }

      if (err.status === 401) {
        const data = await err.json();
        return setErrors(data);
      }

      console.log(err);
    }
  };

  return (
    <div className='flex flex-col'>
      <h3 className='text-lg mb-6 text-gray-600'>
        Sign in
      </h3>
      <form className='flex flex-col gap-y-4' onSubmit={handleSignIn}>
        <div className='flex flex-col gap-y-1'>
          <label className='label' htmlFor='email-input'>
            Email
          </label>
          <Input
            id='email-input'
            type='email'
            name='email'
            value={input.email}
            onChange={handleInput}
          />
          {errors?.email && (
            <p className='error-msg'>{errors.email}</p>
          )}
        </div>
        <div className='flex flex-col gap-y-1'>
          <label className='label' htmlFor='password-input'>Password</label>
          <Input
            id='password-input'
            type='password'
            name='password'
            value={input.password}
            onChange={handleInput}
          />
          {errors?.password && (
            <p className='error-msg'>{errors.password}</p>
          )}
          <button
            className='link w-fit'
            type='button'
            onClick={() => setAction('forgot')}
          >
            Forgot password
          </button>
        </div>
        <PrimaryButton>Sign in</PrimaryButton>
      </form>
      <div className='flex items-center h-10 my-2 w-full'>
        <div className='flex-grow h-0 border-b border-gray-500' />
        <p className='px-2 text-sm text-gray-500'>
          or
        </p>
        <div className='flex-grow h-0 border-b border-gray-500' />
      </div>
      <SecondaryButton onClick={() => {
        window.location.href=`${import.meta.env.VITE_API_URL}/auth/google`
      }}>
        <img className='absolute inset-y-0 my-auto h-3/5' src={googleIcon} alt='' />
        Sign in with Google
      </SecondaryButton>
      <p className='mb-1.5 text-xs text-gray-500 mt-11 text-center'>
        Don't have an account?
        {" "}
        <span
          className='link'
          onClick={() => setAction('signup')}
        >
          Create an account
        </span>
        .
      </p>
    </div>
  )
}

export default LoginForm;