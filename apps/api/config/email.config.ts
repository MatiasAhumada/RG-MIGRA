export const emailConfig = () => ({
  email: {
    resendApiKey: process.env.RESEND_API_KEY,
    from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
  },
})
