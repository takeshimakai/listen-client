import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import UserContext from "../../contexts/UserContext";

import Categories from "./Categories";
import ContentInput from "./ContentInput";
import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";

import postData from "../../utils/postData";
import putData from '../../utils/putData';
import deleteData from "../../utils/deleteData";
import setErrMsgs from '../../utils/setErrMsgs';
import getNewTokensIfExpired from '../../utils/getNewTokensIfExpired';
import updateTokens from '../../utils/updateTokens';
import clearTokens from '../../utils/clearTokens';
import decodeToken from "../../utils/decodeToken";

import deleteIcon from '../../assets/delete.png';

const PostForm = ({ post, setPosts, setComments, setEditMode }) => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);
  const { id } = decodeToken(token);

  const [errors, setErrors] = useState();
  const [input, setInput] = useState({
    topics: [],
    title: '',
    content: ''
  });

  useEffect(() => {
    if (post) {
      setInput({
        topics: post.topics,
        title: post.title,
        content: post.content
      });
    }
  }, [post]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    name === 'topics'
      ? input.topics.includes(value)
          ? setInput(prev => ({
              ...prev,
              topics: prev.topics.filter(topic => topic !== value)
            }))
          : setInput(prev => ({
              ...prev,
              topics: prev.topics.concat(value)
            }))
      : setInput(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const newTokens = await getNewTokensIfExpired(token);

      if (newTokens) {
        updateTokens(newTokens.token, newTokens.refreshToken, setToken);
      }

      let res;

      if (post) {
        res = await putData(`/posts/${post._id}`, input, newTokens ? newTokens.token : token);
      } else {
        res = await postData('/posts', input, newTokens ? newTokens.token : token);
      }

      if (!res.ok) throw res;

      const data = await res.json();

      if (post) {
        setPosts(prevPosts => {
          const updated = [...prevPosts];
          const index = updated.findIndex(post => post._id === data._id);
          updated.splice(index, 1, data);
          return updated;
        });

        setEditMode(false);
      } else {
        setPosts(prevPosts => prevPosts.concat(data));
        history.replace(`/forum/${data._id}`);
      }
    } catch (err) {
      if (err.status === 401) {
        clearTokens(setToken, id);
        return history.replace('/unauthorized');
      }

      if (err.status === 400) {
        const { errors } = await err.json();
        return setErrors(setErrMsgs(errors));
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

      const res = await deleteData(`/posts/${post._id}`, undefined, newTokens ? newTokens.token : token);

      if (!res.ok) throw res;

      setPosts(prevPosts => prevPosts.filter(prevPost => prevPost._id !== post._id));
      setComments(prevComments => prevComments.filter(comment => comment.postId !== post._id));
      history.replace('/forum');
    } catch (err) {
      if (err.status === 401) {
        clearTokens(setToken, id);
        return history.replace('/unauthorized');
      }

      console.log(err);
    }
  };

  return (
    <form
      style={{ height: "100dvh" }}
      className='flex flex-col w-full max-w-md sm:max-w-2xl pt-16 sm:pt-20 px-4 pb-4 sm:pb-10 mx-auto'
      onSubmit={handleSubmit}
    >
      <div className='flex-grow flex flex-col space-y-3'>
        <div className='flex flex-col gap-y-1'>
          <label className='subtitle' htmlFor='title'>Title</label>
          <Input
            id='title'
            name='title'
            value={input.title}
            onChange={handleInput}
          />
          {errors?.title && (
            <p className='error-msg'>{errors.title}</p>
          )}
        </div>
        <Categories
          input={input.topics}
          setInput={setInput}
          handleInput={handleInput}
          error={errors?.topics}
        />
        <ContentInput
          input={input.content}
          handleInput={handleInput}
          error={errors?.content}
        />
      </div>
      <div className='flex mt-4 justify-between'>
        <div className='flex-grow sm:max-w-xs grid grid-cols-2 gap-x-2'>
          <PrimaryButton>
            Post
          </PrimaryButton>
          <SecondaryButton
            type='button'
            onClick={() => history.goBack()}
          >
            Cancel
          </SecondaryButton>
        </div>
        {setEditMode &&
          <button
            className='ml-10 sm:ml-0'
            type='button'
            onClick={handleDelete}
          >
            <img className='h-6' src={deleteIcon} alt='' />
          </button>
        }
      </div>
    </form>
  )
}

export default PostForm;