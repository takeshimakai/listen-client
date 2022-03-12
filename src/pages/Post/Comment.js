import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import Comments from "./Comments";
import CommentForm from "./CommentForm";

import formatDate from "../../utils/formatDate";
import putData from "../../utils/putData";
import deleteData from "../../utils/deleteData";
import decodeToken from "../../utils/decodeToken";
import getNewTokensIfExpired from "../../utils/getNewTokensIfExpired";
import updateTokens from "../../utils/updateTokens";
import clearTokens from '../../utils/clearTokens';

import deleteIcon from '../../assets/delete.png';

const Comment = ({
  comment,
  comments,
  setComments,
  commentToEditId,
  setCommentToEditId,
}) => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);
  const { id } = decodeToken(token);

  const [reply, setReply] = useState(false);

  const voteCommentRelatability = async (e) => {
    try {
      const newTokens = await getNewTokensIfExpired(token);

      if (newTokens) {
        updateTokens(newTokens.token, newTokens.refreshToken, setToken);
      }

      const res = await putData(
        `/comments/${e.target.dataset.commentId}/relatability`,
        undefined,
        newTokens ? newTokens.token : token
      );

      if (!res.ok) throw res;

      const data = await res.json();

      setComments(prevComments => {
        const updated = [...prevComments];
        updated.splice(updated.findIndex(comment => comment._id === data._id), 1, data);
        return updated;
      });
    } catch (err) {
      if (err.status === 401) {
        clearTokens(setToken, id);
        return history.replace('/unauthorized');
      }

      console.log(err);
    }
  }

  const handleDelete = async () => {
    try {
      const newTokens = await getNewTokensIfExpired(token);

      if (newTokens) {
        updateTokens(newTokens.token, newTokens.refreshToken, setToken);
      }

      const res = await deleteData(`/comments/${comment._id}`, undefined, newTokens ? newTokens.token : token);

      if (!res.ok) throw res;

      setComments(prevComments => prevComments.filter(prevComment => (
        prevComment._id !== comment._id && prevComment.replyTo !== comment._id
      )));
    } catch (err) {
      if (err.status === 401) {
        clearTokens(setToken, id);
        return history.replace('/unauthorized');
      }

      console.log(err);
    }
  }

  const commentBy = (
    <span>
      {!comment.postedBy
        ? 'deleted user'
        : <Link className='text-blue-700 hover:text-blue-900' to={`/users/${comment.postedBy._id}`}>
            {comment.postedBy.profile.username}
          </Link>
      }
    </span>
  )

  return (
    <div className='border-l border-gray-300 pl-2'>
      <div className='mb-4'>
        {commentToEditId === comment._id
          ? <CommentForm
              comment={comment}
              setComments={setComments}
              setCommentToEditId={setCommentToEditId}
              parentId={comment.replyTo}
            />
          : <>
              <p className='font-light sm:text-sm text-gray-700 whitespace-pre-wrap mb-2'>{comment.content}</p>
              <div className='mb-1'>
                <p className='text-xs font-light text-gray-400'>
                  Comment by {commentBy} on {formatDate(comment.datePosted)}
                </p>
                {comment.dateEdited &&
                  <p className='text-xs font-light text-gray-400'>
                    Edited on {formatDate(comment.dateEdited)}
                  </p>
                }
                <p className='text-xs font-light text-gray-400'>Relatability {comment.relatable.length}</p>
              </div>
              {comment.postedBy && comment.postedBy._id === id
                ? <div className='flex items-center justify-between'>
                    <button
                      className='font-light text-blue-700 hover:text-blue-900 text-xs'
                      onClick={() => setCommentToEditId(comment._id)}
                    >
                      Edit comment
                    </button>
                    <button onClick={handleDelete}>
                      <img className='h-4' src={deleteIcon} alt='' />
                    </button>
                  </div>
                : <div className='flex space-x-1.5'>
                    <button
                      className='font-light text-blue-700 hover:text-blue-900 text-xs'
                      data-comment-id={comment._id}
                      onClick={voteCommentRelatability}
                    >
                      {comment.relatable.includes(id) ? 'Unrelatable' : 'Relatable'}
                    </button>
                    <button
                      className='font-light text-blue-700 hover:text-blue-900 text-xs'
                      onClick={() => setReply(true)}
                    >
                      Reply
                    </button>
                  </div>
              }
              {reply && <CommentForm setComments={setComments} setReply={setReply} parentId={comment._id} />}
            </>
        }
      </div>
      <Comments
        parentId={comment._id}
        comments={comments}
        setComments={setComments}
        commentToEditId={commentToEditId}
        setCommentToEditId={setCommentToEditId}
      />
    </div>
  )
}

export default Comment;