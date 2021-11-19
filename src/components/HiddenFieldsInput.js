import data from "../data/data";

const HiddenFieldsInput = ({ profileInput, setProfileInput }) => {
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
    <div id='profile-form-hidden'>
      <p>Please select fields you would like to hide from your public profile:</p>
      {data.hidden.map(field => (
        <div className='profile-form-hidden-checkbox' key={`${field}-hidden`}>
          <input
            type='checkbox'
            name='hidden'
            id={`${field}-hidden`}
            value={field}
            checked={profileInput.hidden.includes(field)}
            onChange={handleCheckbox}
          />
          <label htmlFor={`${field}-hidden`}>
            {field === 'dob' && 'Date of birth'}
            {field === 'gender' && 'Gender'}
            {field === 'interests' && 'Interests'}
            {field === 'problemTopics' && 'Problem topics'}
          </label>
        </div>
      ))}
    </div>
  )
}

export default HiddenFieldsInput;