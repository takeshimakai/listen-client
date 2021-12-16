import { useState, useEffect, useContext } from "react";
import { Switch, Route, useRouteMatch, Link, useParams } from 'react-router-dom';

import UserContext from "../../../contexts/UserContext";

import getData from '../../../utils/getData';
import decodeToken from "../../../utils/decodeToken";
import formatDate from "../../../utils/formatDate";
import defaultPic from '../../../assets/default-profile.jpg';

import ProfileForm from "../Form";

const Profile = () => {
  const match = useRouteMatch();
  const { userId } = useParams();
  const { token } = useContext(UserContext);

  const [profile, setProfile] = useState({
    username: '',
    dob: '',
    gender: '',
    interests: [],
    problemTopics: [],
    hidden: []
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getData(`/users/${userId ? userId : decodeToken(token).id}`, token);
        const { profile } = await res.json();

        setProfile({
          username: profile.username,
          dob: profile.dob ? formatDate(profile.dob) : '',
          gender: profile.gender || '',
          interests: profile.interests || [],
          problemTopics: profile.problemTopics || [],
          hidden: profile.hidden || []
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
        <div className='pt-20 sm:pt-24 pb-12 xl:pb-0 px-12 xl:px-0 flex flex-col xl:flex-row items-center xl:items-start xl:relative xl:w-max xl:mx-auto'>
          <img className='h-36 sm:h-48 rounded-full' src={defaultPic} alt='' />
          <div className='flex flex-col items-center xl:items-start xl:ml-20'>
            <p className='mt-4 xl:mt-0 text-lg font-bold'>{profile.username}</p>
            <div className='space-y-9 mt-9'>
              <div className='text-center xl:text-left'>
                <h4 className='text-gray-600 font-light sm:text-sm'>Date of birth</h4>
                <p className='mt-1'>{profile.dob}</p>
              </div>
              <div className='text-center xl:text-left'>
                <h4 className='text-gray-600 font-light sm:text-sm'>Gender</h4>
                <p className='mt-1'>{profile.gender}</p>
              </div>
              <div className='text-center xl:text-left'>
                <h4 className='text-gray-600 font-light sm:text-sm'>Interests</h4>
                <ul className='mt-1'>
                  {profile.interests.map(interest => <li key={interest}>{interest}</li>)}
                </ul>
              </div>
              <div className='text-center xl:text-left'>
                <h4 className='text-gray-600 font-light sm:text-sm'>Problem topics</h4>
                <ul className='mt-1'>
                  {profile.problemTopics.map(topic => <li key={topic}>{topic}</li>)}
                </ul>
              </div>
            </div>
          </div>
          {!userId &&
            <Link to={`${match.url}/edit`} className='xl:absolute xl:left-4 xl:top-80 mt-12 xl:mt-0'>
              <button
                className='shadow-md border border-green-700 hover:bg-green-700 active:shadow-inner-2 text-green-700 hover:text-white text-sm w-40 h-8 rounded-md'
              >
                Edit
              </button>
            </Link>
          }
        </div>
      </Route>
    </Switch>
  )
}

export default Profile;