import { Link, useRouteMatch } from 'react-router-dom';

import formatDate from '../../utils/formatDate';

const PostPreview = ({ post }) => {
  const match = useRouteMatch();

  return (
    <div className='flex items-center'>
      <p className='mr-4 text-3xl font-medium text-gray-400'>{post.relatable.length}</p>
      <Link className='min-w-0 w-full' to={`${match.url}/${post._id}`}>
        <div className='border rounded-lg shadow-md px-4 py-3'>
          <h4 className='font-medium text-green-700 mb-2'>{post.title}</h4>
          <div className='space-y-1'>
            <p className='truncate font-light sm:text-sm text-gray-700'>{post.content}</p>
            <p className='text-xs font-light text-gray-700'>Posted by {post.postedBy.profile.username} on {formatDate(post.datePosted)}</p>
            {post.dateEdited && <p className='text-xs font-light text-gray-700'>Edited on {formatDate(post.dateEdited)}</p>}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PostPreview;