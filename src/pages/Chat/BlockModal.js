import { useHistory } from 'react-router-dom';

const BlockModal = ({ unblock, path, setPreventNav, socket }) => {
  const history = useHistory();

  const confirmNav = () => {
    socket.emit('leave room');
    sessionStorage.removeItem('roomID');
    unblock.current();
    history.push({ pathname: path.pathname, state: path.state });
  };

  return (
    <div className='bg-gray-200 bg-opacity-60 absolute m-auto inset-0 z-10 flex justify-center items-center'>
      <div className='bg-gray-50 w-3/4 sm:max-w-lg border rounded-lg shadow-md px-4 pb-4 pt-8'>
        <div className='text-center'>
          <p className='font-light sm:text-sm'>You will be disconnected.</p>
          <p className='font-light sm:text-sm'>Are you sure you want to leave?</p>
        </div>
        <div className='flex mx-auto mt-6 max-w-xs'>
          <button className='secondary-btn mr-1' onClick={() => setPreventNav(false)}>Cancel</button>
          <button className='primary-btn ml-1' onClick={confirmNav}>Yes</button>
        </div>
      </div>
    </div>
  )
}

export default BlockModal;