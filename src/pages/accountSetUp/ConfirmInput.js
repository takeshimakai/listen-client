import { useContext } from "react";

import UserContext from "../../contexts/UserContext";

import postDataWithFile from "../../utils/postDataWithFile";
import setErrMsgs from "../../utils/setErrMsgs";

import defaultPic from '../../assets/default-profile.jpg';

import ProgressBar from "./ProgressBar";

const ConfirmInput = ({ profileInput, step, changeStep, setError }) => {
  const { token, setToken } = useContext(UserContext);

  const handleSubmit = async () => {
    try {
      const res = await postDataWithFile('/users', profileInput, token);
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
    <>
      <div className='account-setup-input-container'>
        <ProgressBar step={step} />
        <div className='h-full flex flex-col'>
          <p className='account-setup-input-title'>Please confirm your information.</p>
          <p className='account-setup-input-title'>The username can't be changed once saved.</p>
          <div className='mt-10 space-y-0.5 overflow-auto'>
            <div>
              <p className='account-setup-confirm-title'>Username</p>
              <p>{profileInput.username}</p>
            </div>
            <p className='separator'>&middot;</p>
            <div>
              <p className='account-setup-confirm-title'>Profile picture</p>
              <img
                className='mx-auto mt-3.5 h-28 rounded-full cursor-pointer'
                src={profileInput.img ? URL.createObjectURL(profileInput.img) : defaultPic}
                alt=''
              />
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
      </div>
      <div className='w-full flex max-w-xs'>
        <button
          className='secondary-btn mr-1'
          value='problemTopics'
          onClick={changeStep}
        >
          Back
        </button>
        <button
          className='primary-btn ml-1'
          onClick={handleSubmit}
        >
          Save profile
        </button>
      </div>
    </>
  )
}

export default ConfirmInput;