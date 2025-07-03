import { useFormikContext } from 'formik'
import React, { useState, useRef, FC, memo } from 'react'
import { MdClose } from 'react-icons/md'
import { VARIABLE_NAMES } from '../constants'
import { toast } from 'react-toastify'

interface Props {
  name: string | { key: string; index: number; removeable?: boolean }
  placeholder?: string
  rows?: number
  className?: string
  as?: 'input' | 'textarea'
  label?: string
  characterLimit?: number
  disableSuggestion?: boolean
}

// Helper function to get nested object value
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

// Helper function to set nested object value
const setNestedValue = (obj: any, path: string, value: any) => {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {}
    return current[key]
  }, obj)
  target[lastKey] = value
  return obj
}

const SuggestionField: FC<Props> = ({
  name,
  placeholder,
  rows = 5,
  className,
  as = 'textarea',
  label,
  characterLimit,
  disableSuggestion = false,
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null)
  const { setFieldValue, values } = useFormikContext<{ [key: string]: any }>()

  const inputValue = (() => {
    if (typeof name === 'string') {
      // Handle nested paths like 'header.text' or 'header.document.id'
      if (name.includes('.')) {
        return getNestedValue(values, name) || ''
      }
      return values[name] || ''
    } else {
      return values[name.key]?.[name.index] || ''
    }
  })()

  const setInputValue = (value: string) => {
    if (typeof name === 'string') {
      // Handle nested paths like 'header.text' or 'header.document.id'
      if (name.includes('.')) {
        const newValues = { ...values }
        setNestedValue(newValues, name, value)
        // Update the entire form values to ensure nested objects are properly updated
        Object.keys(newValues).forEach((key) => {
          setFieldValue(key, newValues[key])
        })
      } else {
        setFieldValue(name, value)
      }
    } else {
      const newValues = [...(values[name.key] || [])]
      newValues[name.index] = value
      setFieldValue(name.key, newValues)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!disableSuggestion && e.ctrlKey && e.code === 'Space') {
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

    const newValues = [...(values[name.key] || [])]
    newValues.splice(name.index, 1)
    setFieldValue(name.key, newValues)
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (characterLimit && e.target.value.length > characterLimit) {
      toast.error(`Character limit of ${characterLimit} exceeded`)
      return
    }
    setInputValue(e.target.value)
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
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={`${placeholder}${!disableSuggestion ? ' \n\n [ ctrl + space to toggle suggestions ]' : ''}`}
          className={`${baseClassName} ${className}`}
          rows={rows}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          value={inputValue}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={`${placeholder ? `${placeholder}${!disableSuggestion ? ' \n\n' : ''}` : ''}${
            !disableSuggestion ? '[ ctrl + space to toggle suggestions ]' : ''
          }`}
          className={`${baseClassName} ${className}`}
        />
      )}

      {showDropdown && !disableSuggestion && (
        <ul className="absolute border inset-x-0 shadow-md max-h-80 overflow-y-auto z-10 bg-gray-900">
          {VARIABLE_NAMES.map((variable) => (
            <li
              key={variable}
              onClick={() => insertVariable(`\${${variable}}`)}
              className="p-2 cursor-pointer hover:bg-gray-800 text-white break-words"
            >
              {variable}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default memo(SuggestionField)
