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

import decodeToken from '../../utils/decodeToken';

const Chat = ({ location }) => {
  const history = useHistory();
  const { action } = location.state;
  const { token } = useContext(UserContext);
  const { id, username } = decodeToken(token);

  const [socket, setSocket] = useState();
  const [connected, setConnected] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [otherUser, setOtherUser] = useState();
  const [awaitMatch, setAwaitMatch] = useState(false);

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
        setOtherUser(otherUser);
      });

      socket.on('otherUser disconnected', () => {
        const msgsContainer = document.querySelector('#msgs-container');
        const p = document.createElement('p');
        const notification = document.createTextNode(`${otherUser.username} disconnected`);
        p.classList.add('text-center', 'italic', 'font-light', 'text-gray-400', 'sm:text-sm');
        p.appendChild(notification);
        msgsContainer.appendChild(p);
      });

      socket.on('otherUser reconnected', () => {
        const msgsContainer = document.querySelector('#msgs-container');
        const p = document.createElement('p');
        const notification = document.createTextNode(`${otherUser.username} reconnected`);
        p.classList.add('text-center', 'italic', 'font-light', 'text-gray-400', 'sm:text-sm');
        p.appendChild(notification);
        msgsContainer.appendChild(p);
      });

      socket.on('match found', ({ roomID, listener, talker }) => {
        if (action === 'listen') {
          setOtherUser(talker);
          socket.emit('listener setup', { roomID, talker });
        }

        if (action === 'talk') {
          setOtherUser(listener);
        }

        setAwaitMatch(false);
        sessionStorage.setItem('roomID', roomID);
      });

      socket.on('new msg', (msg) => {
        setMsgs(prev => [...prev, { msg, from: otherUser.userID }]);
      });

      return () => {
        socket.off('reconnect');
        socket.off('otherUser disconnected');
        socket.off('otherUser reconnected');
        socket.off('match found');
        socket.off('new msg');
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

  return (
    <div className='h-screen pt-16'>
      {awaitMatch && <AwaitMatchModal action={action} setAwaitMatch={setAwaitMatch} setConnected={setConnected} socket={socket} />}
      {preventNav && <BlockModal unblock={unblock} path={path} setPreventNav={setPreventNav} setSocket={setSocket} />}
      {connected &&
        <div className='h-full px-4 pb-4 flex flex-col sm:flex-row'>
          <OtherUser otherUser={otherUser} />
          <div className='flex-grow flex flex-col min-h-0'>
            <Messages msgs={msgs} id={id} />
            <Input socket={socket} setMsgs={setMsgs} id={id} />
          </div>
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