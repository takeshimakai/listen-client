import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

const MobileMenu = ({ numOfFriendReqs, numOfNewDMs }) => {
  const { token, setToken } = useContext(UserContext);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const closeOutside = (e) => {
      const menu = document.querySelector('#mobile-menu');
      const icon = document.querySelector('#mobile-menu-icon');
      const logo = document.querySelector('#logo');
  
      if (token && isVisible && ![menu, icon, logo, ...menu.children].includes(e.target)) {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('click', closeOutside);
    return () => window.removeEventListener('click', closeOutside);
  });

  useEffect(() => {
    const menu = document.querySelector('#mobile-menu');

    isVisible
      ? menu.classList.remove('hidden')
      : menu.classList.add('hidden')
  }, [isVisible]);

  const toggleMenu = () => setIsVisible(!isVisible);

  return (
    <>
      <button id='mobile-menu-icon' className='z-10 text-xl text-gray-600' onClick={toggleMenu}>
        {isVisible ? <span>&#x2715;</span> : <span>&#9776;</span>}
      </button>
      <div
        id='mobile-menu'
        className='hidden w-full absolute flex flex-col items-center bg-gray-50 left-0 top-0 pt-16 pb-10 space-y-10 shadow-lg'
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
        <button className='font-light' onClick={() => setToken('')}>
          Sign out
        </button>
      </div>
    </>
  )
}

export default MobileMenu;