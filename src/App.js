import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from "react";

import UserContext from './contexts/UserContext';

import ProtectedRoute from './components/ProtectedRoute';
import GoogleOAuthSuccess from './pages/GoogleOAuthSuccess';
import Forum from './pages/Forum';
import Profile from './pages/Profile';
import Dashboard from './pages/dashboard/Dashboard';
import AccountSetUp from './pages/AccountSetUp';
import Home from './pages/Home';
import EmailVerification from './pages/EmailVerification';

const App = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);

  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
          <UserContext.Provider value={{ token, setToken }}>
            <Switch>
              <ProtectedRoute path='/users/:userId' component={Profile} />
              <ProtectedRoute path='/forum' component={Forum} />
              <ProtectedRoute path='/dashboard' component={Dashboard} />
              <Route path='/verify' component={EmailVerification} />
              <Route path='/account-setup' component={AccountSetUp} />
              <Route path='/auth/google/success' component={GoogleOAuthSuccess} />
              <Route path='/' component={Home} />
            </Switch>
          </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
