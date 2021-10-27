import formatDate from '../utils/formatDate';

const PostPreview = ({ post }) => {
  return (
    <div className='post-preview'>
      <h4 className='post-preview-title'>{post.title}</h4>
      <p className='post-preview-author'>Posted by: {post.postedBy.profile.username}</p>
      <p className='post-preview-date-posted'>Posted on: {formatDate(post.datePosted)}</p>
      {post.dateEdited && <p className='post-preview-date-edited'>Edited on: {formatDate(post.dateEdited)}</p>}
    </div>
  )
}

export default PostPreview;