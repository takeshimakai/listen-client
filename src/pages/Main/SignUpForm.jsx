import { useState, useContext } from 'react';

import UserContext from '../../contexts/UserContext';

import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';

import postData from '../../utils/postData';
import setErrMsgs from '../../utils/setErrMsgs';
import updateTokens from '../../utils/updateTokens';

import googleIcon from '../../assets/G.png';

const SignUpForm = ({ setAction }) => {
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
    <div className='flex flex-col'>
      <h3 className='text-lg mb-6 text-gray-600'>
        Create an account
      </h3>
      <form
        className='flex flex-col gap-y-4'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-y-1'>
          <label className='label' htmlFor='email-input'>Email</label>
          <Input
            type='email'
            id='email-input'
            name='email'
            value={input.email}
            onChange={handleInput}
          />
          {error?.email && (
            <p className='error-msg'>{error.email}</p>
          )}
        </div>
        <div className='flex flex-col gap-y-1'>
          <label className='label' htmlFor='password-input'>Password</label>
          <Input
            type='password'
            id='password-input'
            name='password'
            value={input.password}
            onChange={handleInput}
          />
          {error?.password && (
            <p className='error-msg'>{error.password}</p>
          )}
        </div>
        <div className='flex flex-col gap-y-1'>
          <label className='label' htmlFor='password-confirmation-input'>Password confirmation</label>
          <Input
            type='password'
            id='password-confirmation-input'
            name='passwordConfirmation'
            value={input.passwordConfirmation}
            onChange={handleInput}
          />
          {error?.passwordConfirmation && (
            <p className='error-msg'>{error.passwordConfirmation}</p>
          )}
        </div>
        <PrimaryButton>Sign up</PrimaryButton>
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
        Sign up with Google
      </SecondaryButton>
      <p className='mb-1.5 text-xs text-gray-500 mt-11 text-center'>
        Already have an account?
        {" "}
        <span
          className='link'
          onClick={() => setAction('login')}
        >
          Sign in
        </span>
        .
      </p>
    </div>
  )
}

export default SignUpForm;