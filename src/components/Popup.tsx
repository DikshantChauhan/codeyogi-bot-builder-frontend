import React from 'react'
import { twMerge } from 'tailwind-merge'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  overlayClassName?: string
  closeOnOverlayClick?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Popup: React.FC<ModalProps> = ({ isOpen, onClose, children, className, overlayClassName, closeOnOverlayClick = true, size = 'md' }) => {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={twMerge('fixed inset-0 bg-black bg-opacity-50 transition-opacity', overlayClassName)} onClick={handleOverlayClick} />
        <div
          className={twMerge('relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full', sizeClasses[size], className)}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Popup
