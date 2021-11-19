import data from "../data/data";

const ProblemTopicsInput = ({ profileInput, setProfileInput }) => {
  const handleCheckbox = (e) => {
    const { name, value } = e.target;

    profileInput[name].includes(value)
      ? setProfileInput(prev => ({
          ...prev,
          [name]: prev[name].filter(prevVal => prevVal !== value)
        }))
      : setProfileInput(prev => ({
          ...prev,
          [name]: prev[name].concat(value)
        }))
  };

  return (
    <div id='problem-topics-input'>
      <p>Please select all topics that are relevant to you:</p>
      {data.categories.map(category => (
        <div className='problem-topics-checkbox' key={category}>
          <input
            type='checkbox'
            name='problemTopics'
            id={category}
            value={category}
            checked={profileInput.problemTopics.includes(category)}
            onChange={handleCheckbox}
          />
          <label htmlFor={category}>{category}</label>
        </div>
      ))}
    </div>
  )
}

export default ProblemTopicsInput;