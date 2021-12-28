import { useState, useEffect } from "react";

import Checkbox from "../../components/Checkbox";

import data from "../../data/data";

const Categories = ({ input, setInput, handleInput, errors}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const categoriesContainer = document.querySelector('#categories-container');

    isVisible
      ? categoriesContainer.classList.remove('hidden')
      : categoriesContainer.classList.add('hidden');
  }, [isVisible]);

  useEffect(() => {
    const closeOutside = (e) => {
      const categoriesTitle = document.querySelector('#categories-title');
      const categoriesElements = document.querySelectorAll('.categories');

      if (isVisible && ![categoriesTitle, ...categoriesElements].includes(e.target)) {
        setIsVisible(false);
      }
    };

    window.addEventListener('click', closeOutside);
    return () => window.removeEventListener('click', closeOutside);
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className='relative flex flex-col'>
      <p
        id='categories-title'
        className='subtitle flex items-center cursor-pointer w-max'
        onClick={toggleVisibility}
      >
        Categories
        <span className='ml-1 flex items-center justify-center bg-gray-400 rounded-full h-6 w-6 text-white text-xs font-medium'>
          {input.length}
        </span>
      </p>
      <p className='error-msg'>{errors && errors.topics}</p>
      <div
        id='categories-container'
        className='hidden absolute top-7 bg-gray-50 border shadow-lg rounded-lg px-4 pt-2 pb-4 w-max flex flex-col items-center categories'
      >
        <div className='categories'>
          {data.categories.map(category => (
            <Checkbox
              key={category}
              name={'topics'}
              data={category}
              input={input}
              handleInput={handleInput}
              selector={'categories'}
            />
          ))}
        </div>
        <button
          type='button'
          className='blue-text mt-4 categories'
          onClick={() => setInput(prev => ({ ...prev, topics: []}))}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default Categories;