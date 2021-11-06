import { useContext, useState } from "react";

import UserContext from "../contexts/UserContext";

import Comments from "./Comments";
import CommentForm from "./CommentForm";

import formatDate from "../utils/formatDate";
import putData from "../utils/putData";
import deleteData from "../utils/deleteData";

const Comment = ({
  user,
  comment,
  comments,
  setComments,
  commentToEditId,
  setCommentToEditId,
}) => {
  const { token } = useContext(UserContext);

  const [reply, setReply] = useState(false);

  const voteCommentRelatability = async (e) => {
    try {
      const res = await putData(`/comments/${e.target.dataset.commentId}/relatability`, undefined, token);
      const data = await res.json();

      setComments(prevComments => {
        const updated = [...prevComments];
        updated.splice(updated.findIndex(comment => comment._id === data._id), 1, data);
        return updated;
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async () => {
    try {
      const res = await deleteData(`/comments/${comment._id}`, token);

      if (res.ok) {
        setComments(prevComments => prevComments.filter(prevComment => (
          prevComment._id !== comment._id && prevComment.replyTo !== comment._id
        )))
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='comment-container'>
      {commentToEditId === comment._id
        ? <CommentForm
            comment={comment}
            setComments={setComments}
            setCommentToEditId={setCommentToEditId}
            parentId={comment.replyTo}
          />
        : <div className='comment'>
            <p>{comment.content}</p>
            <p>Comment by: {comment.postedBy.profile.username}</p>
            <p>Comment posted on: {formatDate(comment.datePosted)}</p>
            {comment.dateEdited && <p>Comment edited on: {formatDate(comment.dateEdited)}</p>}
            <p>Relatability: {comment.relatable.length}</p>
            {user.id === comment.postedBy._id
              ? <div>
                  <button onClick={() => setCommentToEditId(comment._id)}>Edit comment</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              : <button id='comment-relatable-btn' data-comment-id={comment._id} onClick={voteCommentRelatability}>
                  {comment.relatable.includes(user.id)
                    ? 'Unrelatable'
                    : 'Relatable'
                  }
                </button>
            }
            {reply
              ? <CommentForm setComments={setComments} setReply={setReply} parentId={comment._id} />
              : user.id !== comment.postedBy._id && <button onClick={() => setReply(true)}>Reply</button>
            }
          </div>
      }
      <Comments
        parentId={comment._id}
        comments={comments}
        setComments={setComments}
        commentToEditId={commentToEditId}
        setCommentToEditId={setCommentToEditId}
        user={user}
      />
    </div>
  )
}

export default Comment;