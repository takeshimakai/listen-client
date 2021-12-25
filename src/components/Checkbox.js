const Checkbox = ({ name, data, input, handleInput }) => {
  return (
    <div className='my-2 flex items-center filters'>
      <input
        className='h-4 w-4 mr-1.5 filters'
        type='checkbox'
        name={name}
        id={data}
        value={data}
        checked={input.includes(data)}
        onChange={handleInput}
      />
      <label
        className='sm:text-sm text-left leading-snug text-gray-900 filters'
        htmlFor={data}>{data}</label>
    </div>
  )
}

export default Checkbox;