const ContentInput = ({ input, handleInput, errors }) => {
  return (
    <div className='flex-grow pb-12'>
      <textarea
        className='resize-none p-1 h-full w-full border border-gray-500 focus:border-gray-900 rounded sm:text-sm text-gray-900 focus:outline-none'
        name='content'
        value={input}
        placeholder="What's on your mind?"
        onChange={handleInput}
      />
      <p className='error-msg'>{errors && errors.content}</p>
    </div>
  )
}

export default ContentInput;