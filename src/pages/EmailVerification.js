import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import postData from '../utils/postData';
import decodeToken from '../utils/decodeToken';

const EmailVerification = () => {
  const { token, setToken } = useContext(UserContext);

  const [input, setInput] = useState(['','','','','','']);
  const [error, setError] = useState();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (token) {
      decodeToken(token).verified && setRedirect(true);
    }
  }, [token]);

  const handleChange = (e) => {
    const { index } = e.target.dataset;
    let { value } = e.target;

    if (value.length > 1) {
      return;
    }

    setInput(prev => {
      const updated = [...prev];
      updated.splice(index, 1, value);
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const code = input.join().replace(/,/g, '');
      
      if (code.length !== 6) {
        return setError('Verification code must contain six digits.');
      }

      const res = await postData('/auth/verify', { code }, token);
      const data = await res.json();

      if (!res.ok) {
        return setError(data.msg);
      }
      
      setToken(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!token && <Redirect to='/login' />}
      {redirect && <Redirect to='/dashboard' />}
      <form id='verification-form' onSubmit={handleSubmit}>
        <label>Please enter your six digit code: </label>
        <div id='code-inputs'>
          {input.map((el, i) => (
            <input
              key={i}
              type='number'
              data-index={i}
              value={el}
              max='9'
              min='0'
              onChange={handleChange}
            />
          ))}
          {error && <p>{error}</p>}
          <input type='submit' value='Verify' />
        </div>
      </form>
    </div>
  )
}

export default EmailVerification;