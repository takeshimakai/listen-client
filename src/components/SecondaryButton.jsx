export default function SecondaryButton({
  children,
  className,
  onClick,
  type,
  rounded,
}) {
  return (
    <button
      className={`
        ${className}
        relative
        shadow-md
        px-3
        h-9
        border
        border-gray-300
        ${rounded ? "rounded-full" : "rounded"}
        bg-gray-50
        text-sm
        text-gray-600
        hover:bg-gray-200
        active:shadow-inner
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
