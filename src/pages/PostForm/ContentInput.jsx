const ContentInput = ({ input, handleInput, errors }) => {
  return (
    <div className='flex-grow flex flex-col'>
      <textarea
        className='resize-none p-2 flex-grow w-full border border-gray-400 focus:border-gray-700 rounded sm:text-sm text-gray-900 focus:outline-none'
        name='content'
        value={input}
        placeholder="What's on your mind?"
        onChange={handleInput}
      />
      <p className='error-msg pb-8'>{errors && errors.content}</p>
    </div>
  )
}

export default ContentInput;