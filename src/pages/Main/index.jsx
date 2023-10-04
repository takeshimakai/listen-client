import { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPass from './ForgotPass';
import PrimaryButton from '../../components/PrimaryButton';

import closeIcon from "../../assets/close.svg";

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
        className='fixed w-full h-screen bg-cover bg-top 2xl:bg-center bg-base -z-10'
      />
      <div
        ref={container}
        style={{ backgroundColor: "rgba(239, 234, 226, 0)" }}
      >
        <nav className='py-2 px-3 sm:px-6 flex justify-between items-center fixed w-full'>
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
        <div className='h-screen'>
        </div>
        <div
          ref={infoContainer}
          className='flex flex-col items-center justify-evenly px-6 sm:py-28 w-full h-screen opacity-0'
        >
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
