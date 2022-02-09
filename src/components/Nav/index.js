import { useEffect, useState, useContext } from "react";

import SocketContext from "../../contexts/SocketContext";
import UserContext from "../../contexts/UserContext";

import MobileMenu from "./MobileMenu";
import Menu from "./Menu";

import getData from '../../utils/getData';
import decodeToken from "../../utils/decodeToken";

const Nav = () => {
  const socket = useContext(SocketContext);
  const { token } = useContext(UserContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [numOfFriendReqs, setNumOfFriendReqs] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await getData('/friends/received', token);
        const { friends } = await res.json();
        setNumOfFriendReqs(friends.received.length);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token]);

  useEffect(() => {
    const { id } = decodeToken(token);

    socket.on('request received', () => setNumOfFriendReqs(prev => prev + 1));
    
    socket.on('request canceled', () => setNumOfFriendReqs(prev => prev - 1));
    
    socket.on('request declined', ({ declinedBy }) => {
      if (id === declinedBy) {
        setNumOfFriendReqs(prev => prev - 1);
      }
    });

    socket.on('request accepted', ({ acceptedBy }) => {
      if (id === acceptedBy) {
        setNumOfFriendReqs(prev => prev - 1);
      }
    });
    

    return () => {
      socket.off('request received');
      socket.off('request canceled');
      socket.off('request declined');
      socket.off('request accepted');
    };
  }, [socket, token]);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 640);

    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  });

  return (
    <div className='z-10 fixed w-full h-12 flex items-center justify-between py-2 px-4 bg-gray-50'>
      <h1 id='logo' className='logo-sm z-10'>listen</h1>
      {isMobile
        ? <MobileMenu numOfFriendReqs={numOfFriendReqs} />
        : <Menu numOfFriendReqs={numOfFriendReqs} />
      }
    </div>
  )
}

export default Nav;