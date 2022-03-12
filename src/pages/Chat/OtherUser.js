import defaultPic from '../../assets/default-profile.jpg';

const OtherUser = ({ otherUser, toggleView }) => {
  return (
    <div className='relative flex flex-col items-center w-max mx-auto'>
      <div className={`absolute right-1 w-4 h-4 rounded-full ${otherUser.isConnected ? 'bg-green-500' : 'bg-red-600'}`} />
      <img
        className='h-20 w-20 object-cover rounded-full cursor-pointer'
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