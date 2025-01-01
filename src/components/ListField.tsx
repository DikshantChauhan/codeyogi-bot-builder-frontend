import React, { memo } from 'react'
import { Field, FieldArray, FieldArrayRenderProps } from 'formik'
import { MdDelete } from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'
import Button from './Button'

type DynamicFieldArrayProps = {
  name: string
  labelGenerator: (index: number, length: number) => string
  placeholderGenerator: (index: number, length: number) => string
}

const ListField: React.FC<DynamicFieldArrayProps> = ({ name, labelGenerator, placeholderGenerator }) => {
  return (
    <FieldArray name={name}>
      {({ remove, push, form }: FieldArrayRenderProps) => (
        <div className="space-y-4">
          {(form.values[name] as string[]).map((_, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold">{labelGenerator(index, (form.values[name] as string[]).length)}</label>
                {index !== 0 && (
                  <Button type="button" onClick={() => remove(index)} className="bg-red-500 hover:bg-red-600">
                    <MdDelete />
                  </Button>
                )}
              </div>
              <Field
                name={`${name}.${index}`}
                placeholder={placeholderGenerator(index, (form.values[name] as string[]).length)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}

          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={() => push('')} className="w-full bg-blue-500 rounded-full hover:bg-blue-600">
              <IoMdAdd className="mx-auto" />
            </Button>
          </div>
        </div>
      )}
    </FieldArray>
  )
}

export default memo(ListField)
