import { useContext } from 'react';

import UserContext from '../contexts/UserContext';

import LoginForm from '../components/LoginForm';

const Home = () => {
  const { token } = useContext(UserContext);

  return (
    <div id='login'>
      {token
        ? <p>{token}</p>
        : <LoginForm />
      }
    </div>
  )
}

export default Home;