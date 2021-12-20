import { useEffect, useState, useContext } from "react";
import { useHistory } from 'react-router-dom';

import UserContext from "../../../contexts/UserContext";

import DobInput from "./DobInput";
import GenderInput from "./GenderInput";
import InterestsInput from "./InterestsInput";
import ProblemTopicsInput from "./ProblemTopicsInput";

import getData from "../../../utils/getData";
import putData from '../../../utils/putData';
import formatDate from "../../../utils/formatDate";
import decodeToken from "../../../utils/decodeToken";

import defaultPic from '../../../assets/default-profile.jpg';

const ProfileForm = ({ setProfile }) => {
  const history = useHistory();
  const { token } = useContext(UserContext);

  const [redirect, setRedirect] = useState(false);
  const [profileInput, setProfileInput] = useState({
    username: '',
    dob: '',
    gender: '',
    interests: [],
    problemTopics: [],
    hidden: []
  });

  useEffect(() => {
    if (redirect) {
      history.replace('/dashboard/profile');
    }
  }, [redirect, history]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getData(`/users/${decodeToken(token).id}`, token);
        const { profile } = await res.json();

        setProfileInput({
          username: profile.username,
          dob: profile.dob ? formatDate(profile.dob) : '',
          gender: profile.gender || '',
          interests: profile.interests || [],
          problemTopics: profile.problemTopics || [],
          hidden: profile.hidden || []
        })
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await putData('/users', profileInput, token);
      const data = await res.json();

      setProfile(prev => ({
        ...prev,
        dob: !data.profile.dob ? '' : formatDate(data.profile.dob),
        gender: data.profile.gender,
        interests: data.profile.interests,
        problemTopics: data.profile.problemTopics,
        hidden: data.profile.hidden
      }));
      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    ['dob', 'gender'].includes(name)
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
  };

  return (
    <form
      className='pt-20 sm:pt-24 pb-12 xl:pb-0 px-12 xl:px-0 xl:mb-20 flex flex-col xl:flex-row items-center xl:items-start xl:relative xl:w-max xl:mx-auto'
      onSubmit={handleSubmit}
    >
      <img className='h-36 sm:h-48 rounded-full' src={defaultPic} alt='' />
      <div className='flex flex-col items-center xl:items-start xl:ml-20 w-full'>
        <p className='mt-4 xl:mt-0 text-lg font-bold text-gray-800'>{profileInput.username}</p>
        <div className='space-y-11 mt-9 xl:w-60 w-full max-w-xs'>
          <DobInput profileInput={profileInput} handleInput={handleInput} />
          <GenderInput profileInput={profileInput} handleInput={handleInput} />
          <InterestsInput profileInput={profileInput} setProfileInput={setProfileInput} handleInput={handleInput} />
          <ProblemTopicsInput profileInput={profileInput} handleInput={handleInput} />
        </div>
      </div>
      <div className='xl:absolute xl:left-4 xl:top-80 mt-12 xl:mt-0 w-full xl:w-40 flex xl:block max-w-xs xl:space-y-2.5'>
        <input
          className='secondary-btn mr-1 xl:mr-0'
          type='button'
          value='Cancel'
          onClick={() => history.goBack()}
        />
        <input
          className='primary-btn ml-1 xl:ml-0'
          type='submit'
          value='Save'
        />
      </div>
    </form>
  )
}

export default ProfileForm;