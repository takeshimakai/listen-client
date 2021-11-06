import { useContext, useEffect, useState } from "react";
import { useParams, useRouteMatch, Switch, Route, Link } from 'react-router-dom';

import UserContext from "../contexts/UserContext";

import getData from '../utils/getData';
import putData from "../utils/putData";
import formatDate from "../utils/formatDate";
import convertArrToStr from "../utils/convertArrToStr";

import Comments from '../components/Comments';
import PostForm from "./PostForm";
import CommentForm from "../components/CommentForm";
import CommentMenu from "../components/CommentMenu";

const Post = ({ posts, setPosts }) => {
  const match = useRouteMatch();
  const { postId } = useParams();
  const { token } = useContext(UserContext);

  const [user, setUser] = useState();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [commentToEditId, setCommentToEditId] = useState('');
  const [commentSort, setCommentSort] = useState('newest comment');

  useEffect(() => {
    const savedSort = JSON.parse(sessionStorage.getItem('commentSort'));

    if (savedSort) {
      setCommentSort(savedSort);
    }
  }, [])

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
    
          setComments(await res.json());
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [post, token]);

  const votePostRelatability = async (e) => {
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
  }

  return (
    <Switch>
      <Route path={`${match.path}/edit`}>
        <PostForm setPosts={setPosts} post={post} setComments={setComments} />
      </Route>
      <Route path={`${match.path}`}>
        {post
          ? <div id='post-container'>
              <div id='post'>
                <p>Relatability: {post.relatable.length}</p>
                {post.postedBy._id !== user.id &&
                  <button id='post-relatable-btn' onClick={votePostRelatability}>
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
              <CommentForm setComments={setComments} parentId={post._id} />
              <CommentMenu commentSort={commentSort} setCommentSort={setCommentSort} />
              {comments &&
                <Comments
                  parentId={post._id}
                  comments={comments}
                  setComments={setComments}
                  commentSort={commentSort}
                  commentToEditId={commentToEditId}
                  setCommentToEditId={setCommentToEditId}
                  user={user}
                />
              }
            </div>
          : <p>Unable to find post.</p>
        }
      </Route>
    </Switch>
  )
}

export default Post;