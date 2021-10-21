import { useState, useContext } from 'react';

import UserContext from '../contexts/UserContext';

import setErrMsgs from '../utils/setErrMsgs';

const LoginForm = () => {
  const { setToken } = useContext(UserContext);

  const [input, setInput] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input)
      })

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
    <div id='login-form'>
      <form onSubmit={handleSignIn}>
        {emailInput}
        {pwdInput}
        <input type='submit' value='Sign in' />
      </form>
      <a href='http://localhost:5000/api/auth/google'>Google Sign in</a>
    </div>
  )
}

export default LoginForm;