import { useState, useEffect, useContext } from 'react';
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import PrimaryButton from '../../components/PrimaryButton';

import getData from '../../utils/getData';
import sortData from '../../utils/sortData';
import getNewTokensIfExpired from '../../utils/getNewTokensIfExpired';
import updateTokens from '../../utils/updateTokens';
import clearTokens from '../../utils/clearTokens';
import decodeToken from '../../utils/decodeToken';

import PostPreview from '../../components/PostPreview';
import Post from '../Post';
import PostForm from '../PostForm';
import Filters from './Filters';
import Sort from '../../components/Sort';

const Forum = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { token, setToken } = useContext(UserContext);
  const { id } = decodeToken(token);

  const [posts, setPosts] = useState([]);
  const [sortPostsBy, setSortPostsBy] = useState('newest');
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const savedFilters = JSON.parse(sessionStorage.getItem('filters'));

    if (savedFilters) {
      setFilters(savedFilters);
    }
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const newTokens = await getNewTokensIfExpired(token);

        if (newTokens) {
          return updateTokens(newTokens.token, newTokens.refreshToken, setToken);
        }

        const res = await getData('/posts', token);

        if (!res.ok) throw res;

        setPosts(await res.json());
      } catch (err) {
        if (err.status === 401) {
          clearTokens(setToken, id);
          return history.replace('/unauthorized');
        }

        console.log(err);
      }
    })();
  }, [token, history, setToken, id]);

  return (
    <Switch>
      <Route path={`${match.path}/new`}>
        <PostForm setPosts={setPosts} />
      </Route>
      <Route path={`${match.path}/:postId`}>
        <Post posts={posts} setPosts={setPosts} />
      </Route>
      <Route path={match.path}>
        <div className='pt-16 sm:pt-20 px-4 sm:px-0 pb-4 sm:pb-10 space-y-4 sm:w-4/5 lg:w-3/5 sm:mx-auto'>
          <div className='sm:flex sm:justify-between'>
            <div className='relative flex justify-between items-center sm:justify-start'>
              <Filters filters={filters} setFilters={setFilters} />
              <Sort sortBy={sortPostsBy} setSortBy={setSortPostsBy} />
            </div>
            <Link
              className='hidden sm:inline-block'
              to={`${match.url}/new`}
            >
              <PrimaryButton rounded inverse>
                Create new post
              </PrimaryButton>
            </Link>
            <Link
              className='sm:hidden fixed bottom-3 right-3 w-11 h-11 border rounded-full border-green-700 flex items-center justify-center text-green-700 text-2xl shadow-md bg-gray-50 hover:text-white hover:bg-green-700 active:shadow-inner'
              to={`${match.url}/new`}
            >
              &#65291;
            </Link>
          </div>
          {posts.length > 0
            ? sortData(sortPostsBy, posts).map(post => (
                filters.length === 0
                  ? <Link className='block min-w-0 w-full' to={`${match.url}/${post._id}`} key={post._id}>
                      <PostPreview post={post} />
                    </Link>
                  : post.topics.some(topic => filters.includes(topic)) &&
                      <Link className='block min-w-0 w-full' to={`${match.url}/${post._id}`} key={post._id}>
                        <PostPreview post={post} />
                      </Link>
              ))
            : <p className='font-light sm:text-sm'>There are no posts to show.</p>
          }
        </div>
      </Route>
    </Switch>
  )
}

export default Forum;