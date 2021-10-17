import { useEffect, useContext } from 'react';

import UserContext from '../contexts/UserContext';

const GoogleOAuthSuccess = () => {
  const { setToken } = useContext(UserContext);

  return (
    <p>Redirecting...</p>
  )
}

export default GoogleOAuthSuccess;