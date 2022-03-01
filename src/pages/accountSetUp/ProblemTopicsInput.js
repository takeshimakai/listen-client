import data from "../../data/data";

import Checkbox from "../../components/Checkbox";

const ProblemTopicsInput = ({ profileInput, handleInput }) => {
  return (
    <>
      <p className='font-light'>Please select all relevant topics.</p>
      <div className='overflow-auto mt-10 w-full'>
        <div className='sm:w-max mx-auto'>
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
    </>
  )
}

export default ProblemTopicsInput;