import Comment from "./Comment";

import sortData from '../utils/sortData';

const Comments = ({
  parentId,
  commentSort,
  comments,
  setComments,
  commentToEditId,
  setCommentToEditId,
  user
}) => {
  const sorted = commentSort ? sortData(commentSort, comments) : sortData('newest comment', comments);

  return (
    <div className='comments-container'>
      {sorted.map(comment => (
        parentId === comment.replyTo &&
          <Comment
            comment={comment}
            user={user}
            commentToEditId={commentToEditId}
            setCommentToEditId={setCommentToEditId}
            comments={comments}
            setComments={setComments}
            key={comment._id}
          />
      ))}
    </div>
  )
}

export default Comments;