import { FC, memo } from 'react'
import { MEDIA_TYPES, MediaTypes } from '../models/Node.model'
import { Field } from 'formik'
import SuggestionField from './Field'

interface Props {
  type?: MediaTypes
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const HeaderForm: FC<Props> = ({ type, setFieldValue }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Header Type</label>
      <Field
        as="select"
        name="header.type"
        className="w-full rounded-md border px-3 py-2"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const value = e.target.value === '' ? undefined : e.target.value
          setFieldValue('header.type', value)
          if (value === undefined) {
            setFieldValue('header', undefined)
          }
        }}
      >
        {[undefined, ...MEDIA_TYPES].map((key) => (
          <option key={key || 'no-header'} value={key || ''}>
            {key ? key.charAt(0).toUpperCase() + key.slice(1) : 'No Header'}
          </option>
        ))}
      </Field>

      {type && type === 'text' ? (
        <SuggestionField name={`header.text`} placeholder={`Enter header text`} as="input" label={`Header Text`} characterLimit={60} />
      ) : (
        <>
          <SuggestionField
            name={`header.media.wa_media_id`}
            placeholder={`Enter ${type} media id`}
            as="input"
            label={`Header ${type} media ID`}
            disableSuggestion
          />
          <SuggestionField
            name={`header.media.wa_media_url`}
            placeholder={`Enter ${type} media url`}
            as="input"
            label={`Header ${type} media URL`}
            disableSuggestion
          />
        </>
      )}
    </div>
  )
}

export default memo(HeaderForm)
