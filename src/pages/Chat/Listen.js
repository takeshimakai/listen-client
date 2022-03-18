import TertiaryBtn from '../../components/TertiaryBtn';

const Listen = ({ initialize, action }) => {
  return (
    <div className='flex-grow flex flex-col items-center justify-between pb-4 sm:pb-10 px-4 sm:px-0 sm:max-w-lg mx-auto'>
      <div className='px-6 space-y-4 my-auto flex flex-col justify-center'>
        <p className='font-light sm:text-sm'>
          Thank you for taking the time to listen.
        </p>
        <p className='font-light sm:text-sm'>
          Despite our best intentions, advice isn't always what someone needs.
          Being there and listening to them attentively might be the best thing we can do.
        </p>
        <p className='font-light sm:text-sm'>
          We're grateful that you're taking time to help someone in need. The world needs more people like you!
        </p>
      </div>
      <TertiaryBtn label='Proceed to chat' onClick={() => initialize(action)} />
    </div>
  )
}

export default Listen;