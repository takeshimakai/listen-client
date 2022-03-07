import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import postData from '../../utils/postData';
import putData from '../../utils/putData';
import setErrMsgs from '../../utils/setErrMsgs';
import getNewTokensIfExpired from '../../utils/getNewTokensIfExpired';
import updateTokens from '../../utils/updateTokens';
import clearTokens from '../../utils/clearTokens';
import decodeToken from '../../utils/decodeToken';

import sendIcon from '../../assets/send.png';

const CommentForm = ({
  comment,
  setComments,
  setCommentToEditId,
  setReply,
  parentId
}) => {
  const history = useHistory();
  const { postId } = useParams();
  const { token, setToken } = useContext(UserContext);
  const { id } = decodeToken(token);

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

      const newTokens = await getNewTokensIfExpired(token);

      if (newTokens) {
        updateTokens(newTokens.token, newTokens.refreshToken, setToken);
      }

      let res;

      if (comment) {
        res = await putData(`/comments/${comment._id}`, input, newTokens ? newTokens.token : token);
      } else {
        res = await postData(`/comments/${postId}`, input, newTokens ? newTokens.token : token);
      }

      if (!res.ok) throw res;

      const data = await res.json();

      if (comment) {
        setComments(prevComments => {
          const updated = [...prevComments];
          const index = updated.findIndex(comment => comment._id === data._id);
          updated.splice(index, 1, data);
          return updated;
        });
      } else {
        setInput({ ...input, content: '' });
        setComments(prevComments => prevComments.concat(data));
  
        if (setReply) {
          setReply(false);
        }
      }
    } catch (err) {
      if (err.status === 401) {
        clearTokens(setToken, id);
        return history.replace({
          pathname: '/unauthorized',
          state: { redirected: true }
        });
      }

      if (err.status === 400) {
        const { errors } = await err.json();
        return setErrors(setErrMsgs(errors));
      }

      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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