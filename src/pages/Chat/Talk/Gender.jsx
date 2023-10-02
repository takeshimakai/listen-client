import data from '../../../data/data';

import SelectInput from '../../../components/SelectInput';

const Gender = ({ input, handleInput }) => {
  return (
    <>
      <label className='subtitle mb-6 text-center'>
        What gender would you prefer them to be?
      </label>
      <SelectInput value={input.gender} onChange={handleInput} options={data.genders} />
    </>
  )
}

export default Gender;