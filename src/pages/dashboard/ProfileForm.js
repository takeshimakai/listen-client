import { useEffect, useState, useContext } from "react";
import { Redirect, useHistory } from 'react-router-dom';

import UserContext from "../../contexts/UserContext";

import data from '../../data/data';
import putData from '../../utils/putData';
import formatDate from "../../utils/formatDate";

const ProfileForm = ({ profile, setProfile }) => {
  const history = useHistory();
  const { token } = useContext(UserContext);

  const [redirectPath, setRedirectPath] = useState();
  const [interestsInput, setInterestsInput] = useState('');
  const [input, setInput] = useState({
    dob: '',
    gender: '',
    interests: [],
    problemTopics: [],
    hidden: []
  });

  useEffect(() => {
    setInput({
      dob: profile.dob,
      gender: profile.gender,
      interests: profile.interests,
      problemTopics: profile.problemTopics,
      hidden: profile.hidden
    });
  }, [profile]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await putData('/users', input, token);
      const data = await res.json();

      setProfile({
        username: data.profile.username,
        dob: !data.profile.dob ? '' : formatDate(data.profile.dob),
        gender: data.profile.gender,
        interests: data.profile.interests,
        problemTopics: data.profile.problemTopics,
        hidden: data.profile.hidden
      });
      setRedirectPath('/dashboard/profile');
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    name === 'interests'
      ? setInterestsInput(value)
      : setInput(prevInput => ({ ...prevInput, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { name, value } = e.target;

    input[name].includes(value)
      ? setInput(prevInput => ({
          ...prevInput,
          [name]: prevInput[name].filter(prevValue => prevValue !== value)
        }))
      : setInput(prevInput => ({
          ...prevInput,
          [name]: prevInput[name].concat(value)
        }))
  };

  const addInterest = () => {
    const formatted = interestsInput.trim().charAt(0).toUpperCase() + interestsInput.trim().slice(1).toLowerCase();
    if (formatted && !input.interests.includes(formatted)) {
      setInput(prevInput => ({
        ...prevInput,
        interests: prevInput.interests.concat(formatted)
      }));
      setInterestsInput('');
    }
  };

  const removeInterest = (e) => {
    setInput(prevInput => ({
      ...prevInput,
      interests: prevInput.interests.filter(interest => interest !== e.target.value)
    }));
  };

  return (
    <div id='profile-form-container'>
      {redirectPath && <Redirect to={redirectPath} />}
      <form id='profile-form' onSubmit={handleSubmit}>
        <h2>{profile.username}</h2>
        <div id='profile-form-dob'>
          <label htmlFor='dob'>Date of birth: </label>
          <input
            type='date'
            id='dob'
            name='dob'
            value={input.dob}
            onChange={handleInput}
          />
        </div>
        <div id='profile-form-gender'>
          <p>Please select a gender:</p>
          {data.genders.map(gender => (
            <div className='profile-form-gender-radio' key={gender}>
              <input
                type='radio'
                id={gender}
                name='gender'
                value={gender}
                checked={input.gender === gender}
                onChange={handleInput}
              />
              <label htmlFor={gender}>{gender}</label>
            </div>
          ))}
        </div>
        <div id='profile-form-interests'>
          <label htmlFor='interests'>What are your interests? </label>
          <input
            type='text'
            id='interests'
            name='interests'
            value={interestsInput}
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                document.querySelector('#add-btn').click();
              }
            }}
          />
          <input id='add-btn' type='button' value='Add' disabled={!interestsInput} onClick={addInterest} />
          <div id='profile-form-interests-list'>
            {input.interests.map(interest => (
              <button type='button' value={interest} key={interest} onClick={removeInterest}>
                {interest} &#x2715;
              </button>
            ))}
          </div>
        </div>
        <div id='profile-form-problem-topics'>
          <p>Please select all topics that are relevant to you:</p>
          {data.categories.map(category => (
            <div className='profile-form-problem-topic' key={category}>
              <input
                type='checkbox'
                name='problemTopics'
                id={category}
                value={category}
                checked={input.problemTopics.includes(category)}
                onChange={handleCheckbox}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
        <div id='profile-form-hidden'>
          <p>Please select fields you would like to hide from your public profile:</p>
          {data.hidden.map(field => (
            <div className='profile-form-hidden-checkbox' key={`${field}-hidden`}>
              <input
                type='checkbox'
                name='hidden'
                id={`${field}-hidden`}
                value={field}
                checked={input.hidden.includes(field)}
                onChange={handleCheckbox}
              />
              <label htmlFor={`${field}-hidden`}>
                {field === 'dob' && 'Date of birth'}
                {field === 'gender' && 'Gender'}
                {field === 'interests' && 'Interests'}
                {field === 'problemTopics' && 'Problem topics'}
              </label>
            </div>
          ))}
        </div>
        <input type='button' value='Cancel' onClick={() => history.goBack()} />
        <input type='submit' value='Save' />
      </form>
    </div>
  )
}

export default ProfileForm;