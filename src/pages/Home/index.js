import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const Home = () => {
  const history = useHistory();
  const { token } = useContext(UserContext);

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    token && history.replace('/dashboard');
  }, [token, history]);

  return (
    <div className='w-screen h-screen sm:flex sm:items-center overflow-auto'>
      <div className='bg-image' />
      <div className='relative flex items-center justify-center sm:justify-end h-2/6 sm:h-auto z-10 sm:flex-1 sm:mr-14'>
        <h1 className='logo-main'>listen</h1>
      </div>
      <div className='relative z-10 px-12 sm:px-0 sm:flex-1 sm:ml-14'>
        {isLogin
          ? <LoginForm setIsLogin={setIsLogin} />
          : <SignUpForm setIsLogin={setIsLogin} />
        }
      </div>
    </div>
  )
}

export default Home;