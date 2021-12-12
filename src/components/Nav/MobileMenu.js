import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

const MobileMenu = () => {
  const { setToken } = useContext(UserContext);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const closeOutside = (e) => {
      const menu = document.querySelector('#mobile-menu');
      const icon = document.querySelector('#mobile-menu-icon');
      const logo = document.querySelector('#logo');
  
      if (isVisible && ![menu, icon, logo, ...menu.children].includes(e.target)) {
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
        className='hidden w-full absolute flex flex-col items-center bg-white left-0 top-0 pt-16 pb-10 space-y-10'
      >
        <div id='mobile-app-menu' className='flex flex-col items-center space-y-2'>
          <Link to='/dashboard' className='font-light'>Dashboard</Link>
          <Link to='/listen' className='font-light'>Listen</Link>
          <Link to='/talk' className='font-light'>Talk</Link>
          <Link to='/forum' className='font-light'>Forum</Link>
        </div>
        <div id='mobile-user-menu' className='space-y-2 flex flex-col items-center'>
          <Link to='/dashboard/profile' className='font-light'>
            Profile
          </Link>
          <Link to='/dashboard/friends' className='font-light'>
            Friends
          </Link>
          <Link to='/dashboard/forum-activity' className='font-light'>
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