import { FC, memo, useCallback, useRef, useState, useEffect } from 'react'
import Popup from './Popup'
import Editor, { OnMount, Monaco } from '@monaco-editor/react'

interface Props {
  campaignGlobalConstants: string[]
  variablesFunction?: string
  className?: string
  isOpen: boolean
  onClose: () => void
  onSave: (value: string) => void
}

const HEADER = `(global) => {
  // you can define your own variables and can access global variables through global.userName
  // write here`

const FOOTER = `  return {
    
  }
}`

const FlowVariablePopup: FC<Props> = memo(({ isOpen, onClose, variablesFunction, onSave, className, campaignGlobalConstants }) => {
  // Normalize initial value: ensure it has the sandwich structure.
  const getNormalizedValue = () => {
    const val = variablesFunction || ''
    if (!val.trim()) return `${HEADER}\n\n${FOOTER}`

    // If it looks like it already has the wrapper, use it.
    // We use a loose check.
    if (val.includes('(global) => {') && val.includes('return {')) {
      return val
    }

    // Otherwise, wrap the existing content as the body.
    // Strip braces if they exist to avoid double wrapping?
    // Assuming legacy content is just the body logic or empty.
    return `${HEADER}\n${val}\n${FOOTER}`
  }

  const initialValue = getNormalizedValue()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null)
  const [monaco, setMonaco] = useState<Monaco>(null)

  const handleEditorDidMount: OnMount = useCallback(
    (editor, monacoInstance) => {
      editorRef.current = editor
      setMonaco(monacoInstance)

      // Save command
      editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyS, () => {
        onSave(editor.getValue())
      })
    },
    [onSave]
  )

  useEffect(() => {
    if (!monaco) return

    const disposable = monaco.languages.registerCompletionItemProvider('javascript', {
      triggerCharacters: ['.'],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      provideCompletionItems: (model: any, position: any) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        })

        const match = textUntilPosition.match(/global\.$/)
        if (!match) {
          return { suggestions: [] }
        }

        const suggestions = campaignGlobalConstants.map((constant) => ({
          label: constant,
          kind: monaco.languages.CompletionItemKind.Constant,
          insertText: constant,
        }))

        return { suggestions }
      },
    })

    return () => {
      disposable.dispose()
    }
  }, [monaco, campaignGlobalConstants])

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => {
        const newEditorValue = editorRef.current?.getValue()
        if (newEditorValue !== variablesFunction) {
          onSave(editorRef.current?.getValue() || '')
        }
        onClose()
      }}
      size="3xl"
      className={className}
    >
      <div onKeyDown={(e) => e.stopPropagation()}>
        <Editor
          height="80vh"
          defaultLanguage="javascript"
          defaultValue={initialValue}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </Popup>
  )
})

export default FlowVariablePopup
