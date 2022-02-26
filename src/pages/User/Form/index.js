import { useEffect, useState, useContext } from "react";
import { useHistory } from 'react-router-dom';

import UserContext from "../../../contexts/UserContext";

import ProfilePicInput from "./ProfilePicInput";
import DobInput from "./DobInput";
import GenderInput from "./GenderInput";
import InterestsInput from "./InterestsInput";
import ProblemTopicsInput from "./ProblemTopicsInput";

import putDataWithFile from "../../../utils/putDataWithFile";
import putData from '../../../utils/putData';
import getData from "../../../utils/getData";
import deleteData from '../../../utils/deleteData';
import formatDate from "../../../utils/formatDate";
import decodeToken from "../../../utils/decodeToken";

const ProfileForm = ({ setProfile }) => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);

  const [err, setErr] = useState();
  const [newPic, setNewPic] = useState(false);
  const [pic, setPic] = useState();
  const [profileInput, setProfileInput] = useState({
    username: '',
    dob: '',
    gender: '',
    interests: [],
    problemTopics: [],
    public: []
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getData(`/users/${decodeToken(token).id}`, token);
        const { profile } = await res.json();

        setPic(profile.img);
        setProfileInput({
          username: profile.username,
          dob: profile.dob ? formatDate(profile.dob) : '',
          gender: profile.gender || '',
          interests: profile.interests || [],
          problemTopics: profile.problemTopics || [],
          public: profile.public || []
        })
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let res;

      if (newPic) {
        res = await putDataWithFile('/users', { ...profileInput, img: pic }, token)
      } else {
        res = await putData('/users', profileInput, token);
      }

      if (!res.ok) {
        throw res;
      }

      const data = await res.json();

      setProfile(prev => ({
        ...prev,
        img: data.profile.img,
        dob: !data.profile.dob ? '' : formatDate(data.profile.dob),
        gender: data.profile.gender,
        interests: data.profile.interests,
        problemTopics: data.profile.problemTopics,
      }));

      history.replace('/profile');
    } catch (err) {
      if (err.status === 413) {
        const { msg } = await err.json();
        return setErr(msg);
      }

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

  const deleteAccount = async () => {
    try {
      const res = await deleteData('/users', undefined, token);

      if (res.ok) {
        setToken('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className='pt-20 sm:pt-24 pb-12 xl:pb-0 px-12 xl:px-0 xl:mb-20 flex flex-col xl:flex-row items-center xl:items-start xl:relative xl:w-max xl:mx-auto'
      onSubmit={handleSubmit}
    >
      <ProfilePicInput
        pic={pic}
        setPic={setPic}
        newPic={newPic}
        setNewPic={setNewPic}
        setProfileInput={setProfileInput}
        err={err}
        setErr={setErr}
      />
      <div className='flex flex-col items-center xl:items-start xl:ml-20 w-full'>
        <p className='xl:mt-0 text-lg font-bold text-gray-800'>{profileInput.username}</p>
        <div className='space-y-11 mt-9 xl:w-60 w-full max-w-xs'>
          <DobInput profileInput={profileInput} handleInput={handleInput} />
          <GenderInput profileInput={profileInput} handleInput={handleInput} />
          <InterestsInput profileInput={profileInput} setProfileInput={setProfileInput} handleInput={handleInput} />
          <ProblemTopicsInput profileInput={profileInput} handleInput={handleInput} />
        </div>
      </div>
      <div className='text-center xl:absolute xl:left-4 xl:top-80 mt-10 xl:mt-0 w-full xl:w-40 max-w-xs'>
        <div className='flex xl:flex-col w-full xl:space-y-2.5'>
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
        <button className='mt-5 text-red-600 text-xs' type='button' onClick={deleteAccount} >
          Delete account
        </button>
      </div>
    </form>
  )
}

export default ProfileForm;