import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import decodeToken from '../../utils/decodeToken';

import UsernameInput from './UsernameInput';
import DobInput from './DobInput';
import GenderInput from './GenderInput';
import InterestsInput from './InterestsInput';
import ProblemTopicsInput from './ProblemTopicsInput';
import ConfirmInput from './ConfirmInput';
import MoreInfo from './MoreInfo';

const AccountSetUp = () => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);

  const [moreInfo, setMoreInfo] = useState(false);
  const [error, setError] = useState();
  const [step, setStep] = useState('username');
  const [profileInput, setProfileInput] = useState({
    username: '',
    dob: '',
    gender: '',
    interests: [],
    problemTopics: []
  });

  useEffect(() => {
    if (token) {
      const { username, verified } = decodeToken(token);

      !verified && history.replace('/verify');
      username && history.replace('/dashboard');
    } else {
      history.replace('/');
    }
  }, [token, history]);

  useEffect(() => {
    error && setStep('username');
  }, [error]);

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

  const changeStep = (e) => setStep(e.target.value);

  const goNext = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.querySelector('#next-btn').click();
    }
  };

  return (
    <div className='h-screen flex flex-col'>
      <div className='flex justify-between py-2 px-4'>
        <h1 className='logo-sm'>listen</h1>
        <button className='font-light text-sm' onClick={() => setToken('')}>Sign out</button>
      </div>
      <div className='min-h-0 flex-grow flex flex-col items-center justify-between w-full mx-auto pb-12 px-12 sm:px-0'>
        {step === 'username' &&
          <UsernameInput
            profileInput={profileInput}
            handleInput={handleInput}
            goNext={goNext}
            error={error}
            setError={setError}
            step={step}
            setStep={setStep}
          />
        }
        {step === 'dob' &&
          <DobInput
            profileInput={profileInput}
            handleInput={handleInput}
            goNext={goNext}
            step={step}
            changeStep={changeStep}
            moreInfo={moreInfo}
            setMoreInfo={setMoreInfo}
          />
        }
        {step === 'gender' &&
          <GenderInput
            profileInput={profileInput}
            handleInput={handleInput}
            goNext={goNext}
            step={step}
            changeStep={changeStep}
            moreInfo={moreInfo}
            setMoreInfo={setMoreInfo}
          />
        }
        {step === 'interests' &&
          <InterestsInput
            profileInput={profileInput}
            setProfileInput={setProfileInput}
            goNext={goNext}
            step={step}
            changeStep={changeStep}
            moreInfo={moreInfo}
            setMoreInfo={setMoreInfo}
          />
        }
        {step === 'problemTopics' &&
          <ProblemTopicsInput
            profileInput={profileInput}
            handleInput={handleInput}
            goNext={goNext}
            step={step}
            changeStep={changeStep}
            moreInfo={moreInfo}
            setMoreInfo={setMoreInfo}
          />
        }
        {step === 'confirm' &&
          <ConfirmInput
            profileInput={profileInput}
            step={step}
            changeStep={changeStep}
            setError={setError}
          />
        }
      </div>
      {moreInfo && <MoreInfo moreInfo={moreInfo} setMoreInfo={setMoreInfo} />}
    </div>
  )
}

export default AccountSetUp;