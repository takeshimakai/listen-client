import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "../../../contexts/UserContext";

import ProfilePicInput from "./ProfilePicInput";
import DobInput from "./DobInput";
import GenderInput from "./GenderInput";
import InterestsInput from "./InterestsInput";
import ProblemTopicsInput from "./ProblemTopicsInput";

import PrimaryBtn from '../../../components/PrimaryBtn';
import SecondaryBtn from '../../../components/SecondaryBtn';

import putDataWithFile from "../../../utils/putDataWithFile";
import putData from '../../../utils/putData';
import deleteData from '../../../utils/deleteData';
import formatDateForInput from "../../../utils/formatDateForInput";
import clearTokens from '../../../utils/clearTokens';
import getNewTokensIfExpired from "../../../utils/getNewTokensIfExpired";
import updateTokens from "../../../utils/updateTokens";
import decodeToken from "../../../utils/decodeToken";

const ProfileForm = ({ profile, setProfile, setEditMode }) => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);
  const { id } = decodeToken(token);

  const [err, setErr] = useState();
  const [newPic, setNewPic] = useState(false);
  const [pic, setPic] = useState(profile.img);
  const [profileInput, setProfileInput] = useState({
    username: '',
    dob: '',
    gender: '',
    interests: [],
    problemTopics: [],
    public: []
  });

  useEffect(() => {
    if (profile) {
      const clone = JSON.parse(JSON.stringify(profile));
      
      setProfileInput({
        username: clone.username,
        dob: clone.dob,
        gender: clone.gender,
        interests: clone.interests,
        problemTopics: clone.problemTopics,
        public: clone.public
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const newTokens = await getNewTokensIfExpired(token);

      if (newTokens) {
        updateTokens(newTokens.token, newTokens.refreshToken, setToken);
      }

      let res;

      if (newPic) {
        res = await putDataWithFile('/users', { ...profileInput, img: pic }, newTokens ? newTokens.token : token)
      } else {
        res = await putData('/users', profileInput, newTokens ? newTokens.token : token);
      }

      if (!res.ok) throw res;

      const data = await res.json();

      setProfile(prev => ({
        ...prev,
        img: data.profile.img,
        dob: data.profile.dob ? formatDateForInput(data.profile.dob) : '',
        gender: data.profile.gender,
        interests: data.profile.interests,
        problemTopics: data.profile.problemTopics,
        public: data.profile.public
      }));

      setEditMode(false);
    } catch (err) {
      if (err.status === 401) {
        clearTokens(setToken, id);
        return history.replace('/unauthorized');
      }
      
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
      const newTokens = await getNewTokensIfExpired(token);

      if (newTokens) {
        updateTokens(newTokens.token, newTokens.refreshToken, setToken);
      }

      const res = await deleteData('/users', undefined, newTokens ? newTokens.token : token);

      if (!res.ok) throw res;

      clearTokens(setToken);
    } catch (err) {
      if (err.status === 401) {
        clearTokens(setToken, id);
        return history.replace('/unauthorized');
      }

      console.log(err);
    }
  };

  return (
    <form
      className='pt-16 sm:pt-20 pb-4 sm:pb-10 xl:pb-0 px-4 xl:px-0 xl:mb-20 flex flex-col xl:flex-row items-center xl:items-start xl:relative xl:w-max xl:mx-auto'
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
      <div className='text-center xl:absolute xl:left-4 xl:top-72 mt-10 xl:mt-0 w-full xl:w-40 max-w-xs'>
        <div className='flex xl:flex-col w-full space-x-2 xl:space-x-0 xl:space-y-2.5'>
          <SecondaryBtn label='Cancel' type='button' onClick={() => setEditMode(false)} />
          <PrimaryBtn label='Save' />
        </div>
        <button className='mt-5 text-red-600 text-xs' type='button' onClick={deleteAccount} >
          Delete account
        </button>
      </div>
    </form>
  )
}

export default ProfileForm;