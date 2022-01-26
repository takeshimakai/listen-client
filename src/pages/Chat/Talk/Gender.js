import data from '../../../data/data';

const Gender = ({ input, handleInput }) => {
  return (
    <>
      <label className='subtitle mb-6 text-center'>What gender would you prefer them to be?</label>
      <select
        className='mb-4 w-max mt-1 py-1 pr-1 sm:text-sm text-gray-900 bg-transparent border-b border-gray-500 focus:border-gray-900 focus:outline-none'
        name='gender'
        value={input.gender}
        onChange={handleInput}
      >
        <option value={''}></option>
        {data.genders.map(value => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
    </>
  )
}

export default Gender;