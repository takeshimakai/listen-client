import { useContext } from "react";

import UserContext from "../../contexts/UserContext";

import getData from "../../utils/getData";

import ProgressBar from "./ProgressBar";

const UsernameInput = ({
  profileInput,
  handleInput,
  goNext,
  err,
  setErr,
  step,
  setStep
}) => {
  const { token } = useContext(UserContext);

  const usernameValidation = async () => {
    try {
      const res = await getData(`/users/username/${profileInput.username}`, token);

      if (!res.ok) {
        throw res;
      }

      setErr(prev => ({ ...prev, username: '' }));
      setStep('picture');
    } catch (err) {
      if (err.status === 400) {
        const { errors } = await err.json();
        return setErr(prev => ({ ...prev, username: errors[0].msg }));
      }

      console.log(err);
    }
  };
  
  return (
    <>
      <div className='account-setup-input-container'>
        <ProgressBar step={step} />
        <p className='account-setup-input-title'>Please choose a username.</p>
        <div className='flex flex-col justify-center items-center mt-10'>
          <input
            className='text-center w-full py-1 border-b border-gray-500 text-lg text-gray-900 bg-transparent focus:outline-none focus:border-gray-900'
            type='text'
            name='username'
            value={profileInput.username}
            onChange={handleInput}
            onKeyDown={goNext}
          />
          <p className='text-xs mt-1 text-gray-500'>This field is required.</p>
          <p className='error-msg'>{err && err.username}</p>
        </div>
      </div>
      <button
          className='primary-btn disabled:opacity-50 disabled:bg-green-700'
          id='next-btn'
          disabled={!profileInput.username}
          onClick={usernameValidation}
        >
          Next
      </button>
    </>
  )
}

export default UsernameInput;