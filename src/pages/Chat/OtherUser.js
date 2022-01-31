import defaultPic from '../../assets/default-profile.jpg';

const OtherUser = ({ otherUser, toggleView }) => {
  return (
    <div className='flex flex-col items-center'>
      <img
        className='h-20 rounded-full cursor-pointer'
        src={
          otherUser && otherUser.img
            ? `data:${otherUser.img.contentType};base64,${otherUser.img.data}`
            : defaultPic
        }
        alt=''
        onClick={toggleView}
      />
      <p className='mt-2 sm:text-sm cursor-pointer' onClick={toggleView}>
        {otherUser && otherUser.username}
      </p>
    </div>
  )
}

export default OtherUser;