import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import getData from "../../utils/getData";
import sortData from '../../utils/sortData';

import Sort from '../../components/Sort';
import PostPreview from "../../components/PostPreview";
import YourComment from "./YourComment";

const ForumActivity = () => {
  const { token } = useContext(UserContext);

  const [activity, setActivity] = useState({ posts: [], comments: [] });
  const [sortPostsBy, setSortPostsBy] = useState('newest');
  const [sortCommentsBy, setSortCommentsBy] = useState('newest');

  useEffect(() => {
    (async () => {
      try {
        const res = await Promise.all([
          getData('/posts/by-user', token),
          getData('/comments/by-user', token)
        ]);

        const [posts, comments] = await Promise.all([res[0].json(), res[1].json()]);

        setActivity({ posts, comments });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token]);

  return (
    <div className='pt-16 sm:pt-20 px-4 sm:px-0 pb-12 sm:w-3/5 sm:mx-auto'>
      <div>
        <div className='mb-4 flex justify-between items-center'>
          <h3 className='text-gray-600 font-light sm:text-sm'>Your posts</h3>
          <Sort sortBy={sortPostsBy} setSortBy={setSortPostsBy} />
        </div>
        <div className='space-y-4'>
          {activity.posts.length > 0
            ? sortData(sortPostsBy, activity.posts).map(post => (
                <Link className='block' to={`/forum/${post._id}`} key={post._id}>
                  <PostPreview post={post} />
                </Link>
              ))
            : <p className='font-light sm:text-sm'>There are no posts to show.</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        <div className='mb-4 flex justify-between items-center'>
          <h3 className='text-gray-600 font-light sm:text-sm'>Your comments</h3>
          <Sort sortBy={sortCommentsBy} setSortBy={setSortCommentsBy} />
        </div>
        <div className='space-y-4'>
          {activity.comments.length > 0
            ? sortData(sortCommentsBy, activity.comments).map(comment => (
                <Link className='block' to={`/forum/${comment.postId._id}`} key={comment._id}>
                  <YourComment comment={comment} />
                </Link>
              ))
            : <p className='font-light sm:text-sm'>There are no comments to show.</p>
          }
        </div>
      </div>
    </div>
  )
}

export default ForumActivity;