import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import UserContext from "../contexts/UserContext";

import getData from '../utils/getData';

import Comment from '../components/Comment';

const Post = ({ posts }) => {
  const { postId } = useParams();
  const { token } = useContext(UserContext);

  const [post] = useState(posts.find(post => post._id === postId));
  const [comments, setComments] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await getData(`/comments/${post._id}`, token);
  
        setComments(await res.json());
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div id='post'>
      <div id='post-container'>
        <h3>{post.title}</h3>
        <p>Posted by: {post.postedBy.profile.username}</p>
        <p>Posted on: {post.datePosted}</p>
        {post.dateEdited && <p>Edited on: {post.dateEdited}</p>}
        <p>Filed under: {post.topics}</p>
        <p>{post.content}</p>
      </div>
      {comments && comments.map(comment => <Comment comment={comment} key={comment._id} />)}
    </div>
  )
}

export default Post;