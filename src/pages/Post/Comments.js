import Comment from "./Comment";

import sortData from '../../utils/sortData';

const Comments = ({
  parentId,
  sortCommentsBy,
  comments,
  setComments,
  commentToEditId,
  setCommentToEditId,
  user
}) => {
  const sorted = sortCommentsBy ? sortData(sortCommentsBy, comments) : sortData('newest', comments);

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