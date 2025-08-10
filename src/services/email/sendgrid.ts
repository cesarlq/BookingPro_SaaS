import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface EmailData {
  to: string;
  from?: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({
  to,
  from = process.env.SENDGRID_FROM_EMAIL || 'noreply@bookingpro.com',
  subject,
  html,
  text,
}: EmailData) {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured');
    return false;
  }

  try {
    await sgMail.send({
      to,
      from,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    });

    console.log(`Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function sendBookingConfirmationEmail({
  userEmail,
  userName,
  bookingDetails,
  businessName,
}: {
  userEmail: string;
  userName: string;
  bookingDetails: any;
  businessName: string;
}) {
  const subject = `Booking Confirmation - ${businessName}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .footer { text-align: center; padding: 20px; color: #666; }
        .btn { display: inline-block; background: #667eea; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmed!</h1>
          <p>Thank you for choosing ${businessName}</p>
        </div>
        <div class="content">
          <p>Hello ${userName},</p>
          <p>Your booking has been confirmed. Here are the details:</p>
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <div class="detail-row">
              <strong>Booking ID:</strong>
              <span>${bookingDetails.id}</span>
            </div>
            <div class="detail-row">
              <strong>Date:</strong>
              <span>${new Date(bookingDetails.startDate).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <strong>Time:</strong>
              <span>${new Date(bookingDetails.startDate).toLocaleTimeString()}</span>
            </div>
            <div class="detail-row">
              <strong>Guests:</strong>
              <span>${bookingDetails.guests}</span>
            </div>
            <div class="detail-row">
              <strong>Total Amount:</strong>
              <span>€${bookingDetails.totalPrice}</span>
            </div>
            ${bookingDetails.room ? `
            <div class="detail-row">
              <strong>Room:</strong>
              <span>${bookingDetails.room.name}</span>
            </div>
            ` : ''}
            ${bookingDetails.table ? `
            <div class="detail-row">
              <strong>Table:</strong>
              <span>${bookingDetails.table.name}</span>
            </div>
            ` : ''}
            ${bookingDetails.notes ? `
            <div class="detail-row">
              <strong>Special Requests:</strong>
              <span>${bookingDetails.notes}</span>
            </div>
            ` : ''}
          </div>
          
          <p>We look forward to welcoming you!</p>
          
          <p>If you have any questions or need to modify your booking, please contact us.</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 ${businessName}. All rights reserved.</p>
          <p>This email was sent from BookingPro SaaS Platform</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject,
    html,
  });
}

export async function sendBookingCancellationEmail({
  userEmail,
  userName,
  bookingDetails,
  businessName,
}: {
  userEmail: string;
  userName: string;
  bookingDetails: any;
  businessName: string;
}) {
  const subject = `Booking Cancellation - ${businessName}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Cancellation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc3545; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Cancelled</h1>
          <p>Your reservation has been cancelled</p>
        </div>
        <div class="content">
          <p>Hello ${userName},</p>
          <p>Your booking has been cancelled. Here are the details of the cancelled reservation:</p>
          
          <div class="booking-details">
            <h3>Cancelled Booking Details</h3>
            <div class="detail-row">
              <strong>Booking ID:</strong>
              <span>${bookingDetails.id}</span>
            </div>
            <div class="detail-row">
              <strong>Date:</strong>
              <span>${new Date(bookingDetails.startDate).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <strong>Guests:</strong>
              <span>${bookingDetails.guests}</span>
            </div>
            <div class="detail-row">
              <strong>Total Amount:</strong>
              <span>€${bookingDetails.totalPrice}</span>
            </div>
          </div>
          
          <p>If you have any questions about this cancellation or would like to make a new booking, please contact us.</p>
          
          <p>We hope to serve you in the future!</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 ${businessName}. All rights reserved.</p>
          <p>This email was sent from BookingPro SaaS Platform</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject,
    html,
  });
}

export async function sendWelcomeEmail({
  userEmail,
  userName,
}: {
  userEmail: string;
  userName: string;
}) {
  const subject = 'Welcome to BookingPro!';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to BookingPro</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .feature { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
        .footer { text-align: center; padding: 20px; color: #666; }
        .btn { display: inline-block; background: #667eea; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to BookingPro!</h1>
          <p>Your journey to better booking management starts here</p>
        </div>
        <div class="content">
          <p>Hello ${userName},</p>
          <p>Welcome to BookingPro! We're excited to help you streamline your booking operations.</p>
          
          <div class="feature">
            <h4>🏨 Hotel & Restaurant Management</h4>
            <p>Manage both hotel rooms and restaurant tables from one platform</p>
          </div>
          
          <div class="feature">
            <h4>💳 Integrated Payments</h4>
            <p>Secure payment processing with Stripe integration</p>
          </div>
          
          <div class="feature">
            <h4>📊 Analytics Dashboard</h4>
            <p>Track your performance with comprehensive reporting</p>
          </div>
          
          <div class="feature">
            <h4>🌍 Multi-language Support</h4>
            <p>Serve customers in their preferred language</p>
          </div>
          
          <p>Ready to get started? Access your dashboard and begin managing your bookings today!</p>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="btn">Go to Dashboard</a>
          </div>
        </div>
        <div class="footer">
          <p>&copy; 2024 BookingPro. All rights reserved.</p>
          <p>Need help? Contact us at support@bookingpro.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject,
    html,
  });
}