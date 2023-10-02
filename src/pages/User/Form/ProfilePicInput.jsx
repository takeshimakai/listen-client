import defaultPic from '../../../assets/default-profile.jpg';

const ProfilePicInput = ({ pic, setPic, newPic, setNewPic, setProfileInput, err, setErr }) => {
  const selectFile = (e) => {
    const file = e.target.files[0];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!validTypes.includes(file.type)) {
      return setErr('Must be jpg, jpeg, or png.');
    }

    if (file.size > 500000) {
      return setErr('File must be 0.5 MB or less.')
    }

    setNewPic(true);
    setPic(file);
    setErr();
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
    <div className='flex flex-col items-center xl:w-full'>
      <div className='relative'>
        <img
          className='h-36 w-36 sm:h-48 sm:w-48 object-cover rounded-full cursor-pointer'
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
        id='img-input'
        type='file'
        accept='.jpeg, .jpg, .png'
        onChange={selectFile}
        hidden
      />
      <p className='error-msg text-center'>{err && err}</p>
    </div>
  )
}

export default ProfilePicInput;