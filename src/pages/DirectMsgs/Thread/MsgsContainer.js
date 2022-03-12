import displayTimeOrDate from '../../../utils/displayTimeOrDate';

const MsgsContainer = ({ thread }) => {
  const focusMsg = (e) => {
    const body = e.currentTarget.parentNode.querySelector('.body');

    if (body.classList.contains('truncate')) {
      body.classList.remove('truncate', 'text-gray-400');
      body.classList.add('whitespace-pre-wrap');
    } else {
      body.classList.remove('whitespace-pre-wrap');
      body.classList.add('truncate', 'text-gray-400');
    }
  };

  return (
    <div className='space-y-4'>
      {thread && thread.msgs.map((msg, i) => (
        <div className='border rounded-lg shadow-md px-4 py-3' key={msg._id}>
          <div
            className={`${i === thread.msgs.length - 1 ? '' : 'cursor-pointer'} flex justify-between items-center mb-1`}
            onClick={i === thread.msgs.length - 1 ? undefined : focusMsg}
          >
            <p className='sm:text-sm'>{msg.from ? msg.from.profile.username : 'deleted user'}</p>
            <p className='font-light text-xs'>{displayTimeOrDate(msg.dateSent)}</p>
          </div>
          <p className={`${i === thread.msgs.length - 1 ? 'whitespace-pre-wrap' : 'body truncate text-gray-400'} font-light sm:text-sm`}>
            {msg.body}
          </p>
        </div>
      ))}
    </div>
  )
}

export default MsgsContainer;