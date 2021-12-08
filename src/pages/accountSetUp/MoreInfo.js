const MoreInfo = ({ moreInfo, setMoreInfo }) => {
  return (
    <div className='absolute flex justify-center items-center h-full w-full bg-gray-200 bg-opacity-60'>
      <div className='relative bg-white w-3/4 max-w-md max-h-3/4 p-10 rounded-lg overflow-auto'>
        <button
          className='absolute top-1 right-1 w-6 h-6 rounded-full'
          onClick={() => setMoreInfo(!moreInfo)}
        >
          &#x2715;
        </button>
        <div className='space-y-4'>
          <p className='mb-8'>Why do I need to provide this information?</p>
          <p className='font-light text-sm'>Aside from the username, all fields are optional.</p>
          <p className='font-light text-sm'>
            Although they're optional, it would help us to better match you 
            with an empathic listener when more information is available.
          </p>
          <p className='font-light text-sm'>
            The information will be kept private by default unless you decide to make it public.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoreInfo;