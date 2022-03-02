import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import decodeToken from "../../utils/decodeToken";

const Menu = ({ numOfFriendReqs, numOfNewDMs }) => {
  const { token, setToken } = useContext(UserContext);

  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    token && setUsername(decodeToken(token).username);
  }, [token]);

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

      if (token && isVisible && ![icon, menu, ...menu.children].includes(e.target)) {
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
        <Link to='/home' className='font-light text-sm hover:text-gray-500'>Home</Link>
        <Link to={{ pathname: '/chat', state: { action: 'listen' } }} className='font-light text-sm hover:text-gray-500'>Listen</Link>
        <Link to={{ pathname: '/chat', state: { action: 'talk' } }} className='font-light text-sm hover:text-gray-500'>Talk</Link>
        <Link to='/forum' className='font-light text-sm hover:text-gray-500'>Forum</Link>
      </div>
      <button
        id='user-icon'
        className='h-7 w-7 bg-gray-50 hover:bg-gray-200 font-medium flex items-center justify-center rounded-full'
        onClick={toggleVisibility}
      >
        {username && username[0].toUpperCase()}
      </button>
      <div
        id='user-menu'
        className='hidden absolute top-11 right-4 h-52 flex flex-col justify-between bg-gray-50 p-6 border rounded-md shadow-lg'
      >
        <div className='flex flex-col space-y-2'>
          <Link to='/profile' className='font-light text-sm hover:text-gray-500 w-max'>
            Profile
          </Link>
          <div className='flex items-center relative w-max'>
            <Link to='/friends' className='font-light text-sm hover:text-gray-500'>
              Friends
            </Link>
            {numOfFriendReqs > 0 &&
                <span
                  title='num of friend requests'
                  className='flex justify-center items-center rounded-full bg-gray-400 absolute -right-6 h-5 w-5 text-xs font-medium text-white'
                >
                  {numOfFriendReqs}
                </span>
              }
          </div>
          <div className='flex items-center relative w-max'>
            <Link to='/messages' className='font-light text-sm hover:text-gray-500'>
              Messages
            </Link>
            {numOfNewDMs > 0 &&
                <span
                  title='num of new messages'
                  className='flex justify-center items-center rounded-full bg-gray-400 absolute -right-6 h-5 w-5 text-xs font-medium text-white'
                >
                  {numOfNewDMs}
                </span>
              }
          </div>
          <Link to='/forum-activity' className='font-light hover:text-gray-500 text-sm w-max'>
            Forum Activity
          </Link>
        </div>
        <button className='font-light text-sm hover:text-gray-500 w-max' onClick={() => setToken('')}>
          Sign out
        </button>
      </div>
    </div>
  )
}

export default Menu;