import data from "../../../data/data";

import Toggle from "../../../components/Toggle";
import Checkbox from "../../../components/Checkbox";

const ProblemTopicsInput = ({ profileInput, handleInput }) => {
  return (
    <div className='flex flex-col items-center xl:items-start'>
      <div className='relative w-full flex items-center xl:justify-between'>
        <p className='subtitle mx-auto xl:mx-0'>Problem topics</p>
        <div className='absolute xl:relative right-0'>
          <Toggle name='public' value='problemTopics' input={profileInput.public} handleInput={handleInput} />
        </div>
      </div>
      <div className='mt-1'>
        {data.categories.map(category => (
          <Checkbox
            key={category}
            name='problemTopics'
            data={category}
            input={profileInput.problemTopics}
            handleInput={handleInput}
          />
        ))}
      </div>
    </div>
  )
}

export default ProblemTopicsInput;