import { Link, useRouteMatch } from 'react-router-dom';
import { useContext } from 'react';

import UserContext from '../../contexts/UserContext';

import MsgPreview from './MsgPreview'

import decodeToken from '../../utils/decodeToken';

const Inbox = ({ threads }) => {
  const match = useRouteMatch();
  const { token } = useContext(UserContext);
  const { id } = decodeToken(token);

  return (
    <>
      {threads
        .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
        .map(thread => (
          thread.msgs.length === 1
            ? thread.msgs[0].from._id !== id &&
                <Link className='block' key={thread._id} to={`${match.url}/${thread._id}`}>
                  <MsgPreview subject={thread.subject} msg={thread.msgs[0]} />
                </Link>
            : <Link className='block' key={thread._id} to={`${match.url}/${thread._id}`}>
                <MsgPreview subject={thread.subject} msg={thread.msgs[thread.msgs.length - 1]} />
              </Link>
        ))
      }
    </>
  )
};

export default Inbox;