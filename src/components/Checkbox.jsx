const Checkbox = ({ name, data, input, handleInput, selector }) => {
  return (
    <div className={`my-2 flex items-center ${selector}`}>
      <input
        className={`h-4 w-4 mr-1.5 ${selector}`}
        type='checkbox'
        name={name}
        id={data}
        value={data}
        checked={input.includes(data)}
        onChange={handleInput}
      />
      <label
        className={`sm:text-sm text-left leading-snug text-gray-900 ${selector}`}
        htmlFor={data}
      >
        {data}
      </label>
    </div>
  )
}

export default Checkbox;