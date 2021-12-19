import { useContext } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import decodeToken from '../../utils/decodeToken';
import illustrationA from '../../assets/getting-coffee.svg';
import illustrationB from '../../assets/a-day-off.svg';
import illustrationC from '../../assets/public-discussion.svg';

import Friends from './Friends';
import ForumActivity from './ForumActivity';
import Profile from '../User/Profile';
import MenuCard from './MenuCard';

const Dashboard = () => {
  const match = useRouteMatch();
  const { token } = useContext(UserContext);
  const { username } = decodeToken(token);

  return (
    <Switch>
      <Route path={`${match.path}/profile`}>
        <Profile />
      </Route>
      <Route path={`${match.path}/friends`}>
        <Friends />
      </Route>
      <Route path={`${match.path}/forum-activity`}>
        <ForumActivity />
      </Route>
      <Route path={match.path}>
        <div className='flex flex-col items-center justify-center p-12 mb-12 xl:mb-0 xl:mx-auto space-y-6 xl:space-y-16 xl:h-screen xl:max-w-5xl'>
          <div className='text-center space-y-4 mt-10 xl:mt-0'>
            <h3 className='text-gray-600 font-light'>Hey <span className='font-bold text-green-700'>{username}</span>!</h3>
            <p className='text-gray-600 font-light'>What would you like to do today?</p>
          </div>
          <div className='space-y-28 xl:space-y-0 xl:w-full xl:flex xl:space-x-16'>
            <MenuCard
              illustration={illustrationA}
              summary='Help someone feel heard by giving your time and attention to those in need of a compassionate listener.'
              label='Listen'
              path='/listen'
            />
            <MenuCard
              illustration={illustrationB}
              summary='We all need someone to talk to sometimes. Connect with someone who wants to be there for you.'
              label='Talk'
              path='/talk'
            />
            <MenuCard
              illustration={illustrationC}
              summary="Join the discussions and see that you're not alone."
              label='Join Discussions'
              path='/forum'
            />
          </div>
        </div>
      </Route>
    </Switch>
  )
}

export default Dashboard;