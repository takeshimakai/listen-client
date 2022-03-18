const SelectInput = ({ value, onChange, options }) => {
  return (
    <div className='relative flex items-center'>
      <select
        className='py-1 pr-6 appearance-none bg-transparent sm:text-sm text-gray-900 border-b rounded-none border-gray-500 focus:border-gray-900 focus:outline-none'
        name='gender'
        value={value}
        onChange={onChange}
      >
        <option value=''></option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <div className='z-0 absolute bg-chevron-down bg-no-repeat w-3 h-3 m-auto inset-y-0 right-1' />
    </div>
  )
}

export default SelectInput;