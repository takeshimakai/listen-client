import { useContext } from "react";

import UserContext from "../../../contexts/UserContext";

import postData from '../../../utils/postData';
import putData from "../../../utils/putData";
import deleteData from '../../../utils/deleteData';

const FriendBtn = ({ userId, friendshipStatus, setFriendshipStatus }) => {
  const { token } = useContext(UserContext);

  const sendRequest = async () => {
    try {
      const res = await postData('/friends/requests', { userId }, token);
      if (res.ok) {
        setFriendshipStatus('sent');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRequest = async () => {
    try {
      const res = await deleteData('/friends/requests', { userId }, token);

      if (res.ok) {
        setFriendshipStatus('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const acceptRequest = async () => {
    try {
      const res = await putData('/friends/requests', { userId }, token);

      if (res.ok) {
        setFriendshipStatus('friends');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unfriend = async () => {
    try {
      const res = await deleteData(`/friends`, { userId }, token);

      if (res.ok) {
        setFriendshipStatus('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  switch (friendshipStatus) {
    case 'friends':
      return (
        <button
          className='tertiary-btn mt-12 xl:mt-0 xl:absolute xl:left-4 xl:top-80 w-40'
          onClick={unfriend}
        >
          Unfriend
        </button>
      )
    case 'received':
      return (
        <div className='xl:absolute xl:left-4 xl:top-80 mt-12 xl:mt-0 w-full xl:w-40 flex xl:block max-w-xs xl:space-y-2.5'>
          <button
            className='secondary-btn mr-1 xl:mr-0'
            onClick={deleteRequest}
          >
            Decline request
          </button>
          <button
            className='primary-btn ml-1 xl:ml-0'
            onClick={acceptRequest}
          >
            Accept request
          </button>
        </div>
      )
    case 'sent':
      return (
        <button
          className='tertiary-btn mt-12 xl:mt-0 xl:absolute xl:left-4 xl:top-80 w-40'
          onClick={deleteRequest}
        >
          Cancel request
        </button>
      )
    default:
      return (
        <button
          className='tertiary-btn mt-12 xl:mt-0 xl:absolute xl:left-4 xl:top-80 w-40'
          onClick={sendRequest}
        >
          Send friend request
        </button>
      )
  }
}

export default FriendBtn;