import data from '../../../data/data';

const Gender = ({ input, handleInput }) => {
  return (
    <div>
      <label>Gender</label>
      <select
        className='w-40 mt-1 py-1 sm:text-sm text-gray-900 bg-transparent border-b border-gray-500 focus:border-gray-900 focus:outline-none'
        name='gender'
        value={input.gender}
        onChange={handleInput}
      >
        <option value={''}>No preference</option>
        {data.genders.map(value => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
    </div>
  )
}

export default Gender;