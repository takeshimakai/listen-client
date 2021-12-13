import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import decodeToken from "../../utils/decodeToken";

const Menu = () => {
  const { token, setToken } = useContext(UserContext);
  const { username } = decodeToken(token);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const menu = document.querySelector('#user-menu');

    isVisible
      ? menu.classList.remove('hidden')
      : menu.classList.add('hidden')
  }, [isVisible]);

  useEffect(() => {
    const closeOutside = (e) => {
      const icon = document.querySelector('#user-icon');
      const menu = document.querySelector('#user-menu');

      if (isVisible && ![icon, menu, ...menu.children].includes(e.target)) {
        setIsVisible(false);
      }
    };

    window.addEventListener('click', closeOutside);
    return () => window.removeEventListener('click', closeOutside);
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className='flex space-x-8'>
      <div className='flex items-center space-x-8'>
        <Link to='/dashboard' className='font-light text-sm'>Dashboard</Link>
        <Link to='/listen' className='font-light text-sm'>Listen</Link>
        <Link to='/talk' className='font-light text-sm'>Talk</Link>
        <Link to='/forum' className='font-light text-sm'>Forum</Link>
      </div>
      <button
        id='user-icon'
        className='h-7 w-7 bg-white hover:bg-gray-200 font-medium flex items-center justify-center rounded-full'
        onClick={toggleVisibility}
      >
        {username[0].toUpperCase()}
      </button>
      <div
        id='user-menu'
        className='hidden absolute top-11 right-4 h-48 flex flex-col justify-between bg-white p-6 rounded-md shadow-lg'
      >
        <div className='flex flex-col space-y-2'>
          <Link to='/dashboard/profile' className='font-light text-sm w-max'>
            Profile
          </Link>
          <Link to='/dashboard/friends' className='font-light text-sm w-max'>
            Friends
          </Link>
          <Link to='/dashboard/forum-activity' className='font-light text-sm w-max'>
            Forum Activity
          </Link>
        </div>
        <button className='font-light text-sm w-max' onClick={() => setToken('')}>
          Sign out
        </button>
      </div>
    </div>
  )
}

export default Menu;