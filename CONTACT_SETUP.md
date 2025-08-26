# AU Roofing Contact Form Setup

## Email Service Configuration

This contact form uses Resend for email delivery. To set it up:

### 1. Get a Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key

### 2. Set up your domain (optional but recommended)

1. Add your domain in Resend dashboard
2. Verify DNS records
3. This allows you to send from your own domain

### 3. Environment Variables

Create a `.env.local` file with:

```bash
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL_TO=your-business-email@example.com
CONTACT_EMAIL_FROM=noreply@yourdomain.com
```

### 4. Test the form

1. Fill out the contact form on your website
2. Check your email inbox for the formatted message
3. Check your server logs for any errors

## Alternative Email Providers

If you prefer a different provider, you can easily swap Resend for:

- **SendGrid**: Popular choice with good free tier
- **Nodemailer + SMTP**: Use any SMTP provider (Gmail, Outlook, etc.)
- **AWS SES**: Cost-effective for high volume
- **Postmark**: Excellent for transactional emails

Just replace the `sendContactEmail` function in `/app/api/contact/route.ts`.

## Email Template

The current template includes:

- Sender's full name, email, and phone
- Subject line
- Full message with proper formatting
- Professional styling with AU Roofing branding colors
- Reply-to set to sender's email for easy responses
