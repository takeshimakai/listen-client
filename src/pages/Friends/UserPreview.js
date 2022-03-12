import defaultPic from '../../assets/default-profile.jpg';

const UserPreview = ({ user }) => {
  return (
    <>
      <img
        className='h-10 w-10 sm:h-20 sm:w-20 object-cover rounded-full'
        src={
          user.profile.img
            ? `data:${user.profile.img.contentType};base64,${user.profile.img.data}`
            : defaultPic
        }
        alt=''
      />
      <p className='ml-2 sm:ml-0 truncate sm:w-full sm:text-center sm:text-sm font-light'>{user.profile.username}</p>
    </>
  )
}

export default UserPreview;