import { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';

import UserContext from "../../contexts/UserContext";

import postData from "../../utils/postData";
import putData from '../../utils/putData';
import deleteData from "../../utils/deleteData";
import setErrMsgs from '../../utils/setErrMsgs';

import data from '../../data/data';

const PostForm = ({ setPosts, post, setComments }) => {
  const history = useHistory();
  const { token } = useContext(UserContext);

  const [redirectPath, setRedirectPath] = useState();
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
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    input.topics.includes(e.target.id)
      ? setInput(prevInput => (
          {
            ...prevInput,
            topics: prevInput.topics.filter(topic => topic !== e.target.id)
          }
        ))
      : setInput(prevInput => (
          {
            ...prevInput,
            topics: prevInput.topics.concat(e.target.id)
          }
        ));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await postData('/posts', input, token);
      const data = await res.json();

      if (res.ok) {
        console.log(data.datePostedFormatted);
        setPosts(prevPosts => prevPosts.concat(data));
        setRedirectPath(`/forum/${data._id}`);
      }

      if (!res.ok) {
        setErrors(setErrMsgs(data.errors));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleEditSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await putData(`/posts/${post._id}`, input, token);
      const data = await res.json();

      if (res.ok) {
        setPosts(prevPosts => {
          const updated = [...prevPosts];
          const index = updated.findIndex(post => post._id === data._id);
          updated.splice(index, 1, data);
          return updated;
        });
        setRedirectPath(`/forum/${data._id}`);
      }

      if (!res.ok) {
        setErrors(setErrMsgs(data.errors));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async () => {
    try {
      const res = await deleteData(`/posts/${post._id}`, token);

      if (res.ok) {
        setPosts(prevPosts => prevPosts.filter(prevPost => prevPost._id !== post._id));
        setComments(prevComments => prevComments.filter(comment => comment.postId !== post._id));
        setRedirectPath('/forum');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const checkboxes = (
    data.categories.map(category => (
      <div className='checkbox' key={category}>
        <input
          type='checkbox'
          id={category}
          checked={input.topics.includes(category)}
          onChange={handleCheckbox}
        />
        <label htmlFor={category}>{category}</label>
      </div>
    ))
  )

  return (
    <div>
      <form id='post-form' onSubmit={post ? handleEditSubmit : handleSubmit}>
        <div className='post-form-input'>
          <label htmlFor='title'>Title: </label>
          <input id='title' type='text' name='title' value={input.title} onChange={handleInput} />
          {errors && errors.title && <p className='error'>{errors.title}</p>}
        </div>
        <textarea className='post-form-input' name='content' value={input.content} onChange={handleInput} />
        {errors && errors.content && <p className='error'>{errors.content}</p>}
        <div className='post-form-input' id='post-form-input-checkbox-container'>
          <p>Categorize under:</p>
          {errors && errors.topics && <p className='error'>{errors.topics}</p>}
          {checkboxes}
        </div>
        {setComments && <input type='button' value='Delete' onClick={handleDelete} />}
        <input type='button' value='Cancel' onClick={() => history.goBack()} />
        <input className='post-form-input' type='submit' value='Post' />
      </form>

      {redirectPath && <Redirect to={redirectPath} />}
    </div>
  )
}

export default PostForm;