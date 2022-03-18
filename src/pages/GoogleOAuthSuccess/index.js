import { useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';

import UserContext from "../../contexts/UserContext";

import updateTokens from '../../utils/updateTokens';
import postData from '../../utils/postData';

const GoogleOAuthSuccess = () => {
  const history = useHistory();
  const { setToken } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const token = new URLSearchParams(window.location.search).get('token');

        const res = await postData('/auth/google/success', undefined, token);
        
        if (!res.ok) throw res;

        const tokens = await res.json();

        updateTokens(tokens.token, tokens.refreshToken, setToken);
        history.replace('/home');
      } catch (err) {
        history.replace('/');
      }
    })();
  }, [setToken, history]);

  return (
    <div className='w-screen flex-grow bg-gray-50 flex justify-center items-center'>
      <p className='bg-gray-50 py-8 px-14 border rounded-lg shadow-xl font-light'>Redirecting...</p>
    </div>
  )
}

export default GoogleOAuthSuccess;