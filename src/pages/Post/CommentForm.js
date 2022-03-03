import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import postData from '../../utils/postData';
import putData from '../../utils/putData';
import setErrMsgs from '../../utils/setErrMsgs';

import sendIcon from '../../assets/send.png';

const CommentForm = ({
  comment,
  setComments,
  setCommentToEditId,
  setReply,
  parentId
}) => {
  const { postId } = useParams();
  const { token } = useContext(UserContext);

  const [input, setInput] = useState({ content: '', replyTo: parentId });
  const [errors, setErrors] = useState();

  useEffect(() => {
    if (comment) {
      setInput({ content: comment.content });
    }
  }, [comment]);

  const handleInput = (e) => setInput({ ...input, content: e.target.value });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await postData(`/comments/${postId}`, input, token);

      if (!res.ok) {
        throw res;
      }

      const data = await res.json();

      setInput({ ...input, content: '' });
      setComments(prevComments => prevComments.concat(data));

      if (setReply) {
        setReply(false);
      }
    } catch (err) {
      if (err.status === 400) {
        const { errors } = await err.json();
        return setErrors(setErrMsgs(errors));
      }

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
    <form onSubmit={comment ? handleEditSubmit : handleSubmit}>
      <p className='error-msg mt-0 mb-1'>{errors && errors.content}</p>
      <textarea
        className='p-2 w-full h-16 border border-gray-400 focus:border-gray-700 rounded-md sm:text-sm text-gray-900 focus:outline-none'
        placeholder='Add comment'
        value={input.content}
        onChange={handleInput}
      />
      <div className='flex justify-end'>
        {comment &&
          <input
            className='font-light text-blue-700 hover:text-blue-900 text-xs bg-transparent mr-3 cursor-pointer'
            type='button'
            value='Cancel'
            onClick={() => setCommentToEditId('')}
          />
        }
        {setReply &&
          <input
            className='font-light text-blue-700 hover:text-blue-900 text-xs bg-transparent mr-3 cursor-pointer'
            type='button'
            value='Cancel'
            onClick={() => setReply('')}
          />
        }
        <button className='border rounded-full border-green-700 p-1.5 shadow'>
          <img className='h-4 w-4' src={sendIcon} alt='' />
        </button>
      </div>
    </form>
  )
}

export default CommentForm;