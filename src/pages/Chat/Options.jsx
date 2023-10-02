const Options = ({ leaveConversation }) => {
  return (
    <button
      className='hidden md:block text-red-600 font-light text-sm mb-2.5'
      onClick={leaveConversation}
    >
      Leave conversation
    </button>
  )
}

export default Options;