import { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPass from './ForgotPass';
import PrimaryButton from '../../components/PrimaryButton';

import closeIcon from "../../assets/close.svg";
import hands from "../../assets/hands.jpg";

const Home = () => {
  const history = useHistory();
  const { token } = useContext(UserContext);

  const [action, setAction] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const container = useRef(null);
  const infoContainer = useRef(null);

  useEffect(() => {
    token && history.replace('/home');
  }, [token, history]);

  const changeOpacityOnScroll = () => {
    const { scrollY, innerHeight } = window;
    const opacity = 1 - (innerHeight - scrollY)/innerHeight;
    container.current.style.backgroundColor = `rgba(239, 234, 226, ${opacity})`;
    infoContainer.current.style.opacity = opacity;
  };

  useEffect(() => {
    window.addEventListener("scroll", changeOpacityOnScroll);

    return () => window.removeEventListener("scroll", changeOpacityOnScroll);
  }, []);

  return (
    <>
      <div
        className='absolute xl:fixed w-full h-screen bg-cover bg-top 2xl:bg-center bg-base -z-10'
      />
      <div
        ref={container}
        style={{ backgroundColor: "rgba(239, 234, 226, 0)" }}
      >
        <nav className='py-2 px-4 sm:px-6 flex justify-between items-center fixed w-full z-10'>
          <h1 className='text-gray-800 font-serif text-3xl'>
            listen
          </h1>
          <div className='flex gap-x-4 sm:gap-x-7'>
            <button
              className='
                text-sm
                font-medium
                text-gray-600
                hover:text-gray-400
                active:text-gray-400
                transition-colors
                duration-300
              '
              onClick={() => {
                setAction("signup");
                setIsSidebarOpen(true);
              }}
            >
              Sign up
            </button>
            <PrimaryButton
              onClick={() => {
                setAction("login");
                setIsSidebarOpen(true);
              }}
              inverse
              rounded
            >
              Sign in
            </PrimaryButton>
          </div>
        </nav>
        <div className='h-screen px-6 sm:px-14 pb-28 flex flex-col justify-end gap-y-6 sm:gap-y-10'>
          <h2 className='text-white text-5xl sm:text-8xl font-light sm:w-3/4'>
            Because we're in it together
          </h2>
          <p className='text-white sm:w-3/4 sm:text-lg font-light'>
            Listen is a community made up of people just like you. Whether you're struggling with mental health or able to empathize with those that are,
            it's a place to share and discuss, and to receive and provide support through many of life's obstacles.
          </p>
        </div>
        <div
          ref={infoContainer}
          className='
            flex
            flex-col
            xl:flex-row
            h-screen
            opacity-0
            px-6
            sm:px-14
            py-20
          '
        >
          <img
            src={hands}
            className='
              h-1/2
              xl:h-auto
              rounded-3xl
              object-cover
            '
          />
          <div className='flex flex-col justify-center gap-y-4 sm:px-20 xl:px-40 h-full'>
            <h4 className='text-2xl md:text-3xl text-green-800'>
              Seek professional help when necessary
            </h4>
            <p className='font-light sm:text-lg text-gray-600'>
              Listen is <span className='font-bold'>not</span> a substitute for professional help. If you are struggling and require immediate assistance, please contact your local helpline or healthcare provider.
            </p>
          </div>
        </div>
      </div>
      <div
        className={`
          bg-neutral-50
          pt-12
          p-6
          sm:p-10
          w-full
          sm:w-96
          h-full
          fixed
          ${isSidebarOpen ? "right-0" : "-right-full sm:-right-96"}
          transition-[right]
          duration-500
          z-20
        `}
      >
        <img
          className='absolute bg-neutral-50 cursor-pointer top-3 right-3'
          src={closeIcon}
          onClick={() => setIsSidebarOpen(false)}
        />
        {action === 'login' && <LoginForm setAction={setAction} />}
        {action === 'signup' && <SignUpForm setAction={setAction} />}
        {action === 'forgot' && <ForgotPass setAction={setAction} />}
      </div>
    </>
  )
}

export default Home;
