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

  const changeOpacityOnScroll = (e) => {
    const { scrollTop, clientHeight } = e.target;
    const opacity = 1 - (clientHeight - scrollTop)/clientHeight;
    if (opacity > 1) return;
    e.target.style.backgroundColor = `rgba(239, 234, 226, ${opacity})`;
    e.target.querySelector('#information').style.opacity = opacity;
  };

  return (
    <div className='bg-image w-screen flex-grow'>
      <div
        className='h-full w-full overflow-auto'
        style={!['login', 'signup'].includes(page) ? { backgroundColor: 'rgba(0, 0, 0, 0)' } : null}
        onScroll={['login', 'signup'].includes(page) ? changeOpacityOnScroll : null}
      >
        <div className='min-h-full grid grid-rows-3 lg:flex lg:items-center'>
          <div className='relative flex items-center justify-center lg:justify-end row-span-1 lg:h-auto z-10 lg:flex-1 lg:mr-14'>
            <h1 className='text-gray-800 font-serif text-6xl sm:text-8xl'>listen</h1>
          </div>
          <div className='row-span-2 relative z-10 px-12 lg:px-0 lg:flex-1 lg:ml-14'>
            {page === 'login' && <LoginForm setPage={setPage} />}
            {page === 'signup' && <SignUpForm setPage={setPage} />}
            {page === 'forgot' && <ForgotPass setPage={setPage} />}
          </div>
        </div>
        {['login', 'signup'].includes(page) &&
          <div className='flex flex-col items-center justify-evenly px-6 sm:py-28 w-full min-h-full' id='information'>
            <div>
              <p className='mb-4 font-light'>What is <i className='mr-0.5 font-normal text-green-700'>listen</i>?</p>
              <p className='max-w-md font-light text-sm'>
                Listen is a community made up of people just like you. Whether you're struggling with mental health or able to empathize with those that are,
                it's a place to share and discuss, and to receive and provide support through many of life's obstacles—with or without a diagnosis.
              </p>
            </div>
            <div>
              <p className='mb-4 font-light'>What it isn't</p>
              <p className='max-w-md font-light text-sm'>
                Listen is <span className='font-bold'>not</span> a substitute for professional help.
                If you are struggling and require immediate assistance, please contact your local helpline or healthcare provider.
              </p>
            </div>
            <div>
              <p className='mb-4 font-light'>What is it <i className='font-normal'>really</i> though?</p>
              <p className='max-w-md font-light text-sm'>
                Listen is a project by <a className='text-green-700' target='_blank' rel='noreferrer' href='https://github.com/takeshimakai'>Kai Takeshima</a>,
                an aspiring web developer hoping to do some good with his newly found skills.
              </p>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home;