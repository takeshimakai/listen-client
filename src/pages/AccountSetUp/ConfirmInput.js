import defaultPic from '../../assets/default-profile.jpg';

const ConfirmInput = ({ profileInput }) => {
  return (
    <>
        <p className='font-light sm:text-sm'>Please confirm your information.</p>
        <p className='font-light sm:text-sm'>The username can't be changed once the profile has been saved.</p>
        <div className='mt-6 space-y-0.5 overflow-auto w-full scroll-fade no-scrollbar pt-2 pb-6'>
          <div>
            <p className='subtitle mb-1'>Username</p>
            <p className='sm:text-sm text-gray-900'>{profileInput.username}</p>
          </div>
          <p className='text-5xl text-green-900 text-opacity-40'>&middot;</p>
          <div>
            <p className='subtitle mb-1'>Profile picture</p>
            <img
              className='mx-auto mt-3.5 h-28 rounded-full cursor-pointer'
              src={profileInput.img ? URL.createObjectURL(profileInput.img) : defaultPic}
              alt=''
            />
          </div>
          <p className='text-5xl text-green-900 text-opacity-40'>&middot;</p>
          <div>
            <p className='subtitle mb-1'>Date of birth</p>
            <p className='sm:text-sm text-gray-900'>{profileInput.dob || 'Undisclosed'}</p>
          </div>
          <p className='text-5xl text-green-900 text-opacity-40'>&middot;</p>
          <div>
            <p className='subtitle mb-1'>Gender</p>
            <p className='sm:text-sm text-gray-900'>{profileInput.gender || 'Undisclosed'}</p>
          </div>
          <p className='text-5xl text-green-900 text-opacity-40'>&middot;</p>
          <div>
            <p className='subtitle mb-1'>Interests</p>
            {profileInput.interests.length > 0
              ? <ul>
                  {profileInput.interests.map(interest => (
                    <li className='sm:text-sm text-gray-900' key={interest}>{interest}</li>
                  ))}
                </ul>
              : <p className='sm:text-sm text-gray-900'>Undisclosed</p>
            }
          </div>
          <p className='text-5xl text-green-900 text-opacity-40'>&middot;</p>
          <div>
            <p className='subtitle mb-1'>Relevant topics</p>
            {profileInput.problemTopics.length > 0
              ? <ul>
                  {profileInput.problemTopics
                    .sort((a, b) => {
                      if (a === 'Other') return 1;
                      if (b === 'Other') return -1;
                      if (a < b) return -1;
                      if (a > b) return 1;
                      return 0;
                    })
                    .map(topic => <li className='sm:text-sm text-gray-900' key={topic}>{topic}</li>)
                  }
                </ul>
              : <p className='sm:text-sm text-gray-900'>Undisclosed</p>
            }
          </div>
        </div>
    </>
  )
}

export default ConfirmInput;