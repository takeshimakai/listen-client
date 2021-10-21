import { useState, useEffect, useContext } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import PostPreview from '../components/PostPreview';
import Post from '../pages/Post';
import PostForm from './PostForm';

const Forum = () => {
  const match = useRouteMatch();

  const { token } = useContext(UserContext);

  const [posts, setPosts] = useState();

  useEffect(() => {
    console.log(posts);
  }, [posts])

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setPosts(await res.json());
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token]);

  return (
    <div id='forum'>
      <Switch>
        <Route path={`${match.path}/new-post`}>
          <PostForm setPosts={setPosts} />
        </Route>
        <Route path={`${match.path}/:postId`}>
          <Post posts={posts} />
        </Route>
        <Route path={`${match.path}`}>
          {posts
            ? posts.map(post => (
                <Link to={`${match.url}/${post._id}`} key={post._id}>
                  <PostPreview post={post} />
                </Link>
              ))
            : <h4>No posts to display</h4>
          }
        </Route>
      </Switch>
    </div>
  )
}

export default Forum;