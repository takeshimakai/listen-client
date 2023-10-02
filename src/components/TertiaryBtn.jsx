const TertiaryBtn = ({ label, id, onClick, type, disabled}) => {
  return (
    <button
      className='shadow-md border border-green-700 w-40 h-8 rounded-md bg-gray-50 text-sm text-green-700 hover:text-white hover:bg-green-700 active:shadow-inner'
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default TertiaryBtn;