import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className='bg-gray-50 flex-grow w-screen grid grid-rows-2 justify-items-center'>
      <h2 className='self-center text-gray-800 font-serif text-6xl sm:text-8xl '>listen</h2>
      <div className='text-center'>
        <p className='font-light sm:text-sm'>It appears you've requested to perform an unauthorized action.</p>
        <p className='font-light sm:text-sm'>Please sign in and try again.</p>
        <Link to='/'>
          <button className='mt-10 border active:border-0 active:p-px shadow-md max-w-2xs w-full h-8 rounded-full text-gray-600 bg-gray-50 text-sm hover:bg-gray-200 active:shadow-inner'>
            Proceed to sign in
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Unauthorized;