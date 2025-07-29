import React, { memo, useCallback } from 'react'
import Popup from './Popup'
import { connect } from 'react-redux'
import { AppState } from '../store/store'
import { isShortcutMenuOpenSelector } from '../store/selectors/ui.selector'
import { uiActions } from '../store/slices/UI.slice'

interface ShortcutsPopupProps {
  isShortcutMenuOpen: boolean
  setIsShortcutMenuOpen: typeof uiActions.setIsShortcutMenuOpen
}

const ShortcutsPopup: React.FC<ShortcutsPopupProps> = ({ isShortcutMenuOpen, setIsShortcutMenuOpen }) => {
  const shortcuts = [
    { key: 'Escape', description: 'Clear selection and stop adding nodes / Moving back to tool list' },
    { key: 'Ctrl + Z', description: 'Undo last action' },
    { key: 'Ctrl + Y', description: 'Redo last action' },
    { key: 'Ctrl + D', description: 'Duplicate selected nodes' },
    { key: 'Ctrl + C', description: 'Copy selected nodes to clipboard' },
    { key: 'Ctrl + V', description: 'Paste nodes from clipboard' },
    { key: 'Ctrl + A', description: 'Select all nodes and edges' },
    { key: 'Delete / Backspace', description: 'Delete selected nodes and edges' },
    { key: 'ctrl + mouse click', description: 'Select multiple nodes one by one' },
    { key: 'shift + mouse move', description: 'Select multiple nodes with selection box' },
  ]

  const handleOnClose = useCallback(() => {
    setIsShortcutMenuOpen(false)
  }, [setIsShortcutMenuOpen])

  return (
    <Popup isOpen={isShortcutMenuOpen} onClose={handleOnClose} size="md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Keyboard Shortcuts</h2>
          <button onClick={handleOnClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
            ×
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Shortcut</th>
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody>
              {shortcuts.map((shortcut, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3">
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800 whitespace-nowrap">{shortcut.key}</span>
                  </td>
                  <td className="py-2 px-3 text-sm text-gray-600">{shortcut.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Popup>
  )
}

const mapStateToProps = (state: AppState) => ({
  isShortcutMenuOpen: isShortcutMenuOpenSelector(state),
})

const mapDispatchToProps = {
  setIsShortcutMenuOpen: uiActions.setIsShortcutMenuOpen,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(ShortcutsPopup))
