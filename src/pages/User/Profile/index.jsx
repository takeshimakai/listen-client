import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from 'react-router-dom';

import UserContext from "../../../contexts/UserContext";

import getData from '../../../utils/getData';
import decodeToken from "../../../utils/decodeToken";
import formatDateForInput from "../../../utils/formatDateForInput";
import getNewTokensIfExpired from '../../../utils/getNewTokensIfExpired';
import updateTokens from '../../../utils/updateTokens';
import clearTokens from "../../../utils/clearTokens";

import defaultPic from '../../../assets/default-profile.jpg';

import ProfileForm from "../Form";
import Card from "./Card";
import DMForm from "./DMForm";

import FriendBtns from "../../../components/FriendBtns";
import PrimaryBtn from "../../../components/PrimaryBtn";
import TertiaryBtn from "../../../components/TertiaryBtn";

import useFriendshipStatus from '../../../hooks/useFriendshipStatus';
import useWindowWidth from '../../../hooks/useWindowWidth';

const Profile = () => {
  const history = useHistory();
  const { userId } = useParams();
  const { token, setToken } = useContext(UserContext);
  const { id } = decodeToken(token);

  const windowWidth = useWindowWidth();
  const { friendshipStatus, setFriendshipStatus } = useFriendshipStatus(userId);
  const [editMode, setEditMode] = useState(false);
  const [compose, setCompose] = useState(false);
  const [profile, setProfile] = useState({
    img: '',
    username: '',
    dob: '',
    gender: '',
    interests: [],
    problemTopics: [],
    public: []
  });
 
  useEffect(() => {
    if (userId === id) {
      history.replace('/profile');
    }
  }, [history, id, userId]);

  useEffect(() => {
    (async () => {
      try {
        const newTokens = await getNewTokensIfExpired(token);

        if (newTokens) {
          return updateTokens(newTokens.token, newTokens.refreshToken, setToken);
        }

        const res = await getData(`/users/${userId ? userId : id}`, token);

        if (!res.ok) throw res;

        const user = await res.json();

        setProfile({
          img: user.profile.img,
          username: user.profile.username,
          dob: user.profile.dob ? formatDateForInput(user.profile.dob) : '',
          gender: user.profile.gender || '',
          interests: user.profile.interests || [],
          problemTopics: user.profile.problemTopics || [],
          public: user.profile.public || []
        });
      } catch (err) {
        if (err.status === 401) {
          clearTokens(setToken, id);
          return history.replace('/unauthorized');
        }

        console.log(err);
      }
    })();
  }, [token, userId, id, history, setToken]);

  useEffect(() => {
    const box = document.querySelector('#user-profile');

    if (windowWidth >= 1280 && box) {
      box.style.maxHeight = window.innerHeight * 0.75 + 'px';
    }
  }, [windowWidth, editMode]);

  return (
    <>
      {compose && <DMForm userId={userId} username={profile.username} setCompose={setCompose} />}
      {editMode
        ? <ProfileForm profile={profile} setProfile={setProfile} setEditMode={setEditMode} />
        : windowWidth >= 1280
          ? <div className='flex-grow pt-20 grid grid-cols-2 gap-x-20'>
              <div className='justify-self-end'>
                <div>
                  <img
                    className='h-48 w-48 rounded-full object-cover'
                    src={
                      profile && profile.img
                        ? `data:${profile.img.contentType};base64,${profile.img.data}`
                        : defaultPic
                    }
                    alt=''
                  />
                </div>
                <div className='flex flex-col items-center space-y-2.5 mt-6'>
                  {userId
                    ? <>
                        <FriendBtns
                          userId={userId}
                          friendshipStatus={friendshipStatus}
                          setFriendshipStatus={setFriendshipStatus}
                        />
                        {friendshipStatus === 'friends' && <PrimaryBtn label='Send message' onClick={() => setCompose(true)} />}
                      </>
                    : <TertiaryBtn label='Edit' onClick={() => setEditMode(true)} />
                  }
                </div>
              </div>
              <div>
                <p className='text-lg font-bold text-gray-800 mb-4'>{profile && profile.username}</p>
                <div id='user-profile' className='scroll-fade no-scrollbar pt-5 pb-10 overflow-auto space-y-9'>
                  <Card title='Date of birth' data={profile && profile.dob} />
                  <Card title='Gender' data={profile && profile.gender} />
                  <Card title='Interests' data={profile && profile.interests} />
                  <Card title='Topics' data={profile && profile.problemTopics} />
                </div>
              </div>
            </div>
          : <div className='flex-grow max-h-screen pt-16 sm:pt-20 pb-4 sm:pb-10 px-4 flex flex-col items-center'>
              <div>
                <img
                  className='h-36 w-36 sm:h-48 sm:w-48 rounded-full object-cover'
                  src={
                    profile && profile.img
                      ? `data:${profile.img.contentType};base64,${profile.img.data}`
                      : defaultPic
                  }
                  alt=''
                />
              </div>
              <div className='min-h-0 flex-grow w-full flex flex-col items-center'>
                <p className='mb-4 mt-4 text-lg font-bold text-gray-800'>{profile && profile.username}</p>
                <div className='scroll-fade no-scrollbar pt-5 pb-10 overflow-auto w-full space-y-9'>
                  <Card title='Date of birth' data={profile && profile.dob} />
                  <Card title='Gender' data={profile && profile.gender} />
                  <Card title='Interests' data={profile && profile.interests} />
                  <Card title='Topics' data={profile && profile.problemTopics} />
                </div>
              </div>
              <div className='mt-6 w-full max-w-xs flex justify-center space-x-2'>
                {userId
                  ? <>
                      <FriendBtns
                        userId={userId}
                        friendshipStatus={friendshipStatus}
                        setFriendshipStatus={setFriendshipStatus}
                      />
                      {friendshipStatus === 'friends' && <PrimaryBtn label='Send message' onClick={() => setCompose(true)} />}
                    </>
                  : <TertiaryBtn label='Edit' onClick={() => setEditMode(true)} />
                }
              </div>
            </div>
      }
    </>
  )
}

export default Profile;