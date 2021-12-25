import { useState, useEffect, useContext } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import getData from '../../utils/getData';
import sortData from '../../utils/sortData';

import PostPreview from './PostPreview';
import Post from '../Post';
import PostForm from '../PostForm';
import ForumMenu from './ForumMenu';

const Forum = () => {
  const match = useRouteMatch();

  const { token } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('newest post');
  const [filters, setFilters] = useState([]);
  const [lessThan640, setLessThan640] = useState(window.innerWidth < 640);

  useEffect(() => {
    const updateLessThan640 = () => setLessThan640(window.innerWidth < 640);
    window.addEventListener('resize', updateLessThan640);
    return () => window.removeEventListener('resize', updateLessThan640);
  });

  useEffect(() => {
    const savedSort = JSON.parse(sessionStorage.getItem('sortBy'));
    const savedFilters = JSON.parse(sessionStorage.getItem('filters'));

    if (savedSort) {
      setSortBy(savedSort);
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
      <Route path={`${match.path}`}>
        <div className='pt-20 px-4'>
          <div className='sm:flex sm:justify-between'>
            <ForumMenu
              sortBy={sortBy}
              setSortBy={setSortBy}
              filters={filters}
              setFilters={setFilters}
            />
            <Link
              className='fixed sm:relative bottom-3 right-3 sm:inset-0 w-11 sm:w-40 h-11 sm:h-8 border rounded-full border-green-700 flex items-center justify-center text-green-700 text-2xl sm:text-sm shadow-md bg-gray-50 hover:text-white hover:bg-green-700 active:shadow-inner'
              to={`${match.url}/new`}
            >
              {lessThan640 ? <span>&#65291;</span> : 'Create new post'}
            </Link>
          </div>
          {posts.length > 0
            ? sortData(sortBy, posts).map(post => (
                filters.length === 0
                  ? <Link to={`${match.url}/${post._id}`} key={post._id}>
                      <PostPreview post={post} />
                    </Link>
                  : post.topics.some(topic => filters.includes(topic)) &&
                      <Link to={`${match.url}/${post._id}`} key={post._id}>
                        <PostPreview post={post} />
                      </Link>
            ))
            : <p>No posts to display</p>
          }
        </div>
      </Route>
    </Switch>
  )
}

export default Forum;