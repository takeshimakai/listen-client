import defaultPic from '../../assets/default-profile.jpg';

const ConfirmInput = ({ profileInput }) => {
  return (
    <>
        <p className='font-light'>Please confirm your information.</p>
        <p className='font-light'>The username can't be changed once saved.</p>
        <div className='mt-10 space-y-0.5 overflow-auto w-full'>
          <div>
            <p className='text-gray-500 font-light mb-1.5 text-sm'>Username</p>
            <p>{profileInput.username}</p>
          </div>
          <p className='text-5xl text-green-900 text-opacity-40'>&middot;</p>
          <div>
            <p className='text-gray-500 font-light mb-1.5 text-sm'>Profile picture</p>
            <img
              className='mx-auto mt-3.5 h-28 rounded-full cursor-pointer'
              src={profileInput.img ? URL.createObjectURL(profileInput.img) : defaultPic}
              alt=''
            />
          </div>
          <p className='text-5xl text-green-900 text-opacity-40'>&middot;</p>
          <div>
            <p className='text-gray-500 font-light mb-1.5 text-sm'>Date of birth</p>
            <p>{profileInput.dob || 'Undisclosed'}</p>
          </div>
          <p className='text-5xl text-green-900 text-opacity-40'>&middot;</p>
          <div>
            <p className='text-gray-500 font-light mb-1.5 text-sm'>Gender</p>
            <p>{profileInput.gender || 'Undisclosed'}</p>
          </div>
          <p className='text-5xl text-green-900 text-opacity-40'>&middot;</p>
          <div>
            <p className='text-gray-500 font-light mb-1.5 text-sm'>Interests</p>
            {profileInput.interests.length > 0
              ? <ul>
                  {profileInput.interests.map(interest => <li key={interest}>{interest}</li>)}
                </ul>
              : <p>Undisclosed</p>
            }
          </div>
          <p className='text-5xl text-green-900 text-opacity-40'>&middot;</p>
          <div>
            <p className='text-gray-500 font-light mb-1.5 text-sm'>Problem topics</p>
            {profileInput.problemTopics.length > 0
              ? <ul>
                  {profileInput.problemTopics.map(topic => <li key={topic}>{topic}</li>)}
                </ul>
              : <p>Undisclosed</p>
            }
          </div>
        </div>
    </>
  )
}

export default ConfirmInput;