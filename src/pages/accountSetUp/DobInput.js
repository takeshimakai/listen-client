import formatDateForInput from '../../utils/formatDateForInput';

const DobInput = ({ profileInput, handleInput }) => {
  return (
    <>
      <p className='font-light'>When is your birthday?</p>
      <div className='flex justify-center items-center mt-10'>
        <input
          className='py-1 border-b border-gray-500 text-lg text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
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