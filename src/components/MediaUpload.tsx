import React, { useState, useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { AiOutlineUpload, AiOutlineFile, AiOutlinePicture, AiOutlineVideoCamera } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { FiCopy, FiCheck } from 'react-icons/fi'
import Button from './Button'
import Loading from './Loading'
import { uploadWhatsAppMediaAPI, WhatsAppMediaUploadPayload, WhatsAppMediaUploadResponse, WhatsAppMediaUploadType } from '../api/api'
import { S3Service } from '../services/S3Service'
import { toast } from 'react-toastify'

interface MediaUploadProps {
  campaignId: string
  onUploadSuccess?: (response: WhatsAppMediaUploadResponse) => void
  onUploadError?: (error: string) => void
  className?: string
  acceptedTypes?: WhatsAppMediaUploadType[]
  maxFileSize?: number
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  campaignId,
  onUploadSuccess,
  onUploadError,
  className = '',
  acceptedTypes = ['image', 'video', 'document'],
  maxFileSize = 16 * 1024 * 1024, // 16MB default
}) => {
  const [uploading, setUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<WhatsAppMediaUploadResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Validate campaignId is provided
  if (!campaignId) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        <p>Please select a campaign to upload media.</p>
      </div>
    )
  }

  const getAcceptedMimeTypes = useMemo(() => {
    const mimeTypes: Record<WhatsAppMediaUploadType, string[]> = {
      image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
      video: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm'],
      document: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
        'application/zip',
        'application/x-rar-compressed',
      ],
    }

    return acceptedTypes.flatMap((type) => mimeTypes[type])
  }, [acceptedTypes])

  const getFileType = (file: File): WhatsAppMediaUploadType => {
    if (file.type.startsWith('image/')) return 'image'
    if (file.type.startsWith('video/')) return 'video'
    return 'document'
  }

  const uploadFile = useCallback(
    async (file: File) => {
      try {
        setUploading(true)
        setError(null)

        const fileType = getFileType(file)

        // Convert file to Uint8Array for S3 upload
        const buffer = await new Promise<Uint8Array>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            const result = reader.result as ArrayBuffer
            resolve(new Uint8Array(result))
          }
          reader.onerror = reject
          reader.readAsArrayBuffer(file)
        })

        // Upload to S3 first
        const s3Url = await S3Service.uploadFile(campaignId, fileType, buffer, file.type, file.name)

        toast.success('File uploaded to S3')
        // Call API with S3 URL
        const payload: WhatsAppMediaUploadPayload = {
          campaign_id: campaignId,
          type: fileType,
          s3_url: s3Url,
          filename: file.name,
          contentType: file.type,
        }

        const uploadResponse = await uploadWhatsAppMediaAPI(payload)

        setUploadedFile(uploadResponse)
        onUploadSuccess?.(uploadResponse)

        return uploadResponse
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Upload failed'
        setError(errorMessage)
        onUploadError?.(errorMessage)
        throw err
      } finally {
        setUploading(false)
      }
    },
    [campaignId, onUploadSuccess, onUploadError]
  )

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        try {
          await uploadFile(acceptedFiles[0])
        } catch (error) {
          // Error is already handled in uploadFile
          console.error('Upload failed:', error)
        }
      }
    },
    [uploadFile]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: getAcceptedMimeTypes.reduce((acc, mimeType) => {
      acc[mimeType] = []
      return acc
    }, {} as Record<string, string[]>),
    maxSize: maxFileSize,
    multiple: false,
  })

  const removeFile = useCallback(() => {
    setUploadedFile(null)
  }, [])

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }, [])

  const getFileIcon = (type: WhatsAppMediaUploadType) => {
    switch (type) {
      case 'image':
        return <AiOutlinePicture className="h-6 w-6 text-blue-500" />
      case 'video':
        return <AiOutlineVideoCamera className="h-6 w-6 text-red-500" />
      case 'document':
        return <AiOutlineFile className="h-6 w-6 text-green-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'}
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <AiOutlineUpload className="h-8 w-8 mx-auto text-gray-400" />
          {isDragActive ? (
            <p className="text-primary-600 font-medium">Drop the files here...</p>
          ) : (
            <>
              <p className="text-gray-600 font-medium">Drag & drop files here, or click to select</p>
              <p className="text-sm text-gray-500">
                Accepted types: {acceptedTypes.join(', ')} (Max {formatFileSize(maxFileSize)})
              </p>
            </>
          )}
        </div>
      </div>

      {/* Loading State */}
      {uploading && (
        <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
          <Loading />
          <span className="ml-2 text-blue-600">Uploading...</span>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Uploaded File */}
      {uploadedFile && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Uploaded File</h3>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3 flex-1">
              {getFileIcon(uploadedFile.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{uploadedFile.filename}</p>
                <div
                  className="flex items-center space-x-2 cursor-pointer group"
                  onClick={() => copyToClipboard(uploadedFile.s3_url)}
                  title="Click to copy S3 URL"
                >
                  <p className="text-xs text-gray-500 truncate">{uploadedFile.s3_url}</p>
                  {copied ? (
                    <FiCheck className="h-3 w-3 text-green-500 flex-shrink-0" />
                  ) : (
                    <FiCopy className="h-3 w-3 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
            <Button variant="tertiary" onClick={removeFile} className="p-1 ml-2">
              <IoMdClose className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaUpload
