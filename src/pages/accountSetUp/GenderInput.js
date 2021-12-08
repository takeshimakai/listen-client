import data from "../../data/data";

import ProgressBar from "../../components/ProgressBar";

const GenderInput = ({ profileInput, handleInput, goNext, step, changeStep }) => {
  return (
    <>
      <div className='account-setup-input-container'>
        <ProgressBar step={step} />
        <p className='account-setup-input-title'>What is your gender?</p>
        <div className='flex items-center justify-center mt-11'>
          <div>
            {data.genders.map(gender => (
              <div className='flex items-center my-2' key={gender}>
                <input
                  className='h-4 w-4 mr-1.5'
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
            <div className='flex items-center my-2'>
              <input
                className='h-4 w-4 mr-1.5'
                type='radio'
                id='undisclosed'
                name='gender'
                value='undisclosed'
                checked={profileInput.gender === 'undisclosed'}
                onChange={handleInput}
                onKeyDown={goNext}
              />
              <label className='text-base' htmlFor='undisclosed'>Rather not say</label>
            </div>
          </div>
        </div>
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