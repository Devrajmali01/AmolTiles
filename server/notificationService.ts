import { db, NotificationLogRecord } from './db';
import { whatsappService } from './whatsappService';

export interface DispatchResult {
  channel: 'whatsapp' | 'sms' | 'telegram' | 'email';
  recipient: string;
  status: 'sent' | 'failed' | 'simulated';
  messageId?: string;
  error?: string;
  logId: string;
}

export class NotificationService {
  private get adminPhone1(): string {
    return process.env.ADMIN_PHONE_1 || '8421001308';
  }

  private get adminPhone2(): string {
    return process.env.ADMIN_PHONE_2 || '9822309345';
  }

  private get adminEmail(): string {
    return process.env.ADMIN_EMAIL || 'amoltiles.jath@gmail.com';
  }

  private get telegramChatId(): string | undefined {
    return process.env.TELEGRAM_CHAT_ID;
  }

  // --- Core Channel Dispatchers ---

  /**
   * Official Meta WhatsApp Business / Cloud API Dispatch
   */
  public async sendWhatsApp(
    to: string,
    message: string,
    relatedId?: string,
    options?: { templateName?: string; templateComponents?: any[] }
  ): Promise<{ success: boolean; simulated: boolean; messageId?: string; error?: string; errorCode?: number }> {
    const res = await whatsappService.sendMessage(to, message, options);
    return {
      success: res.success,
      simulated: !!res.simulated,
      messageId: res.messageId,
      error: res.error,
      errorCode: res.errorCode
    };
  }

