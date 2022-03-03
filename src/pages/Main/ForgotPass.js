import { useState } from 'react';

import EmailForm from './EmailForm';
import ResetForm from './ResetForm';

const ForgotPass = ({ setPage }) => {
  const [step, setStep] = useState('email');
  const [input, setInput] = useState({
    email: '',
    code: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === 'code' && value.length > 4) {
      return;
    }

    setInput(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {step === 'email' &&
        <EmailForm
          email={input.email}
          handleInput={handleInput}
          setStep={setStep}
          setPage={setPage}
        />
      }
      {step === 'reset' &&
        <ResetForm
          input={input}
          setInput={setInput}
          setPage={setPage}
          handleInput={handleInput}
          setStep={setStep}
        />
      }
    </>
  )
}

export default ForgotPass;