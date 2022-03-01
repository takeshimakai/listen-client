import data from "../../data/data";

import Checkbox from "../../components/Checkbox";

const ProblemTopicsInput = ({ profileInput, handleInput }) => {
  return (
    <>
      <p className='font-light'>Please select all relevant topics.</p>
      <div className='overflow-auto sm:px-3 mt-10'>
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
    </>
  )
}

export default ProblemTopicsInput;