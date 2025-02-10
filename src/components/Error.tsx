import { memo } from 'react'

interface ErrorProps {
  message?: string
}

const Error = ({ message = 'An error occurred' }: ErrorProps) => {
  return (
    <div className="flex justify-center items-center p-8 text-red-600">
      {message}
    </div>
  )
}

export default memo(Error)
