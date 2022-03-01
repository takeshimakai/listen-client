import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

import UserContext from '../contexts/UserContext';

import decodeToken from '../utils/decodeToken';

const ProtectedRoute = (props) => {
  const { token } = useContext(UserContext);
  const { username, verified } = token ? decodeToken(token) : '';

  if (verified && username) {
    if (props.path === '/chat') {
      return <Route { ...props } key={uuidv4()} />
    }
    return <Route { ...props } />;
  }

  if (verified && !username) {
    return <Redirect to='/account-setup' />
  }

  if (token && !verified) {
    return <Redirect to='/verify' />
  }

  return <Redirect to='/' />
}

export default ProtectedRoute;