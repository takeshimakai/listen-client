import { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';

import UserContext from '../../contexts/UserContext';

import Listen from './Listen';
import Talk from './Talk';
import BlockModal from './BlockModal';
import AwaitMatchModal from './AwaitMatchModal';
import OtherUser from './OtherUser';
import Messages from './Messages';
import Input from './Input';
import MobileOptions from './MobileOptions';
import Options from './Options';
import Profile from './Profile';

import decodeToken from '../../utils/decodeToken';
import formatDate from '../../utils/formatDate';

const Chat = ({ location }) => {
  const history = useHistory();
  const { action } = location.state;
  const { token } = useContext(UserContext);
  const { id, username } = decodeToken(token);

  const [socket, setSocket] = useState();
  const [connected, setConnected] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [awaitMatch, setAwaitMatch] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [otherUserLeft, setOtherUserLeft] = useState(false);
  const [otherUser, setOtherUser] = useState({
    userID: '',
    img: '',
    username: '',
    dob: '',
    gender: '',
    interests: [],
    problemTopics: [],
    isConnected: false
  });

  const unblock = useRef();
  const [preventNav, setPreventNav] = useState(false);
  const [path, setPath] = useState();

  useEffect(() => {
    const socketio = io('http://localhost:5000', { autoConnect: false });
    setSocket(socketio);
    return () => socketio.disconnect();
  }, []);

  useEffect(() => {
    if (connected) {
      unblock.current = history.block(({ pathname, state }) => {
        setPath({ pathname, state });
        setPreventNav(true);
        return false;
      });

      return () => unblock.current();
    }
  }, [connected, history]);

  useEffect(() => {
    if (socket) {
      const roomID = sessionStorage.getItem('roomID');
      
      if (roomID) {
        socket.auth = { userID: id, username, roomID };
        socket.connect();
        setConnected(true);
      }
    }
  }, [socket, id, username]);

  useEffect(() => {
    if (socket) {
      socket.on('reconnect', ({ msgs, otherUser }) => {
        setMsgs(msgs);
        setOtherUser({
          userID: otherUser.userID,
          img: otherUser.img || '',
          username: otherUser.username,
          dob: otherUser.dob ? formatDate(otherUser.dob) : '',
          gender: otherUser.gender || '',
          interests: otherUser.interests || [],
          problemTopics: otherUser.problemTopics || [],
          isConnected: otherUser.isConnected
        });
      });

      socket.on('otherUser disconnected', () => {
        setOtherUser(prev => ({ ...prev, isConnected: false }));
      });

      socket.on('otherUser reconnected', () => {
        setOtherUser(prev => ({ ...prev, isConnected: true }));
      });

      socket.on('match found', ({ roomID, listener, talker }) => {
        if (action === 'listen') {
          setOtherUser({
            userID: talker.userID,
            img: talker.img || '',
            username: talker.username,
            dob: talker.dob ? formatDate(talker.dob) : '',
            gender: talker.gender || '',
            interests: talker.interests || [],
            problemTopics: talker.problemTopics || [],
            isConnected: talker.isConnected
          });
          socket.emit('listener setup', { roomID, talker });
        }

        if (action === 'talk') {
          setOtherUser({
            userID: listener.userID,
            img: listener.img || '',
            username: listener.username,
            dob: listener.dob ? formatDate(otherUser.dob) : '',
            gender: listener.gender || '',
            interests: listener.interests || [],
            problemTopics: listener.problemTopics || [],
            isConnected: listener.isConnected
          });
        }

        setAwaitMatch(false);
        sessionStorage.setItem('roomID', roomID);
      });

      socket.on('new msg', (msg) => {
        setMsgs(prev => [...prev, { msg, from: otherUser.userID }]);
      });

      socket.on('user left', () => setOtherUserLeft(true));

      return () => {
        socket.off('reconnect');
        socket.off('otherUser disconnected');
        socket.off('otherUser reconnected');
        socket.off('match found');
        socket.off('new msg');
        socket.off('user left');
      }
    }
  }, [socket, otherUser, action]);

  const initiate = (role, filters) => {
    setAwaitMatch(true);
    setConnected(true);
    socket.auth = { userID: id, username };
    socket.connect();
    socket.emit('initiate', { role, filters });
  };

  const toggleView = () => setViewProfile(!viewProfile);

  const leaveConversation = () => history.push('/dashboard');

  return (
    <div className='h-screen pt-16'>
      {awaitMatch &&
        <AwaitMatchModal action={action} setAwaitMatch={setAwaitMatch} setConnected={setConnected} socket={socket} />
      }
      {preventNav &&
        <BlockModal unblock={unblock} path={path} setPreventNav={setPreventNav} socket={socket} />
      }
      {connected &&
        <div className='relative h-full px-4 pb-4 flex flex-col sm:flex-row'>
          <div className='relative sm:flex-grow sm:max-w-sm sm:flex sm:flex-col sm:justify-between sm:items-center'>
            <OtherUser otherUser={otherUser} toggleView={toggleView} />
            <Options leaveConversation={leaveConversation} />
            <MobileOptions leaveConversation={leaveConversation} />
          </div>
          <div className='flex-grow flex flex-col min-h-0'>
            <Messages msgs={msgs} id={id} otherUser={otherUser} otherUserLeft={otherUserLeft} />
            <Input socket={socket} setMsgs={setMsgs} id={id} otherUserLeft={otherUserLeft} />
          </div>
          {viewProfile && <Profile profile={otherUser} toggleView={toggleView} socket={socket} />}
        </div>
      }
      {!connected && action === 'listen' &&
        <Listen action={action} initiate={initiate} />
      }
      {!connected && action === 'talk' &&
        <Talk action={action} initiate={initiate} />
      }
    </div>
  )
}

export default Chat;