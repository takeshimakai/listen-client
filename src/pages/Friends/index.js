import { useContext, useEffect, useState } from "react";

import UserContext from "../../contexts/UserContext";

import getData from "../../utils/getData";

import Card from "./Card";

const Friends = () => {
  const { token } = useContext(UserContext);

  const [friends, setFriends] = useState({
    accepted: [],
    received: [],
    sent: []
  });

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
    <div className='pt-20'>
      <Card title='Friends' users={friends.accepted} />
      <Card title='Received requests' users={friends.received} />
      <Card title='Sent requests' users={friends.sent} />
    </div>
  )
}

export default Friends;