import { FC, memo, useCallback } from 'react'
import useAppStore from '../store/store'
import { useReactFlow, Viewport } from '@xyflow/react'
import { AppNode } from '../nodes'

export type NodeFormOnSubmit = (data: { [k: string]: FormDataEntryValue }, viewPort: Viewport) => AppNode
interface FormProps {
  children: React.ReactNode
  onSubmit: NodeFormOnSubmit
}

const FormContainer: FC<FormProps> = ({ children, onSubmit }) => {
  const setNode = useAppStore((state) => state.setNodes)
  const { getViewport } = useReactFlow()

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formObject = Object.fromEntries(formData)
    const viewPort = getViewport()

    setNode({ ...onSubmit(formObject, viewPort), dragHandle: '.drag-handle__custom' })
  }, [])

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {children}
      <button type="submit" className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
        Add
      </button>
    </form>
  )
}

export default memo(FormContainer)
