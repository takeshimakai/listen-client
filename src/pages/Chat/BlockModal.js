import { useHistory } from 'react-router-dom';

const BlockModal = ({ unblock, path, setPreventNav }) => {
  const history = useHistory();

  const confirmNav = () => {
    sessionStorage.removeItem('roomID');
    unblock.current();
    history.push(path);
  };

  return (
    <div className='bg-gray-200 bg-opacity-60 absolute m-auto inset-0 z-10 flex justify-center items-center'>
      <div className='bg-gray-50 w-3/4 border rounded-lg shadow-md p-4'>
        <div className='text-center'>
          <p>You will be disconnected.</p>
          <p>Are you sure you want to leave?</p>
        </div>
        <div className='flex mt-6'>
          <button className='secondary-btn mr-1' onClick={() => setPreventNav(false)}>Cancel</button>
          <button className='primary-btn ml-1' onClick={confirmNav}>Yes</button>
        </div>
      </div>
    </div>
  )
}

export default BlockModal;