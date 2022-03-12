import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import UserContext from './contexts/UserContext';
import SocketContext from './contexts/SocketContext';

import decodeToken from './utils/decodeToken';
import getNewTokensIfExpired from './utils/getNewTokensIfExpired';
import updateTokens from './utils/updateTokens';
import clearTokens from './utils/clearTokens';

import ProtectedRoute from './components/ProtectedRoute';
import Nav from './components/Nav';

import GoogleOAuthSuccess from './pages/GoogleOAuthSuccess';
import Forum from './pages/Forum';
import Profile from './pages/User/Profile';
import Home from './pages/Home';
import AccountSetUp from './pages/AccountSetUp';
import Main from './pages/Main';
import EmailVerification from './pages/EmailVerification';
import Friends from './pages/Friends';
import ForumActivity from './pages/ForumActivity';
import Chat from './pages/Chat';
import DirectMsgs from './pages/DirectMsgs';
import Unauthorized from './pages/Unauthorized';

const App = () => {
  const history = useHistory();

  const [token, setToken] = useState(JSON.parse(localStorage.getItem('listenToken')));
  const [emailVerified, setEmailVerified] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [socket, setSocket] = useState(io('', { autoConnect: false }));

  useEffect(() => {
    const connectErrorHandler = async () => {
      try {
        const newTokens = await getNewTokensIfExpired(token);

        if (newTokens) {
          return updateTokens(newTokens.token, newTokens.refreshToken, setToken);
        }
      } catch (err) {
        if (err.status === 401) {
          clearTokens(setToken, decodeToken(token).id);
          window.location.replace(`${process.env.REACT_APP_SITE_URL}/unauthorized`);
        }
      }
    };

    socket.on('connect_error', connectErrorHandler);

    return () => socket.off('connect_error', connectErrorHandler);
  }, [socket, token, history]);

  useEffect(() => {
    if (token) {
      const { verified, username } = decodeToken(token);
      
      if (verified) {
        setEmailVerified(true);
      }
      
      if (verified && username) {
        const newSocket = io(process.env.REACT_APP_SERVER_URL, {
          auth: { token },
          reconnectionAttempts: 10
        });

        setSocket(newSocket);
        setInitialized(true);

        return () => newSocket.disconnect();
      };
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
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          {token && initialized && <Nav />}
          <Switch>
            <ProtectedRoute path='/chat' component={Chat} />
            <ProtectedRoute path='/users/:userId' component={Profile} />
            <ProtectedRoute path='/forum' component={Forum} />
            <ProtectedRoute path='/forum-activity' component={ForumActivity} />
            <ProtectedRoute path='/friends' component={Friends} />
            <ProtectedRoute path='/profile' component={Profile} />
            <ProtectedRoute path='/home' component={Home} />
            <ProtectedRoute path='/messages' component={DirectMsgs} />
            <Route path='/verify' component={EmailVerification} />
            <Route path='/account-setup' component={AccountSetUp} />
            <Route path='/auth/google/success' component={GoogleOAuthSuccess} />
            <Route path='/unauthorized' component={Unauthorized} />
            <Route path='/' component={Main} />
          </Switch>
        </BrowserRouter>
      </SocketContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
