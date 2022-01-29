import { v4 as uuidv4 } from 'uuid';

const Messages = ({ msgs, id }) => {
  return (
    <div
      id='msgs-container'
      className='min-h-0 overflow-auto flex-grow flex flex-col space-y-2 mt-4'
    >
      {msgs.map(({ msg, from }) => (
        <p
          key={uuidv4()}
          className={`whitespace-pre-wrap inline-block max-w-3/4 py-1 px-3 rounded-lg sm:text-sm ${from === id ? 'self-end bg-green-700 bg-opacity-50 text-white' : 'w-max bg-gray-200 bg-opacity-30'}`}
        >
          {msg}
        </p>
      ))}
    </div>
  )
}

export default Messages;