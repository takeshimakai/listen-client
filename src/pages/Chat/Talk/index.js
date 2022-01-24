import { useState } from 'react';

import InterestsInput from './InterestsInput';
import Age from './Age';
import Gender from './Gender';
import ProblemTopics from './ProblemTopics';

const Talk = ({ initiate, action }) => {
  const [filters, setFilters] = useState({
    minAge: '',
    maxAge: '',
    gender: '',
    interests: [],
    problemTopics: []
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    ['minAge', 'maxAge', 'gender'].includes(name)
      ? setFilters(prev => ({ ...prev, [name]: value }))
      : filters[name].includes(value)
          ? setFilters(prev => ({
              ...prev,
              [name]: prev[name].filter(val => val !== value)
            }))
          : setFilters(prev => ({
              ...prev,
              [name]: prev[name].concat(value)
            }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    initiate(action, filters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Age input={filters} handleInput={handleInput} />
      <Gender input={filters} handleInput={handleInput} />
      <InterestsInput input={filters} setInput={setFilters} />
      <ProblemTopics input={filters} handleInput={handleInput} />
      <button>Connect</button>
    </form>
  )
}

export default Talk;