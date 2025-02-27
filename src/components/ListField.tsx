import React, { memo } from 'react'
import { FieldArray, FieldArrayRenderProps } from 'formik'
import { IoMdAdd } from 'react-icons/io'
import Button from './Button'
import SuggestionInput from './SuggestionField'

type DynamicFieldArrayProps = {
  name: string
  labelGenerator: (index: number, length: number) => string
  placeholderGenerator: (index: number, length: number) => string
}

const ListField: React.FC<DynamicFieldArrayProps> = ({ name, labelGenerator, placeholderGenerator }) => {
  return (
    <FieldArray name={name}>
      {({ push, form }: FieldArrayRenderProps) => (
        <div className="space-y-4">
          {(form.values[name] as string[]).map((_, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <SuggestionInput
                name={{ index, key: name, removeable: index !== 0 }}
                placeholder={placeholderGenerator(index, (form.values[name] as string[]).length)}
                className="w-full p-2 border border-gray-300 rounded"
                as="input"
                label={labelGenerator(index, (form.values[name] as string[]).length)}
              />
            </div>
          ))}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="tertiary" onClick={() => push('')} className="w-full">
              <IoMdAdd className="mx-auto" />
            </Button>
          </div>
        </div>
      )}
    </FieldArray>
  )
}

export default memo(ListField)
