import { memo } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IconType } from 'react-icons/lib'
import { twMerge } from 'tailwind-merge'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  variant?: 'primary' | 'secondary' | 'tertiary'
  Icon?: IconType
  loading?: boolean
}

export default memo(({ children, className, active, variant = 'primary', Icon, loading, ...rest }: Props) => {
  const variants = {
    primary: `bg-primary-500 text-white hover:bg-primary-600
      ${active ? 'bg-primary-600 ring-2 ring-primary-300' : ''}`,
    secondary: `bg-secondary-500 text-white hover:bg-secondary-600
      ${active ? 'bg-secondary-600 ring-2 ring-secondary-300' : ''}`,
    tertiary: `bg-tertiary-500 text-black hover:bg-tertiary-600
      ${active ? 'bg-tertiary-600 ring-2 ring-tertiary-300' : ''}`,
  }

  return (
    <button
      className={twMerge(
        `px-3 py-1.5 rounded-md transition-all duration-200 font-medium
        disabled:opacity-50 disabled:cursor-not-allowed shadow-white shadow-inner`,
        variants[variant],
        className
      )}
      disabled={loading}
      {...rest}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5" />}
        {loading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : children}
      </div>
    </button>
  )
})
