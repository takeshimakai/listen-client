const Sort = ({ sortBy, setSortBy, name }) => {
  const handleSort = (e) => {
    const { value } = e.target;

    setSortBy(value);

    if (name === 'posts') {
      sessionStorage.setItem('sortPostsBy', JSON.stringify(value));
    }

    if (name === 'comments') {
      sessionStorage.setItem('sortCommentsBy', JSON.stringify(value));
    }
  };

  return (
    <div className='flex items-center'>
      <label className='text-gray-500 font-light sm:text-sm mr-1'>Sort by</label>
      <div className='relative flex items-center'>
        <select
          className='py-px pl-1.5 pr-5 appearance-none bg-transparent sm:text-sm text-gray-900 border rounded border-gray-400 focus:outline-none'
          value={sortBy}
          onChange={handleSort}
        >
          <option value='newest'>Newest</option>
          <option value='oldest'>Oldest</option>
          <option value='newest edit'>Newest edit</option>
          <option value='oldest edit'>Oldest edit</option>
          <option value='most relatable'>Most relatable</option>
          <option value='least relatable'>Least relatable</option>
        </select>
        <div className='absolute -z-10 bg-chevron-down bg-no-repeat w-3 h-3 m-auto inset-y-0 right-1' />
      </div>
    </div>
  )
}

export default Sort;