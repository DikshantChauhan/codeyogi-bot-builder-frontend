import { useFormikContext } from 'formik'
import React, { useState, useRef, FC, memo } from 'react'
import { MdClose } from 'react-icons/md'

const variables = ['user.name', 'user.email', 'user.phone', 'user.address', 'user.city', 'user.state', 'user.zip', 'user.country', 'assignment.score']

interface Props {
  name: string | { key: string; index: number; removeable?: boolean }
  placeholder?: string
  rows?: number
  className?: string
  as?: 'input' | 'textarea'
  label?: string
}

const SuggestionField: FC<Props> = ({ name, placeholder, rows = 5, className, as = 'textarea', label }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null)
  const { setFieldValue, values } = useFormikContext<{ [key: string]: string }>()

  const inputValue = typeof name === 'string' ? values[name] : values[name.key][name.index]

  const setInputValue = (value: string) => {
    if (typeof name === 'string') {
      setFieldValue(name, value)
    } else {
      const newValues = [...values[name.key]]
      newValues[name.index] = value
      setFieldValue(name.key, newValues)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.ctrlKey && e.code === 'Space') {
      e.preventDefault()
      setShowDropdown((isOpen) => !isOpen)
    }
  }

  const insertVariable = (variable: string) => {
    if (!inputRef.current) return

    const start = inputRef.current.selectionStart || 0
    const end = inputRef.current.selectionEnd || 0

    const newValue = inputValue.substring(0, start) + variable + inputValue.substring(end)
    setInputValue(newValue)

    // Set cursor after inserted text
    setTimeout(() => {
      inputRef.current?.setSelectionRange(start + variable.length, start + variable.length)
      inputRef.current?.focus()
    }, 0)

    setShowDropdown(false)
  }

  const removeListIteam = () => {
    if (typeof name === 'string') return

    const newValues = [...values[name.key]]
    newValues.splice(name.index, 1)
    setFieldValue(name.key, newValues)
  }

  const baseClassName = 'w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <div className="relative p-1" onBlur={() => setTimeout(() => setShowDropdown(false), 300)}>
      <div className="flex items-center justify-between mb-2">
        {label ? (
          <label htmlFor={typeof name === 'string' ? name : name.key} className="text-sm font-medium">
            {label}
          </label>
        ) : (
          <span></span>
        )}
        {typeof name !== 'string' && name.removeable ? (
          <MdClose type="button" onClick={removeListIteam} className="w-5 h-5 text-red-500 hover:text-red-600 cursor-pointer font-bold"></MdClose>
        ) : null}
      </div>

      {as === 'textarea' ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`${baseClassName} ${className}`}
          rows={rows}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`${baseClassName} ${className}`}
        />
      )}

      {showDropdown && (
        <ul className="absolute border inset-x-0 shadow-md min-h-max z-10 bg-gray-900">
          {variables.map((variable) => (
            <li key={variable} onClick={() => insertVariable(`\${${variable}}`)} className="p-2 cursor-pointer hover:bg-gray-800 text-white">
              {variable}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default memo(SuggestionField)
