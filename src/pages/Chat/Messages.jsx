import { useContext, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import UserContext from '../../contexts/UserContext';

import decodeToken from '../../utils/decodeToken';

const Messages = ({ msgs, otherUser, otherUserLeft }) => {
  const { token } = useContext(UserContext);
  const { id } = decodeToken(token);

  const scrollAtBottom = useRef(true);

  useEffect(() => {
    const container = document.querySelector('#msgs-container');

    if (scrollAtBottom.current) {
      container.scrollTop = container.scrollHeight;
    }
  }, [scrollAtBottom, msgs, otherUserLeft]);

  const detectScroll = (e) => {
    const { scrollHeight, clientHeight, scrollTop } = e.target;

    if (scrollTop + clientHeight === scrollHeight) {
      scrollAtBottom.current = true;
    } else {
      scrollAtBottom.current = false;
    }
  };

  return (
    <div
      id='msgs-container'
      className='no-scrollbar overflow-auto flex-grow flex flex-col space-y-2 mt-10 md:mt-0'
      onScroll={detectScroll}
    >
      {msgs.map(({ msg, from }) => (
        <p
          key={uuidv4()}
          className={`whitespace-pre-wrap inline-block max-w-3/4 sm:text-sm ${from === id ? 'self-end bg-green-700 bg-opacity-50 text-white' : 'w-max bg-gray-200 bg-opacity-30'}`}
          style={{ 'borderRadius': '18px', 'padding': '6px 15px' }}
        >
          {msg}
        </p>
      ))}
      {otherUserLeft &&
        <p className='font-light sm:text-sm italic text-center text-gray-400'>
          {`${otherUser.username} left`}
        </p>
      }
    </div>
  )
}

export default Messages;