import { FC } from 'react'
import { FaPlus } from 'react-icons/fa'

const PlusButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-blue-500 flex items-center justify-center text-white p-2 w-full rounded-full shadow-lg hover:bg-blue-600 focus:outline-none ${className}`}
    >
      <FaPlus />
    </button>
  )
}

export default PlusButton
