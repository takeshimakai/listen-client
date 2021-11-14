import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from "react";

import UserContext from './contexts/UserContext';

import Home from './pages/Home';
import GoogleOAuthSuccess from './pages/GoogleOAuthSuccess';
import Forum from './pages/Forum';
import Profile from './pages/Profile';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/Login';

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
            <Route path='/auth/google/success'>
              <GoogleOAuthSuccess />
            </Route>
            <Route path='/users/:userId'>
              <Profile />
            </Route>
            <Route path='/forum'>
              <Forum />
            </Route>
            <Route path='/dashboard'>
              <Dashboard />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
