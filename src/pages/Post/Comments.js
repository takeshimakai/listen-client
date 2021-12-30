import Comment from "./Comment";

import sortData from '../../utils/sortData';

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
    <>
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
    </>
  )
}

export default Comments;