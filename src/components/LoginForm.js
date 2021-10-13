import { useState, useContext } from 'react';

import UserContext from '../contexts/UserContext';

import apiCall from '../utils/apiCall';
import setErrMsgs from '../utils/setErrMsgs';

const LoginForm = () => {
  const { setToken } = useContext(UserContext);

  const [input, setInput] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState();

  const handleInput = (e) => {
    setInput({...input, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      const res = await apiCall(
        'http://localhost:5000/api/auth/login',
        'POST',
        input
      )

      const data = await res.json();

      if (!res.ok && data.errors) {
        setErrors(setErrMsgs(data.errors));
      }

      if (!res.ok && !data.errors) {
        setErrors(data);
      }

      if (res.ok) {
        setInput({ email: '', password: '' });
        setToken(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const emailInput = (
    <div id='email-container'>
      <input
        id='email'
        type='text'
        name='email'
        placeholder='Email'
        value={input.email}
        onChange={handleInput}
      />
      {errors && errors.email && <p className='error'>{errors.email}</p>}
    </div>
  )

  const pwdInput = (
    <div id='pwd-container'>
      <input
        id='password'
        type='password'
        name='password'
        placeholder='Password'
        value={input.password}
        onChange={handleInput}
      />
      {errors && errors.password && <p className='error'>{errors.password}</p>}
    </div>
  )
  
  return (
    <form onSubmit={handleSignIn}>
      {emailInput}
      {pwdInput}
      <input type='submit' value='Sign in' />
    </form>
  )
}

export default LoginForm;