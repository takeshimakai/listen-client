import { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';

import SocketContext from "../../contexts/SocketContext";
import UserContext from "../../contexts/UserContext";

import useWindowWidth from '../../hooks/useWindowWidth';

import MobileMenu from "./MobileMenu";
import Menu from "./Menu";

import decodeToken from "../../utils/decodeToken";

const Nav = () => {
  const socket = useContext(SocketContext);
  const { token } = useContext(UserContext);
  const { id } = decodeToken(token);

  const windowWidth = useWindowWidth();
  const [numOfFriendReqs, setNumOfFriendReqs] = useState(0);
  const [numOfNewDMs, setNumOfNewDMs] = useState(0);
  const [alert, setAlert] = useState();

  useEffect(() => {
    socket.emit('get unread dm count');
    socket.emit('get friends', 'received');

    const setUnreadCount = (count) => setNumOfNewDMs(count);

    const newDMHandler = (data) => {
      const { msgs } = data;

      const from = msgs[msgs.length - 1].from.profile.username;

      setNumOfNewDMs(prev => prev + 1);
      setAlert(`New message from ${from}`);
      setTimeout(() => setAlert(), 4000);
    };

    const markedAsRead = () => setNumOfNewDMs(prev => prev - 1);

    const requestReceived = (data) => {
      const { username } = data;

      setNumOfFriendReqs(prev => prev + 1);
      setAlert(`Friend request from ${username}`);
      setTimeout(() => setAlert(), 4000);
    };

    const requestCanceled = () => setNumOfFriendReqs(prev => prev - 1);

    const requestDeclined = ({ declinedBy }) => {
      if (id === declinedBy) {
        setNumOfFriendReqs(prev => prev - 1);
      }
    };

    const requestAccepted = ({ acceptedBy }) => {
      if (id === acceptedBy) {
        setNumOfFriendReqs(prev => prev - 1);
      }
    };

    const receivedFriendsHandler = (data) => setNumOfFriendReqs(data.length);

    socket.on('received friends', receivedFriendsHandler);
    socket.on('unread dm count', setUnreadCount);
    socket.on('new dm', newDMHandler);
    socket.on('marked as read', markedAsRead);
    socket.on('request received', requestReceived);
    socket.on('request canceled', requestCanceled);
    socket.on('request declined', requestDeclined);
    socket.on('request accepted', requestAccepted);

    return () => {
      socket.off('received friends', receivedFriendsHandler);
      socket.off('unread dm count', setUnreadCount);
      socket.off('new dm', newDMHandler);
      socket.off('marked as read', markedAsRead);
      socket.off('request received', requestReceived);
      socket.off('request canceled', requestCanceled);
      socket.off('request declined', requestDeclined);
      socket.off('request accepted', requestAccepted);
    };
  }, [socket, id]);

  return (
    <div className='z-10 fixed w-full h-12 flex items-center justify-between py-2 px-4 bg-gray-50'>
      <Link to='/home'>
        <h1 id='logo' className='relative text-gray-800 font-serif text-2xl z-10'>listen</h1>
      </Link>
      {windowWidth < 640
        ? <MobileMenu numOfFriendReqs={numOfFriendReqs} numOfNewDMs={numOfNewDMs} />
        : <Menu numOfFriendReqs={numOfFriendReqs} numOfNewDMs={numOfNewDMs} />
      }
      {alert &&
        <p className='absolute top-2 inset-x-0 mx-auto w-max bg-gray-50 p-5 border rounded-lg shadow-md text-xs'>
          {alert}
        </p>
      }
    </div>
  )
}

export default Nav;