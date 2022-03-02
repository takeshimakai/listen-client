import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import UserContext from "../../contexts/UserContext";

import TitleInput from "./TitleInput";
import Categories from "./Categories";
import ContentInput from "./ContentInput";

import postData from "../../utils/postData";
import putData from '../../utils/putData';
import deleteData from "../../utils/deleteData";
import setErrMsgs from '../../utils/setErrMsgs';

import deleteIcon from '../../assets/delete.png';

const PostForm = ({ post, setPosts, setComments, setEditMode }) => {
  const history = useHistory();
  const { token } = useContext(UserContext);

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

      const res = await postData('/posts', input, token);

      if (!res.ok) {
        throw res;
      }

      const data = await res.json();

      setPosts(prevPosts => prevPosts.concat(data));
      history.replace(`/forum/${data._id}`);
    } catch (err) {
      if (err.status === 400) {
        const { errors } = await err.json();
        return setErrors(setErrMsgs(errors));
      }

      console.log(err);
    }
  }

  const handleEditSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await putData(`/posts/${post._id}`, input, token);

      if (!res.ok) {
        throw res;
      }

      const data = await res.json();

      setPosts(prevPosts => {
        const updated = [...prevPosts];
        const index = updated.findIndex(post => post._id === data._id);
        updated.splice(index, 1, data);
        return updated;
      });

      setEditMode(false);
    } catch (err) {
      if (err.status === 400) {
        const { errors } = await err.json();
        return setErrors(setErrMsgs(errors));
      }

      console.log(err);
    }
  }

  const handleDelete = async () => {
    try {
      const res = await deleteData(`/posts/${post._id}`, token);

      if (res.ok) {
        setPosts(prevPosts => prevPosts.filter(prevPost => prevPost._id !== post._id));
        setComments(prevComments => prevComments.filter(comment => comment.postId !== post._id));
        history.replace('/forum');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className='flex flex-col justify-between h-screen max-w-md sm:max-w-2xl pt-20 px-10 pb-10 mx-auto'
      onSubmit={post ? handleEditSubmit : handleSubmit}
    >
      <div className='flex-grow flex flex-col space-y-3'>
        <TitleInput input={input.title} handleInput={handleInput} errors={errors} />
        <Categories input={input.topics} setInput={setInput} handleInput={handleInput} errors={errors} />
        <ContentInput input={input.content} handleInput={handleInput} errors={errors} />
      </div>
      <div className='flex'>
        {setEditMode &&
          <button
            className='mr-10 sm:mr-0 flex-none'
            type='button'
            onClick={handleDelete}
          >
            <img className='h-6' src={deleteIcon} alt='' />
          </button>
        }
        <div className='flex justify-end w-full space-x-2'>
          <input
            className='flex-1 sm:flex-none border active:border-0 active:p-px shadow-md active:shadow-inner sm:w-40 h-8 rounded-md cursor-pointer bg-gray-50 text-sm text-gray-600 hover:bg-gray-200'
            type='button'
            value='Cancel'
            onClick={() => history.goBack()}
          />
          <input
            className='flex-1 sm:flex-none shadow-md sm:w-40 h-8 rounded-md cursor-pointer bg-green-700 text-sm text-white hover:bg-green-800 active:shadow-inner-2'
            type='submit'
            value='Post'
          />
        </div>
      </div>
    </form>
  )
}

export default PostForm;