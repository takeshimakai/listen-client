import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import getData from "../../utils/getData";
import decodeToken from "../../utils/decodeToken";

const Friends = () => {
  const { token } = useContext(UserContext);
  const { username } = decodeToken(token);

  const [friends, setFriends] = useState({
    accepted: [],
    received: [],
    sent: []
  });

  useEffect(() => {
    console.log(friends);
  }, [friends]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getData('/friends', token);
        const data = await res.json();

        setFriends({
          accepted: data.friends.accepted,
          received: data.friends.received,
          sent: data.friends.sent
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token]);

  return (
    <div id='friends-container'>
      <h2>{username}</h2>
      <div id='friends-accepted'>
        <h3>Friends:</h3>
        {friends.accepted.map(friend => (
          <Link to={`/users/${friend._id}`} key={friend._id}>{friend.profile.username}</Link>
        ))}
      </div>
      <div id='friends-received'>
        <h3>Received requests:</h3>
        {friends.received.map(req => (
          <Link to={`/users/${req._id}`} key={req._id}>{req.profile.username}</Link>
        ))}
      </div>
      <div id='friends-sent'>
        <h3>Sent requests:</h3>
        {friends.sent.map(sentReq => (
          <Link to={`/users/${sentReq._id}`} key={sentReq._id}>{sentReq.profile.username}</Link>
        ))}
      </div>
    </div>
  )
}

export default Friends;