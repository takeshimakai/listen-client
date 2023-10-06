import { useState, useEffect, useRef } from "react";

import Checkbox from "../../components/Checkbox";

import data from "../../data/data";

const Categories = ({ input, setInput, handleInput, error}) => {
  const [isVisible, setIsVisible] = useState(false);

  const categoriesBox = useRef(null);
  const categoriesTitle = useRef(null);
  const categories = useRef(null);
  const checkboxes = useRef([]);

  useEffect(() => {
    const closeOutside = (e) => {
      if (
        isVisible
        && ![
          categoriesBox.current,
          ...categoriesBox.current.children,
          categoriesTitle.current,
          ...categories.current.children,
          ...checkboxes.current.map(c => [...c.children]).flat()
        ].includes(e.target)
      ) {
        setIsVisible(false);
      }
    };

    window.addEventListener('click', closeOutside);
    return () => window.removeEventListener('click', closeOutside);
  }, [isVisible]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className='relative flex flex-col'>
      <p
        className='subtitle flex items-center cursor-pointer w-max'
        onClick={toggleVisibility}
      >
        Categories
        <span className='ml-1 flex items-center justify-center bg-gray-400 rounded-full h-6 w-6 text-white text-xs font-medium'>
          {input.length}
        </span>
      </p>
      {error && (
        <p className='error-msg mt-1'>{error}</p>
      )}
      <div
        ref={categoriesBox}
        className={`
          ${isVisible ? "flex" : "hidden"}
          absolute
          top-7
          bg-gray-50
          border
          shadow-lg
          rounded-lg
          px-4
          pt-2
          pb-4
          flex-col
          items-center
          categories
          z-10
        `}
      >
        <div ref={categories}>
          {data.categories.map((category, idx) => (
            <Checkbox
              ref={(el) => checkboxes.current[idx] = el}
              key={category}
              name={'topics'}
              data={category}
              input={input}
              handleInput={handleInput}
            />
          ))}
        </div>
        <button
          type='button'
          className='text-sm font-light text-blue-700 hover:text-blue-900 mt-4 categories'
          onClick={() => setInput(prev => ({ ...prev, topics: []}))}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default Categories;
