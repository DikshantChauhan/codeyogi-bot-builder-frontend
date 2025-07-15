import React, { useState } from 'react'
import { IoInformationCircle } from 'react-icons/io5'

interface InfoCardProps {
  info: string
  className?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const InfoCard: React.FC<InfoCardProps> = ({ info, className = '', position = 'top' }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className={`relative inline-block ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Info Icon */}
      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors cursor-help">
        <IoInformationCircle className="w-5 h-5 text-blue-600" />
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div
          className={`absolute px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50 w-96 break-words ${
            position === 'top'
              ? 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
              : position === 'bottom'
              ? 'top-full left-1/2 transform -translate-x-1/2 mt-2'
              : position === 'left'
              ? 'right-full top-1/2 transform -translate-y-1/2 mr-2'
              : 'left-full top-1/2 transform -translate-y-1/2 ml-2'
          }`}
        >
          <div className="whitespace-pre-wrap leading-relaxed">{info}</div>
          {/* Arrow */}
          <div
            className={`absolute w-0 h-0 ${
              position === 'top'
                ? 'top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800'
                : position === 'bottom'
                ? 'bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800'
                : position === 'left'
                ? 'left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-800'
                : 'right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800'
            }`}
          ></div>
        </div>
      )}
    </div>
  )
}

export default InfoCard
