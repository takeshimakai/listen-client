import { useState } from "react";

import sanitizeStr from "../../../utils/sanitizeStr";
import capitalizeStrAt0 from '../../../utils/capitalizeStrAt0';

import Toggle from "../../../components/Toggle";

const InterestsInput = ({ profileInput, setProfileInput, handleInput }) => {
  const [input, setInput] = useState('');
  const [duplicate, setDuplicate] = useState();

  const handleInterestInput = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z ]+/ig, '');
    setInput(value);
  };

  const addInterest = () => {
    const formatted = capitalizeStrAt0(sanitizeStr(input));

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
    <div className='flex flex-col items-center xl:items-start'>
      <div className='relative w-full flex items-center xl:justify-between'>
        <label className='subtitle mx-auto xl:mx-0'>Interests</label>
        <div className='absolute xl:relative right-0'>
          <Toggle name='public' value='interests' input={profileInput.public} handleInput={handleInput} />
        </div>
      </div>
      <div className='relative w-full mt-1'>
        <input
          className='text-center xl:text-left pr-10 w-full py-1 border-b border-gray-500 sm:text-sm text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
          type='text'
          value={input}
          onChange={handleInterestInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              document.querySelector('#add-btn').click();
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
      <ul className='mt-1 text-center xl:text-left'>
        {profileInput.interests.map(interest => (
          <li
            className='m-0.5 cursor-pointer inline-block text-sm text-gray-900 hover:text-white border-green-900 border-opacity-40 hover:border-opacity-0 border rounded-full py-0.5 px-2.5 hover:bg-green-900 hover:bg-opacity-40 active:bg-opacity-40 active:bg-opacity-40'
            value={interest}
            key={interest}
            onClick={removeInterest}
          >
            {interest} &#x2715;
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InterestsInput;