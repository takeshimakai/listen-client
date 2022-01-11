import { useState, useEffect } from "react";

import ProgressBar from "./ProgressBar";

import defaultPic from '../../assets/default-profile.jpg';

const ProfilePicInput = ({
  pic,
  setProfileInput,
  step,
  changeStep
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const goNext = () => {
      if (pic) {
        document.querySelector('#next-btn').click();
      }
    };

    window.addEventListener('keydown', goNext);
    return () => window.removeEventListener('keydown', goNext);
  });

  const selectFile = (e) => {
    const file = e.target.files[0];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (validTypes.includes(file.type)) {
      setProfileInput(prev => ({ ...prev, img: file }));
      setError(false);
    } else {
      setError(true);
    }
  };

  const changePic = (e) => {
    if (e.target.id === 'profile-picture') {
      document.querySelector('#img-input').click();
    }
  };

  const deletePic = () => {
    setProfileInput(prev => ({ ...prev, img: '' }));
  };

  return (
    <>
      <div className='account-setup-input-container'>
        <ProgressBar step={step} />
        <p className='account-setup-input-title'>Upload a profile picture.</p>
        <div className='relative mt-10 mx-auto w-max'>
          <img
            className='h-36 sm:h-48 rounded-full cursor-pointer'
            id='profile-picture'
            src={pic ? URL.createObjectURL(pic) : defaultPic}
            alt=''
            onClick={changePic}
          />
          {pic &&
            <button
              className='absolute text-xl text-gray-600 top-0 right-0 sm:right-4 rounded-full h-8 w-8 bg-gray-50'
              type='button'
              onClick={deletePic}
            >
              &#x2715;
            </button>
          }
        </div>
        <input
          className='opacity-0 h-0 w-0'
          id='img-input'
          type='file'
          accept='.jpeg, .jpg, .png'
          onChange={selectFile}
        />
        <p className='-mt-4 error-msg'>{error && 'Must be jpg, jpeg, or png.'}</p>
      </div>
      <div className='w-full flex max-w-xs'>
        <button
          className='secondary-btn mr-1'
          value='username'
          onClick={changeStep}
        >
          Back
        </button>
        <button
          className='primary-btn ml-1'
          id='next-btn'
          value='dob'
          onClick={changeStep}
        >
          {pic ? 'Next' : 'Skip'}
        </button>
      </div>
    </>
  )
}

export default ProfilePicInput;