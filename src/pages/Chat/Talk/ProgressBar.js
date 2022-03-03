import { useState, useEffect } from 'react';

const ProgressBar = ({ step }) => {
  const [current, setCurrent] = useState();

  const styles = {
    bar: 'h-full w-1/5 border border-gray-300 mx-px',
    fill: 'bg-green-900 bg-opacity-40'
  };

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
      <div className={`${styles.bar} rounded-l ${current >= 0 && styles.fill}`} />
      <div className={`${styles.bar} ${current > 0 && styles.fill}`} />
      <div className={`${styles.bar} ${current > 1 && styles.fill}`} />
      <div className={`${styles.bar} ${current > 2 && styles.fill}`} />
      <div className={`${styles.bar} rounded-r ${current > 3 && styles.fill}`} />
    </div>
  )
}

export default ProgressBar;