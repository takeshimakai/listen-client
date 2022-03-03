import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from 'react-router-dom';

import UserContext from "../../../contexts/UserContext";

import getData from '../../../utils/getData';
import decodeToken from "../../../utils/decodeToken";
import formatDateForInput from "../../../utils/formatDateForInput";
import defaultPic from '../../../assets/default-profile.jpg';

import ProfileForm from "../Form";
import Card from "./Card";
import DMForm from "./DMForm";

import FriendBtns from "../../../components/FriendBtns";
import PrimaryBtn from "../../../components/PrimaryBtn";
import TertiaryBtn from "../../../components/TertiaryBtn";

import useFriendshipStatus from '../../../hooks/useFriendshipStatus';

const Profile = () => {
  const history = useHistory();
  const { userId } = useParams();
  const { token } = useContext(UserContext);
  const { id } = decodeToken(token);

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
        const res = await getData(`/users/${userId ? userId : id}`, token);
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
        console.log(err);
      }
    })();
  }, [token, userId, id]);

  return (
    <>
      {compose && <DMForm userId={userId} username={profile.username} setCompose={setCompose} />}
      {editMode
        ? <ProfileForm profile={profile} setProfile={setProfile} setEditMode={setEditMode} />
        : <div className='h-screen pt-20 sm:pt-24 pb-10 px-10 xl:px-0 flex flex-col xl:flex-row items-center xl:items-start xl:relative xl:w-max xl:mx-auto'>
            <img
              className='h-36 sm:h-48 rounded-full'
              src={
                profile && profile.img
                  ? `data:${profile.img.contentType};base64,${profile.img.data}`
                  : defaultPic
              }
              alt=''
            />
            <div className='rounded-xl min-h-0 h-full w-full flex flex-col items-center xl:items-start xl:ml-20 xl:w-60'>
              <p className='mb-4 mt-4 xl:mt-0 xl:mt-0 text-lg font-bold text-gray-800'>{profile && profile.username}</p>
              <div className='scroll-fade no-scrollbar pt-5 pb-10 overflow-auto h-full w-full space-y-9'>
                <Card title='Date of birth' data={profile && profile.dob} />
                <Card title='Gender' data={profile && profile.gender} />
                <Card title='Interests' data={profile && profile.interests} />
                <Card title='Problem topics' data={profile && profile.problemTopics} />
              </div>
            </div>
            <div className='mt-6 xl:mt-0 xl:absolute xl:left-4 xl:top-80 w-full max-w-xs xl:w-40 flex justify-center xl:flex-col space-x-2 xl:space-x-0 xl:space-y-2.5'>
              {userId
                ? <>
                    {friendshipStatus === 'friends' && <PrimaryBtn label='Send message' onClick={() => setCompose(true)} />}
                    <FriendBtns
                      userId={userId}
                      friendshipStatus={friendshipStatus}
                      setFriendshipStatus={setFriendshipStatus}
                    />
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