import { useState } from "react";

import ProgressBar from "../../components/ProgressBar";

const InterestsInput = ({
  profileInput,
  setProfileInput,
  goNext,
  step,
  changeStep,
  moreInfo,
  setMoreInfo
}) => {
  const [input, setInput] = useState('');
  const [duplicate, setDuplicate] = useState();

  const handleInput = (e) => setInput(e.target.value);

  const addInterest = () => {
    const sanitized = input.replace(/[^a-z\s]/gi, '').trim().replace(/\s+/g, ' ');
    const formatted = sanitized.charAt(0).toUpperCase() + sanitized.slice(1).toLowerCase();

    if (formatted && !profileInput.interests.includes(formatted)) {
      setProfileInput(prev => {
        const updated = { ...prev };
        updated.interests.unshift(formatted);
        return updated;
      });

      duplicate && setDuplicate();
      setInput('');
    } else {
      setDuplicate(formatted);
      setInput('');
    }
  };

  const removeInterest = (e) => {
    setProfileInput(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== e.target.getAttribute('value'))
    }));
  };
 
  return (
    <>
      <div className='account-setup-input-container'>
        <ProgressBar step={step} />
        <div className='h-full flex flex-col'>
          <p className='account-setup-input-title'>What are your interests?</p>
          <div className='relative w-full mt-10'>
            <input
              className='text-center pr-10 w-full py-1 border-b border-gray-500 text-lg text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
              type='text'
              name='interests'
              value={input}
              onChange={handleInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input) {
                  e.preventDefault();
                  document.querySelector('#add-btn').click();
                } else {
                  goNext(e);
                }
              }}
            />
            <input
              className='absolute w-8 inset-y-0 right-0 text-sm font-light bg-transparent cursor-pointer disabled:opacity-50'
              id='add-btn'
              type='button'
              value='Add'
              disabled={!input}
              onClick={addInterest}
            />
          </div>
          <div>
            <p className='error-msg mt-1'>{duplicate && `${duplicate} has already been added.`}</p>
          </div>
          <ul className='mt-4 overflow-auto'>
            {profileInput.interests.map(interest => (
              <li
                className='cursor-pointer inline-block text-sm hover:text-white border-green-900 border-opacity-40 hover:border-opacity-0 border rounded-full py-0.5 px-2.5 m-1 hover:bg-green-900 hover:bg-opacity-40 active:bg-opacity-40 active:bg-opacity-40'
                value={interest}
                key={interest}
                onClick={removeInterest}
              >
                {interest} &#x2715;
              </li>
            ))}
          </ul>
        </div>
        <p className='account-setup-moreinfo' onClick={() => setMoreInfo(!moreInfo)}>
          What's this for?
        </p>
      </div>
      <div className='w-full flex max-w-xs'>
        <button className='secondary-btn mr-1' value='gender' onClick={changeStep}>Back</button>
        <button
          className='primary-btn ml-1'
          id='next-btn'
          value='problemTopics'
          onClick={changeStep}
        >
          {profileInput.interests.length > 0 ? 'Next' : 'Skip'}
        </button>
      </div>
    </>
  )
}

export default InterestsInput;