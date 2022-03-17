import { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import SocketContext from '../../contexts/SocketContext';

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

import formatDateForInput from '../../utils/formatDateForInput';

const Chat = ({ location }) => {
  const history = useHistory();
  const socket = useContext(SocketContext);
  const action = location.state ? location.state.action : 'listen';

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
    const roomID = sessionStorage.getItem('roomID');
    
    if (roomID) {
      setConnected(true);
      socket.emit('reconnect', roomID);
    }
  }, [socket]);

  useEffect(() => {
    const reconnectHandler = ({ msgs, otherUser }) => {
      setMsgs(msgs);
      setOtherUser({
        userID: otherUser.userID,
        img: otherUser.img || '',
        username: otherUser.username,
        dob: otherUser.dob ? formatDateForInput(otherUser.dob) : '',
        gender: otherUser.gender || '',
        interests: otherUser.interests || [],
        problemTopics: otherUser.problemTopics || [],
        isConnected: otherUser.isConnected
      });
    };

    const otherUserDisconnectedHandler = () => {
      setOtherUser(prev => ({ ...prev, isConnected: false }));
    };

    const otherUserReconnectedHandler = () => {
      setOtherUser(prev => ({ ...prev, isConnected: true }));
    };

    const matchFoundHandler = ({ roomID, otherUser }) => {
      setOtherUser({
        userID: otherUser.userID,
        img: otherUser.img || '',
        username: otherUser.username,
        dob: otherUser.dob ? formatDateForInput(otherUser.dob) : '',
        gender: otherUser.gender || '',
        interests: otherUser.interests || [],
        problemTopics: otherUser.problemTopics || [],
        isConnected: otherUser.isConnected
      });

      if (action === 'listen') {
        socket.emit('listener setup', { roomID, otherUserID: otherUser.userID });
      }

      setAwaitMatch(false);
      sessionStorage.setItem('roomID', roomID);
    };

    const newMsgHandler = (msg) => {
      setMsgs(prev => [...prev, { msg, from: otherUser.userID }]);
    };

    const userLeftHandler = () => {
      setOtherUser(prev => ({ ...prev, isConnected: false }));
      setOtherUserLeft(true);
    };

    socket.on('reconnect', reconnectHandler);
    socket.on('otherUser disconnected', otherUserDisconnectedHandler);
    socket.on('otherUser reconnected', otherUserReconnectedHandler);
    socket.on('match found', matchFoundHandler);
    socket.on('new msg', newMsgHandler);
    socket.on('user left', userLeftHandler);

    return () => {
      socket.off('reconnect', reconnectHandler);
      socket.off('otherUser disconnected', otherUserDisconnectedHandler);
      socket.off('otherUser reconnected', otherUserReconnectedHandler);
      socket.off('match found', matchFoundHandler);
      socket.off('new msg', newMsgHandler);
      socket.off('user left', userLeftHandler);
    }
  }, [socket, otherUser, action]);

  const initialize = (role, filters) => {
    setAwaitMatch(true);
    setConnected(true);
    socket.emit('initialize', { role, filters });
  };

  const toggleView = () => setViewProfile(!viewProfile);

  const leaveConversation = () => history.push('/home');

  return (
    <div className='h-full pt-16'>
      {awaitMatch &&
        <AwaitMatchModal action={action} setAwaitMatch={setAwaitMatch} setConnected={setConnected} />
      }
      {preventNav &&
        <BlockModal unblock={unblock} path={path} setPreventNav={setPreventNav} />
      }
      {connected &&
        <div className='relative h-full px-4 pb-4 flex flex-col sm:flex-row'>
          <div className='relative sm:flex-grow sm:max-w-sm sm:flex sm:flex-col sm:justify-between sm:items-center'>
            <OtherUser otherUser={otherUser} toggleView={toggleView} />
            <Options leaveConversation={leaveConversation} />
            <MobileOptions leaveConversation={leaveConversation} />
          </div>
          <div className='flex-grow flex flex-col overflow-auto'>
            <Messages msgs={msgs} otherUser={otherUser} otherUserLeft={otherUserLeft} />
            <Input setMsgs={setMsgs} otherUserLeft={otherUserLeft} />
          </div>
          {viewProfile && <Profile profile={otherUser} toggleView={toggleView} />}
        </div>
      }
      {!connected && action === 'listen' &&
        <Listen action={action} initialize={initialize} />
      }
      {!connected && action === 'talk' &&
        <Talk action={action} initialize={initialize} />
      }
    </div>
  )
}

export default Chat;