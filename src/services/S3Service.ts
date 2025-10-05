import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'
import { WhatsAppMediaUploadType } from '../api/api'

export class S3Service {
  private static client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',
    },
  })

  private static bucketName = import.meta.env.VITE_API_S3_BUCKET_NAME || ''

  static async uploadFile(
    campaignId: string,
    mediaType: WhatsAppMediaUploadType,
    buffer: Uint8Array,
    contentType: string,
    originalFilename: string
  ): Promise<string> {
    const uniqueId = uuidv4()

    const fileExtension = originalFilename.split('.').pop() || ''

    const key = `${campaignId}/${mediaType}/${uniqueId}.${fileExtension}`

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })

    await this.client.send(command)

    // Return the public URL
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`
  }
}


// Buckets seprtations and Auto assets migration when flow passed (4 hr)
// minor ui changes and collapsable tool picker (1 hr)