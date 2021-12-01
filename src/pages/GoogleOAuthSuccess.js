import { useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';

import UserContext from "../contexts/UserContext";

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
          return history.replace('/');
        }

        setToken(await res.json());
        history.replace('/dashboard');
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setToken, history]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  )
}

export default GoogleOAuthSuccess;