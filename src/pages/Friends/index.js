import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import getData from "../../utils/getData";
import getNewTokensIfExpired from '../../utils/getNewTokensIfExpired';
import updateTokens from '../../utils/updateTokens';
import clearTokens from '../../utils/clearTokens';
import decodeToken from "../../utils/decodeToken";

import Card from "./Card";

const Friends = () => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);
  const { id } = decodeToken(token);

  const [friends, setFriends] = useState({
    accepted: [],
    received: [],
    sent: []
  });

  useEffect(() => {
    (async () => {
      try {
        const newTokens = await getNewTokensIfExpired(token);

        if (newTokens) {
          return updateTokens(newTokens.token, newTokens.refreshToken, setToken);
        }

        const res = await getData('/friends', token);
        const data = await res.json();

        if (!res.ok) throw res;

        setFriends({
          accepted: data.friends.accepted,
          received: data.friends.received,
          sent: data.friends.sent
        });
      } catch (err) {
        if (err.status === 401) {
          clearTokens(setToken, id);
          return history.replace('/unauthorized');
        }

        console.log(err);
      }
    })();
  }, [token, history, setToken, id]);

  return (
    <div className='pt-16 sm:pt-20 pb-10 flex flex-col items-center space-y-12 sm:space-y-16'>
      <Card title='Friends' users={friends.accepted} />
      <Card title='Received requests' users={friends.received} />
      <Card title='Sent requests' users={friends.sent} />
    </div>
  )
}

export default Friends;