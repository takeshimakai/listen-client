import { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import MsgPreview from './MsgPreview';

import decodeToken from '../../utils/decodeToken';

const Sent = ({ threads }) => {
  const match = useRouteMatch();
  const { token } = useContext(UserContext);
  const { id } = decodeToken(token);

  return (
    <>
      {threads.map(thread => {
        let msg;

        for (let i = thread.msgs.length - 1; i >= 0; i--) {
          if (thread.msgs[i].from && thread.msgs[i].from._id === id) {
            msg = thread.msgs[i];
            break;
          }
        }

        return msg &&
          <Link className='block' key={thread._id} to={`${match.url}/${thread._id}`}>
            <MsgPreview subject={thread.subject} msg={msg} />
          </Link>
      })}
    </>
  )
}

export default Sent;