  /**
   * Reliable India SMS Gateway (Fast2SMS / Kaleyra / Twilio / generic)
   */
  public async sendSMS(to: string, message: string, relatedId?: string): Promise<{ success: boolean; simulated: boolean; error?: string }> {
    const cleanPhone = to.replace(/\D/g, '');
    const apiKey = process.env.SMS_API_KEY;

    if (!apiKey) {
      console.log(`[SMS Simulated] To: ${cleanPhone} | Message: ${message.slice(0, 60)}...`);
      return { success: true, simulated: true };
    }

    try {
      // Example Fast2SMS Quick Transactional SMS endpoint
      const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          'authorization': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          route: 'q',
          message: message,
          language: 'english',
          flash: 0,
          numbers: cleanPhone
        })
      });

      if (!response.ok) {
        const err = await response.text();
        return { success: false, simulated: false, error: `SMS Gateway Error (${response.status}): ${err}` };
      }

      return { success: true, simulated: false };
    } catch (err: any) {
      return { success: false, simulated: false, error: err.message || 'SMS network dispatch failed' };
    }
  }

  /**
   * Telegram Bot API
   */
  public async sendTelegram(message: string, chatId?: string, relatedId?: string): Promise<{ success: boolean; simulated: boolean; error?: string }> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const targetChat = chatId || this.telegramChatId;

    if (!token || !targetChat) {
      console.log(`[Telegram Simulated] Chat: ${targetChat || 'Admin Group'} | Message: ${message.slice(0, 60)}...`);
      return { success: true, simulated: true };
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: targetChat,
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (!response.ok) {
        const err = await response.text();
        return { success: false, simulated: false, error: `Telegram Bot Error (${response.status}): ${err}` };
      }

      return { success: true, simulated: false };
    } catch (err: any) {
      return { success: false, simulated: false, error: err.message || 'Telegram network dispatch failed' };
    }
  }

  /**
   * Transactional Email Provider (Resend / SendGrid / SMTP HTTP)
   */
  public async sendEmail(to: string, subject: string, htmlBody: string, plainText: string, relatedId?: string): Promise<{ success: boolean; simulated: boolean; error?: string }> {
    const apiKey = process.env.EMAIL_API_KEY;
    const fromEmail = process.env.EMAIL_FROM || 'notifications@amoltiles.com';

    if (!apiKey) {
      console.log(`[Email Simulated] To: ${to} | Subject: ${subject}`);
      return { success: true, simulated: true };
    }

    try {
      // Standard Resend API dispatch
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: `Amol Tiles <${fromEmail}>`,
          to: [to],
          subject: subject,
          html: htmlBody,
          text: plainText
        })
      });

      if (!response.ok) {
        const err = await response.text();
        return { success: false, simulated: false, error: `Email Provider Error (${response.status}): ${err}` };
      }

      return { success: true, simulated: false };
    } catch (err: any) {
      return { success: false, simulated: false, error: err.message || 'Email network dispatch failed' };
    }
  }

  // --- High Level Orchestration Services ---

  /**
   * Notify BOTH administrators independently via WhatsApp, SMS, Telegram, and Email
   */
  public async notifyBothAdmins(options: {
    type: NotificationLogRecord['notificationType'];
    plainText: string;
    telegramText?: string;
    emailSubject: string;
    emailHtml: string;
    relatedId?: string;
  }): Promise<DispatchResult[]> {
    const results: DispatchResult[] = [];
    const admins = [
      { phone: this.adminPhone1, role: 'admin_1' as const, label: 'Admin 1 (Ajit Shinde)' },
      { phone: this.adminPhone2, role: 'admin_2' as const, label: 'Admin 2 (Niraj Shinde)' }
    ];

    // 1. WhatsApp & SMS to both admins independently
    for (const admin of admins) {
      // WhatsApp - Real-time official Cloud API
      try {
        const waRes = await this.sendWhatsApp(admin.phone, options.plainText, options.relatedId);
        const status = waRes.simulated ? 'simulated' : waRes.success ? 'sent' : 'failed';
        const log = db.logNotification({
          notificationType: options.type,
          channel: 'whatsapp',
          recipient: admin.phone,
          recipientRole: admin.role,
          status,
          deliveryStatus: waRes.success ? 'sent' : 'failed',
          whatsappMessageId: waRes.messageId,
          messageBody: options.plainText,
          error: waRes.error,
          errorCode: waRes.errorCode,
          relatedId: options.relatedId
        });

        // If appointment, record separate status on appointment record
        if (options.relatedId && options.relatedId.startsWith('APT-')) {
          db.updateAppointmentWhatsAppStatus(
            options.relatedId,
            admin.role,
            status,
            waRes.messageId,
            waRes.error
          );
        }

        results.push({
          channel: 'whatsapp',
          recipient: admin.phone,
          status: log.status,
          messageId: waRes.messageId,
          error: waRes.error,
          logId: log.id
        });
      } catch (err: any) {
        const log = db.logNotification({
          notificationType: options.type,
          channel: 'whatsapp',
          recipient: admin.phone,
          recipientRole: admin.role,
          status: 'failed',
          deliveryStatus: 'failed',
          messageBody: options.plainText,
          error: err.message,
          relatedId: options.relatedId
        });

        if (options.relatedId && options.relatedId.startsWith('APT-')) {
          db.updateAppointmentWhatsAppStatus(
            options.relatedId,
            admin.role,
            'failed',
            undefined,
            err.message
          );
        }

        results.push({ channel: 'whatsapp', recipient: admin.phone, status: 'failed', error: err.message, logId: log.id });
      }

      // SMS
      try {
        const smsRes = await this.sendSMS(admin.phone, options.plainText, options.relatedId);
        const log = db.logNotification({
          notificationType: options.type,
          channel: 'sms',
          recipient: admin.phone,
          recipientRole: admin.role,
          status: smsRes.simulated ? 'simulated' : smsRes.success ? 'sent' : 'failed',
          messageBody: options.plainText,
          error: smsRes.error,
          relatedId: options.relatedId
        });
        results.push({ channel: 'sms', recipient: admin.phone, status: log.status, error: smsRes.error, logId: log.id });
      } catch (err: any) {
        const log = db.logNotification({
          notificationType: options.type,
          channel: 'sms',
          recipient: admin.phone,
          recipientRole: admin.role,
          status: 'failed',
          messageBody: options.plainText,
          error: err.message,
          relatedId: options.relatedId
        });
        results.push({ channel: 'sms', recipient: admin.phone, status: 'failed', error: err.message, logId: log.id });
      }
    }

    // 2. Telegram Group / Admin Chat
    try {
      const tgText = options.telegramText || options.plainText;
      const tgRes = await this.sendTelegram(tgText, undefined, options.relatedId);
      const log = db.logNotification({
        notificationType: options.type,
        channel: 'telegram',
        recipient: this.telegramChatId || 'Admin Telegram Channel',
        recipientRole: 'admin_1',
        status: tgRes.simulated ? 'simulated' : tgRes.success ? 'sent' : 'failed',
        messageBody: tgText,
        error: tgRes.error,
        relatedId: options.relatedId
      });
      results.push({ channel: 'telegram', recipient: 'Telegram Admin', status: log.status, error: tgRes.error, logId: log.id });
    } catch (err: any) {
      console.error('Telegram dispatch error:', err);
    }

    // 3. Email to Admin
    try {
      const mailRes = await this.sendEmail(this.adminEmail, options.emailSubject, options.emailHtml, options.plainText, options.relatedId);
      const log = db.logNotification({
        notificationType: options.type,
        channel: 'email',
        recipient: this.adminEmail,
        recipientRole: 'admin_1',
        status: mailRes.simulated ? 'simulated' : mailRes.success ? 'sent' : 'failed',
        messageBody: `Subject: ${options.emailSubject}\n\n${options.plainText}`,
        error: mailRes.error,
        relatedId: options.relatedId
      });
      results.push({ channel: 'email', recipient: this.adminEmail, status: log.status, error: mailRes.error, logId: log.id });
    } catch (err: any) {
      console.error('Admin Email dispatch error:', err);
    }

    return results;
  }

  /**
   * Send notification to Customer via available messaging channel (WhatsApp, SMS, and Email)
   */
  public async notifyCustomer(options: {
    type: NotificationLogRecord['notificationType'];
    phone: string;
    email?: string;
    customerName: string;
    message: string;
    smsMessage?: string;
    emailSubject?: string;
    emailHtml?: string;
    relatedId?: string;
  }): Promise<DispatchResult[]> {
    const results: DispatchResult[] = [];

    // WhatsApp - Real-time official Cloud API
    if (options.phone) {
      try {
        const waRes = await this.sendWhatsApp(options.phone, options.message, options.relatedId);
        const status = waRes.simulated ? 'simulated' : waRes.success ? 'sent' : 'failed';
        const log = db.logNotification({
          notificationType: options.type,
          channel: 'whatsapp',
          recipient: options.phone,
          recipientRole: 'customer',
          status,
          deliveryStatus: waRes.success ? 'sent' : 'failed',
          whatsappMessageId: waRes.messageId,
          messageBody: options.message,
          error: waRes.error,
          errorCode: waRes.errorCode,
          relatedId: options.relatedId
        });

        if (options.relatedId && options.relatedId.startsWith('APT-')) {
          db.updateAppointmentWhatsAppStatus(
            options.relatedId,
            'customer',
            status,
            waRes.messageId,
            waRes.error
          );
        }

        results.push({
          channel: 'whatsapp',
          recipient: options.phone,
          status: log.status,
          messageId: waRes.messageId,
          error: waRes.error,
          logId: log.id
        });
      } catch (err: any) {
        console.error('Customer WhatsApp error:', err);
        const log = db.logNotification({
          notificationType: options.type,
          channel: 'whatsapp',
          recipient: options.phone,
          recipientRole: 'customer',
          status: 'failed',
          deliveryStatus: 'failed',
          messageBody: options.message,
          error: err.message,
          relatedId: options.relatedId
        });
        if (options.relatedId && options.relatedId.startsWith('APT-')) {
          db.updateAppointmentWhatsAppStatus(
            options.relatedId,
            'customer',
            'failed',
            undefined,
            err.message
          );
        }
        results.push({ channel: 'whatsapp', recipient: options.phone, status: 'failed', error: err.message, logId: log.id });
      }

      // Customer SMS
      try {
        const smsContent = options.smsMessage || options.message;
        const smsRes = await this.sendSMS(options.phone, smsContent, options.relatedId);
        const log = db.logNotification({
          notificationType: options.type,
          channel: 'sms',
          recipient: options.phone,
          recipientRole: 'customer',
          status: smsRes.simulated ? 'simulated' : smsRes.success ? 'sent' : 'failed',
          messageBody: smsContent,
          error: smsRes.error,
          relatedId: options.relatedId
        });
        results.push({ channel: 'sms', recipient: options.phone, status: log.status, error: smsRes.error, logId: log.id });
      } catch (err: any) {
        console.error('Customer SMS error:', err);
      }
    }

    // Customer Email
    if (options.email && options.emailSubject && options.emailHtml) {
      try {
        const mailRes = await this.sendEmail(options.email, options.emailSubject, options.emailHtml, options.message, options.relatedId);
        const log = db.logNotification({
          notificationType: options.type,
          channel: 'email',
          recipient: options.email,
          recipientRole: 'customer',
          status: mailRes.simulated ? 'simulated' : mailRes.success ? 'sent' : 'failed',
          messageBody: `Subject: ${options.emailSubject}\n\n${options.message}`,
          error: mailRes.error,
          relatedId: options.relatedId
        });
        results.push({ channel: 'email', recipient: options.email, status: log.status, error: mailRes.error, logId: log.id });
      } catch (err: any) {
        console.error('Customer Email error:', err);
      }
    }

    return results;
  }

  // --- Specific Events ---

  /**
   * 2. New Customer Registration
   */
  public async sendNewCustomerRegistration(user: { name: string; phone: string; email: string }) {
    const timeStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const adminMessage = `🔔 NEW CUSTOMER

Name: ${user.name}
Mobile: ${user.phone}
Email: ${user.email}
Event: New Registration
Time: ${timeStr}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #000; padding-bottom: 8px;">🔔 New Customer Registration</h2>
        <p>A new customer has registered on the Amol Tiles portal:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr><td style="padding: 8px; font-weight: bold; background: #f9f9f9; width: 35%;">Name:</td><td style="padding: 8px;">${user.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; background: #f9f9f9;">Mobile:</td><td style="padding: 8px;"><a href="tel:${user.phone}">${user.phone}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold; background: #f9f9f9;">Email:</td><td style="padding: 8px;">${user.email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; background: #f9f9f9;">Registered Time:</td><td style="padding: 8px;">${timeStr}</td></tr>
        </table>
      </div>
    `;

    return this.notifyBothAdmins({
      type: 'new_customer',
      plainText: adminMessage,
      emailSubject: `New Customer Registered - ${user.name}`,
      emailHtml: emailHtml
    });
  }

  /**
   * 3 & 5. New Appointment (Admin Notification & Automatic Customer Reply)
   */
  public async sendAppointmentNotifications(apt: {
    id: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    service: string;
    appointmentDate: string;
    appointmentTime: string;
    customerMessage?: string;
  }) {
    // Admin Notification (Formatted for WhatsApp & SMS to both admins independently)
    const adminMessage = `🔔 NEW APPOINTMENT

👤 Customer: ${apt.customerName}
📱 Mobile: ${apt.customerPhone}
🛎 Service: ${apt.service}
📅 Date: ${apt.appointmentDate}
⏰ Time: ${apt.appointmentTime}
🆔 Appointment ID: ${apt.id}

⚡ New appointment received from website.`;

    const telegramMessage = `🔔 <b>NEW APPOINTMENT</b>

👤 ${apt.customerName}
📱 ${apt.customerPhone}
🛎 ${apt.service}
📅 ${apt.appointmentDate}
⏰ ${apt.appointmentTime}
🆔 ${apt.id}`;

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1a1a1a;">
        <div style="background: #1a1a1a; color: #fff; padding: 15px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">AMOL TILES, JATH</h2>
          <p style="margin: 4px 0 0; font-size: 12px; color: #f59e0b;">VIP Architectural Consultation Booking</p>
        </div>
        <div style="padding: 20px;">
          <h3 style="color: #1a1a1a; margin-top: 0;">New Appointment - ${apt.id}</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 35%;">Customer Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${apt.customerName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Mobile:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${apt.customerPhone}">${apt.customerPhone}</a></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${apt.customerEmail}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Service / Interest:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${apt.service}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Date:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${apt.appointmentDate}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Time Slot:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${apt.appointmentTime}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Message:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${apt.customerMessage || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Appointment ID:</td><td style="padding: 8px; color: #d97706; font-weight: bold;">${apt.id}</td></tr>
          </table>
        </div>
      </div>
    `;

    // Customer Auto-Reply
    const customerMessage = `Hello ${apt.customerName} 👋

Thank you for contacting us.

Your appointment request has been received.

Appointment ID: ${apt.id}
Date: ${apt.appointmentDate}
Time: ${apt.appointmentTime}

Our team will contact you shortly for confirmation.

Thank you!`;

    const customerSms = `Hello ${apt.customerName}, your appointment request ${apt.id} has been received. We will contact you shortly. - Amol Tiles`;

    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <div style="background: #1a1a1a; color: #ffffff; padding: 18px; text-align: center; border-radius: 6px 6px 0 0;">
          <h1 style="margin: 0; font-size: 22px; letter-spacing: 1px;">AMOL TILES, JATH</h1>
          <p style="margin: 5px 0 0; font-size: 12px; color: #d1d5db;">PREMIUM QUALITY PREMIUM SERVICE</p>
        </div>
        <div style="padding: 24px; background: #ffffff;">
          <p style="font-size: 16px; color: #111827;">Hello <strong>${apt.customerName}</strong> 👋</p>
          <p style="color: #4b5563; line-height: 1.6;">
            Thank you for booking an architectural consultation appointment with Amol Tiles, Jath. Your request has been received successfully.
          </p>
          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #6b7280;">APPOINTMENT CONFIRMATION DETAILS:</p>
            <p style="margin: 4px 0; font-size: 15px;"><strong>Appointment ID:</strong> <span style="color: #b45309; font-family: monospace; font-size: 16px;">${apt.id}</span></p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Service / Collection:</strong> ${apt.service}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Date:</strong> ${apt.appointmentDate}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Time Slot:</strong> ${apt.appointmentTime}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Showroom:</strong> Satara Road, Jath. Tq. Jath, Dist. Sangali - 416404</p>
          </div>
          <p style="color: #4b5563; font-size: 13px; line-height: 1.5;">
            Our specialists (Pro. Ajit Shinde & Pro. Niraj Shinde) will review your request and confirm your VIP slot.
          </p>
          <p style="color: #111827; margin-top: 25px; font-weight: bold;">
            Warm regards,<br>
            Amol Tiles Team, Jath<br>
            <span style="font-size: 12px; color: #6b7280;">Contact: +91 9822090345 / +91 9822309345</span>
          </p>
        </div>
      </div>
    `;

    // Dispatch in parallel to admins and customer
    const [adminDispatches, customerDispatches] = await Promise.all([
      this.notifyBothAdmins({
        type: 'new_appointment',
        plainText: adminMessage,
        telegramText: telegramMessage,
        emailSubject: `New Appointment - ${apt.id}`,
        emailHtml: adminEmailHtml,
        relatedId: apt.id
      }),
      this.notifyCustomer({
        type: 'new_appointment',
        phone: apt.customerPhone,
        email: apt.customerEmail,
        customerName: apt.customerName,
        message: customerMessage,
        smsMessage: customerSms,
        emailSubject: `Appointment Request Received - ${apt.id}`,
        emailHtml: customerEmailHtml,
        relatedId: apt.id
      })
    ]);

    return { adminDispatches, customerDispatches };
  }

  /**
   * 4 & 5. Contact / Enquiry Submission (Admin Notification & Auto Reply)
   */
  public async sendContactNotifications(enquiry: {
    id: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerMessage: string;
  }) {
    const adminMessage = `🔔 NEW ENQUIRY

👤 Customer: ${enquiry.customerName}
📱 Mobile: ${enquiry.customerPhone}
✉ Email: ${enquiry.customerEmail}
💬 Message: ${enquiry.customerMessage}
🆔 Request ID: ${enquiry.id}

⚡ New enquiry received from website.`;

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1a1a1a;">
        <h3 style="color: #1a1a1a; margin-top: 0; border-bottom: 2px solid #000; padding-bottom: 8px;">
          🔔 New Enquiry - ${enquiry.id}
        </h3>
        <p>A new customer inquiry has arrived on Amol Tiles:</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px; font-weight: bold; width: 30%;">Name:</td><td style="padding: 8px;">${enquiry.customerName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Mobile:</td><td style="padding: 8px;"><a href="tel:${enquiry.customerPhone}">${enquiry.customerPhone}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${enquiry.customerEmail}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${enquiry.customerMessage}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Request ID:</td><td style="padding: 8px; font-family: monospace; color: #d97706;">${enquiry.id}</td></tr>
        </table>
      </div>
    `;

    const customerReply = `Hello ${enquiry.customerName} 👋

Thank you for contacting us.

We have received your message successfully.

Request ID: ${enquiry.id}

Our team will contact you soon.

Thank you!
Amol Tiles, Jath`;

    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
        <div style="background: #1a1a1a; color: #fff; padding: 15px; text-align: center;">
          <h2 style="margin: 0;">AMOL TILES, JATH</h2>
        </div>
        <div style="padding: 20px;">
          <p>Hello <strong>${enquiry.customerName}</strong> 👋</p>
          <p>Thank you for contacting us. We have received your message regarding tiles, granite, marble, or sanitaryware requirements.</p>
          <p><strong>Request ID:</strong> <span style="font-family: monospace; font-weight: bold; color: #b45309;">${enquiry.id}</span></p>
          <p>Our team will contact you soon.</p>
          <p>Thank you!<br><strong>Amol Tiles, Jath</strong></p>
        </div>
      </div>
    `;

    const [adminDispatches, customerDispatches] = await Promise.all([
      this.notifyBothAdmins({
        type: 'new_enquiry',
        plainText: adminMessage,
        emailSubject: `New Customer Enquiry - ${enquiry.id}`,
        emailHtml: adminEmailHtml,
        relatedId: enquiry.id
      }),
      this.notifyCustomer({
        type: 'new_enquiry',
        phone: enquiry.customerPhone,
        email: enquiry.customerEmail,
        customerName: enquiry.customerName,
        message: customerReply,
        emailSubject: `We Received Your Enquiry - ${enquiry.id}`,
        emailHtml: customerEmailHtml,
        relatedId: enquiry.id
      })
    ]);

    return { adminDispatches, customerDispatches };
  }

  /**
   * 12. Appointment Status Automation (CONFIRM, CANCEL, RESCHEDULE)
   */
  public async sendAppointmentStatusUpdate(
    apt: {
      id: string;
      customerName: string;
      customerPhone: string;
      customerEmail: string;
      appointmentDate: string;
      appointmentTime: string;
      service: string;
    },
    action: 'CONFIRM' | 'CANCEL' | 'RESCHEDULE',
    options?: { newDate?: string; newTime?: string }
  ) {
    let customerMessage = '';
    let emailSubject = '';

    if (action === 'CONFIRM') {
      customerMessage = `Hello ${apt.customerName} 👋

Your appointment ${apt.id} has been CONFIRMED.

Date: ${apt.appointmentDate}
Time: ${apt.appointmentTime}

Thank you!
Amol Tiles, Jath`;
      emailSubject = `Appointment Confirmed - ${apt.id}`;
    } else if (action === 'CANCEL') {
      customerMessage = `Hello ${apt.customerName},

Your appointment ${apt.id} has been cancelled.

Please contact us if you would like to request another appointment.

Amol Tiles, Jath`;
      emailSubject = `Appointment Cancelled - ${apt.id}`;
    } else if (action === 'RESCHEDULE') {
      const date = options?.newDate || apt.appointmentDate;
      const time = options?.newTime || apt.appointmentTime;
      customerMessage = `Hello ${apt.customerName} 👋

Your appointment has been rescheduled.

New date: ${date}
New time: ${time}

Appointment ID: ${apt.id}

Amol Tiles, Jath`;
      emailSubject = `Appointment Rescheduled - ${apt.id}`;
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1a1a1a;">
        <h2 style="color: #1a1a1a; margin-top: 0;">${emailSubject}</h2>
        <div style="white-space: pre-wrap; line-height: 1.6; font-size: 14px;">${customerMessage}</div>
      </div>
    `;

    return this.notifyCustomer({
      type: 'appointment_status',
      phone: apt.customerPhone,
      email: apt.customerEmail,
      customerName: apt.customerName,
      message: customerMessage,
      emailSubject: emailSubject,
      emailHtml: emailHtml,
      relatedId: apt.id
    });
  }

  /**
   * 14. Human Handoff Notification when AI needs human assistance
   */
  public async sendHumanHandoffAlert(customer: {
    customerName: string;
    customerPhone: string;
    customerMessage: string;
  }) {
    const adminMessage = `🚨 HUMAN ASSISTANCE REQUIRED

Customer: ${customer.customerName}
Mobile: ${customer.customerPhone}
Message: ${customer.customerMessage}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #ef4444;">
        <h2 style="color: #ef4444; margin-top: 0;">🚨 Human Assistance Required</h2>
        <p>A customer requested human staff assistance or asked a question outside automated AI knowledge:</p>
        <p><strong>Customer:</strong> ${customer.customerName}</p>
        <p><strong>Mobile:</strong> <a href="tel:${customer.customerPhone}">${customer.customerPhone}</a></p>
        <p><strong>Message / Question:</strong></p>
        <blockquote style="background: #fef2f2; border-left: 4px solid #ef4444; margin: 10px 0; padding: 10px;">
          ${customer.customerMessage}
        </blockquote>
      </div>
    `;

    return this.notifyBothAdmins({
      type: 'human_assistance',
      plainText: adminMessage,
      emailSubject: `🚨 Urgent: Human Assistance Requested by ${customer.customerName}`,
      emailHtml: emailHtml
    });
  }

  /**
   * 15. Appointment 24-hour Reminder for Confirmed Appointments
   */
  public async sendAppointmentReminder(apt: {
    id: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    appointmentDate: string;
    appointmentTime: string;
  }) {
    const message = `🔔 Appointment Reminder

Hello ${apt.customerName} 👋

This is a reminder that you have an appointment tomorrow.

Date: ${apt.appointmentDate}
Time: ${apt.appointmentTime}
Appointment ID: ${apt.id}

Amol Tiles, Jath`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1a1a1a;">
        <h2 style="color: #1a1a1a;">🔔 Appointment Reminder</h2>
        <p>Hello <strong>${apt.customerName}</strong> 👋</p>
        <p>This is a friendly reminder that you have an architectural consultation appointment tomorrow with Amol Tiles, Jath.</p>
        <p><strong>Date:</strong> ${apt.appointmentDate}</p>
        <p><strong>Time Slot:</strong> ${apt.appointmentTime}</p>
        <p><strong>Appointment ID:</strong> ${apt.id}</p>
        <p>We look forward to meeting you at our Satara Road, Jath experience center.</p>
      </div>
    `;

    db.markReminderSent(apt.id);

    return this.notifyCustomer({
      type: 'appointment_reminder',
      phone: apt.customerPhone,
      email: apt.customerEmail,
      customerName: apt.customerName,
      message: message,
      emailSubject: `Appointment Reminder Tomorrow - ${apt.id}`,
      emailHtml: emailHtml,
      relatedId: apt.id
    });
  }

  /**
   * 16. Admin Custom Manual Reply
   */
  public async sendAdminManualMessage(options: {
    recipient: string;
    customerName?: string;
    channel: 'whatsapp' | 'sms' | 'telegram' | 'email';
    message: string;
    sentBy: string;
    relatedAppointmentId?: string;
  }) {
    let result: { success: boolean; simulated: boolean; error?: string };

    if (options.channel === 'whatsapp') {
      result = await this.sendWhatsApp(options.recipient, options.message, options.relatedAppointmentId);
    } else if (options.channel === 'sms') {
      result = await this.sendSMS(options.recipient, options.message, options.relatedAppointmentId);
    } else if (options.channel === 'telegram') {
      result = await this.sendTelegram(options.message, options.recipient, options.relatedAppointmentId);
    } else {
      result = await this.sendEmail(
        options.recipient,
        'Message from Amol Tiles, Jath',
        `<div style="font-family: Arial; padding: 15px;"><p>${options.message.replace(/\n/g, '<br>')}</p></div>`,
        options.message,
        options.relatedAppointmentId
      );
    }

    const log = db.logNotification({
      notificationType: 'admin_manual_reply',
      channel: options.channel,
      recipient: options.recipient,
      recipientRole: 'customer',
      status: result.simulated ? 'simulated' : result.success ? 'sent' : 'failed',
      messageBody: options.message,
      error: result.error,
      relatedId: options.relatedAppointmentId
    });

    db.logAdminMessage({
      recipient: options.recipient,
      customerName: options.customerName,
      channel: options.channel,
      message: options.message,
      sentBy: options.sentBy,
      status: log.status,
      relatedAppointmentId: options.relatedAppointmentId
    });

    return { log, result };
  }

  /**
   * 21. Retry Notification Channel
   */
  public async retryNotification(logId: string) {
    const logs = db.getNotificationLogs();
    const log = logs.find(l => l.id === logId);
    if (!log) throw new Error('Notification log not found');

    let res: { success: boolean; simulated: boolean; error?: string };

    if (log.channel === 'whatsapp') {
      const waRes = await this.sendWhatsApp(log.recipient, log.messageBody, log.relatedId);
      const newStatus = waRes.simulated ? 'simulated' : waRes.success ? 'sent' : 'failed';
      log.status = newStatus;
      if (waRes.messageId) log.whatsappMessageId = waRes.messageId;
      if (waRes.success) log.deliveryStatus = 'sent';
      if (waRes.error) log.error = waRes.error;
      db.updateLogRecord(log.id, {
        status: newStatus,
        whatsappMessageId: waRes.messageId,
        deliveryStatus: waRes.success ? 'sent' : undefined,
        error: waRes.error
      });

      if (log.relatedId && log.relatedId.startsWith('APT-')) {
        db.updateAppointmentWhatsAppStatus(
          log.relatedId,
          log.recipientRole,
          newStatus,
          waRes.messageId,
          waRes.error
        );
      }
      return { logId, status: newStatus, error: waRes.error, messageId: waRes.messageId };
    } else if (log.channel === 'sms') {
      res = await this.sendSMS(log.recipient, log.messageBody, log.relatedId);
    } else if (log.channel === 'telegram') {
      res = await this.sendTelegram(log.messageBody, undefined, log.relatedId);
    } else {
      res = await this.sendEmail(log.recipient, 'Notification from Amol Tiles', `<p>${log.messageBody}</p>`, log.messageBody, log.relatedId);
    }

    const newStatus = res.simulated ? 'simulated' : res.success ? 'sent' : 'failed';
    db.updateLogStatus(logId, newStatus, res.error);

    return { logId, status: newStatus, error: res.error };
  }
}

export const notificationService = new NotificationService();
