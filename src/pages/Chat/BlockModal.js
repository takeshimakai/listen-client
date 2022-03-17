import { useHistory } from 'react-router-dom';
import { useContext } from 'react';

import SocketContext from '../../contexts/SocketContext';

import PrimaryBtn from '../../components/PrimaryBtn';
import SecondaryBtn from '../../components/SecondaryBtn';

const BlockModal = ({ unblock, path, setPreventNav, setOtherUserLeft }) => {
  const history = useHistory();
  const socket = useContext(SocketContext);

  const confirmNav = () => {
    setOtherUserLeft(false);
    socket.emit('leave room');
    sessionStorage.removeItem('roomID');
    unblock.current();
    history.push({ pathname: path.pathname, state: path.state });
  };

  return (
    <div className='bg-gray-200 bg-opacity-60 fixed m-auto inset-0 px-4 z-10 flex justify-center items-center'>
      <div className='bg-gray-50 border rounded-lg shadow-md px-4 pb-4 pt-8 w-full sm:w-max'>
        <div className='text-center'>
          <p className='font-light sm:text-sm'>You will be disconnected.</p>
          <p className='font-light sm:text-sm'>Are you sure you want to leave?</p>
        </div>
        <div className='flex mx-auto mt-6 max-w-xs space-x-2'>
          <SecondaryBtn label='Cancel' onClick={() => setPreventNav(false)} />
          <PrimaryBtn label='Yes' onClick={confirmNav} />
        </div>
      </div>
    </div>
  )
}

export default BlockModal;