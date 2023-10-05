import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import clearTokens from '../../utils/clearTokens';
import decodeToken from '../../utils/decodeToken';

import menuIcon from "../../assets/menu.svg";
import closeIcon from "../../assets/close.svg";

const MobileMenu = ({ numOfFriendReqs, numOfNewDMs }) => {
  const { token, setToken } = useContext(UserContext);
  const { id } = decodeToken(token);

  const [isVisible, setIsVisible] = useState(false);

  const mobileMenu = useRef(null);
  const menuBtn = useRef(null);

  useEffect(() => {
    const closeOutside = (e) => {
      if (
        token
        && isVisible
        && ![
          mobileMenu.current,
          menuBtn.current,
          ...mobileMenu.current.children
        ].includes(e.target)
      ) {
        setIsVisible(false);
      }
    };

    window.addEventListener('click', closeOutside);
    return () => window.removeEventListener('click', closeOutside);
  }, [token, isVisible]);

  const toggleMenu = () => setIsVisible(!isVisible);

  return (
    <>
      <button
        className='z-10 text-xl text-gray-600'
        onClick={toggleMenu}
      >
        {isVisible
          ? <img src={closeIcon} />
          : <img src={menuIcon} />
        }
      </button>
      <div
        ref={mobileMenu}
        className={`
          ${isVisible ? "right-0" : "-right-full"}
          w-full
          h-full
          fixed
          flex
          flex-col
          justify-center
          items-center
          bg-gray-50
          top-0
          space-y-12
          transition-[right]
          duration-500
        `}
      >
        <div id='mobile-app-menu' className='flex flex-col items-center space-y-2'>
          <Link to={{ pathname: '/chat', state: { action: 'listen' } }} className='font-light'>Listen</Link>
          <Link to={{ pathname: '/chat', state: { action: 'talk' } }} className='font-light'>Talk</Link>
          <Link to='/forum' className='font-light'>Forum</Link>
        </div>
        <div id='mobile-user-menu' className='space-y-2 flex flex-col items-center'>
          <Link to='/profile' className='font-light'>
            Profile
          </Link>
          <div className='relative flex items-center'>
            <Link to='/friends' className='font-light'>Friends</Link>
            {numOfFriendReqs > 0 &&
                <span
                  title='num of friend requests'
                  className='flex items-center justify-center rounded-full bg-gray-400 absolute -right-6 h-5 w-5 text-xs font-medium text-white'
                >
                  {numOfFriendReqs}
                </span>
              }
          </div>
          <div className='relative flex items-center'>
            <Link to='/messages' className='font-light'>Messages </Link>
            {numOfNewDMs > 0 &&
                <span
                  title='num of new messages'
                  className='flex items-center justify-center rounded-full bg-gray-400 absolute -right-6 h-5 w-5 text-xs font-medium text-white'
                >
                  {numOfNewDMs}
                </span>
              }
          </div>
          <Link to='/forum-activity' className='font-light'>
            Forum Activity
          </Link>
        </div>
        <button className='font-light' onClick={() => clearTokens(setToken, id)}>
          Sign out
        </button>
      </div>
    </>
  )
}

export default MobileMenu;
