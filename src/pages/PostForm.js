import { useContext, useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';

import UserContext from "../contexts/UserContext";

import postData from "../utils/postData";
import putData from '../utils/putData';
import setErrMsgs from '../utils/setErrMsgs';

const PostForm = ({ setPosts, post }) => {
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
      post.topics.forEach(topic => {
        const checkboxId = topic.toLowerCase().replaceAll(/\s/g, '-');
        document.querySelector(`#${checkboxId}`).checked = true;
      });

      setInput({
        topics: post.topics,
        title: post.title,
        content: post.content
      });
    }
  }, [post]);

  useEffect(() => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => handleCheckbox(e));
    });
  }, []);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    checked
      ? setInput(prevInput => {
          const topics = prevInput.topics.concat(value);
          return { ...prevInput, topics: topics };
        })
      : setInput(prevInput => {
          const topics = prevInput.topics.filter(topic => topic !== value);
          return { ...prevInput, topics: topics };
        });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await postData('/posts', input, token);
      const data = await res.json();

      if (res.ok) {
        setPosts(prevPosts => prevPosts.concat(data));
        setRedirectPath(data._id);
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
        setRedirectPath(data._id);
      }

      if (!res.ok) {
        setErrors(setErrMsgs(data.errors));
      }
    } catch (err) {
      console.log(err);
    }
  }

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
          <input type='checkbox' id='neurodevelopmental-disorders' value='Neurodevelopmental disorders' />
          <label htmlFor='neurodevelopmental-disorders'>Neurodevelopmental disorders</label>
          <input type='checkbox' id='bipolar-and-related-disorders' value='Bipolar and related disorders' />
          <label htmlFor='bipolar-and-related-disorders'>Bipolar and related disorders</label>
          <input type='checkbox' id='anxiety-disorders' value='Anxiety disorders' />
          <label htmlFor='anxiety-disorders'>Anxiety disorders</label>
          <input type='checkbox' id='stress-related-disorders' value='Stress related disorders' />
          <label htmlFor='stress-related-disorders'>Stress related disorders</label>
          <input type='checkbox' id='dissociative-disorders' value='Dissociative disorders' />
          <label htmlFor='dissociative-disorders'>Dissociative disorders</label>
          <input type='checkbox' id='somatic-symptoms-disorders' value='Somatic symptoms disorders' />
          <label htmlFor='somatic-symptoms-disorders'>Somatic symptoms disorders</label>
          <input type='checkbox' id='eating-disorders' value='Eating disorders' />
          <label htmlFor='eating-disorders'>Eating disorders</label>
          <input type='checkbox' id='sleep-disorders' value='Sleep disorders' />
          <label htmlFor='sleep-disorders'>Sleep disorders</label>
          <input type='checkbox' id='disruptive-disorders' value='Disruptive disorders' />
          <label htmlFor='disruptive-disorders'>Disruptive disorders</label>
          <input type='checkbox' id='depressive-disorders' value='Depressive disorders' />
          <label htmlFor='depressive-disorders'>Depressive disorders</label>
          <input type='checkbox' id='substance-related-disorders' value='Substance related disorders' />
          <label htmlFor='substance-related-disorders'>Substance related disorders</label>
          <input type='checkbox' id='neurocognitive-disorders' value='Neurocognitive disorders' />
          <label htmlFor='neurocognitive-disorders'>Neurocognitive disorders</label>
          <input type='checkbox' id='schizophrenia' value='Schizophrenia' />
          <label htmlFor='schizophrenia'>Schizophrenia</label>
          <input type='checkbox' id='obsessive-compulsive-disorders' value='Obsessive-compulsive disorders' />
          <label htmlFor='obsessive-compulsive-disorders'>Obsessive-compulsive disorders</label>
          <input type='checkbox' id='personality-disorders' value='Personality disorders' />
          <label htmlFor='personality-disorders'>Personality disorders</label>
          <input type='checkbox' id='other' value='Other' />
          <label htmlFor='other'>Other</label>
        </div>
        <input className='post-form-input' type='submit' value='Post' />
      </form>

      {redirectPath && <Redirect to={`/forum/${redirectPath}`} />}
    </div>
  )
}

export default PostForm;