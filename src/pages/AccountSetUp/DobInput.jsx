import formatDateForInput from '../../utils/formatDateForInput';

const DobInput = ({ profileInput, handleInput }) => {
  return (
    <>
      <p className='font-light sm:text-sm'>Select your date of birth</p>
      <div className='flex justify-center items-center mt-10'>
        <input
          className='min-h-8 rounded-none w-40 py-1 border-b border-gray-500 text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
          type='date'
          name='dob'
          max={formatDateForInput(Date.now())}
          value={profileInput.dob}
          onChange={handleInput}
        />
      </div>
    </>
  )
}

export default DobInput;