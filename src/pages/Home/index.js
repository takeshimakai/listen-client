import { useContext } from 'react';

import UserContext from '../../contexts/UserContext';

import decodeToken from '../../utils/decodeToken';
import illustrationA from '../../assets/getting-coffee.svg';
import illustrationB from '../../assets/a-day-off.svg';
import illustrationC from '../../assets/public-discussion.svg';

import MenuCard from './MenuCard';

const Dashboard = () => {
  const { token } = useContext(UserContext);
  const { username } = decodeToken(token);

  return (
    <div className='flex flex-col items-center justify-center p-12 mb-12 lg:mb-0 lg:mx-auto space-y-6 lg:space-y-16 lg:h-screen lg:max-w-5xl'>
      <div className='text-center space-y-4 mt-10 lg:mt-0'>
        <h3 className='text-gray-600 font-light'>Hey <span className='font-bold text-green-700'>{username}</span>!</h3>
        <p className='text-gray-600 font-light'>What would you like to do today?</p>
      </div>
      <div className='space-y-28 lg:space-y-0 lg:w-full lg:flex lg:space-x-16'>
        <MenuCard
          illustration={illustrationA}
          summary='Help someone feel heard. Give your time and attention to those in need of a compassionate listener.'
          label='Listen'
          to={{ pathname: '/chat', state: { action: 'listen' } }}
        />
        <MenuCard
          illustration={illustrationB}
          summary='We all need someone to talk to. Connect with a person who wants to be there for you.'
          label='Talk'
          to={{ pathname: '/chat', state: { action: 'talk' } }}
        />
        <MenuCard
          illustration={illustrationC}
          summary="You are not alone. Share and discuss expriences with others."
          label='Join discussions'
          to={{ pathname: '/forum' }}
        />
      </div>
    </div>
  )
}

export default Dashboard;