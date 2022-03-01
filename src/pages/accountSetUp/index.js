import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import decodeToken from '../../utils/decodeToken';
import postDataWithFile from '../../utils/postDataWithFile';
import getData from '../../utils/getData';

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

      const res = await postDataWithFile('/users', profileInput, token);

      if (!res.ok) {
        throw res;
      }

      const data = await res.json();

      setToken(data);
    } catch (err) {
      const data = await err.json();

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
      const res = await getData(`/users/username/${profileInput.username}`, token);

      if (!res.ok) {
        throw res;
      }

      setErr(prev => ({ ...prev, username: '' }));
      setStep('picture');
    } catch (err) {
      if (err.status === 400) {
        const { errors } = await err.json();
        return setErr(prev => ({ ...prev, username: errors[0].msg }));
      }

      console.log(err);
    }
  };

  return (
    <div className='h-screen flex flex-col'>
      <div className='fixed w-full flex justify-between py-2 px-4'>
        <h1 className='logo-sm'>listen</h1>
        <button className='font-light text-sm' onClick={() => setToken('')}>Sign out</button>
      </div>
      <form className='h-full flex flex-col items-center px-12 pb-12' onSubmit={handleSubmit}>
        <div className='min-h-0 flex-grow flex items-center justify-center w-full sm:max-w-lg'>
          <div className='relative flex flex-col items-center border max-h-3/4 w-full bg-gray-50 shadow-xl rounded-lg text-center pt-14 pb-10 px-5 sm:px-10'>
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
              <p className='account-setup-moreinfo' onClick={() => setMoreInfo(!moreInfo)}>
                What's this for?
              </p>
            }
          </div>
        </div>
        <div className='w-full flex justify-center max-w-xs space-x-2'>
          {step !== 'username' &&
            <SecondaryBtn label='Back' type='button' onClick={previousStep} />
          }
          {step === 'username' && 'Next' &&
            <PrimaryBtn label='Next' id='next-btn' type='button' disabled={!profileInput.username} onClick={usernameValidation} />
          }
          {step === 'picture' &&
            <PrimaryBtn label={profileInput.img ? 'Next' : 'Skip'} id='next-btn' type='button' onClick={nextStep} />
          }
          {step === 'dob' &&
            <PrimaryBtn label={profileInput.dob ? 'Next' : 'Skip'} id='next-btn' type='button' onClick={nextStep} />
          }
          {step === 'gender' &&
            <PrimaryBtn label={profileInput.gender ? 'Next' : 'Skip'} id='next-btn' type='button' onClick={nextStep} />
          }
          {step === 'interests' &&
            <PrimaryBtn label={profileInput.interests.length > 0 ? 'Next' : 'Skip'} id='next-btn' type='button' onClick={nextStep} />
          }
          {step === 'problemTopics' &&
            <PrimaryBtn label={profileInput.problemTopics.length > 0 ? 'Next' : 'Skip'} id='next-btn' type='button' onClick={nextStep} />
          }
          {step === 'confirm' && <PrimaryBtn label='Save profile' id='next-btn' />
          }
        </div>
      </form>
      {moreInfo && <MoreInfo moreInfo={moreInfo} setMoreInfo={setMoreInfo} />}
    </div>
  )
}

export default AccountSetUp;