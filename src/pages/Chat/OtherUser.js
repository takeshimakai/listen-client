import defaultPic from '../../assets/default-profile.jpg';

const OtherUser = ({ otherUser }) => {
  return (
    <div className='flex flex-col items-center sm:flex-grow sm:max-w-sm'>
      <img
        className='h-20 rounded-full'
        src={
          otherUser && otherUser.img
            ? `data:${otherUser.img.contentType};base64,${otherUser.img.data}`
            : defaultPic
        }
        alt=''
      />
      <p>{otherUser && otherUser.username}</p>
    </div>
  )
}

export default OtherUser;