const Age = ({ input, handleInput, err }) => {
  return (
    <>
      <p className='subtitle text-center mb-6'>How old would you like your conversation partner to be?</p>
      <div className='flex flex-col'>
        <div className='flex flex-col items-center mb-4'>
          <label className='sm:text-sm text-left leading-snug text-gray-900 mb-1' htmlFor='minAge'>
            Minimum age
          </label>
          <input
            className='text-center px-1 border rounded border-gray-500 focus:border-gray-900 text-gray-900 sm:text-sm bg-transparent focus:outline-none'
            id='minAge'
            type='number'
            name='minAge'
            min={0}
            max={999}
            value={input.minAge}
            onChange={(e) => {
              if (e.target.value.length < 4) {
                handleInput(e);
              }
            }}
          />
        </div>
        <div className='flex flex-col items-center'>
          <label className='sm:text-sm text-left leading-snug text-gray-900 mb-1' htmlFor='maxAge'>
            Maximum age
          </label>
          <input
            className='text-center px-1 border rounded border-gray-500 focus:border-gray-900 text-gray-900 sm:text-sm bg-transparent focus:outline-none'
            id='maxAge'
            type='number'
            name='maxAge'
            min={0}
            max={999}
            value={input.maxAge}
            onChange={(e) => {
              if (e.target.value.length < 4) {
                handleInput(e);
              }
            }}
          />
        </div>
        <p className='error-msg text-center'>
          {err && 'Minimum age must be less than maximum age.'}
        </p>
      </div>
    </>
  )
}

export default Age;