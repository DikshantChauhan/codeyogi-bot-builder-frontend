import { memo } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface LoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  fullscreen?: boolean
  className?: string
}

const Loading = ({ message, size = 'md', fullscreen = false, className = '' }: LoadingProps) => {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
  }

  const containerClasses = `
    flex justify-center items-center gap-3
    ${fullscreen ? 'fixed inset-0 bg-gray-900/20 backdrop-blur-[1px] z-50' : 'p-6'}
    ${className}
  `.trim()

  const spinnerClasses = `
    animate-spin text-primary-600
    ${fullscreen ? 'opacity-90' : ''}
  `.trim()

  const messageClasses = `
    text-gray-600 dark:text-gray-300
    ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}
  `.trim()

  return (
    <div className={containerClasses}>
      <AiOutlineLoading3Quarters size={sizeMap[size]} className={spinnerClasses} />
      {message && <div className={messageClasses}>{message}</div>}
    </div>
  )
}

export default memo(Loading)
