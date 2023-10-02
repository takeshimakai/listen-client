import formatDate from "../../utils/formatDate";

const YourComment = ({ comment }) => {
  return (
    <div className='border rounded-lg shadow-md px-4 py-3'>
      <p className='mb-1.5 truncate font-light sm:text-sm text-gray-700'>{comment.content}</p>
      <p className='text-xs font-light text-gray-400'>
        Original post: <span className='text-green-700'>{comment.postId.title}</span>
      </p>
      <p className='text-xs font-light text-gray-400'>
        Commented on {formatDate(comment.datePosted)}
      </p>
      {comment.dateEdited &&
        <p className='text-xs font-light text-gray-400'>
          Edited on {formatDate(comment.dateEdited)}
        </p>
      }
      <p className='text-xs font-light text-gray-400'>
        Relatability: {comment.relatable.length}
      </p>
    </div>
  )
}

export default YourComment;