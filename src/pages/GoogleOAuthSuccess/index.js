import { useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';

import UserContext from "../../contexts/UserContext";

const GoogleOAuthSuccess = () => {
  const history = useHistory();
  const { setToken } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/google/success`, {
          method: 'GET',
          credentials: 'include'
        });
        
        if (!res.ok) {
          throw new Error();
        }

        setToken(await res.json());
        history.replace('/home');
      } catch (err) {
        history.replace('/');
      }
    })();
  }, [setToken, history]);

  return (
    <div className='w-screen h-screen bg-gray-50 flex justify-center items-center'>
      <p className='bg-gray-50 py-8 px-14 border rounded-lg shadow-xl font-light'>Redirecting...</p>
    </div>
  )
}

export default GoogleOAuthSuccess;