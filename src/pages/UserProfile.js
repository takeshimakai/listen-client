import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';

import UserContext from "../contexts/UserContext";

import getData from '../utils/getData';

const UserProfile = () => {
  const { token } = useContext(UserContext);
  const { userId } = useParams();

  const [user, setUser] = useState({
    username: '',
    dob: '',
    gender: '',
    interests: '',
    problemTopics: '',
    hidden: ''
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getData(`/users/${userId}`, token);

        const { profile } = await res.json();

        Object.entries(profile).forEach(([key, value]) => {
          setUser(prevUser => ({ ...prevUser, [key]: value }))
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token, userId]);

  return (
    <div id='user-profile'>
      <h2 id='user-profile-username'>{user.username}</h2>
      <div className='user-profile-category'>
        <h3 className='user-profile-category-title'>Date of birth:</h3>
        <p className='user-profile-category-description'>{user.dob}</p>
      </div>
      <div className='user-profile-category'>
        <h3 className='user-profile-category-title'>Gender:</h3>
        <p className='user-profile-category-description'>{user.gender}</p>
      </div>
      <div className='user-profile-category'>
        <h3 className='user-profile-category-title'>Interests:</h3>
        <p className='user-profile-category-description'>{user.interests}</p>
      </div>
      <div className='user-profile-category'>
        <h3 className='user-profile-category-title'>Problem topics:</h3>
        <p className='user-profile-category-description'>{user.problemTopics}</p>
      </div>
      {user.hidden &&
        <div className='user-profile-category'>
          <h3 className='user-profile-category-title'>Hidden fields:</h3>
          <p className='user-profile-category-description'>{user.hidden}</p>
        </div>
      }
    </div>
  )
}

export default UserProfile;