import { useState, useEffect } from "react";

import data from "../../data/data";

import Checkbox from "../../components/Checkbox";
import PrimaryBtn from '../../components/PrimaryBtn';
import SecondaryBtn from '../../components/SecondaryBtn';

const Filters = ({ filters, setFilters }) => {
  const [filterInput, setFilterInput] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const filtersContainer = document.querySelector('#filters-container');

    isVisible
      ? filtersContainer.hidden = false
      : filtersContainer.hidden = true;
  }, [isVisible]);

  useEffect(() => {
    const closeOutside = (e) => {
      const filterElements = document.querySelectorAll('.filters');
      const filtersBtn = document.querySelector('#filters-btn');

      if (isVisible && ![filtersBtn, ...filterElements].includes(e.target)) {
        setIsVisible(false);
      }
    };

    window.addEventListener('click', closeOutside);
    return () => window.removeEventListener('click', closeOutside);
  });

  useEffect(() => {
    if (filters) {
      setFilterInput(filters);
    }
  }, [filters]);

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
    sessionStorage.removeItem('filters');
  };

  const toggleFiltersVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <button
        id='filters-btn'
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
        id='filters-container'
        className='z-10 absolute top-8 bg-gray-50 border shadow-lg rounded-lg p-4 filters'
        hidden
      >
        <div className='flex mb-6 space-x-2 max-w-2xs filters'>
          <SecondaryBtn label='Clear' onClick={clearFilters} />
          <PrimaryBtn label='Apply' onClick={applyFilters} />
        </div>
        {data.categories.map(filter => (
          <Checkbox
            key={filter}
            name='problemTopics'
            data={filter}
            input={filterInput}
            handleInput={handleCheckbox}
            selector={'filters'}
          />
        ))}
      </div>
    </>
  )
}

export default Filters;