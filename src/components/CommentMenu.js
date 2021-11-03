const CommentMenu = ({ commentSort, setCommentSort }) => {
  const handleSort = (e) => {
    setCommentSort(e.target.value);
    sessionStorage.setItem('commentSort', JSON.stringify(e.target.value));
  };

  return (
    <div id='comment-menu' className='sort-container'>
      <label htmlFor='comment-sort'>Sort by: </label>
      <select name='sort' id='comment-sort' value={commentSort} onChange={handleSort}>
        <option value='newest comment'>Newest comment</option>
        <option value='oldest comment'>Oldest comment</option>
        <option value='newest edit'>Newest edit</option>
        <option value='oldest edit'>Oldest edit</option>
        <option value='most relatable'>Most relatable</option>
        <option value='least relatable'>Least relatable</option>
      </select>
    </div>
  )
}

export default CommentMenu;