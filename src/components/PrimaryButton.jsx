export default function PrimaryButton({
  children,
  className,
  onClick,
  type,
  rounded,
  inverse,
}) {
  const defaultColor = `
    ${rounded ? "rounded-full" : "rounded"}
    bg-green-700
    text-white
    hover:bg-green-800
    active:shadow-inner-2
  `;

  const inverseColor = `
    border
    border-green-700
    hover:bg-green-700
    active:shadow-inner-2
    text-green-700
    hover:text-white
  `;

  return (
    <button
      className={`
        ${className}
        ${rounded ? "rounded-full" : "rounded"}
        ${inverse ? inverseColor : defaultColor}
        shadow-md
        px-6
        h-9
        cursor-pointer
        text-sm
        transition-colors
        duration-300
      `}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
