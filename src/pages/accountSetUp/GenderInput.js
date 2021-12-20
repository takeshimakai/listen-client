import data from "../../data/data";

import ProgressBar from "./ProgressBar";

const GenderInput = ({
  profileInput,
  handleInput,
  goNext,
  step,
  changeStep,
  moreInfo,
  setMoreInfo
}) => {
  return (
    <>
      <div className='account-setup-input-container'>
        <ProgressBar step={step} />
        <p className='account-setup-input-title'>What is your gender?</p>
        <div className='flex items-center justify-center mt-10'>
          <div>
            {data.genders.map(gender => (
              <div className='flex items-center my-2' key={gender}>
                <input
                  className='radio'
                  type='radio'
                  id={gender}
                  name='gender'
                  value={gender}
                  checked={profileInput.gender === gender}
                  onChange={handleInput}
                  onKeyDown={goNext}
                />
                <label className='text-base' htmlFor={gender}>{gender}</label>
              </div>
            ))}
            <button
              className='font-light text-sm text-blue-700 hover:text-blue-900 mt-5'
              name='gender'
              value=''
              onClick={handleInput}
            >
              Clear
            </button>
          </div>
        </div>
        <p className='account-setup-moreinfo' onClick={() => setMoreInfo(!moreInfo)}>
          What's this for?
        </p>
      </div>
      <div className='w-full flex max-w-xs'>
        <button className='secondary-btn mr-1' value='dob' onClick={changeStep}>Back</button>
        <button
          className='primary-btn ml-1'
          id='next-btn'
          value='interests'
          onClick={changeStep}
        >
          {profileInput.gender ? 'Next' : 'Skip'}
        </button>
      </div>
    </>
  )
}

export default GenderInput;