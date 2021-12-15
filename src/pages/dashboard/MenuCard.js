import { useState, useEffect } from "react";

const MenuCard = ({ illustration, summary, label }) => {
  const [isLessThan1280, setIsLessThan1280] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const updateIsLessThan1280 = () => setIsLessThan1280(window.innerWidth < 1280);

    window.addEventListener('resize', updateIsLessThan1280);
    return () => window.removeEventListener('resize', updateIsLessThan1280);
  });

  return (
    <div className='menu-card flex flex-col items-center xl:justify-between max-w-xs space-y-6 xl:space-y-0 xl:p-8 xl:h-88 xl:border xl:rounded-3xl xl:flex-1 xl:flex xl:shadow-md xl:hover:shadow-lg xl:cursor-pointer xl:active:shadow-inner'>
      <img className='h-36' src={illustration} alt='' />
      <p className='text-center text-gray-600 font-light xl:text-sm'>
        {summary}
      </p>
      {isLessThan1280
        ? <button className='shadow-md border border-green-700 hover:bg-green-700 active:shadow-inner-2 text-green-700 hover:text-white text-sm w-40 h-8 rounded-full'>
            {label}
          </button>
        : <div className='space-x-1'>
            <p className='text-sm text-green-700 inline'>{label}</p>
            <p className='menu-card-arrow text-sm text-green-700 inline left-0 transition-all'>&#8594;</p>
          </div>
      }
    </div>
  )
}

export default MenuCard;