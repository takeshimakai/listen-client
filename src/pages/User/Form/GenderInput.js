import data from "../../../data/data";

import Toggle from "../../../components/Toggle";

const GenderInput = ({ profileInput, handleInput }) => {
  return (
    <div className='flex flex-col items-center xl:items-start'>
      <div className='relative w-full flex items-center xl:justify-between'>
        <label className='text-gray-600 font-light sm:text-sm mx-auto xl:mx-0'>Gender</label>
        <div className='absolute xl:relative right-0'>
          <Toggle name='hidden' value='gender' input={profileInput.hidden} handleInput={handleInput} />
        </div>
      </div>
      <select
        className='w-40 mt-1 py-1 sm:text-sm text-gray-900 bg-transparent border-b border-gray-500 focus:border-gray-900 focus:outline-none'
        name='gender'
        value={profileInput.gender}
        onChange={handleInput}
      >
        {data.genders.map(value => (
          <option key={value} value={value}>{value}</option>
        ))}
        <option value='undisclosed'>Rather not say</option>
      </select>
    </div>
  )
}

export default GenderInput;