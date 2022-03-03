import formatDate from '../utils/formatDate';

const PostPreview = ({ post }) => {
  const postedBy = (
    <span>
      {!post.postedBy
        ? 'by deleted user'
        : post.postedBy.profile && `by ${post.postedBy.profile.username}`
      }
    </span>
  );

  return (
    <div className='border rounded-lg shadow-md px-4 py-3'>
      <h4 className='font-medium text-green-700 mb-2'>{post.title}</h4>
      <div className='space-y-1.5'>
        <p className='truncate font-light sm:text-sm text-gray-700'>{post.content}</p>
        <div>
          <p className='text-xs font-light text-gray-400'>
            Posted {postedBy} on {formatDate(post.datePosted)}
          </p>
          {post.dateEdited &&
            <p className='text-xs font-light text-gray-400'>
              Edited on {formatDate(post.dateEdited)}
            </p>
          }
          <p className='text-xs font-light text-gray-400'>
            Relatability: {post.relatable.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostPreview;