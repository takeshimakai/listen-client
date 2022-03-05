import defaultPic from '../../assets/default-profile.jpg';

const ProfilePicInput = ({ pic, setProfileInput, err, setErr }) => {
  const selectFile = (e) => {
    const file = e.target.files[0];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!validTypes.includes(file.type)) {
      return setErr(prev => ({ ...prev, picture: 'Must be jpg, jpeg, or png.' }));
    }

    if (file.size > 500000) {
      return setErr(prev => ({ ...prev, picture: 'File must be 0.5 MB or less.' }));
    }

    setErr(prev => ({ ...prev, picture: '' }));
    setProfileInput(prev => ({ ...prev, img: file }));
  };

  const changePic = (e) => {
    if (e.target.id === 'profile-picture') {
      document.querySelector('#img-input').click();
    }
  };

  const deletePic = () => setProfileInput(prev => ({ ...prev, img: '' }));

  return (
    <>
      <p className='font-light sm:text-sm'>Upload a profile picture</p>
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
      <p className='-mt-4 error-msg'>{err && err.picture}</p>
    </>
  )
}

export default ProfilePicInput;