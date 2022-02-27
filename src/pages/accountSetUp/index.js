import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import decodeToken from '../../utils/decodeToken';
import postDataWithFile from '../../utils/postDataWithFile';

import UsernameInput from './UsernameInput';
import ProfilePicInput from './ProfilePicInput';
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

  const handleSubmit = async () => {
    try {
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
            err={err}
            setErr={setErr}
            step={step}
            setStep={setStep}
          />
        }
        {step === 'picture' &&
          <ProfilePicInput
            pic={profileInput.img}
            setProfileInput={setProfileInput}
            goNext={goNext}
            step={step}
            changeStep={changeStep}
            err={err}
            setErr={setErr}
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
            handleSubmit={handleSubmit}
          />
        }
      </div>
      {moreInfo && <MoreInfo moreInfo={moreInfo} setMoreInfo={setMoreInfo} />}
    </div>
  )
}

export default AccountSetUp;