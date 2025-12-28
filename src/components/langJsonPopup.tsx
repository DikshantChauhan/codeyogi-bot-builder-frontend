import { FC, memo, useEffect, useMemo, useState } from 'react'
import Popup from './Popup'
import { FaPlus, FaTrash, FaChevronDown, FaChevronRight } from 'react-icons/fa'
import { LangJson, parseLangJson } from '../utils'

interface Props {
  langJson?: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (langJson: string) => void
  supportedLanguages: string[]
}

interface VariableItem {
  name: string
  values: Record<string, string>
  collapsed: boolean
}

const parseVariableItemsToLangJson = (variableItems: VariableItem[]): string => {
  const result: LangJson = {}
  variableItems.forEach((v) => {
    result[v.name] = {
      lang_map: v.values,
      collapsed: v.collapsed,
    }
  })
  return JSON.stringify(result)
}

const LangJsonPopup: FC<Props> = ({ langJson, isOpen, onClose, onSubmit, supportedLanguages }) => {
  const [variables, setVariables] = useState<VariableItem[]>([])

  // Initialize state from props
  useEffect(() => {
    if (isOpen) {
      const parsed = parseLangJson(langJson)
      const initialItems: VariableItem[] = Object.entries(parsed).map(([name, data]) => ({
        name,
        values: data.lang_map,
        collapsed: data.collapsed ?? false,
      }))
      setVariables(initialItems)
    }
  }, [langJson, isOpen])

  // Derive all languages to display
  const allLanguages = useMemo(() => {
    const activeLanguages = new Set(supportedLanguages)
    variables.forEach((v) => {
      Object.keys(v.values).forEach((lang) => activeLanguages.add(lang))
    })
    // If no languages at all, default to 'en'
    if (activeLanguages.size === 0) return ['en']
    return Array.from(activeLanguages)
  }, [supportedLanguages, variables])

  const handleAddVariable = () => {
    setVariables((prev) => [
      {
        name: '',
        values: {},
        collapsed: false,
      },
      ...prev,
    ])
  }

  const handleRemoveVariable = (index: number) => {
    setVariables((prev) => prev.filter((_, i) => i !== index))
  }

  const handleNameChange = (index: number, newName: string) => {
    setVariables((prev) => prev.map((v, i) => (i === index ? { ...v, name: newName } : v)))
  }

  const handleValueChange = (index: number, lang: string, newValue: string) => {
    setVariables((prev) => prev.map((v, i) => (i === index ? { ...v, values: { ...v.values, [lang]: newValue } } : v)))
  }

  const handleCollapseToggle = (index: number) => {
    setVariables((prev) => prev.map((v, i) => (i === index ? { ...v, collapsed: !v.collapsed } : v)))
  }

  const handleSave = () => {
    onSubmit(parseVariableItemsToLangJson(variables))
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => {
        const newJsonValue = parseVariableItemsToLangJson(variables)
        const oldJsonValue = langJson
        if (newJsonValue !== oldJsonValue) {
          onSubmit(newJsonValue)
        }
        onClose()
      }}
      size="3xl"
    >
      <div className="flex flex-col h-[80vh] bg-white rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Language Variables</h2>
          <button
            onClick={handleAddVariable}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaPlus /> Add Variable
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {variables.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No variables defined. Click "Add Variable" to create one.</div>
          ) : (
            variables.map((variable, index) => (
              <div key={index} className="border rounded-lg bg-gray-50 hover:border-blue-300 transition-colors relative group overflow-hidden">
                {/* Header of the Card - Always visible */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleCollapseToggle(index)}
                >
                  <div className="flex items-center gap-3">
                    <button className="text-gray-500 hover:text-gray-700">{variable.collapsed ? <FaChevronRight /> : <FaChevronDown />}</button>
                    <span className="font-mono font-medium text-gray-700">{variable.name || 'New Variable'}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveVariable(index)
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove Variable"
                  >
                    <FaTrash />
                  </button>
                </div>

                {/* Collapsible Content */}
                {!variable.collapsed && (
                  <div className="p-4 pt-0 flex flex-col gap-4 border-t border-gray-100 bg-white">
                    <div className="mt-4"></div>
                    {/* Variable Name */}
                    <div className="w-full">
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Variable Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm"
                        placeholder="e.g. welcome_message"
                        value={variable.name}
                        onChange={(e) => handleNameChange(index, e.target.value)}
                      />
                    </div>

                    {/* Languages Values */}
                    <div className="flex flex-col gap-3 w-full">
                      {allLanguages.map((lang) => (
                        <div key={lang}>
                          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{lang}</label>
                          <textarea
                            rows={2}
                            className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm resize-y min-h-[60px]"
                            placeholder={`Value for ${lang}`}
                            value={variable.values[lang] || ''}
                            onChange={(e) => handleValueChange(index, lang, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-lg">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Popup>
  )
}

export default memo(LangJsonPopup)
