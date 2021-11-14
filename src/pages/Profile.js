import { useState, useEffect, useContext } from "react";
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';

import UserContext from "../contexts/UserContext";

import getData from '../utils/getData';
import decodeToken from "../utils/decodeToken";
import formatDate from "../utils/formatDate";

import ProfileForm from "./dashboard/ProfileForm";

const Profile = ({ userId }) => {
  const match = useRouteMatch();
  const { token } = useContext(UserContext);

  const [profile, setProfile] = useState({
    username: '',
    dob: '',
    gender: '',
    interests: [],
    problemTopics: [],
    hidden: []
  });

  const isMyProfile = userId === decodeToken(token).id;

  useEffect(() => {
    (async () => {
      try {
        const res = await getData(`/users/${userId}`, token);
        const { profile } = await res.json();

        setProfile({
          username: profile.username,
          dob: !profile.dob ? '' : formatDate(profile.dob),
          gender: profile.gender,
          interests: profile.interests,
          problemTopics: profile.problemTopics,
          hidden: profile.hidden
        })
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token, userId]);

  return (
    <Switch>
      <Route path={`${match.path}/edit`}>
        <ProfileForm profile={profile} setProfile={setProfile} />
      </Route>
      <Route path={match.path}>
        <div id='user-profile'>
          <h2 id='user-profile-username'>{profile.username}</h2>
          <div className='user-profile-category'>
            <h4 className='user-profile-category-title'>Date of birth:</h4>
            <p className='user-profile-category-description'>{profile.dob}</p>
          </div>
          <div className='user-profile-category'>
            <h4 className='user-profile-category-title'>Gender:</h4>
            <p className='user-profile-category-description'>{profile.gender}</p>
          </div>
          <div className='user-profile-category'>
            <h4 className='user-profile-category-title'>Interests:</h4>
            <p className='user-profile-category-description'>{profile.interests}</p>
          </div>
          <div className='user-profile-category'>
            <h4 className='user-profile-category-title'>Problem topics:</h4>
            <p className='user-profile-category-description'>{profile.problemTopics}</p>
          </div>
          {isMyProfile &&
            <div className='user-profile-category'>
              <h4 className='user-profile-category-title'>Hidden fields:</h4>
              <p className='user-profile-category-description'>{profile.hidden}</p>
            </div>
          }
          {isMyProfile &&
            <Link to={`${match.url}/edit`}>Edit</Link>
          }
        </div>
      </Route>
    </Switch>
  )
}

export default Profile;