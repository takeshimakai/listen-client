import { useState } from 'react';

import InterestsInput from './InterestsInput';
import Gender from './Gender';
import ProblemTopics from './ProblemTopics';
import Age from './Age';
import Intro from './Intro';
import ProgressBar from './ProgressBar';
import Confirm from './Confirm';

const Talk = ({ initialize, action }) => {
  const [step, setStep] = useState('intro');
  const [err, setErr] = useState(false);
  const [input, setInput] = useState({
    minAge: '',
    maxAge: '',
    gender: '',
    interests: [],
    problemTopics: []
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    ['minAge', 'maxAge', 'gender'].includes(name)
      ? setInput(prev => ({ ...prev, [name]: value }))
      : input[name].includes(value)
          ? setInput(prev => ({
              ...prev,
              [name]: prev[name].filter(val => val !== value)
            }))
          : setInput(prev => ({
              ...prev,
              [name]: prev[name].concat(value)
            }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    initialize(action, input);
  };

  const next = () => {
    switch (step) {
      case 'intro':
        return setStep('age');
      case 'age':
        if (input.minAge && input.maxAge) {
          if (input.minAge > input.maxAge) {
            return setErr(true);
          }
        }
        
        setErr(false);
        setStep('gender');
        return;
      case 'gender':
        return setStep('interests');
      case 'interests':
        return setStep('problemTopics');
      case 'problemTopics':
        return setStep('confirm');
      default:
        return;
    };
  };

  const back = () => {
    switch (step) {
      case 'gender':
        return setStep('age');
      case 'interests':
        return setStep('gender');
      case 'problemTopics':
        return setStep('interests');
      case 'confirm':
        return setStep('problemTopics');
      default:
        return;
    };
  };

  return (
    <form className='flex flex-col items-center pb-12 px-12 h-full sm:max-w-lg mx-auto' onSubmit={handleSubmit}>
      <div className='min-h-0 flex-grow flex items-center justify-center w-full'>
        {step === 'intro'
          ? <Intro />
          : <div className='flex flex-col items-center relative border max-h-3/4 bg-gray-50 shadow-xl rounded-lg w-full pt-14 pb-10 px-4'>
              <ProgressBar step={step} />
              {step === 'age' && <Age input={input} handleInput={handleInput} err={err} setErr={setErr} />}
              {step === 'gender' && <Gender input={input} handleInput={handleInput} />}
              {step === 'interests' && <InterestsInput input={input} setInput={setInput} />}
              {step === 'problemTopics' && <ProblemTopics input={input} handleInput={handleInput} />}
              {step === 'confirm' && <Confirm input={input} />}
            </div>
        }
      </div>
      <div className='w-full flex justify-center max-w-xs'>
      {step === 'intro' && <button className='tertiary-btn w-40' type='button' onClick={next}>OK</button>}
      {step === 'age' &&
        <button className='primary-btn w-40' type='button' onClick={next}>
          {input.minAge || input.maxAge ? 'Next' : 'Skip'}
        </button>
      }
      {['gender', 'interests', 'problemTopics'].includes(step) &&
        <>
          <button className='secondary-btn mr-1' type='button' onClick={back}>Back</button>
          <button className='primary-btn ml-1' type='button' onClick={next}>
            {
              (step === 'gender' && input.gender) ||
              (step === 'interests' && input.interests.length > 0) ||
              (step === 'problemTopics' && input.problemTopics.length > 0)
                ? 'Next'
                : 'Skip'
            }
          </button>
        </>
      }
      {step === 'confirm' &&
        <>
          <button className='secondary-btn mr-1' type='button' onClick={back}>Back</button>
          <button className='primary-btn ml-1'>Connect</button>
        </>
      }
      </div>
    </form>
  )
}

export default Talk;