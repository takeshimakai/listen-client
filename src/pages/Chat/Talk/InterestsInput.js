import { useState, useEffect } from 'react';

import capitalizeStrAt0 from '../../../utils/capitalizeStrAt0';
import sanitizeStr from '../../../utils/sanitizeStr';

const InterestsInput = ({ input, setInput }) => {
  const [interestInput, setInterestInput] = useState('');
  const [duplicate, setDuplicate] = useState();

  useEffect(() => {
    const nextOnEnter = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (interestInput) {
          document.querySelector('#add-btn').click();
        } else {
          document.querySelector('#next-btn').click();
        }
      }
    };

    window.addEventListener('keydown', nextOnEnter);
    return () => window.removeEventListener('keydown', nextOnEnter);
  }, [interestInput]);

  const addInterest = () => {
    const formatted = capitalizeStrAt0(sanitizeStr(interestInput));

    if (formatted && !input.interests.includes(formatted)) {
      setInput(prev => {
        const updated = { ...prev };
        updated.interests.unshift(formatted);
        return updated;
      });

      duplicate && setDuplicate();
      setInterestInput('');
    } else {
      setDuplicate(formatted);
      setInterestInput('');
    }
  };

  const removeInterest = (e) => {
    setInput(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== e.target.getAttribute('value'))
    }));
  };

  const handleInput = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z ]+/ig, '');
    setInterestInput(value);
  };

  return (
    <>
      <label className='subtitle text-center mb-6'>
        What interests would you prefer them to have?
      </label>
      <div className='relative w-full'>
        <input
          className='w-full text-center pr-10 py-1 border-b border-gray-500 sm:text-sm text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
          type='text'
          value={interestInput}
          onChange={handleInput}
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
          disabled={!interestInput}
          onClick={addInterest}
        />
      </div>
      <div>
        <p className='error-msg mt-1'>{duplicate && `${duplicate} has already been added.`}</p>
      </div>
      <ul className='overflow-auto text-center mt-2'>
        {input.interests.map(interest => (
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
    </>
  )
}

export default InterestsInput;