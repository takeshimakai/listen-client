const Comment = ({ comment }) => {
  return (
    <div className='comment'>
      <p>{comment.content}</p>
      <p>Comment by: {comment.postedBy.profile.username}</p>
      <p>Comment posted on: {comment.datePosted}</p>
      {comment.dateEdited && <p>Comment edited on: {comment.dateEdited}</p>}
    </div>
  )
}

export default Comment;