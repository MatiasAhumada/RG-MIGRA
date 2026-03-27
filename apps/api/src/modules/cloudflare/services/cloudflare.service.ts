import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { CLOUDFLARE_ERRORS } from '@constants/error.constant'
import { ClientErrorHandler } from '@exceptions/clientError.handler'
import { CLOUDFLARE_CONSTANTS } from './cloudflare.constant'

export interface UploadFileDto {
  key: string
  body: Buffer
  contentType: string
}

export interface GetFileDto {
  key: string
}

@Injectable()
export class CloudflareService {
  private readonly s3Client: S3Client
  private readonly bucketName: string

  constructor(private readonly configService: ConfigService) {
    const accountId = this.configService.get<string>('CLOUDFLARE_ACCOUNT_ID')
    const accessKeyId = this.configService.get<string>('CLOUDFLARE_ACCESS_KEY_ID')
    const secretAccessKey = this.configService.get<string>('CLOUDFLARE_SECRET_ACCESS_KEY')
    this.bucketName = this.configService.get<string>('CLOUDFLARE_BUCKET_NAME')

    this.s3Client = new S3Client({
      region: CLOUDFLARE_CONSTANTS.DEFAULT_REGION,
      endpoint: `https://${accountId}.${CLOUDFLARE_CONSTANTS.R2_ENDPOINT}`,
      credentials: {
        accessKeyId: accessKeyId || '',
        secretAccessKey: secretAccessKey || '',
      },
    })
  }

  async uploadFile(data: UploadFileDto): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: data.key,
        Body: data.body,
        ContentType: data.contentType,
      })

      await this.s3Client.send(command)
      return this.getPublicUrl(data.key)
    } catch (error) {
      ClientErrorHandler.handle(error, CLOUDFLARE_ERRORS.UPLOAD_FAILED)
    }
  }

  async getFile(data: GetFileDto): Promise<Buffer> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: data.key,
      })

      const response = await this.s3Client.send(command)
      const body = await this.streamToBuffer(response.Body as NodeJS.ReadableStream)
      return body
    } catch (error) {
      ClientErrorHandler.handle(error, CLOUDFLARE_ERRORS.DELETE_FAILED)
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      await this.s3Client.send(command)
    } catch (error) {
      ClientErrorHandler.handle(error, CLOUDFLARE_ERRORS.DELETE_FAILED)
    }
  }

  async getSignedUrl(key: string, expiresIn = CLOUDFLARE_CONSTANTS.SIGNED_URL_EXPIRY): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      return await getSignedUrl(this.s3Client, command, { expiresIn })
    } catch (error) {
      ClientErrorHandler.handle(error, CLOUDFLARE_ERRORS.UPLOAD_FAILED)
    }
  }

  async listFiles(prefix?: string): Promise<string[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
        Prefix: prefix,
      })

      const response = await this.s3Client.send(command)
      return response.Contents?.map((file) => file.Key || '') || []
    } catch (error) {
      ClientErrorHandler.handle(error, CLOUDFLARE_ERRORS.BUCKET_NOT_FOUND)
    }
  }

  private getPublicUrl(key: string): string {
    const bucketUrl = this.configService.get<string>('CLOUDFLARE_BUCKET_URL')
    return `${bucketUrl}/${key}`
  }

  private async streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = []
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
      stream.on('error', (err) => reject(err))
      stream.on('end', () => resolve(Buffer.concat(chunks)))
    })
  }
}
