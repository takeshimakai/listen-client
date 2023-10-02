const SecondaryBtn = ({label, id, onClick, type, disabled }) => {
  return (
    <button
      className='border active:border-0 active:p-px shadow-md w-40 h-8 rounded-md cursor-pointer bg-gray-50 text-sm text-gray-600 hover:bg-gray-200 active:shadow-inner'
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default SecondaryBtn;