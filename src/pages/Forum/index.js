import { useState, useEffect, useContext } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import useWindowWidth from '../../hooks/useWindowWidth';

import getData from '../../utils/getData';
import sortData from '../../utils/sortData';

import PostPreview from '../../components/PostPreview';
import Post from '../Post';
import PostForm from '../PostForm';
import Filters from './Filters';
import Sort from '../../components/Sort';

const Forum = () => {
  const match = useRouteMatch();

  const { token } = useContext(UserContext);

  const windowWidth = useWindowWidth();
  const [posts, setPosts] = useState([]);
  const [sortPostsBy, setSortPostsBy] = useState('newest');
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const savedSort = JSON.parse(sessionStorage.getItem('sortPostsBy'));
    const savedFilters = JSON.parse(sessionStorage.getItem('filters'));

    if (savedSort) {
      setSortPostsBy(savedSort);
    }

    if (savedFilters) {
      setFilters(savedFilters);
    }
  }, [])

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
    <Switch>
      <Route path={`${match.path}/new`}>
        <PostForm setPosts={setPosts} />
      </Route>
      <Route path={`${match.path}/:postId`}>
        <Post posts={posts} setPosts={setPosts} />
      </Route>
      <Route path={match.path}>
        <div className='pt-16 sm:pt-20 px-4 md:px-0 pb-12 space-y-4 md:w-3/5 md:mx-auto'>
          <div className='sm:flex sm:justify-between'>
            <div className='relative flex justify-between items-center sm:justify-start'>
              <Filters filters={filters} setFilters={setFilters} />
              <Sort sortBy={sortPostsBy} setSortBy={setSortPostsBy} name='posts' />
            </div>
            <Link
              className='fixed sm:relative bottom-3 right-3 sm:inset-0 w-11 sm:w-40 h-11 sm:h-8 border rounded-full border-green-700 flex items-center justify-center text-green-700 text-2xl sm:text-sm shadow-md bg-gray-50 hover:text-white hover:bg-green-700 active:shadow-inner'
              to={`${match.url}/new`}
            >
              {windowWidth < 640 ? <span>&#65291;</span> : 'Create new post'}
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