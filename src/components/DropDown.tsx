import React from 'react'

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
}

const DropDown: React.FC<DropDownProps> = ({ name, label, options, placeholder = 'Select an option', className = '', value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DropDown
