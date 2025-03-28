export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl shadow-xl ${className}`}>
      {children}
    </div>
  )
}

