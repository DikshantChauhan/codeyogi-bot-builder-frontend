import { FC, memo } from 'react'
import { MEDIA_TYPES, MessageHeader } from '../models/Node.model'
import { Field } from 'formik'
import SuggestionField from './Field'
import MediaUploadField from './MediaUploadField'

interface Props {
  setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void
  header?: MessageHeader
}

const HeaderForm: FC<Props> = ({ header, setFieldValue }) => {
  const type = header?.type

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
          setFieldValue('header.media', undefined)
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
      ) : type && ['image', 'video', 'document'].includes(type) ? (
        <MediaUploadField
          mediaType={type as 'image' | 'video' | 'document'}
          mediaId={header?.media?.wa_media_id || ''}
          mediaUrl={header?.media?.wa_media_url || ''}
          onMediaChange={(mediaId, mediaUrl) => {
            setFieldValue('header.media.wa_media_id', mediaId)
            setFieldValue('header.media.wa_media_url', mediaUrl)
          }}
        />
      ) : type === 'audio' ? (
        /* Audio type - manual input only */
        <div className="space-y-2">
          <label className="text-sm font-medium">Audio Media</label>
          <div className="p-3 bg-gray-50 rounded-lg space-y-2">
            <SuggestionField
              name={`header.media.wa_media_id`}
              placeholder={`Enter audio media id`}
              as="input"
              label={`Audio Media ID`}
              disableSuggestion
            />
            <SuggestionField
              name={`header.media.wa_media_url`}
              placeholder={`Enter audio media url`}
              as="input"
              label={`Audio Media URL`}
              disableSuggestion
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default memo(HeaderForm)
