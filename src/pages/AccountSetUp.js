import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import data from '../data/data';
import decodeToken from '../utils/decodeToken';
import putData from '../utils/putData';
import setErrMsgs from '../utils/setErrMsgs';

import InterestsInput from '../components/InterestsInput';
import ProblemTopicsInput from '../components/ProblemTopicsInput';

const AccountSetUp = () => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);

  const [usernameError, setUsernameError] = useState();
  const [step, setStep] = useState('username');
  const [username, setUsername] = useState('');
  const [profileInput, setProfileInput] = useState({
    dob: '',
    gender: '',
    interests: [],
    problemTopics: [],
    hidden: []
  });

  useEffect(() => {
    usernameError && setStep('username');
  }, [usernameError]);

  useEffect(() => {
    decodeToken(token).username && history.replace('/dashboard');
  }, [token, history]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'dob':
      case 'gender':
        setProfileInput(prev => ({ ...prev, [name]: value }));
        break;
      default:
        profileInput[name].includes(value)
          ? setProfileInput(prev => ({
              ...prev,
              [name]: prev[name].filter(val => val !== value)
            }))
          : setProfileInput(prev => ({
              ...prev,
              [name]: prev[name].concat(value)
            }))
    }
  }

  const changeStep = (e) => setStep(e.target.value);

  const handleSubmit = async () => {
    try {
      const res = await Promise.all([
        putData('/users/username', { username }, token),
        putData('/users', profileInput, token)
      ]);
      const data = await res[0].json();

      if (!res[0].ok) {
        return setUsernameError(setErrMsgs(data.errors));
      }

      setToken(data);
    } catch (err) {
      console.log(err);
    }
  };

  switch (step) {
    case 'username':
      return (
        <div id='account-setup'>
          <p>Please choose a username.</p>
          <input
            type='text'
            name='username'
            value={username}
            onChange={handleInput}
          />
          {usernameError && <p>{usernameError.username}</p>}
          <button value='dob' disabled={!username} onClick={changeStep}>Next</button>
        </div>
      );
    case 'dob':
      return (
        <div id='account-setup'>
          <p>When is your birthday?</p>
          <input
            type='date'
            name='dob'
            value={profileInput.dob}
            onChange={handleInput}
          />
          <button value='username' onClick={changeStep}>Back</button>
          <button value='gender' onClick={changeStep}>Next</button>
        </div>
      );
    case 'gender':
      return (
        <div id='account-setup'>
          <p>What is your gender?</p>
          {data.genders.map(gender => (
            <div className='account-setup-gender-radio' key={gender}>
              <input
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
          <button value='dob' onClick={changeStep}>Back</button>
          <button value='interests' onClick={changeStep}>Next</button>
        </div>
      );
    case 'interests':
      return (
        <div id='account-setup'>
          <InterestsInput profileInput={profileInput} setProfileInput={setProfileInput} />
          <button value='gender' onClick={changeStep}>Back</button>
          <button value='problemTopics' onClick={changeStep}>Next</button>
        </div>
      );
    case 'problemTopics':
      return (
        <div id='account-setup'>
          <ProblemTopicsInput profileInput={profileInput} setProfileInput={setProfileInput} />
          <button value='interests' onClick={changeStep}>Back</button>
          <button value='confirm' onClick={changeStep}>Next</button>
        </div>
      );
    case 'confirm':
      return (
        <div id='account-setup'>
          <p>Username: {username}</p>
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
      )
    default:
      return null;
  }
}

export default AccountSetUp;