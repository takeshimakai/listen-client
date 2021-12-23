import defaultPic from '../../assets/default-profile.jpg';

const UserPreview = ({ user }) => {
  return (
    <>
      <img className='h-10 sm:h-20 rounded-full' src={defaultPic} alt='' />
      <p className='ml-2 sm:ml-0 truncate sm:w-full sm:text-center'>{user.profile.username}</p>
    </>
  )
}

export default UserPreview;