export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`
        relative
        w-full py-3 px-4
        bg-primary
        text-white font-medium
        rounded-lg
        shadow-[4px_4px_10px_#121212,-4px_-4px_10px_#2E2E2E]
        hover:shadow-[2px_2px_5px_#121212,-2px_-2px_5px_#2E2E2E]
        active:shadow-[inset_2px_2px_5px_#121212,inset_-2px_-2px_5px_#2E2E2E]
        disabled:opacity-50
        disabled:cursor-not-allowed
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

