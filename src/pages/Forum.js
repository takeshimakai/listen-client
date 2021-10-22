import { useState, useEffect, useContext } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import getData from '../utils/getData';

import PostPreview from '../components/PostPreview';
import Post from '../pages/Post';
import PostForm from './PostForm';

const Forum = () => {
  const match = useRouteMatch();

  const { token } = useContext(UserContext);

  const [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await getData('/posts', token);

        setPosts(await res.json());
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token]);

  return (
    <div id='forum'>
      <Link to={`${match.url}/new`}>Create a new post</Link>
      
      <Switch>
        <Route path={`${match.path}/new`}>
          <PostForm setPosts={setPosts} />
        </Route>
        <Route path={`${match.path}/:postId`}>
          <Post posts={posts} setPosts={setPosts} />
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