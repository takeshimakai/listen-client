import { Link } from 'react-router-dom';

import useWindowWidth from '../../hooks/useWindowWidth';

const MenuCard = ({ illustration, summary, label, to }) => {
  const windowWidth = useWindowWidth();

  const card = (
    <div className='menu-card flex flex-col items-center lg:justify-between max-w-xs space-y-6 lg:space-y-0 lg:p-8 lg:h-88 lg:border lg:rounded-3xl lg:flex-1 lg:flex lg:shadow-md lg:hover:shadow-lg lg:cursor-pointer lg:active:shadow-inner lg:transition-shadow'>
      <img className='h-36' src={illustration} alt='' />
      <p className='text-center text-gray-600 font-light sm:text-sm'>
        {summary}
      </p>
      {windowWidth < 1024
        ? <Link to={to}>
            <button className='shadow-md border border-green-700 hover:bg-green-700 active:shadow-inner-2 text-green-700 hover:text-white text-sm w-40 h-8 rounded-full'>
              {label}
            </button>
          </Link>
        : <div className='menu-card-label space-x-1'>
            <p className='text-sm text-green-700 inline'>{label}</p>
            <p className='menu-card-arrow text-sm text-green-700 inline left-0 transition-all'>&#8594;</p>
          </div>
      }
    </div>
  );

  return (
    windowWidth < 1024
      ? card
      : <Link to={to}>
          {card}
        </Link>
  )
}

export default MenuCard;