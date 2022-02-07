import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

import UserContext from './contexts/UserContext';
import SocketContext from './contexts/SocketContext';

import decodeToken from './utils/decodeToken';

import ProtectedRoute from './components/ProtectedRoute';
import Nav from './components/Nav';

import GoogleOAuthSuccess from './pages/GoogleOAuthSuccess';
import Forum from './pages/Forum';
import Profile from './pages/User/Profile';
import Dashboard from './pages/Dashboard';
import AccountSetUp from './pages/AccountSetUp';
import Home from './pages/Home';
import EmailVerification from './pages/EmailVerification';
import Friends from './pages/Friends';
import ForumActivity from './pages/ForumActivity';
import Chat from './pages/Chat';

const App = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));
  const [emailVerified, setEmailVerified] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const socket = useRef(io('http://localhost:5000', { autoConnect: false }));
  const user = useRef();

  useEffect(() => {
    if (token) {
      user.current = decodeToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (initialized) {
      const { id, username } = user.current;
      socket.current.auth = { userID: id, username };
      socket.current.connect();
      return () => socket.current.disconnect();
    }
  }, [initialized, token]);

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));

    if (token) {
      const { verified, username } = decodeToken(token);
      verified && setEmailVerified(true);
      verified && username && setInitialized(true);
    } else {
      setEmailVerified(false);
      setInitialized(false);
    }
  }, [token]);

  useEffect(() => {
    if (emailVerified) {
      document.body.classList.add('bg-gray-50');
    } else {
      document.body.classList.remove('bg-gray-50');
    }
  }, [emailVerified]);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <SocketContext.Provider value={socket.current}>
        <BrowserRouter>
          {initialized && <Nav />}
          <Switch>
            <ProtectedRoute path='/chat' component={Chat} />
            <ProtectedRoute path='/users/:userId' component={Profile} />
            <ProtectedRoute path='/forum' component={Forum} />
            <ProtectedRoute path='/forum-activity' component={ForumActivity} />
            <ProtectedRoute path='/friends' component={Friends} />
            <ProtectedRoute path='/profile' component={Profile} />
            <ProtectedRoute path='/dashboard' component={Dashboard} />
            <Route path='/verify' component={EmailVerification} />
            <Route path='/account-setup' component={AccountSetUp} />
            <Route path='/auth/google/success' component={GoogleOAuthSuccess} />
            <Route path='/' component={Home} />
          </Switch>
        </BrowserRouter>
      </SocketContext.Provider>
    </UserContext.Provider>

  );
}

export default App;
