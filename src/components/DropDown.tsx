import React from 'react'
import { twMerge } from 'tailwind-merge'

interface DropDownOption {
  value: string
  label: string
}

interface DropDownProps {
  name: string
  label?: string
  options: DropDownOption[]
  placeholder?: string
  className?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  size?: 'sm' | 'md' | 'lg'
}

const DropDown: React.FC<DropDownProps> = ({
  name,
  label,
  options,
  placeholder = 'Select an option',
  className,
  value,
  onChange,
  error,
  size = 'md',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2',
    lg: 'px-4 py-3 text-lg',
  }

  const selectClasses = twMerge(
    'w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors',
    sizeClasses[size],
    error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
    className
  )

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select id={name} name={name} value={value} onChange={handleChange} className={selectClasses}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default DropDown
