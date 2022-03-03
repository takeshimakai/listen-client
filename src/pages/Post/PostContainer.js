import { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import decodeToken from '../../utils/decodeToken';
import putData from '../../utils/putData';
import formatDate from '../../utils/formatDate';
import convertArrToStr from '../../utils/convertArrToStr';

const PostContainer = ({ post, setPosts, setEditMode }) => {
  const { token } = useContext(UserContext);
  const { id } = decodeToken(token);

  const votePostRelatability = async () => {
    try {
      const res = await putData(`/posts/${post._id}/relatability`, undefined, token);
      const data = await res.json();

      setPosts(prevPosts => {
        const updated = [...prevPosts];
        updated.splice(updated.findIndex(post => post._id === data._id), 1, data);
        return updated;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const postedBy = (
    <span>
      {!post.postedBy
        ? 'deleted user'
        : <Link className='text-blue-700 hover:text-blue-900' to={`/users/${post.postedBy._id}`}>
            {post.postedBy.profile.username}
          </Link>
      }
    </span>
  )

  return (
    <div className='border rounded-xl p-6 sm:p-10 shadow-md space-y-4'>
      <h3 className='font-medium text-green-700'>{post.title}</h3>
      <p className='font-light sm:text-sm text-gray-700 whitespace-pre-wrap'>{post.content}</p>
      <div>
        <p className='text-xs font-light text-gray-400'>
          Posted by {postedBy} on {formatDate(post.datePosted)}
        </p>
        {post.dateEdited &&
          <p className='text-xs font-light text-gray-400'>Edited on {formatDate(post.dateEdited)}</p>
        }
        <p className='text-xs font-light text-gray-400'>Filed under: {convertArrToStr(post.topics)}</p>
        <p className='text-xs font-light text-gray-400'>Relatability {post.relatable.length}</p>
      </div>
      {post.postedBy && post.postedBy._id === id
        ? <button
            className='font-light text-blue-700 hover:text-blue-900 text-xs'
            onClick={() => setEditMode(true)}
          >
            Edit post
          </button>
        : <button className='font-light text-blue-700 hover:text-blue-900 text-xs' onClick={votePostRelatability}>
            {post.relatable.includes(id)
              ? 'Unrelatable'
              : 'Relatable'
            }
          </button>
      }
    </div>
  )
}

export default PostContainer;