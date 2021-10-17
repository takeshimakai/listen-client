import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import UserContext from './contexts/UserContext';

import Home from './pages/Home';
import GoogleOAuthSuccess from './pages/GoogleOAuthSuccess';

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
