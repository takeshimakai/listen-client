import data from "../../data/data";

const GenderInput = ({ profileInput, handleInput }) => {
  return (
    <>
      <p className='font-light sm:text-sm'>What is your gender?</p>
      <div className='flex items-center justify-center mt-10'>
        <div>
          {data.genders.map(gender => (
            <div className='flex items-center my-2' key={gender}>
              <input
                className='h-4 w-4 mr-1.5'
                type='radio'
                id={gender}
                name='gender'
                value={gender}
                checked={profileInput.gender === gender}
                onChange={handleInput}
              />
              <label className='sm:text-sm' htmlFor={gender}>{gender}</label>
            </div>
          ))}
          <button
            className='font-light text-sm text-blue-700 hover:text-blue-900 mt-5'
            type='button'
            name='gender'
            value=''
            onClick={handleInput}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  )
}

export default GenderInput;