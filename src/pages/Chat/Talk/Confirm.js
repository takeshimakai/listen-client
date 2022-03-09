const Confirm = ({ input }) => {
  return (
    <>
      <p className='subtitle text-center mb-6'>You'll be matched with someone who fulfills the following criteria:</p>
      <div className='scroll-fade no-scrollbar pt-2 pb-5 overflow-auto w-full'>
        <div className='flex flex-col items-center'>
          <p className='subtitle mb-1'>Minimum age</p>
          <p className='sm:text-sm text-gray-900'>{input.minAge ? input.minAge : 'No preference'}</p>
        </div>
        <p className='text-5xl text-green-900 text-opacity-40 text-center'>&middot;</p>
        <div className='flex flex-col items-center'>
          <p className='subtitle mb-1'>Maximum age</p>
          <p className='sm:text-sm text-gray-900'>{input.maxAge ? input.maxAge : 'No preference'}</p>
        </div>
        <p className='text-5xl text-green-900 text-opacity-40 text-center'>&middot;</p>
        <div className='flex flex-col items-center'>
          <p className='subtitle mb-1'>Gender</p>
          <p className='sm:text-sm text-gray-900'>{input.gender ? input.gender : 'No preference'}</p>
        </div>
        <p className='text-5xl text-green-900 text-opacity-40 text-center'>&middot;</p>
        <div className='flex flex-col items-center'>
          <p className='subtitle mb-1'>Interests</p>
          {input.interests.length > 0
              ? <ul className='text-center sm:text-sm text-gray-900'>
                  {input.interests.map(interest => (
                    <li key={interest}>{interest}</li>
                  ))}
                </ul>
              : <p className='sm:text-sm text-gray-900'>No preference</p>
          }
        </div>
        <p className='text-5xl text-green-900 text-opacity-40 text-center'>&middot;</p>
        <div className='flex flex-col items-center'>
          <p className='subtitle mb-1'>Topics</p>
          {input.problemTopics.length > 0
              ? <ul className='text-center sm:text-sm text-gray-900'>
                  {input.problemTopics
                    .sort((a, b) => {
                      if (a === 'Other') return 1;
                      if (b === 'Other') return -1;
                      if (a < b) return -1;
                      if (a > b) return 1;
                      return 0;
                    })
                    .map(topic => <li key={topic}>{topic}</li>)
                  }
                </ul>
              : <p className='sm:text-sm text-gray-900'>No preference</p>
          }
        </div>
      </div>
    </>
  )
}

export default Confirm;