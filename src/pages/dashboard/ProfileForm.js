import { useEffect, useState, useContext } from "react";
import { Redirect, useHistory } from 'react-router-dom';

import UserContext from "../../contexts/UserContext";

import data from '../../data/data';
import putData from '../../utils/putData';
import formatDate from "../../utils/formatDate";

import InterestsInput from "../../components/InterestsInput";
import ProblemTopicsInput from "../../components/ProblemTopicsInput";
import HiddenFieldsInput from "../../components/HiddenFieldsInput";

const ProfileForm = ({ profile, setProfile }) => {
  const history = useHistory();
  const { token } = useContext(UserContext);

  const [redirectPath, setRedirectPath] = useState();
  const [profileInput, setProfileInput] = useState({
    dob: '',
    gender: '',
    interests: [],
    problemTopics: [],
    hidden: []
  });

  useEffect(() => {
    setProfileInput({
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

      const res = await putData('/users', profileInput, token);
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

    setProfileInput(prevInput => ({ ...prevInput, [name]: value }));
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
            value={profileInput.dob}
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
                checked={profileInput.gender === gender}
                onChange={handleInput}
              />
              <label htmlFor={gender}>{gender}</label>
            </div>
          ))}
        </div>
        <div id='profile-form-interests'>
          <InterestsInput profileInput={profileInput} setProfileInput={setProfileInput} />
        </div>
        <div id='profile-form-problem-topics'>
          <ProblemTopicsInput profileInput={profileInput} setProfileInput={setProfileInput} />
        </div>
        <div id='profile-form-hidden'>
          <HiddenFieldsInput profileInput={profileInput} setProfileInput={setProfileInput} />
        </div>
        <input type='button' value='Cancel' onClick={() => history.goBack()} />
        <input type='submit' value='Save' />
      </form>
    </div>
  )
}

export default ProfileForm;