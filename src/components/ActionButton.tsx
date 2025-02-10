import { FC, ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconType
  children: React.ReactNode
}

export const ActionButton: FC<ActionButtonProps> = ({ icon: Icon, children, className = '', ...props }) => (
  <button
    className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center sm:justify-start gap-2 shadow-sm ${className}`}
    {...props}
  >
    {Icon && <Icon className="h-5 w-5" />}
    {children}
  </button>
) 