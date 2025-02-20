import { memo } from 'react'
import { FiAlertCircle } from 'react-icons/fi'

interface ErrorProps {
  message?: string
  className?: string
  showIcon?: boolean
}

const Error = ({ message = 'An error occurred', className = '', showIcon = true }: ErrorProps) => {
  return (
    <div className={`flex items-center justify-center gap-2 p-4 rounded-lg bg-red-50 ${className}`}>
      {showIcon && <FiAlertCircle className="w-5 h-5 text-red-500" aria-hidden="true" />}
      <span className="text-red-700 text-sm font-medium">{message}</span>
    </div>
  )
}

export default memo(Error)
