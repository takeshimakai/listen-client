import { forwardRef } from "react";

const Checkbox = forwardRef(({
  name,
  data,
  input,
  handleInput,
  selector,
}, ref) => {
  return (
    <div
      ref={ref}
      className={`my-2 flex items-center ${selector}`}
    >
      <input
        className={`h-4 w-4 mr-1.5 cursor-pointer ${selector}`}
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
});

export default Checkbox;
