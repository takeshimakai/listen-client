const Messages = ({ msgs, id }) => {
  return (
    <div id='msgs-container' className='flex-grow flex flex-col space-y-2 mt-4'>
      {msgs.map(({ msg, from }) => (
        <div
          key={msg + from}
          className={
            from === id
              ? 'self-end inline-block max-w-3/4 py-1 px-3 bg-green-700 bg-opacity-50 rounded-lg text-white'
              : 'inline-block w-max max-w-3/4 py-1 px-3 bg-gray-200 bg-opacity-30 rounded-lg'
          }
        >
          {msg}
        </div>
      ))}
    </div>
  )
}

export default Messages;