import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import getData from "../../utils/getData";
import decodeToken from "../../utils/decodeToken";
import formatDate from "../../utils/formatDate";

const ForumActivity = () => {
  const { token } = useContext(UserContext);
  const { username } = decodeToken(token);

  const [activity, setActivity] = useState({
    posts: [],
    comments: []
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await Promise.all([
          getData('/posts/by-user', token),
          getData('/comments/by-user', token)
        ]);

        const [posts, comments] = await Promise.all([res[0].json(), res[1].json()]);

        setActivity({
          posts: posts,
          comments: comments
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token]);

  return (
    <div>
      <h2>{username}</h2>
      <div id='forum-activity-posts'>
        <h3>Your posts:</h3>
        {activity.posts.map(post => (
          <Link to={`/forum/${post._id}`} key={post._id}>
            <h4>{post.title}</h4>
            <p>Posted: {formatDate(post.datePosted)}</p>
            {post.dateEdited && <p>Edited: {formatDate(post.dateEdited)}</p>}
          </Link>
        ))}
      </div>
      <div id='forum-activity-comments'>
        <h3>Your comments:</h3>
        {activity.comments.map(comment => (
          <Link to={`/forum/${comment.postId._id}`} key={comment._id}>
            <p>{comment.content}</p>
            <p>Original post: {comment.postId.title}</p>
            <p>Commented: {formatDate(comment.datePosted)}</p>
            {comment.dateEdited && <p>Edited: {formatDate(comment.dateEdited)}</p>}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ForumActivity;