import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
	fullName: z.string().min(2).max(120),
	phone: z.string().min(6).max(40),
	email: z.string().email(),
	subject: z.string().min(3).max(150),
	message: z.string().min(10).max(5000),
})

async function sendContactEmail(data: z.infer<typeof contactSchema>) {
	const { fullName, phone, email, subject, message } = data

	// Email template for the business owner
	const htmlContent = `
		<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
			<h2 style="color: #333; border-bottom: 2px solid #e67e22; padding-bottom: 10px;">
				New Contact Form Submission
			</h2>
			<div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
				<p><strong>From:</strong> ${fullName}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Phone:</strong> ${phone}</p>
				<p><strong>Subject:</strong> ${subject}</p>
				<div style="margin-top: 20px;">
					<strong>Message:</strong>
					<div style="background: white; padding: 15px; border-left: 4px solid #e67e22; margin-top: 10px;">
						${message.replace(/\n/g, '<br>')}
					</div>
				</div>
			</div>
			<p style="color: #666; font-size: 12px; margin-top: 30px;">
				This message was sent from the AU Roofing contact form.
			</p>
		</div>
	`

	const result = await resend.emails.send({
		from: process.env.CONTACT_EMAIL_FROM || 'noreply@yourdomain.com',
		to: process.env.CONTACT_EMAIL_TO || 'your-business-email@example.com',
		subject: `New Contact: ${subject}`,
		html: htmlContent,
		replyTo: email,
	})

	return result
}

async function sendConfirmationEmail(data: z.infer<typeof contactSchema>) {
	const { fullName, email, subject } = data

	// Confirmation email template for the customer
	const confirmationHtml = `
		<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
			<div style="background: linear-gradient(135deg, #e67e22, #f39c12); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
				<h1 style="color: white; margin: 0; font-size: 28px;">AU Roofing</h1>
				<p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Professional Roofing Services</p>
			</div>
			<div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
				<h2 style="color: #333; margin-top: 0;">Thank you for contacting us!</h2>
				<p style="color: #666; line-height: 1.6;">
					Hi ${fullName},
				</p>
				<p style="color: #666; line-height: 1.6;">
					We have received your message regarding "<strong>${subject}</strong>" and appreciate you reaching out to AU Roofing.
				</p>
				<div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 25px 0; border-left: 4px solid #e67e22;">
					<h3 style="color: #333; margin-top: 0; margin-bottom: 10px;">What happens next?</h3>
					<ul style="color: #666; margin: 0; padding-left: 20px;">
						<li>Our team will review your message within 24 hours</li>
						<li>We'll contact you via phone or email to discuss your roofing needs</li>
						<li>If needed, we'll schedule a free inspection at your convenience</li>
					</ul>
				</div>
				<p style="color: #666; line-height: 1.6;">
					For urgent roofing issues, please call us directly at <strong>0449 974 797</strong>.
				</p>
				<hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
				<div style="text-align: center;">
					<p style="color: #999; font-size: 14px; margin: 0;">
						AU Roofing - Your Trusted Roofing Partner<br>
						📞 0449 974 797 | 📧 info@auroofing.com.au
					</p>
				</div>
			</div>
		</div>
	`

	const result = await resend.emails.send({
		from: process.env.CONTACT_EMAIL_FROM || 'noreply@yourdomain.com',
		to: email,
		subject: 'Thank you for contacting AU Roofing',
		html: confirmationHtml,
	})

	return result
}

export async function POST(req: NextRequest) {
	try {
		const json = await req.json()
		const parse = contactSchema.safeParse(json)
		if (!parse.success) {
			return NextResponse.json(
				{ ok: false, errors: parse.error.flatten() },
				{ status: 400 }
			)
		}

		const data = parse.data

		// Send notification email to business owner
		const businessEmailResult = await sendContactEmail(data)

		if (businessEmailResult.error) {
			console.error(
				'Failed to send business notification email:',
				businessEmailResult.error
			)
			return NextResponse.json(
				{ ok: false, error: 'Failed to send email' },
				{ status: 500 }
			)
		}

		// Send confirmation email to customer
		const confirmationEmailResult = await sendConfirmationEmail(data)

		if (confirmationEmailResult.error) {
			console.error(
				'Failed to send confirmation email:',
				confirmationEmailResult.error
			)
			// Don't fail the request if confirmation email fails - business notification is more important
		}

		console.log('Business email sent:', businessEmailResult.data?.id)
		console.log('Confirmation email sent:', confirmationEmailResult.data?.id)

		return NextResponse.json({
			ok: true,
			businessEmailId: businessEmailResult.data?.id,
			confirmationEmailId: confirmationEmailResult.data?.id,
		})
	} catch (e: any) {
		console.error('Contact form error', e)
		return NextResponse.json(
			{ ok: false, error: 'Internal Server Error' },
			{ status: 500 }
		)
	}
}

export const dynamic = 'force-dynamic' // ensure it runs on the server side
