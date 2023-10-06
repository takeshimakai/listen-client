import { useState, useEffect, useRef } from "react";

import data from "../../data/data";

import Checkbox from "../../components/Checkbox";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";

const Filters = ({ filters, setFilters }) => {
  const [filterInput, setFilterInput] = useState(filters);
  const [isVisible, setIsVisible] = useState(false);

  const filtersContainer = useRef(null);
  const filtersBtn = useRef(null);
  const checkboxes = useRef([]);

  useEffect(() => {
    const closeOutside = (e) => {
      if (
        isVisible
        && ![
          filtersContainer.current,
          ...filtersContainer.current.children,
          filtersBtn.current,
          ...checkboxes.current.map(c => [...c.children]).flat(),
        ].includes(e.target)
      ) {
        setIsVisible(false);
      }
    };

    window.addEventListener('click', closeOutside);
    return () => window.removeEventListener('click', closeOutside);
  }, [isVisible]);

  const handleCheckbox = (e) => {
    filterInput.includes(e.target.value)
      ? setFilterInput(prevInput => prevInput.filter(value => value !== e.target.value))
      : setFilterInput(prevInput => prevInput.concat(e.target.value));
  };

  const applyFilters = () => {
    setFilters(filterInput);
    sessionStorage.setItem('filters', JSON.stringify(filterInput));
  };

  const clearFilters = () => {
    setFilters([]);
    setFilterInput([]);
    sessionStorage.removeItem('filters');
  };

  const toggleFiltersVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <button
        ref={filtersBtn}
        className='sm:mr-8 text-gray-500 sm:text-sm font-light flex items-center'
        onClick={toggleFiltersVisibility}
      >
        Filters
        <span
          className='ml-1 flex items-center justify-center bg-gray-400 rounded-full h-6 w-6 text-white text-xs font-medium'
        >
          {filterInput.length}
        </span>
      </button>
      <div
        ref={filtersContainer}
        className={`
          ${isVisible ? "block" : "hidden"}
          z-10
          absolute
          top-9
          bg-gray-50
          border
          shadow-lg
          rounded-lg
          p-4
        `}
      >
        <div className='grid grid-cols-2 mb-4 gap-x-2'>
          <PrimaryButton onClick={applyFilters}>
            Apply
          </PrimaryButton>
          <SecondaryButton onClick={clearFilters}>
            Clear
          </SecondaryButton>
        </div>
        {data.categories.map((filter, idx) => (
          <Checkbox
            ref={(el) => checkboxes.current[idx] = el}
            key={filter}
            name='problemTopics'
            data={filter}
            input={filterInput}
            handleInput={handleCheckbox}
          />
        ))}
      </div>
    </>
  )
}

export default Filters;