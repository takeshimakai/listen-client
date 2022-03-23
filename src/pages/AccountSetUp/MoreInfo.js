const MoreInfo = ({ moreInfo, setMoreInfo }) => {
  return (
    <div className='z-20 absolute flex justify-center items-center h-full w-full bg-gray-200 bg-opacity-60'>
      <div className='relative bg-gray-50 w-3/4 max-w-md max-h-3/4 p-10 rounded-lg overflow-auto'>
        <button
          className='absolute top-1 right-1 w-6 h-6 rounded-full'
          onClick={() => setMoreInfo(!moreInfo)}
        >
          &#x2715;
        </button>
        <div className='space-y-4'>
          <p className='mb-8'>Why should I provide this information?</p>
          <p className='font-light text-sm'>
            All fields except the username are optional.
          </p>
          <p className='font-light text-sm'>
            This additional information helps us provide better matches for those in need of a listener.
            It remains private unless you choose to make it public.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoreInfo;