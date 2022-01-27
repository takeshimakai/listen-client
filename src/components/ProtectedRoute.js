import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

import UserContext from '../contexts/UserContext';

import decodeToken from '../utils/decodeToken';

const ProtectedRoute = (props) => {
  const { token } = useContext(UserContext);
  const user = token ? decodeToken(token) : '';

  if (user.verified && user.username) {
    if (props.path === '/chat') {
      return <Route { ...props } key={uuidv4()} />
    }
    return <Route { ...props } />;
  }

  if (user.verified && !user.username) {
    return <Redirect to='/account-setup' />
  }

  if (user && !user.verified) {
    return <Redirect to='/verify' />
  }

  return <Redirect to='/' />
}

export default ProtectedRoute;