import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPass from './ForgotPass';

const Home = () => {
  const history = useHistory();
  const { token } = useContext(UserContext);

  const [page, setPage] = useState('login');

  useEffect(() => {
    token && history.replace('/home');
  }, [token, history]);

  return (
    <div className='w-screen h-screen lg:flex lg:items-center overflow-auto'>
      <div className='bg-image' />
      <div className='relative flex items-center justify-center lg:justify-end h-2/6 lg:h-auto z-10 lg:flex-1 lg:mr-14'>
        <h1 className='logo-main'>listen</h1>
      </div>
      <div className='relative z-10 px-12 lg:px-0 lg:flex-1 lg:ml-14 mb-12 lg:mb-0'>
        {page === 'login' && <LoginForm setPage={setPage} />}
        {page === 'signup' && <SignUpForm setPage={setPage} />}
        {page === 'forgot' && <ForgotPass setPage={setPage} />}
      </div>
    </div>
  )
}

export default Home;