import { useState, useEffect } from 'react';

import InterestsInput from './InterestsInput';
import Gender from './Gender';
import ProblemTopics from './ProblemTopics';
import Age from './Age';
import Intro from './Intro';
import ProgressBar from './ProgressBar';
import Confirm from './Confirm';

import PrimaryBtn from '../../../components/PrimaryBtn';
import SecondaryBtn from '../../../components/SecondaryBtn';
import TertiaryBtn from '../../../components/TertiaryBtn';

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

  useEffect(() => {
    const goNext = (e) => {
      if (step === 'interests') {
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        document.querySelector('#next-btn').click();
      }
    };

    window.addEventListener('keydown', goNext);
    return () => window.removeEventListener('keydown', goNext);
  }, [step]);

  useEffect(() => {
    if (step !== 'intro') {
      const form = document.querySelector('#talk-form');
      const box = document.querySelector('#talk-form-box');

      const setMaxHeight = () => {
        box.style.maxHeight = form.clientHeight * 0.8 + 'px';
      }
  
      setMaxHeight();
  
      window.addEventListener('resize', setMaxHeight);
      return () => window.removeEventListener('resize', setMaxHeight);
    }
  }, [step]);

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
    <form
      id='talk-form'
      className='flex flex-col items-center justify-between pb-4 sm:pb-10 px-4 sm:px-0 flex-grow sm:max-w-lg mx-auto'
      onSubmit={handleSubmit}
    >
      {step === 'intro'
        ? <div className='my-auto'>
            <Intro />
          </div>
        : <div id='talk-form-box' className='my-auto flex flex-col items-center relative border max-h-3/4 bg-gray-50 shadow-xl rounded-lg w-full pt-14 pb-10 px-5 sm:px-10'>
            <ProgressBar step={step} />
            {step === 'age' && <Age input={input} handleInput={handleInput} err={err} setErr={setErr} />}
            {step === 'gender' && <Gender input={input} handleInput={handleInput} />}
            {step === 'interests' && <InterestsInput input={input} setInput={setInput} />}
            {step === 'problemTopics' && <ProblemTopics input={input} handleInput={handleInput} />}
            {step === 'confirm' && <Confirm input={input} />}
          </div>
      }
      <div className='w-full flex justify-center max-w-xs space-x-2'>
        {step === 'intro' && <TertiaryBtn label='OK' id='next-btn' type='button' onClick={next} />}
        {!['intro', 'age'].includes(step) &&
          <SecondaryBtn label='Back' type='button' onClick={back} />
        }
        {!['intro', 'confirm'].includes(step) &&
          <PrimaryBtn
            label={
              (step === 'age' && (input.minAge || input.maxAge)) ||
              (step === 'gender' && input.gender) ||
              (step === 'interests' && input.interests.length > 0) ||
              (step === 'problemTopics' && input.problemTopics.length > 0)
                ? 'Next'
                : 'Skip'
            }
            id='next-btn'
            type='button'
            onClick={next}
          />
        }
        {step === 'confirm' && <PrimaryBtn label='Connect' id='next-btn' />}
      </div>
    </form>
  )
}

export default Talk;