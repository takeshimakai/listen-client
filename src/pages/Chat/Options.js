const Options = () => {
  return (
    <div className='hidden sm:flex flex-col items-center flex-grow justify-end mb-1 space-y-2.5'>
      <button className='tertiary-btn w-40'>Send friend request</button>
      <button className='shadow-md border border-red-600 w-40 h-8 rounded-md bg-gray-50 text-sm text-red-600 hover:text-white hover:bg-red-700 active:shadow-inner'>Leave conversation</button>
    </div>
  )
}

export default Options;