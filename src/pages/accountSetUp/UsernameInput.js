const UsernameInput = ({ profileInput, handleInput, err }) => {
  return (
    <>
      <p className='font-light sm:text-sm'>Please choose a username.</p>
      <div className='w-full flex flex-col justify-center items-center mt-10'>
        <input
          className='text-center w-full py-1 border-b border-gray-500 text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
          type='text'
          name='username'
          value={profileInput.username}
          onChange={handleInput}
        />
        <p className='text-xs mt-1 text-gray-500'>This field is required.</p>
        <p className='error-msg'>{err && err.username}</p>
      </div>
    </>
  )
}

export default UsernameInput;