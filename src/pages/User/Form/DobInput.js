import Toggle from "../../../components/Toggle";

const DobInput = ({ profileInput, handleInput }) => {
  return (
    <div className='flex flex-col items-center xl:items-start'>
      <div className='relative w-full flex items-center xl:justify-between'>
        <label
          className='text-gray-600 font-light sm:text-sm mx-auto xl:mx-0'
          htmlFor='dob'
        >
          Date of birth
        </label>
        <div className='absolute xl:relative right-0'>
          <Toggle name='public' value='dob' input={profileInput.public} handleInput={handleInput} />
        </div>
        <p className='absolute w-8 text-center text-xs font-thin text-gray-400 right-0 -top-4'>Show</p>
      </div>
      <input
        className='w-40 py-1 border-b border-gray-500 sm:text-sm text-gray-900 bg-transparent focus:outline-none focus:border-gray-900 mt-1'
        type='date'
        id='dob'
        name='dob'
        value={profileInput.dob}
        onChange={handleInput}
      />
    </div>
  )
}

export default DobInput;