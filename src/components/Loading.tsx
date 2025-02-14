import { memo } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loading = ({ message }: { message?: string }) => {
  return (
    <div className="flex justify-center items-center p-8">
      <AiOutlineLoading3Quarters size={24} className="animate-spin" />
      {message && <div className="ml-2 animate-pulse">{message}</div>}
    </div>
  )
}

export default memo(Loading)
