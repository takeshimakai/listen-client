import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import decodeToken from '../../utils/decodeToken';
import postData from '../../utils/postData';
import clearTokens from '../../utils/clearTokens';
import getNewTokensIfExpired from '../../utils/getNewTokensIfExpired';
import updateTokens from '../../utils/updateTokens';

import VerifyForm from './VerifyForm';

const EmailVerification = () => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);

  const [codeSentTo, setCodeSentTo] = useState('');

  useEffect(() => {
    if (token) {
      decodeToken(token).verified && history.replace('/home');
    } else {
      history.replace('/')
    }
  }, [token, history]);

  const resendCode = async () => {
    try {
      const newTokens = await getNewTokensIfExpired(token);

      if (newTokens) {
        updateTokens(newTokens.token, newTokens.refreshToken, setToken);
      }
      
      const res = await postData('/auth/resend-code', undefined, newTokens ? newTokens.token : token);

      if (!res.ok) throw res;

      if (res.ok) {
        const { email } = await res.json();
        setCodeSentTo(email);
        setTimeout(() => setCodeSentTo(''), 3000);
      }
    } catch (err) {
      if (err.status === 401) {
        clearTokens(setToken, decodeToken(token).id);
        return history.replace('/unauthorized');
      }

      console.log(err);
    }
  };

  return (
    <div className='w-screen flex-grow max-h-screen grid grid-rows-3 lg:flex lg:items-center bg-cover bg-top 2xl:bg-center bg-base'>
      <button className='absolute z-10 right-4 top-2 font-light text-sm' onClick={() => clearTokens(setToken, decodeToken(token).id)}>
        Sign out
      </button>
      <div className='relative flex items-center justify-center lg:justify-end lg:h-auto lg:flex-1 lg:mr-14'>
        <h1 className='text-gray-800 font-serif text-6xl sm:text-8xl'>listen</h1>
      </div>
      <div className='relative px-12 lg:px-0 lg:flex-1 lg:ml-14 mb-12 lg:mb-0'>
        <VerifyForm />
        <p className='max-w-2xs mx-auto lg:mx-0 text-sm mt-6 text-center'>
          Didn't receive it? <span className='text-blue-700 hover:text-blue-900 cursor-pointer' onClick={resendCode}>
            Send it again.
          </span>
        </p>
      </div>
      {codeSentTo &&
        <div className='absolute top-0 p-4 flex justify-center items-center h-full w-full bg-gray-200 bg-opacity-60'>
          <p className='p-10 bg-gray-50 border rounded-lg shadow-md text-center font-light sm:text-sm'>
            A new code has been sent to <span className='text-green-700 font-normal'>{codeSentTo}</span>.
          </p>
        </div>
      }
    </div>
  )
}

export default EmailVerification;