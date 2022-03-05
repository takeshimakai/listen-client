import data from "../../data/data";

import Checkbox from "../../components/Checkbox";

const ProblemTopicsInput = ({ profileInput, handleInput }) => {
  return (
    <>
      <p className='font-light sm:text-sm'>Select relevant topics</p>
      <div className='pt-2 pb-6 scroll-fade no-scrollbar overflow-auto mt-6 w-full'>
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