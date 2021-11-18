import { useContext, useState } from 'react';

import UserContext from '../contexts/UserContext';

const AccountSetUp = () => {
  const { token } = useContext(UserContext);

  const [username, setUsername] = useState();
  const [profile, setProfile] = useState();

  return (
    <div>
      Account set up
    </div>
  )
}

export default AccountSetUp;