import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import data from '../data/data';
import decodeToken from '../utils/decodeToken';
import setErrMsgs from '../utils/setErrMsgs';
import postData from '../utils/postData';
import formatDate from '../utils/formatDate';

import InterestsInput from '../components/InterestsInput';
import ProblemTopicsInput from '../components/ProblemTopicsInput';
import ProgressBar from '../components/ProgressBar';

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

  return (
    <div className='h-full flex flex-col'>
      <div className='flex justify-between py-2 px-4'>
        <h1 className='text-gray-800 font-serif text-2xl'>listen</h1>
        <button className='font-light text-sm' onClick={() => setToken('')}>Sign out</button>
      </div>
      {step === 'username' &&
        <div className='account-setup-container'>
          <div className='account-setup-input-container'>
            <ProgressBar step={step} />
            <p className='account-setup-input-title'>Please choose a username.</p>
            <div className='flex flex-col justify-center items-center'>
              <input
                className='text-center w-full py-1 border-b border-gray-500 text-lg text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
                type='text'
                name='username'
                value={profileInput.username}
                onChange={handleInput}
              />
              <p className='text-xs mt-1 text-gray-500'>This field is required.</p>
              <p className='error-msg mt-1'>{error && error.username}</p>
            </div>
          </div>
          <button
              className='primary-btn disabled:opacity-50 disabled:bg-green-700'
              value='dob'
              disabled={!profileInput.username}
              onClick={changeStep}
            >
              Next
            </button>
        </div>
      }
      {step === 'dob' &&
        <div className='account-setup-container'>
          <div className='account-setup-input-container'>
            <ProgressBar step={step} />
            <p className='account-setup-input-title'>When is your birthday?</p>
            <div className='flex justify-center items-center mb-8'>
              <input
                className='py-1 border-b border-gray-500 text-lg text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
                type='date'
                name='dob'
                max={formatDate(Date.now())}
                value={profileInput.dob}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className='w-full flex max-w-xs'>
            <button className='secondary-btn mr-1' value='username' onClick={changeStep}>Back</button>
            <button
              className='primary-btn ml-1'
              value='gender'
              onClick={changeStep}
            >
              {profileInput.dob ? 'Next' : 'Skip'}
            </button>
          </div>
        </div>
      }
      {step === 'gender' &&
        <div className='account-setup-container'>
          <p className='text-lg'>What is your gender?</p>
          <div className='w-full h-60 flex items-center justify-center'>
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
                  />
                  <label htmlFor={gender}>{gender}</label>
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
                />
                <label htmlFor='undisclosed'>Rather not say</label>
              </div>
            </div>
          </div>
          <div className='w-full flex max-w-xs'>
            <button className='secondary-btn mr-1' value='dob' onClick={changeStep}>Back</button>
            <button className='primary-btn ml-1' value='interests' onClick={changeStep}>Next</button>
          </div>
        </div>
      }
      {step === 'interests' &&
        <div id='account-setup'>
          <InterestsInput profileInput={profileInput} setProfileInput={setProfileInput} />
          <button value='gender' onClick={changeStep}>Back</button>
          <button value='problemTopics' onClick={changeStep}>Next</button>
        </div>
      }
      {step === 'problemTopics' &&
        <div id='account-setup'>
          <ProblemTopicsInput profileInput={profileInput} setProfileInput={setProfileInput} />
          <button value='interests' onClick={changeStep}>Back</button>
          <button value='confirm' onClick={changeStep}>Next</button>
        </div>
      }
      {step === 'confirm' &&
        <div id='account-setup'>
          <p>Username: {profileInput.username}</p>
          <p>Date of birth: {profileInput.dob || 'undisclosed'}</p>
          <p>Gender: {profileInput.gender || 'undisclosed'}</p>
          <div>
            <p>Interests: {profileInput.interests.length === 0 && 'undisclosed'}</p>
            {profileInput.interests.length > 0 &&
              <ul>
                {profileInput.interests.map(interest => <li key={interest}>{interest}</li>)}
              </ul>
            }
          </div>
          <div>
            <p>Problem topics: {profileInput.problemTopics.length === 0 && 'undisclosed'}</p>
            {profileInput.problemTopics.length > 0 &&
              <ul>
                {profileInput.problemTopics.map(topic => <li key={topic}>{topic}</li>)}
              </ul>
            }
          </div>
          <button value='problemTopics' onClick={changeStep}>Back</button>
          <button onClick={handleSubmit}>Save profile</button>
        </div>
      }
    </div>
  )
}

export default AccountSetUp;