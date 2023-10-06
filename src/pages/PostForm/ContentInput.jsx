const ContentInput = ({ input, handleInput, error }) => {
  return (
    <div className='flex-grow flex flex-col gap-y-1'>
      <textarea
        className='resize-none p-2 flex-grow w-full border border-gray-400 focus:border-gray-700 rounded sm:text-sm text-gray-900 focus:outline-none'
        name='content'
        value={input}
        placeholder="What's on your mind?"
        onChange={handleInput}
      />
      {error && <p className='error-msg pb-8'>{error}</p>}
    </div>
  )
}

export default ContentInput;