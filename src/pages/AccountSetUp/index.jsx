import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import decodeToken from '../../utils/decodeToken';
import postDataWithFile from '../../utils/postDataWithFile';
import getData from '../../utils/getData';
import clearTokens from '../../utils/clearTokens';
import getNewTokensIfExpired from '../../utils/getNewTokensIfExpired';
import updateTokens from '../../utils/updateTokens';

import UsernameInput from './UsernameInput';
import ProfilePicInput from './ProfilePicInput';
import DobInput from './DobInput';
import GenderInput from './GenderInput';
import InterestsInput from './InterestsInput';
import ProblemTopicsInput from './ProblemTopicsInput';
import ConfirmInput from './ConfirmInput';
import MoreInfo from './MoreInfo';
import ProgressBar from './ProgressBar';

import PrimaryBtn from '../../components/PrimaryBtn';
import SecondaryBtn from '../../components/SecondaryBtn';

const AccountSetUp = () => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);

  const [moreInfo, setMoreInfo] = useState(false);
  const [err, setErr] = useState({ username: '', picture: '' });
  const [step, setStep] = useState('username');
  const [profileInput, setProfileInput] = useState({
    username: '',
    img: '',
    dob: '',
    gender: '',
    interests: [],
    problemTopics: []
  });

  useEffect(() => {
    if (token) {
      const { username, verified } = decodeToken(token);
      !verified && history.replace('/verify');
      username && history.replace('/home');
    } else {
      history.replace('/');
    }
  }, [token, history]);

  useEffect(() => {
    const goNext = (e) => {
      if (step === 'interests') {
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        document.querySelector('#next-btn').click();
      }
    };

    window.addEventListener('keydown', goNext);
    return () => window.removeEventListener('keydown', goNext);
  }, [step]);

  useEffect(() => {
    const box = document.querySelector('#question-box');
    box.style.maxHeight = window.innerHeight * 0.75 + 'px';
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    ['username', 'dob', 'gender'].includes(name)
      ? setProfileInput(prev => ({ ...prev, [name]: value }))
      : profileInput[name].includes(value)
          ? setProfileInput(prev => ({
              ...prev,
              [name]: prev[name].filter(val => val !== value)
            }))
          : setProfileInput(prev => ({
              ...prev,
              [name]: prev[name].concat(value)
            }));
  }

  const nextStep = () => {
    switch (step) {
      case 'picture':
        setErr(prev => ({ ...prev, picture: '' }));
        setStep('dob');
        return;
      case 'dob':
        return setStep('gender');
      case 'gender':
        return setStep('interests');
      case 'interests':
        return setStep('problemTopics');
      case 'problemTopics':
        return setStep('confirm');
      default:
        return;
    }
  };

  const previousStep = () => {
    switch (step) {
      case 'picture':
        return setStep('username');
      case 'dob':
        return setStep('picture');
      case 'gender':
        return setStep('dob');
      case 'interests':
        return setStep('gender');
      case 'problemTopics':
        return setStep('interests');
      case 'confirm':
        return setStep('problemTopics');
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const newTokens = await getNewTokensIfExpired(token);

      const res = await postDataWithFile('/users', profileInput, newTokens ? newTokens.token : token);

      if (!res.ok) throw res;

      const data = await res.json();

      updateTokens(data.token, data.refreshToken, setToken);
    } catch (err) {
      const data = await err.json();

      if (err.status === 401) {
        clearTokens(setToken, decodeToken(token).id);
        return history.replace('/unauthorized');
      }

      if (err.status === 413) {
        setErr(prev => ({ ...prev, picture: data.msg }));
        return setStep('picture');
      }

      if (err.status === 400) {
        const { param, msg } = data.errors[0];
        setErr(prev => ({ ...prev, [param]: msg }));
        return setStep('username');
      }

      console.log(err);
    }
  };

  const usernameValidation = async () => {
    try {
      const newToken = await getNewTokensIfExpired(token);

      const res = await getData(`/users/username/${profileInput.username}`, newToken ? newToken.token : token);

      if (!res.ok) throw res;

      setErr(prev => ({ ...prev, username: '' }));
      setStep('picture');
    } catch (err) {
      if (err.status === 400) {
        const { errors } = await err.json();
        return setErr(prev => ({ ...prev, username: errors[0].msg }));
      }

      if (err.status === 401) {
        clearTokens(setToken, decodeToken(token).id);
        return history.replace('/unauthorized');
      }

      console.log(err);
    }
  };

  return (
    <div className='flex-grow flex flex-col'>
      <div className='z-10 fixed w-full flex justify-between py-2 px-4'>
        <h1 className='text-gray-800 font-serif text-2xl'>listen</h1>
        <button className='font-light text-sm' onClick={() => clearTokens(setToken, decodeToken(token).id)}>Sign out</button>
      </div>
      <form className='flex-grow flex flex-col items-center justify-between px-4 sm:px-0 pb-4 sm:pb-10' onSubmit={handleSubmit}>
        <div id='question-box' className='my-auto w-full sm:max-w-lg relative flex flex-col items-center border bg-gray-50 shadow-xl rounded-lg pt-14 pb-10 px-5 sm:px-10 text-center'>
          <ProgressBar step={step} />
          {step === 'username' &&
            <UsernameInput profileInput={profileInput} handleInput={handleInput} err={err} />
          }
          {step === 'picture' &&
            <ProfilePicInput pic={profileInput.img} setProfileInput={setProfileInput} err={err} setErr={setErr} />
          }
          {step === 'dob' &&
            <DobInput profileInput={profileInput} handleInput={handleInput} />
          }
          {step === 'gender' &&
            <GenderInput profileInput={profileInput} handleInput={handleInput} />
          }
          {step === 'interests' &&
            <InterestsInput profileInput={profileInput} setProfileInput={setProfileInput} />
          }
          {step === 'problemTopics' &&
            <ProblemTopicsInput profileInput={profileInput} handleInput={handleInput} />
          }
          {step === 'confirm' &&
            <ConfirmInput profileInput={profileInput} />
          }
          {['dob', 'gender', 'interests', 'problemTopics'].includes(step) &&
            <p className='absolute w-max text-xs text-blue-700 hover:text-blue-900 -bottom-8 inset-x-0 mx-auto cursor-pointer' onClick={() => setMoreInfo(!moreInfo)}>
              What's this for?
            </p>
          }
        </div>
        <div className='w-full flex justify-center max-w-xs space-x-2'>
          {step !== 'username' &&
            <SecondaryBtn label='Back' type='button' onClick={previousStep} />
          }
          {step === 'username' &&
            <PrimaryBtn label='Next' id='next-btn' type='button' disabled={!profileInput.username} onClick={usernameValidation} />
          }
          {!['username', 'confirm'].includes(step) &&
            <PrimaryBtn
              label={
                (step === 'picture' && profileInput.img) ||
                (step === 'dob' && profileInput.dob) ||
                (step === 'gender' && profileInput.gender) ||
                (step === 'interests' && profileInput.interests.length > 0) ||
                (step === 'problemTopics' && profileInput.problemTopics.length > 0)
                  ? 'Next'
                  : 'Skip'
              }
              id='next-btn'
              type='button'
              onClick={nextStep}
            />
          }
          {step === 'confirm' && <PrimaryBtn label='Save profile' id='next-btn' />}
        </div>
      </form>
      {moreInfo && <MoreInfo moreInfo={moreInfo} setMoreInfo={setMoreInfo} />}
    </div>
  )
}

export default AccountSetUp;