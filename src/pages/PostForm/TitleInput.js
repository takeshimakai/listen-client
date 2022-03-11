const TitleInput = ({ input, handleInput, errors }) => {
  return (
    <div className='flex flex-col'>
      <label className='subtitle' htmlFor='title'>Title</label>
      <input
        className='rounded-none w-full py-1 border-b border-gray-400 focus:border-gray-700 sm:text-sm text-gray-900 bg-transparent focus:outline-none'
        id='title'
        type='text'
        name='title'
        value={input}
        onChange={handleInput}
      />
      <p className='error-msg'>{errors && errors.title}</p>
    </div>
  )
}

export default TitleInput;