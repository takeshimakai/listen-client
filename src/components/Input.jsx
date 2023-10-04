export default function Input({
  className,
  type,
  id,
  name,
  value,
  onChange,
  min,
}) {
  return (
    <input
      id={id}
      className={`
        ${className}
        rounded
        border-solid
        border
        px-3
        h-9
        border-gray-500
        text-sm
      `}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      min={min}
    />
  )
}
