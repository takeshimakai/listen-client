import { useEffect } from "react";

const Toggle = ({ name, value, input, handleInput }) => {
  useEffect(() => {
    const toggle = document.querySelector(`#toggle-${value}`);
    const slider = document.querySelector(`#slider-${value}`);

    if (input.includes(value)) {
      toggle.classList.replace('bg-gray-300', 'bg-blue-400');
      slider.classList.remove('left-0', 'left-px');
      slider.classList.add('right-0', 'right-px');
    } else {
      toggle.classList.replace('bg-blue-400', 'bg-gray-300');
      slider.classList.remove('right-0', 'right-px');
      slider.classList.add('left-0', 'left-px');
    }
  }, [input, value]);

  return (
    <div id={`toggle-${value}`} className='relative flex items-center w-8 h-4 bg-gray-300 rounded-full'>
      <input
        className='w-full h-full opacity-0 rounded-full z-10'
        type='checkbox'
        name={name}
        value={value}
        checked={input.includes(value)}
        onChange={handleInput}
      />
      <span id={`slider-${value}`} className='absolute w-3.5 h-3.5 bg-white rounded-full left-0 left-px' />
    </div>
  )
}

export default Toggle;