import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import data from '../../data/data';
import decodeToken from '../../utils/decodeToken';
import setErrMsgs from '../../utils/setErrMsgs';
import postData from '../../utils/postData';
import getData from '../../utils/getData';
import formatDate from '../../utils/formatDate';

import InterestsInput from '../../components/InterestsInput';
import ProblemTopicsInput from '../../components/ProblemTopicsInput';
import ProgressBar from '../../components/ProgressBar';

const AccountSetUp = () => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);

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

  const handleSubmit = async () => {
    try {
      const res = await postData('/users', profileInput, token);
      const data = await res.json();

      if (!res.ok) {
        return setError(setErrMsgs(data.errors));
      }

      setToken(data);
    } catch (err) {
      console.log(err);
    }
  };

  const usernameValidation = async () => {
    try {
      const res = await getData(`/users/username/${profileInput.username}`, token);

      if (!res.ok) {
        const data = await res.json();
        return setError(setErrMsgs(data.errors));
      }

      setError();
      setStep('dob');
    } catch (err) {
      console.log(err);
    }
  };

  const goNext = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.querySelector('#next-btn').click();
    }
  };

  return (
    <div className='h-full flex flex-col'>
      <div className='flex justify-between py-2 px-4'>
        <h1 className='text-gray-800 font-serif text-2xl'>listen</h1>
        <button className='font-light text-sm' onClick={() => setToken('')}>Sign out</button>
      </div>
      <div className='account-setup-container'>
        <div className='account-setup-input-container'>
          <ProgressBar step={step} />
          {step === 'username' &&
            <>
              <p className='account-setup-input-title'>Please choose a username.</p>
              <div className='flex flex-col justify-center items-center mt-11'>
                <input
                  className='text-center w-full py-1 border-b border-gray-500 text-lg text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
                  type='text'
                  name='username'
                  value={profileInput.username}
                  onChange={handleInput}
                  onKeyDown={goNext}
                />
                <p className='text-xs mt-1 text-gray-500'>This field is required.</p>
                <p className='error-msg mt-1'>{error && error.username}</p>
              </div>
            </>
          }
          {step === 'dob' &&
            <>
              <p className='account-setup-input-title'>When is your birthday?</p>
              <div className='flex justify-center items-center mt-11'>
                <input
                  className='py-1 border-b border-gray-500 text-lg text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
                  type='date'
                  name='dob'
                  max={formatDate(Date.now())}
                  value={profileInput.dob}
                  onChange={handleInput}
                  onKeyDown={goNext}
                />
              </div>
            </>
          }
          {step === 'gender' &&
            <>
              <p className='account-setup-input-title'>What is your gender?</p>
              <div className='flex items-center justify-center mt-11'>
                <div>
                  {data.genders.map(gender => (
                    <div className='flex items-center my-2' key={gender}>
                      <input
                        className='h-4 w-4 mr-1.5'
                        type='radio'
                        id={gender}
                        name='gender'
                        value={gender}
                        checked={profileInput.gender === gender}
                        onChange={handleInput}
                        onKeyDown={goNext}
                      />
                      <label className='text-base' htmlFor={gender}>{gender}</label>
                    </div>
                  ))}
                  <div className='flex items-center my-2'>
                    <input
                      className='h-4 w-4 mr-1.5'
                      type='radio'
                      id='undisclosed'
                      name='gender'
                      value='undisclosed'
                      checked={profileInput.gender === 'undisclosed'}
                      onChange={handleInput}
                      onKeyDown={goNext}
                    />
                    <label className='text-base' htmlFor='undisclosed'>Rather not say</label>
                  </div>
                </div>
              </div>
            </>
          }
          {step === 'interests' &&
            <InterestsInput profileInput={profileInput} setProfileInput={setProfileInput} goNext={goNext} />
          }
          {step === 'problemTopics' &&
            <ProblemTopicsInput profileInput={profileInput} setProfileInput={setProfileInput} goNext={goNext} />
          }
          {step === 'confirm' &&
            <div className='h-full flex flex-col'>
              <p className='account-setup-input-title'>Please confirm your information.</p>
              <div className='mt-11 space-y-0.5 overflow-auto'>
                <div>
                  <p className='account-setup-confirm-title'>Username</p>
                  <p>{profileInput.username}</p>
                </div>
                <p className='separator'>&middot;</p>
                <div>
                  <p className='account-setup-confirm-title'>Date of birth</p>
                  <p>{profileInput.dob || 'undisclosed'}</p>
                </div>
                <p className='separator'>&middot;</p>
                <div>
                  <p className='account-setup-confirm-title'>Gender</p>
                  <p>{profileInput.gender || 'undisclosed'}</p>
                </div>
                <p className='separator'>&middot;</p>
                <div>
                  <p className='account-setup-confirm-title'>Interests</p>
                  {profileInput.interests.length > 0
                    ? <ul>
                        {profileInput.interests.map(interest => <li key={interest}>{interest}</li>)}
                      </ul>
                    : <p>undisclosed</p>
                  }
                </div>
                <p className='separator'>&middot;</p>
                <div>
                  <p className='account-setup-confirm-title'>Problem topics</p>
                  {profileInput.problemTopics.length > 0
                    ? <ul>
                        {profileInput.problemTopics.map(topic => <li key={topic}>{topic}</li>)}
                      </ul>
                    : <p>undisclosed</p>
                  }
                </div>
              </div>
            </div>
          }
        </div>
        {step === 'username'
          ? <button
              className='primary-btn disabled:opacity-50 disabled:bg-green-700'
              id='next-btn'
              value='dob'
              disabled={!profileInput.username}
              onClick={usernameValidation}
            >
              Next
            </button>
          : <div className='w-full flex max-w-xs'>
              {step === 'dob' &&
                <>
                  <button className='secondary-btn mr-1' value='username' onClick={changeStep}>Back</button>
                  <button
                    className='primary-btn ml-1'
                    id='next-btn'
                    value='gender'
                    onClick={changeStep}
                  >
                    {profileInput.dob ? 'Next' : 'Skip'}
                  </button>
                </>
              }
              {step === 'gender' &&
                <>
                  <button className='secondary-btn mr-1' value='dob' onClick={changeStep}>Back</button>
                  <button
                    className='primary-btn ml-1'
                    id='next-btn'
                    value='interests'
                    onClick={changeStep}
                  >
                    {profileInput.gender ? 'Next' : 'Skip'}
                  </button>
                </>
              }
              {step === 'interests' &&
                <>
                  <button className='secondary-btn mr-1' value='gender' onClick={changeStep}>Back</button>
                  <button
                    className='primary-btn ml-1'
                    id='next-btn'
                    value='problemTopics'
                    onClick={changeStep}
                  >
                    {profileInput.interests.length > 0 ? 'Next' : 'Skip'}
                  </button>
                </>
              }
              {step === 'problemTopics' &&
                <>
                  <button className='secondary-btn mr-1' value='interests' onClick={changeStep}>Back</button>
                  <button
                    className='primary-btn ml-1'
                    id='next-btn'
                    value='confirm'
                    onClick={changeStep}
                  >
                    {profileInput.problemTopics.length > 0 ? 'Next' : 'Skip'}
                  </button>
                </>
              }
              {step === 'confirm' &&
                <>
                  <button className='secondary-btn mr-1' value='problemTopics' onClick={changeStep}>Back</button>
                  <button className='primary-btn ml-1' onClick={handleSubmit}>Save profile</button>
                </>
              }
            </div>
        }
      </div>
    </div>
  )
}

export default AccountSetUp;