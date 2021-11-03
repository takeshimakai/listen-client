import formatDate from "../utils/formatDate";

const Comment = ({ comment }) => {
  return (
    <div className='comment'>
      <p>{comment.content}</p>
      <p>Comment by: {comment.postedBy.profile.username}</p>
      <p>Comment posted on: {formatDate(comment.datePosted)}</p>
      {comment.dateEdited && <p>Comment edited on: {formatDate(comment.dateEdited)}</p>}
      <p>Relatability: {comment.relatable.length}</p>
    </div>
  )
}

export default Comment;