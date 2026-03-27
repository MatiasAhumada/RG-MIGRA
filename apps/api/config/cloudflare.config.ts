export const cloudflareConfig = () => ({
  cloudflare: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
    bucketName: process.env.CLOUDFLARE_BUCKET_NAME,
    bucketUrl: process.env.CLOUDFLARE_BUCKET_URL,
    region: process.env.CLOUDFLARE_REGION || 'auto',
  },
})
