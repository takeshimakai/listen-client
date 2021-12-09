import data from "../../data/data";

import ProgressBar from "./ProgressBar";

const ProblemTopicsInput = ({
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
        <div className='h-full flex flex-col'>
          <p className='account-setup-input-title'>Please select all relevant topics.</p>
          <div className='mx-auto mt-10 overflow-auto'>
            {data.categories.map(category => (
              <div className='my-2 flex items-center' key={category}>
                <input
                  className='h-4 w-4 mr-1.5'
                  type='checkbox'
                  name='problemTopics'
                  id={category}
                  value={category}
                  checked={profileInput.problemTopics.includes(category)}
                  onChange={handleInput}
                  onKeyDown={goNext}
                />
                <label
                  className='text-base text-left leading-snug'
                  htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
        </div>
        <p className='account-setup-moreinfo' onClick={() => setMoreInfo(!moreInfo)}>
          What's this for?
        </p>
      </div>
      <div className='w-full flex max-w-xs'>
        <button className='secondary-btn mr-1' value='interests' onClick={changeStep}>Back</button>
          <button
            className='primary-btn ml-1'
            id='next-btn'
            value='confirm'
            onClick={changeStep}
          >
            {profileInput.problemTopics.length > 0 ? 'Next' : 'Skip'}
          </button>
      </div>
    </>
  )
}

export default ProblemTopicsInput;