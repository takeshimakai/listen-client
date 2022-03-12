import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import postData from '../../utils/postData';
import updateTokens from '../../utils/updateTokens';
import getNewTokensIfExpired from '../../utils/getNewTokensIfExpired';
import clearTokens from '../../utils/clearTokens';
import decodeToken from '../../utils/decodeToken';

const VerifyForm = () => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);

  const [input, setInput] = useState(['','','','']);
  const [error, setError] = useState();

  useEffect(() => {
    const numInputs = document.querySelectorAll('.num-input');

    const autoFocus = (e) => {
      if (e.key !== ' ' && [...Array(10).keys()].includes(Number(e.key))) {
        e.target.nextElementSibling.focus();
      }
    };

    numInputs.forEach(input => {
      input.addEventListener('keyup', autoFocus);
    });

    return () => {
      numInputs.forEach(input => input.removeEventListener('keyup', autoFocus));
    }
  }, []);

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

      const newTokens = await getNewTokensIfExpired(token);

      const code = input.join().replace(/,/g, '');
      
      if (code.length !== 4) {
        return setError('Verification code must contain four digits.');
      }

      const res = await postData('/auth/verify', { code }, newTokens ? newTokens.token : token);

      if (!res.ok) throw res;

      const data = await res.json();
      
      updateTokens(data.token, data.refreshToken, setToken);
    } catch (err) {
      if (err.status === 401) {
        clearTokens(setToken, decodeToken(token).id);
        return history.replace('/unauthorized');
      }

      if (err.status === 400) {
        const { msg } = await err.json();
        return setError(msg);
      }

      console.log(err);
    }
  };

  return (
    <form className='max-w-2xs mx-auto lg:mx-0' onSubmit={handleSubmit}>
      <p className='font-light sm:text-sm mb-12 text-center'>
        An email has been sent with a four digit verification code. Please enter it below.
      </p>
      <div className='w-full text-center mb-1'>
        {input.map((el, i) => (
          <input
            className='num-input border border-gray-400 rounded-md text-gray-900 text-xl text-center h-12 w-10 mx-1'
            key={i}
            type='number'
            data-index={i}
            value={el}
            max='9'
            min='0'
            onChange={handleChange}
          />
        ))}
        <p className='error-msg'>{error && error}</p>
      </div>
      <button className='shadow-md max-w-2xs w-full h-8 rounded-md cursor-pointer bg-green-700 text-sm text-white hover:bg-green-800 active:shadow-inner-2'>
        Verify
      </button>
    </form>
  )
}

export default VerifyForm;