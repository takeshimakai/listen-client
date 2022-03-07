import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const Unauthorized = ({ location }) => {
  const history = useHistory();

  useEffect(() => {
    if (!location.state) {
      history.replace('/');
    }
  }, [history, location.state]);

  return (
    <div>
      <p>It appears you've requested to perform an unauthorized action.</p>
      <p>Please sign in and try again.</p>
      <Link to='/'>
        <button className='border active:border-0 active:p-px shadow-md max-w-2xs w-full h-8 rounded-full text-gray-600 bg-gray-50 text-sm hover:bg-gray-200 active:shadow-inner'>
          Proceed to sign in
        </button>
      </Link>
    </div>
  )
}

export default Unauthorized;