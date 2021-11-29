import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import decodeToken from '../utils/decodeToken';

const ProtectedRoute = ({ ...props }) => {
  const { token } = useContext(UserContext);
  const user = token ? decodeToken(token) : '';

  if (user.verified && user.username) {
    return <Route { ...props } />;
  }

  if (user.verified && !user.username) {
    return <Redirect to='/account-setup' />
  }

  if (user && !user.verified) {
    return <Redirect to='/verify' />
  }

  if (!user) {
    return <Redirect to='/' />
  }
}

export default ProtectedRoute;