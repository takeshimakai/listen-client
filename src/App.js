import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from "react";

import UserContext from './contexts/UserContext';

import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import GoogleOAuthSuccess from './pages/GoogleOAuthSuccess';
import Forum from './pages/Forum';
import Profile from './pages/Profile';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AccountSetUp from './pages/AccountSetUp';

const App = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);

  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={{ token, setToken }}>
          <Switch>
            <ProtectedRoute path='/users/:userId' component={Profile} />
            <ProtectedRoute path='/forum' component={Forum} />
            <ProtectedRoute path='/dashboard' component={Dashboard} />
            <Route path='/account-setup' component={AccountSetUp} />
            <Route path='/auth/google/success' component={GoogleOAuthSuccess} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
