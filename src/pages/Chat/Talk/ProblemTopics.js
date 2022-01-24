import data from '../../../data/data';

import Checkbox from '../../../components/Checkbox';

const ProblemTopics = ({ input, handleInput }) => {
  return (
    <div>
      <label>Problem topics</label>
      <div className='mt-1'>
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
  )
}

export default ProblemTopics;