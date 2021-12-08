import formatDate from "../../utils/formatDate";

import ProgressBar from "../../components/ProgressBar";

const DobInput = ({ profileInput, handleInput, goNext, step, changeStep }) => {
  return (
    <>
      <div className='account-setup-input-container'>
        <ProgressBar step={step} />
        <p className='account-setup-input-title'>When is your birthday?</p>
        <div className='flex justify-center items-center mt-10'>
          <input
            className='py-1 border-b border-gray-500 text-lg text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
            type='date'
            name='dob'
            max={formatDate(Date.now())}
            value={profileInput.dob}
            onChange={handleInput}
            onKeyDown={goNext}
          />
        </div>
      </div>
      <div className='w-full flex max-w-xs'>
        <button
          className='secondary-btn mr-1'
          value='username'
          onClick={changeStep}
        >
          Back
        </button>
        <button
          className='primary-btn ml-1'
          id='next-btn'
          value='gender'
          onClick={changeStep}
        >
          {profileInput.dob ? 'Next' : 'Skip'}
        </button>
      </div>
    </>
  )
}

export default DobInput;