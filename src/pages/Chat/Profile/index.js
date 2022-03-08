import defaultPic from '../../../assets/default-profile.jpg';

import useFriendshipStatus from '../../../hooks/useFriendshipStatus';

import Card from './Card';
import FriendBtns from '../../../components/FriendBtns';

const Profile = ({ profile, toggleView }) => {
  const {friendshipStatus, setFriendshipStatus} = useFriendshipStatus(profile.userID);

  return (
    <div className='absolute flex flex-col items-center bg-gray-50 border rounded-lg shadow-lg p-8 sm:p-0 sm:pt-8 sm:px-4 sm:pb-4 mb-4 mx-4 sm:max-w-sm inset-0'>
      <button className='absolute top-1 right-1 w-6 h-6 rounded-full' onClick={toggleView}>
        &#x2715;
      </button>
      <div className='flex flex-col items-center h-full w-full'>
        <div className='text-center'>
          <img
            className='h-24 rounded-full'
            src={
              profile && profile.img
                ? `data:${profile.img.contentType};base64,${profile.img.data}`
                : defaultPic
            }
            alt=''
          />
          <p className='my-4 font-bold text-gray-800'>{profile && profile.username}</p>
        </div>
        <div className='no-scrollbar scroll-fade overflow-auto pt-5 pb-10 w-full h-full space-y-7'>
          <Card title='Date of birth' data={profile.dob} />
          <Card title='Gender' data={profile.gender} />
          <Card title='Interests' data={profile.interests} />
          <Card title='Topics' data={profile.problemTopics} />
        </div>
        <div className='w-full mt-4 text-center space-x-2'>
          <FriendBtns
            userId={profile.userID}
            friendshipStatus={friendshipStatus}
            setFriendshipStatus={setFriendshipStatus}
          />
        </div>
      </div>
    </div>
  )
}

export default Profile;