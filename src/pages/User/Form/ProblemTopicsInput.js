import data from "../../../data/data";

import Toggle from "../../../components/Toggle";

const ProblemTopicsInput = ({ profileInput, handleInput }) => {
  return (
    <div className='flex flex-col items-center xl:items-start'>
      <div className='relative w-full flex items-center xl:justify-between'>
        <p className='text-gray-600 font-light sm:text-sm mx-auto xl:mx-0'>Problem topics</p>
        <div className='absolute xl:relative right-0'>
          <Toggle name='public' value='problemTopics' input={profileInput.public} handleInput={handleInput} />
        </div>
      </div>
      <div className='mt-1'>
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
            />
            <label
              className='sm:text-sm text-left leading-snug text-gray-900'
              htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProblemTopicsInput;