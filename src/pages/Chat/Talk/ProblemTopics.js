import data from '../../../data/data';

import Checkbox from '../../../components/Checkbox';

const ProblemTopics = ({ input, handleInput }) => {
  return (
    <>
      <label className='subtitle text-center mb-6'>
        Which topics would you prefer them to be familiar with?
      </label>
      <div className='scroll-fade no-scrollbar pt-2 pb-5 overflow-auto w-full'>
        <div className='w-max mx-auto'>
          {data.categories.map(category => (
            <Checkbox
              key={category}
              name='problemTopics'
              data={category}
              input={input.problemTopics}
              handleInput={handleInput}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ProblemTopics;