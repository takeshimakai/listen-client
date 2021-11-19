import { useState } from "react";

const InterestsInput = ({ profileInput, setProfileInput }) => {
  const [input, setInput] = useState('');
  const [duplicate, setDuplicate] = useState();

  const handleInput = (e) => setInput(e.target.value);

  const addInterest = () => {
    const sanitized = input.replace(/[^a-z\s]/gi, '').trim().replace(/\s+/g, ' ');
    const formatted = sanitized.charAt(0).toUpperCase() + sanitized.slice(1).toLowerCase();

    if (formatted && !profileInput.interests.includes(formatted)) {
      setProfileInput(prev => ({
        ...prev,
        interests: prev.interests.concat(formatted)
      }));
      setInput('');
    } else {
      setDuplicate(formatted);
      setInput('');
    }
  };

  const removeInterest = (e) => {
    setProfileInput(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== e.target.value)
    }));
  };
 
  return (
    <div id='interests-input'>
      <p>What are your interests?</p>
      <input
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
      {duplicate && <p>{duplicate} has already been added.</p>}
      <input id='add-btn' type='button' value='Add' disabled={!input} onClick={addInterest} />
      <div id='interests-input-list'>
        {profileInput.interests.map(interest => (
          <button type='button' value={interest} key={interest} onClick={removeInterest}>
            {interest} &#x2715;
          </button>
        ))}
      </div>
    </div>
  )
}

export default InterestsInput;