const PrimaryBtn = ({ label, id, onClick, type, disabled}) => {
  return (
    <button
      className='shadow-md w-40 h-8 rounded-md bg-green-700 text-sm text-white hover:bg-green-800 active:shadow-inner-2 disabled:opacity-50 disabled:bg-green-700'
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default PrimaryBtn;