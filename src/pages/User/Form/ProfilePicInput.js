import { useState } from 'react';

import defaultPic from '../../../assets/default-profile.jpg';

const ProfilePicInput = ({ pic, setPic, newPic, setNewPic, setProfileInput }) => {
  const [error, setError] = useState(false);

  const selectFile = (e) => {
    const file = e.target.files[0];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (validTypes.includes(file.type)) {
      setNewPic(true);
      setPic(file);
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
    setPic('');
    setProfileInput(prev => ({ ...prev, img: '' }));
  };

  return (
    <>
      <div className='relative xl:w-full'>
        <img
          className='h-36 sm:h-48 rounded-full cursor-pointer'
          id='profile-picture'
          src={
            newPic
              ? URL.createObjectURL(pic)
              : pic
                  ? `data:${pic.contentType};base64,${pic.data}`
                  : defaultPic
          }
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
      <p className='error-msg'>{error && 'Must be jpg, jpeg, or png.'}</p>
    </>
  )
}

export default ProfilePicInput;