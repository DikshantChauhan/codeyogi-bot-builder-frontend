import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export default memo(({ children, className, active, ...rest }: Props) => {
  return (
    <button className={twMerge(`bg-teal-500 text-white p-1.5 rounded ${active ? 'bg-teal-600' : ''}`, className)} {...rest}>
      {children}
    </button>
  )
})
