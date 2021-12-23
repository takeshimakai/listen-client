import { Link } from "react-router-dom";

import UserPreview from "./UserPreview";

const Card = ({ title, users }) => {
  return (
    <div className='flex flex-col items-center'>
      <h3 className='text-gray-600 font-light sm:text-sm sm:mb-4'>{title}</h3>
      <div className='w-40 sm:w-auto sm:grid sm:grid-cols-3 sm:gap-x-12 sm:gap-y-4'>
        {users.map(user => (
          <div className='sm:w-40' key={user._id}>
            <Link
              className='mt-4 sm:mt-0 flex sm:flex-col sm:mx-auto items-center max-w-max'
              to={`/users/${user._id}`}
            >
              <UserPreview user={user} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Card;