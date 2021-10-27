import { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import LoginForm from '../components/LoginForm';

const Home = () => {
  const { token } = useContext(UserContext);

  return (
    <div id='home'>
      {token
        ? <Link to='/forum'>Forum</Link>
        : <LoginForm />
      }
    </div>
  )
}

export default Home;