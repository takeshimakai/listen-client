import { useContext } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import decodeToken from '../../utils/decodeToken';

import Friends from './Friends';
import ForumActivity from './ForumActivity';
import Profile from '../Profile';

const Dashboard = () => {
  const match = useRouteMatch();
  const { token } = useContext(UserContext);
  const { username } = decodeToken(token);

  return (
    <div>
      <Link to={`${match.url}`}>Dashboard</Link>
      <Link to={`${match.url}/profile`}>Profile</Link>
      <Link to={`${match.url}/friends`}>Friends</Link>
      <Link to={`${match.url}/forum-activity`}>Forum Activity</Link>

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
          <h3>Hey {username}!</h3>
          <p>What do you feel like doing today?</p>
        </Route>
      </Switch>
    </div>
  )
}

export default Dashboard;