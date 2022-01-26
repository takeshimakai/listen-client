import { useState, useEffect } from 'react';

const ProgressBar = ({ step }) => {
  const [current, setCurrent] = useState();
  const style = 'h-full w-1/5 border border-gray-300 mx-px';

  useEffect(() => {
    switch (step) {
      case 'age':
        return setCurrent(0);
      case 'gender':
        return setCurrent(1);
      case 'interests':
        return setCurrent(2);
      case 'problemTopics':
        return setCurrent(3);
      case 'confirm':
        return setCurrent(4);
      default:
        return;
    }
  }, [step]);

  return (
    <div className='absolute top-0 left-0 w-full flex h-3 pt-1 px-1'>
      <div className={`${style} rounded-l ${current >= 0 && 'progress-bar-fill'}`} />
      <div className={`${style} ${current > 0 && 'progress-bar-fill'}`} />
      <div className={`${style} ${current > 1 && 'progress-bar-fill'}`} />
      <div className={`${style} ${current > 2 && 'progress-bar-fill'}`} />
      <div className={`${style} rounded-r ${current > 3 && 'progress-bar-fill'}`} />
    </div>
  )
}

export default ProgressBar;