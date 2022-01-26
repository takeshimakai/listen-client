const Listen = ({ initiate, action }) => {
  return (
    <div className='h-full flex flex-col justify-between pb-12 px-12 xl:max-w-lg mx-auto'>
      <div className='space-y-4 flex-grow flex flex-col justify-center'>
        <p className='font-light sm:text-sm'>Thank you for taking the time to listen.</p>
        <p className='font-light sm:text-sm'>Despite our best intentions, sometimes an advice isn't what a friend needs. Instead, just being there to listen attentively might be the best thing we can do for them.</p>
        <p className='font-light sm:text-sm'>We're so happy and appreciate you for taking the time to help someone. The world needs more people like you!</p>
      </div>
      <button className='tertiary-btn w-40 mx-auto' onClick={() => initiate(action)}>
        Proceed to chat
      </button>
    </div>
  )
}

export default Listen;