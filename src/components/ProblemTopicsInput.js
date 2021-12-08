import data from "../data/data";

const ProblemTopicsInput = ({ profileInput, handleInput, goNext }) => {
  return (
    <div className='h-full flex flex-col'>
      <p className='account-setup-input-title'>Please select all relevant topics.</p>
      <div className='mx-auto mt-11 overflow-auto'>
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
  )
}

export default ProblemTopicsInput;