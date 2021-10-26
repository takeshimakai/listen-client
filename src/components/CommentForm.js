import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import postData from '../utils/postData';
import putData from '../utils/putData';
import setErrMsgs from '../utils/setErrMsgs';

const CommentForm = ({ comment, setComments, setCommentToEditId }) => {
  const { postId } = useParams();

  const { token } = useContext(UserContext);

  const [input, setInput] = useState({ content: '' });
  const [errors, setErrors] = useState();

  useEffect(() => {
    if (comment) {
      setInput({ content: comment.content });
    }
  }, [comment]);

  const handleInput = (e) => setInput({ content: e.target.value });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await postData(`/comments/${postId}`, input, token);
      const data = await res.json();

      if (res.ok) {
        setInput({ content: '' });
        setComments(prevComments => prevComments.concat(data));
      }

      if (!res.ok) {
        setErrors(setErrMsgs(data.errors));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await putData(`/comments/${comment._id}`, input, token);
      const data = await res.json();

      if (res.ok) {
        setComments(prevComments => {
          const updated = [...prevComments];
          const index = updated.findIndex(comment => comment._id === data._id);
          updated.splice(index, 1, data);
          return updated;
        });
      }

      if (!res.ok) {
        setErrors(setErrMsgs(data.errors));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form id='comment-form' onSubmit={comment ? handleEditSubmit : handleSubmit}>
      <textarea placeholder='Add comment' value={input.content} onChange={handleInput} />
      {errors && <p className='error'>{errors.content}</p>}
      {comment && <input type='button' value='Cancel' onClick={() => setCommentToEditId('')} />}
      <input type='submit' value='Save' />
    </form>
  )
}

export default CommentForm;