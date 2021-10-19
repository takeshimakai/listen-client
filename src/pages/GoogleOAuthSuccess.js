import { useEffect, useContext } from "react";
import { Redirect } from 'react-router-dom';

import UserContext from "../contexts/UserContext";

const GoogleOAuthSuccess = () => {
  const { token, setToken } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/google/success`, {
          method: 'GET',
          credentials: 'include'
        });
        
        setToken(await res.json());
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div>
      <p>Redirecting...</p>
      {token && <Redirect to='/' />}
    </div>
  )
}

export default GoogleOAuthSuccess;