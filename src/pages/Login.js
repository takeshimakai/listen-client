import { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import setErrMsgs from '../utils/setErrMsgs';
import postData from '../utils/postData';

const Login = () => {
  const { token, setToken } = useContext(UserContext);

  const [input, setInput] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      const res = await postData('/auth/login', input);
      const data = await res.json();

      if (!res.ok && data.errors) {
        return setErrors(setErrMsgs(data.errors));
      }

      if (!res.ok && !data.errors) {
        return setErrors(data);
      }

      setToken(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div id='login'>
      {token && <Redirect to='/dashboard' />}
      <form onSubmit={handleSignIn}>
        <div id='email-container'>
          <input
            id='email'
            type='text'
            name='email'
            placeholder='Email'
            value={input.email}
            onChange={handleInput}
          />
          {errors && errors.email &&
            <p>{errors.email}</p>
          }
        </div>
        <div id='pwd-container'>
          <input
            id='password'
            type='password'
            name='password'
            placeholder='Password'
            value={input.password}
            onChange={handleInput}
          />
          {errors && errors.password &&
            <p>{errors.password}</p>
          }
        </div>
        <div>
          <input
            type='submit'
            value='Sign in'
          />
        </div>
      </form>
      <a href='http://localhost:5000/api/auth/google'>Google Sign in</a>
      <p>Don't have an account?</p>
      <Link to='/signup'>Create an account</Link>
    </div>
  )
}

export default Login;