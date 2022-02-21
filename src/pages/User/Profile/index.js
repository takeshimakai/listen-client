import { useState, useEffect, useContext } from "react";
import { Switch, Route, useRouteMatch, Link, useParams, useHistory } from 'react-router-dom';

import UserContext from "../../../contexts/UserContext";

import getData from '../../../utils/getData';
import decodeToken from "../../../utils/decodeToken";
import formatDate from "../../../utils/formatDate";
import defaultPic from '../../../assets/default-profile.jpg';

import ProfileForm from "../Form";
import Card from "./Card";
import FriendBtns from "../../../components/FriendBtns";
import DMForm from "./DMForm";

import useFriendshipStatus from '../../../hooks/useFriendshipStatus';

const Profile = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { userId } = useParams();
  const { token } = useContext(UserContext);
  const { id } = decodeToken(token);

  const { friendshipStatus, setFriendshipStatus } = useFriendshipStatus(userId);
  const [compose, setCompose] = useState(false);
  const [profile, setProfile] = useState({
    img: '',
    username: '',
    dob: '',
    gender: '',
    interests: [],
    problemTopics: []
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
          dob: user.profile.dob ? formatDate(user.profile.dob) : '',
          gender: user.profile.gender || '',
          interests: user.profile.interests || [],
          problemTopics: user.profile.problemTopics || []
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token, userId, id]);

  return (
    <Switch>
      <Route path={`${match.path}/edit`}>
        <ProfileForm setProfile={setProfile} />
      </Route>
      <Route path={match.path}>
        <div className='h-screen xl:h-auto overflow-auto pt-20 sm:pt-24 pb-12 px-12 xl:px-0 flex flex-col xl:flex-row items-center xl:items-start xl:relative xl:w-max xl:mx-auto'>
          {compose && <DMForm userId={userId} username={profile.username} setCompose={setCompose} />}
          <img
            className='h-36 sm:h-48 rounded-full'
            src={
              profile && profile.img
                ? `data:${profile.img.contentType};base64,${profile.img.data}`
                : defaultPic
            }
            alt=''
          />
          <div className='flex-grow flex flex-col items-center xl:items-start xl:ml-20 xl:w-60'>
            <p className='mt-4 xl:mt-0 text-lg font-bold text-gray-800'>{profile && profile.username}</p>
            <div className='space-y-9 mt-9'>
              <Card title='Date of birth' data={profile && profile.dob} />
              <Card title='Gender' data={profile && profile.gender} />
              <Card title='Interests' data={profile && profile.interests} />
              <Card title='Problem topics' data={profile && profile.problemTopics} />
            </div>
          </div>
          <div className='xl:absolute xl:left-4 xl:top-80 mt-12 xl:mt-0 w-full max-w-xs xl:w-40 flex justify-center xl:flex-col space-x-2 xl:space-x-0 xl:space-y-2.5'>
            {userId
              ? <>
                  {friendshipStatus === 'friends' &&
                    <button className='primary-btn w-40' onClick={() => setCompose(true)}>
                      Send message
                    </button>
                  }
                  <FriendBtns
                    userId={userId}
                    friendshipStatus={friendshipStatus}
                    setFriendshipStatus={setFriendshipStatus}
                  />
                </>
              : <Link to={`${match.url}/edit`}>
                  <button className='tertiary-btn w-40'>Edit</button>
                </Link>
            }
          </div>
        </div>
      </Route>
    </Switch>
  )
}

export default Profile;