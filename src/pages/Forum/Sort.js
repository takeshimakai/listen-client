const Sort = ({ sortBy, setSortBy }) => {
  const handleSort = (e) => {
    setSortBy(e.target.value);
    sessionStorage.setItem('sortBy', JSON.stringify(e.target.value));
  };

  return (
    <div className='flex items-center'>
      <label className='text-gray-500 font-light sm:text-sm mr-1'>Sort by</label>
      <div className='relative flex items-center'>
        <select
          className='py-px pl-1.5 pr-5 appearance-none bg-transparent sm:text-sm text-gray-900 border rounded border-gray-400 focus:outline-none'
          name='sort'
          value={sortBy}
          onChange={handleSort}
        >
          <option value='newest post'>Newest post</option>
          <option value='oldest post'>Oldest post</option>
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