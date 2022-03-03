import { useState, useEffect } from "react";

import sanitizeStr from "../../utils/sanitizeStr";
import capitalizeStrAt0 from "../../utils/capitalizeStrAt0";

const InterestsInput = ({ profileInput, setProfileInput }) => {
  const [input, setInput] = useState('');
  const [duplicate, setDuplicate] = useState();

  useEffect(() => {
    const nextOnEnter = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (input) {
          document.querySelector('#add-btn').click();
        } else {
          document.querySelector('#next-btn').click();
        }
      }
    };

    window.addEventListener('keydown', nextOnEnter);
    return () => window.removeEventListener('keydown', nextOnEnter);
  }, [input]);

  const handleInput = (e) => {
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
    <>
      <p className='font-light sm:text-sm'>What are your interests?</p>
      <div className='relative w-full mt-10'>
        <input
          className='text-center pr-10 w-full py-1 border-b border-gray-500 text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
          type='text'
          value={input}
          onChange={handleInput}
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
      <ul className='mt-4 text-center overflow-auto'>
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
    </>
  )
}

export default InterestsInput;