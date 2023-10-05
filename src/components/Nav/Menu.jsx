import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import decodeToken from "../../utils/decodeToken";
import clearTokens from '../../utils/clearTokens';

const Menu = ({ numOfFriendReqs, numOfNewDMs }) => {
  const { token, setToken } = useContext(UserContext);
  const { id, username } = decodeToken(token);

  const [isVisible, setIsVisible] = useState(false);

  const userMenu = useRef(null);
  const userIcon = useRef(null);

  useEffect(() => {
    const closeOutside = (e) => {
      if (
        token
        && isVisible
        && ![
          userIcon.current,
          userMenu.current,
          ...userMenu.current.children
        ].includes(e.target)
      ) {
        setIsVisible(false);
      }
    };

    window.addEventListener('click', closeOutside);
    return () => window.removeEventListener('click', closeOutside);
  }, [token, isVisible]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className='flex space-x-8'>
      <div className='flex items-center space-x-8'>
        <Link
          to={{ pathname: '/chat', state: { action: 'listen' } }}
          className='font-light text-sm hover:text-gray-500 color-transition'
        >
          Listen
        </Link>
        <Link
          to={{ pathname: '/chat', state: { action: 'talk' } }}
          className='font-light text-sm hover:text-gray-500 color-transition'
        >
          Talk
        </Link>
        <Link
          to='/forum'
          className='font-light text-sm hover:text-gray-500 color-transition'>
          Forum
        </Link>
      </div>
      <button
        ref={userIcon}
        className={`
          ${(numOfFriendReqs > 0 || numOfNewDMs > 0) && 'bg-green-700 text-white'}
          h-7
          w-7
          bg-gray-50
          hover:bg-gray-200
          font-medium
          flex
          items-center
          justify-center
          rounded-full
          color-transition
        `}
        onClick={toggleVisibility}
      >
        {username[0].toUpperCase()}
      </button>
      <div
        ref={userMenu}
        className={`
          ${isVisible ? "flex" : "hidden"}
          absolute
          top-11
          right-6
          flex-col
          space-y-6
          bg-gray-50
          p-6
          border
          rounded-md
          shadow-lg
        `}
      >
        <div className='flex flex-col space-y-2'>
          <Link
            to='/profile'
            className='font-light text-sm hover:text-gray-500 w-max color-transition'
          >
            Profile
          </Link>
          <div className='flex items-center relative w-max'>
            <Link
              to='/friends'
              className='font-light text-sm hover:text-gray-500 color-transition'
            >
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
            <Link
              to='/messages'
              className='font-light text-sm hover:text-gray-500 color-transition'
            >
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
          <Link
            to='/forum-activity'
            className='font-light hover:text-gray-500 text-sm w-max color-transition'
          >
            Forum Activity
          </Link>
        </div>
        <button
          className='font-light text-sm hover:text-gray-500 w-max color-transition'
          onClick={() => clearTokens(setToken, id)}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

export default Menu;
