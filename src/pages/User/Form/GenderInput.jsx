import data from '../../../data/data';

import Toggle from '../../../components/Toggle';
import SelectInput from '../../../components/SelectInput';

const GenderInput = ({ profileInput, handleInput }) => {
  return (
    <div className='flex flex-col items-center xl:items-start'>
      <div className='relative w-full flex items-center xl:justify-between mb-1'>
        <label className='subtitle mx-auto xl:mx-0'>Gender</label>
        <div className='absolute xl:relative right-0'>
          <Toggle name='public' value='gender' input={profileInput.public} handleInput={handleInput} />
        </div>
      </div>
      <SelectInput value={profileInput.gender} onChange={handleInput} options={data.genders} />
    </div>
  )
}

export default GenderInput;