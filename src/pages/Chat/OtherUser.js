import defaultPic from '../../assets/default-profile.jpg';

const OtherUser = ({ otherUser }) => {
  return (
    <div className='flex flex-col items-center'>
      <img
        className='h-20 rounded-full'
        src={
          otherUser && otherUser.img
            ? `data:${otherUser.img.contentType};base64,${otherUser.img.data}`
            : defaultPic
        }
        alt=''
      />
      <p className='font-light mt-1 sm:text-sm'>{otherUser && otherUser.username}</p>
    </div>
  )
}

export default OtherUser;