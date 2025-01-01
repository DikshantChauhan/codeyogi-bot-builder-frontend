import { memo } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export default memo(({ children, className, active, ...rest }: Props) => {
  return (
    <button className={`bg-teal-500 text-white p-1.5 rounded ${active ? 'bg-teal-600' : ''} ${className}`} {...rest}>
      {children}
    </button>
  )
})
