import { useContext, useEffect, useState } from "react";
import { useParams, useRouteMatch, Switch, Route, Link } from 'react-router-dom';

import UserContext from "../contexts/UserContext";

import getData from '../utils/getData';
import putData from "../utils/putData";
import formatDate from "../utils/formatDate";
import convertArrToStr from "../utils/convertArrToStr";
import sortData from "../utils/sortData";

import Comment from '../components/Comment';
import PostForm from "./PostForm";
import CommentForm from "../components/CommentForm";

const Post = ({ posts, setPosts }) => {
  const match = useRouteMatch();
  const { postId } = useParams();
  const { token } = useContext(UserContext);

  const [user, setUser] = useState();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [commentToEditId, setCommentToEditId] = useState('');

  useEffect(() => {
    setCommentToEditId('');
  }, [comments]);

  useEffect(() => {
    if (token) {
      setUser(JSON.parse(atob(token.split('.')[1])));
    }
  }, [token]);

  useEffect(() => {
    if (posts) {
      setPost(posts.find(post => post._id === postId));
    }
  }, [posts, postId]);

  useEffect(() => {
    if (post) {
      (async () => {
        try {
          const res = await getData(`/comments/${post._id}`, token);
    
          setComments(sortData('newest post', await res.json()));
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [post, token]);

  const voteRelatable = async (e) => {
    try {
      if (e.target.id === 'post-relatable-btn') {
        const res = await putData(`/posts/${post._id}/relatability`, undefined, token);
        const data = await res.json();
  
        setPosts(prevPosts => {
          const updated = [...prevPosts];
          updated.splice(updated.findIndex(post => post._id === data._id), 1, data);
          return updated;
        });
      }

      if (e.target.id === 'comment-relatable-btn') {
        const res = await putData(`/comments/${e.target.dataset.commentId}/relatability`, undefined, token);
        const data = await res.json();

        setComments(prevComments => {
          const updated = [...prevComments];
          updated.splice(updated.findIndex(comment => comment._id === data._id), 1, data);
          return updated;
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Switch>
      <Route path={`${match.path}/edit`}>
        <PostForm setPosts={setPosts} post={post} />
      </Route>
      <Route path={`${match.path}`}>
        {post
          ? <div id='post'>
              <div id='post-container'>
                <p>Relatability: {post.relatable.length}</p>
                {post.postedBy._id !== user.id &&
                  <button id='post-relatable-btn' onClick={voteRelatable}>
                    {post.relatable.includes(user.id)
                      ? 'Unrelatable'
                      : 'Relatable'
                    }
                  </button>
                }
                <h3>{post.title}</h3>
                <p>Posted by: {post.postedBy.profile.username}</p>
                <p>Posted on: {formatDate(post.datePosted)}</p>
                {post.dateEdited && <p>Edited on: {formatDate(post.dateEdited)}</p>}
                <p>Filed under: {convertArrToStr(post.topics)}</p>
                <p>{post.content}</p>
              </div>
              {user.id === post.postedBy._id && <Link to={`${match.url}/edit`}>Edit post</Link>}
              <CommentForm setComments={setComments} />
              {comments && comments.map(comment => (
                commentToEditId === comment._id
                  ? <CommentForm
                      comment={comment}
                      setComments={setComments}
                      setCommentToEditId={setCommentToEditId}
                      key={comment._id}
                    />
                  : <div className='comment-container' key={comment._id}>
                      <Comment comment={comment} />
                      {user.id === comment.postedBy._id
                        ? <button onClick={() => setCommentToEditId(comment._id)}>Edit comment</button>
                        : <button id='comment-relatable-btn' data-comment-id={comment._id} onClick={voteRelatable}>
                            {comment.relatable.includes(user.id)
                              ? 'Unrelatable'
                              : 'Relatable'
                            }
                          </button>
                      }
                    </div>
              ))}
            </div>
          : <p>Unable to find post.</p>
        }
      </Route>
    </Switch>
  )
}

export default Post;