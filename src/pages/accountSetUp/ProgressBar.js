import { useState, useEffect } from "react";

const ProgressBar = ({ step }) => {
  const [current, setCurrent] = useState();

  useEffect(() => {
    switch (step) {
      case 'username':
        return setCurrent(0);
      case 'picture':
        return setCurrent(1);
      case 'dob':
        return setCurrent(2);
      case 'gender':
        return setCurrent(3);
      case 'interests':
        return setCurrent(4);
      case 'problemTopics':
        return setCurrent(5);
      case 'confirm':
        return setCurrent(6);
      default:
        return;
    }
  }, [step]);

  return (
    <div className='absolute top-0 left-0 w-full flex h-3 pt-1 px-1'>
      <div className={`progress-bar rounded-l ${current >= 0 && 'progress-bar-fill'}`} />
      <div className={`progress-bar ${current > 0 && 'progress-bar-fill'}`} />
      <div className={`progress-bar ${current > 1 && 'progress-bar-fill'}`} />
      <div className={`progress-bar ${current > 2 && 'progress-bar-fill'}`} />
      <div className={`progress-bar ${current > 3 && 'progress-bar-fill'}`} />
      <div className={`progress-bar ${current > 4 && 'progress-bar-fill'}`} />
      <div className={`progress-bar rounded-r ${current > 5 && 'progress-bar-fill'}`} />
    </div>
  )
}

export default ProgressBar;