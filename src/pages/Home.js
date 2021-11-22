import { useContext } from 'react';
import { useHistory } from 'react-router';

import UserContext from '../contexts/UserContext';

const Home = () => {
  const { token } = useContext(UserContext);
  const history = useHistory();

  return (
    <div id='home'>
      {token
        ? history.push('/dashboard')
        : history.push('/login')
      }
    </div>
  )
}

export default Home;