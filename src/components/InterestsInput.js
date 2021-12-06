import { useState } from "react";

const InterestsInput = ({ profileInput, setProfileInput }) => {
  const [input, setInput] = useState('');
  const [duplicate, setDuplicate] = useState();

  const handleInput = (e) => setInput(e.target.value);

  const addInterest = () => {
    const sanitized = input.replace(/[^a-z\s]/gi, '').trim().replace(/\s+/g, ' ');
    const formatted = sanitized.charAt(0).toUpperCase() + sanitized.slice(1).toLowerCase();

    if (formatted && !profileInput.interests.includes(formatted)) {
      setProfileInput(prev => {
        prev.interests.unshift(formatted);
        return prev;
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
    <div className='h-full flex flex-col'>
      <p className='account-setup-input-title'>What are your interests?</p>
      <div className='relative w-full mt-11'>
        <input
          className='text-center pr-10 w-full py-1 border-b border-gray-500 text-lg text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
          type='text'
          name='interests'
          value={input}
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
            className='cursor-pointer inline-block text-sm border-green-900 border-opacity-40 border rounded-full border-gray-500 py-0.5 px-2.5 m-1'
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