import { useState, useContext } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import postData from '../utils/postData';
import setErrMsgs from '../utils/setErrMsgs';

import EmailVerification from './EmailVerification';

const SignUp = () => {
  const match = useRouteMatch();
  const { token, setToken } = useContext(UserContext);

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
      const data = await res.json();

      if (!res.ok) {
        setError(setErrMsgs(data.errors));
        setInput(prev => ({ ...prev, password: '', passwordConfirmation: '' }));
      }

      if (res.ok) {
        setToken(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='signup'>
      {token && <Redirect to={`${match.url}/verify`} />}
      <Switch>
        <Route path={`${match.path}/verify`} component={EmailVerification} />
        <Route path={match.path}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='email'>Email: </label>
              <input
                type='text'
                id='email'
                name='email'
                value={input.email}
                onChange={handleInput}
                required
              />
              {error && error.email && <p className='error'>{error.email}</p>}
            </div>
            <div>
              <label htmlFor='password'>Password: </label>
              <input
                type='password'
                id='password'
                name='password'
                value={input.password}
                onChange={handleInput}
                required
              />
              {error && error.password && <p className='error'>{error.password}</p>}
            </div>
            <div>
              <label htmlFor='password-confirmation'>Password confirmation: </label>
              <input
                type='password'
                id='password-confirmation'
                name='passwordConfirmation'
                value={input.passwordConfirmation}
                onChange={handleInput}
                required
              />
              {error && error.passwordConfirmation && <p className='error'>{error.passwordConfirmation}</p>}
            </div>
            <input type='submit' value='Sign up' />
          </form>
          <a href='http://localhost:5000/api/auth/google'>Sign up with Google</a>
        </Route>
      </Switch>
    </div>
  )
}

export default SignUp;