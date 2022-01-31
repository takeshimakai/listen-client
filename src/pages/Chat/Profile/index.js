import defaultPic from '../../../assets/default-profile.jpg';

import Card from './Card';
import FriendBtns from './FriendBtns';

const Profile = ({ profile, toggleView, socket }) => {
  return (
    <div className='absolute flex flex-col items-center bg-gray-50 border rounded-lg shadow-lg p-8 sm:p-0 sm:pt-8 sm:px-4 sm:pb-4 mb-4 mx-4 sm:max-w-sm inset-0'>
      <button className='absolute top-1 right-1 w-6 h-6 rounded-full' onClick={toggleView}>
        &#x2715;
      </button>
      <div className='flex flex-col items-center h-full w-full'>
        <div className='flex flex-col items-center'>
          <img
            className='h-24 rounded-full'
            src={
              profile && profile.img
                ? `data:${profile.img.contentType};base64,${profile.img.data}`
                : defaultPic
            }
            alt=''
          />
          <p className='mt-4 font-bold text-gray-800'>{profile && profile.username}</p>
        </div>
        <div className='overflow-auto w-full flex-grow flex flex-col items-center space-y-7 mt-9'>
          <Card title='Date of birth' data={profile && profile.dob} />
          <Card title='Gender' data={profile && profile.gender} />
          <Card title='Interests' data={profile && profile.interests} />
          <Card title='Problem topics' data={profile && profile.problemTopics} />
        </div>
        <FriendBtns socket={socket} />
      </div>
    </div>
  )
}

export default Profile;