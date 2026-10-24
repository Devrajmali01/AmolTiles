import { Router, Request, Response } from 'express';
import { db, verifyPassword } from './db';
import { notificationService } from './notificationService';
import { aiSupportService } from './aiSupportService';
import { whatsappService } from './whatsappService';

export const apiRouter = Router();

// In-memory rate limiting / duplicate submission prevention map
const submissionCache = new Map<string, number>();

function isDuplicateSubmission(key: string, windowMs = 15000): boolean {
  const now = Date.now();
  const last = submissionCache.get(key);
  if (last && now - last < windowMs) {
    return true;
  }
  submissionCache.set(key, now);
  return false;
}

// Clean old keys every 10 minutes
setInterval(() => {
  const cutoff = Date.now() - 60000;
  for (const [key, ts] of submissionCache.entries()) {
    if (ts < cutoff) submissionCache.delete(key);
  }
}, 600000);

// --- 1. Customer Registration ---
apiRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, role, password } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and mobile number are required.', code: 'NAME_REQUIRED' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).replace(/\D/g, '');

    if (cleanPhone.length < 10) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.', code: 'INVALID_PHONE' });
    }

    // Check existing
    const existing = db.getUserByEmailOrPhone(cleanEmail) || db.getUserByEmailOrPhone(cleanPhone);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email or mobile already exists.', code: 'ACCOUNT_EXISTS' });
    }

    const user = db.createUser({
      name: String(name).trim(),
      email: cleanEmail,
      phone: cleanPhone,
      role: role || 'customer',
      password: password ? String(password) : undefined
    });

    // Notify BOTH administrators independently (NEVER send customer password)
    notificationService.sendNewCustomerRegistration({
      name: user.name,
      phone: user.phone,
      email: user.email
    }).catch(err => console.error('Registration notification error:', err));

    return res.status(201).json({
      success: true,
      code: 'RECORD_SAVED',
      message: 'Account registered successfully.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Registration failed. Please try again.', code: 'SERVER_ERROR' });
  }
});

// --- 2. Customer Login ---
apiRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier) {
      return res.status(400).json({ error: 'Mobile or email is required.', code: 'NAME_REQUIRED' });
    }

    const user = db.getUserByEmailOrPhone(String(identifier));
    if (!user) {
      return res.status(401).json({ error: 'User not found. Please register an account first.', code: 'USER_NOT_FOUND' });
    }

    if (user.passwordHash && user.salt && password) {
      const valid = verifyPassword(String(password), user.passwordHash, user.salt);
      if (!valid) {
        return res.status(401).json({ error: 'Incorrect password.', code: 'INCORRECT_PASSWORD' });
      }
    }

    db.updateUserLogin(user.id);

    return res.json({
      success: true,
      code: 'LOGIN_SUCCESS',
      message: 'Logged in successfully.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Login failed.', code: 'SERVER_ERROR' });
  }
});

// --- 3. Appointment Booking ---
apiRouter.post('/appointments', async (req: Request, res: Response) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      service,
      appointmentDate,
      appointmentTime,
      customerMessage
    } = req.body;

    // Server-side validation
    if (!customerName || !customerPhone || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        error: 'Full name, mobile number, date, and time slot are required.',
        code: 'NAME_REQUIRED'
      });
    }

    const cleanPhone = String(customerPhone).replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.', code: 'INVALID_PHONE' });
    }

    // Duplicate submission prevention
    const dedupeKey = `apt:${cleanPhone}:${appointmentDate}:${appointmentTime}`;
    if (isDuplicateSubmission(dedupeKey, 10000)) {
      return res.status(429).json({
        error: 'Duplicate submission detected. Please wait a moment.',
        code: 'DUPLICATE_SUBMISSION'
      });
    }

    // Save appointment in DB with generated ID: APT-XXXXXX
    const appointment = db.createAppointment({
      customerName: String(customerName).trim(),
      customerPhone: cleanPhone,
      customerEmail: customerEmail ? String(customerEmail).trim() : 'info@amoltiles.com',
      service: service ? String(service).trim() : 'VIP Architectural Consultation',
      appointmentDate: String(appointmentDate).trim(),
      appointmentTime: String(appointmentTime).trim(),
      customerMessage: customerMessage ? String(customerMessage).trim() : undefined
    });

    // Also auto-register or link user record if not present
    if (!db.getUserByEmailOrPhone(cleanPhone)) {
      db.createUser({
        name: appointment.customerName,
        email: appointment.customerEmail,
        phone: appointment.customerPhone,
        role: 'customer'
      });
    }

    // Central notification service: Notify BOTH admins independently + customer automatic reply
    const dispatches = await notificationService.sendAppointmentNotifications({
      id: appointment.id,
      customerName: appointment.customerName,
      customerPhone: appointment.customerPhone,
      customerEmail: appointment.customerEmail,
      service: appointment.service,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      customerMessage: appointment.customerMessage
    });

    const refreshedAppointment = db.getAppointmentById(appointment.id) || appointment;

    return res.status(201).json({
      success: true,
      code: 'BOOKING_SUCCESS',
      message: 'Appointment booked successfully!',
      appointment: refreshedAppointment,
      dispatches
    });
  } catch (err: any) {
    console.error('Appointment booking error:', err);
    return res.status(500).json({ error: 'Failed to schedule appointment. Please try again.', code: 'SERVER_ERROR' });
  }
});

// --- 4. Public Appointment Status Lookup ---
apiRouter.get('/appointments/status/:id', (req: Request, res: Response) => {
  const apt = db.getAppointmentById(req.params.id);
  if (!apt) {
    return res.status(404).json({ error: 'Appointment not found.', code: 'USER_NOT_FOUND' });
  }
  return res.json({
    id: apt.id,
    customerName: apt.customerName,
    service: apt.service,
    appointmentDate: apt.appointmentDate,
    appointmentTime: apt.appointmentTime,
    status: apt.status,
    createdAt: apt.createdAt
  });
});

// --- 5. Contact / Enquiry Submission ---
apiRouter.post('/contact', async (req: Request, res: Response) => {
  try {
    const { customerName, customerPhone, customerEmail, customerMessage, category } = req.body;

    if (!customerName || !customerPhone || !customerMessage) {
      return res.status(400).json({ error: 'Name, phone, and message are required.', code: 'NAME_REQUIRED' });
    }

    const cleanPhone = String(customerPhone).replace(/\D/g, '');
    const dedupeKey = `contact:${cleanPhone}:${String(customerMessage).slice(0, 20)}`;

    if (isDuplicateSubmission(dedupeKey, 10000)) {
      return res.status(429).json({ error: 'Duplicate message detected. Please wait a moment.', code: 'DUPLICATE_SUBMISSION' });
    }

    const contact = db.createContact({
      customerName: String(customerName).trim(),
      customerPhone: cleanPhone,
      customerEmail: customerEmail ? String(customerEmail).trim() : 'info@amoltiles.com',
      customerMessage: String(customerMessage).trim(),
      category: category ? String(category).trim() : undefined
    });

    // Send notifications to both admins & customer
    await notificationService.sendContactNotifications({
      id: contact.id,
      customerName: contact.customerName,
      customerPhone: contact.customerPhone,
      customerEmail: contact.customerEmail,
      customerMessage: contact.customerMessage
    });

    return res.status(201).json({
      success: true,
      code: 'ENQUIRY_SUCCESS',
      message: 'Enquiry received successfully.',
      contact
    });
  } catch (err: any) {
    console.error('Contact enquiry error:', err);
    return res.status(500).json({ error: 'Failed to submit enquiry.', code: 'SERVER_ERROR' });
  }
});

// --- 6. AI Customer Support & Chat ---
apiRouter.post('/ai-support/chat', async (req: Request, res: Response) => {
  try {
    const { message, customerName, customerPhone, conversationHistory } = req.body;

    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    const result = await aiSupportService.handleCustomerChat({
      message: String(message),
      customerName: customerName ? String(customerName) : undefined,
      customerPhone: customerPhone ? String(customerPhone) : undefined,
      conversationHistory
    });

    return res.json({
      success: true,
      reply: result.reply,
      needsHandoff: result.needsHandoff,
      appointmentFound: result.appointmentFound
    });
  } catch (err: any) {
    console.error('AI Support error:', err);
    return res.json({
      success: false,
      reply: "I'm not sure about that. I'll forward your question to our team.",
      needsHandoff: true
    });
  }
});

// Manual Human Handoff trigger
apiRouter.post('/ai-support/handoff', async (req: Request, res: Response) => {
  try {
    const { customerName, customerPhone, customerMessage } = req.body;

    if (!customerPhone || !customerMessage) {
      return res.status(400).json({ error: 'Mobile number and message are required.' });
    }

    await notificationService.sendHumanHandoffAlert({
      customerName: customerName ? String(customerName) : 'Website Customer',
      customerPhone: String(customerPhone),
      customerMessage: String(customerMessage)
    });

    return res.json({
      success: true,
      message: "Thanks! I've forwarded your message to our team. Someone will get back to you shortly."
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to request human assistance.' });
  }
});

// --- 7. Admin Authentication & Verification ---
apiRouter.post('/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const ok = db.verifyAdminLogin(username || '8421001308', password || '');

  if (!ok) {
    return res.status(401).json({ error: 'Invalid administrator password or authorized phone number.', code: 'UNAUTHORIZED' });
  }

  return res.json({
    success: true,
    code: 'LOGIN_SUCCESS',
    token: 'amol-admin-session-token',
    admin: {
      username: username || '8421001308',
      name: 'Amol Tiles Management',
      phone: '8421001308'
    }
  });
});

// Admin Security Guard Middleware for all protected /admin routes
apiRouter.use('/admin', (req: Request, res: Response, next) => {
  if (req.path === '/login') return next();

  const authHeader = req.headers.authorization;
  const token = req.headers['x-admin-token'] || (authHeader ? authHeader.replace(/^Bearer\s+/i, '') : req.query.token);

  if (!token || (token !== 'amol-admin-session-token' && token !== 'amoltiles4545')) {
    return res.status(401).json({
      error: 'Unauthorized. Administrator credentials or session token required.',
      code: 'UNAUTHORIZED'
    });
  }
  next();
});

// --- 8. Admin Dashboard Data & Operations ---

// Stats
apiRouter.get('/admin/stats', (req: Request, res: Response) => {
  const stats = db.getStats();
  return res.json(stats);
});

// Appointments List
apiRouter.get('/admin/appointments', (req: Request, res: Response) => {
  return res.json(db.getAppointments());
});

// Status Update (CONFIRM, CANCEL, COMPLETE)
apiRouter.patch('/admin/appointments/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notifyCustomer } = req.body;

    if (!['pending', 'confirmed', 'cancelled', 'rescheduled', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const apt = db.updateAppointmentStatus(id, status);
    if (!apt) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // If confirmed or cancelled and notify requested, trigger automated customer message
    if (notifyCustomer !== false && (status === 'confirmed' || status === 'cancelled')) {
      const action = status === 'confirmed' ? 'CONFIRM' : 'CANCEL';
      await notificationService.sendAppointmentStatusUpdate(
        {
          id: apt.id,
          customerName: apt.customerName,
          customerPhone: apt.customerPhone,
          customerEmail: apt.customerEmail,
          appointmentDate: apt.appointmentDate,
          appointmentTime: apt.appointmentTime,
          service: apt.service
        },
        action
      );
    }

    return res.json({ success: true, appointment: apt });
  } catch (err: any) {
    console.error('Update status error:', err);
    return res.status(500).json({ error: 'Failed to update status.' });
  }
});

// Reschedule Appointment
apiRouter.post('/admin/appointments/:id/reschedule', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newDate, newTime, notifyCustomer } = req.body;

    if (!newDate || !newTime) {
      return res.status(400).json({ error: 'New date and time are required' });
    }

    const apt = db.updateAppointmentStatus(id, 'rescheduled', { newDate, newTime });
    if (!apt) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (notifyCustomer !== false) {
      await notificationService.sendAppointmentStatusUpdate(
        {
          id: apt.id,
          customerName: apt.customerName,
          customerPhone: apt.customerPhone,
          customerEmail: apt.customerEmail,
          appointmentDate: apt.appointmentDate,
          appointmentTime: apt.appointmentTime,
          service: apt.service
        },
        'RESCHEDULE',
        { newDate, newTime }
      );
    }

    return res.json({ success: true, appointment: apt });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to reschedule appointment.' });
  }
});

// Send 24h Reminder
apiRouter.post('/admin/appointments/:id/remind', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const apt = db.getAppointmentById(id);

    if (!apt) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await notificationService.sendAppointmentReminder({
      id: apt.id,
      customerName: apt.customerName,
      customerPhone: apt.customerPhone,
      customerEmail: apt.customerEmail,
      appointmentDate: apt.appointmentDate,
      appointmentTime: apt.appointmentTime
    });

    return res.json({ success: true, message: 'Reminder sent to customer.' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to send reminder.' });
  }
});

// Enquiries List
apiRouter.get('/admin/contacts', (req: Request, res: Response) => {
  return res.json(db.getContacts());
});

// Customers List
apiRouter.get('/admin/users', (req: Request, res: Response) => {
  const users = db.getUsers().map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    role: u.role,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt
  }));
  return res.json(users);
});

// Notification Logs
apiRouter.get('/admin/notifications', (req: Request, res: Response) => {
  return res.json(db.getNotificationLogs());
});

// Retry Notification
apiRouter.post('/admin/notifications/:id/retry', async (req: Request, res: Response) => {
  try {
    const result = await notificationService.retryNotification(req.params.id);
    return res.json({ success: true, result });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Retry failed' });
  }
});

// Admin Manual Reply System
apiRouter.post('/admin/messages', async (req: Request, res: Response) => {
  try {
    const { recipient, customerName, channel, message, sentBy, relatedAppointmentId } = req.body;

    if (!recipient || !channel || !message) {
      return res.status(400).json({ error: 'Recipient, channel, and message are required.' });
    }

    const { log, result } = await notificationService.sendAdminManualMessage({
      recipient: String(recipient).trim(),
      customerName: customerName ? String(customerName) : undefined,
      channel: channel as any,
      message: String(message).trim(),
      sentBy: sentBy || 'Pro. Ajit Shinde',
      relatedAppointmentId
    });

    return res.status(201).json({
      success: true,
      message: 'Message dispatched successfully.',
      log,
      result
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to send message.' });
  }
});

// --- 8. WhatsApp Cloud API Management & Diagnostic Endpoints ---
apiRouter.get('/admin/whatsapp/config', (req: Request, res: Response) => {
  return res.json({
    isConfigured: whatsappService.isConfigured,
    hasToken: !!(process.env.WHATSAPP_TOKEN || process.env.WHATSAPP_API_KEY),
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || null,
    businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || null,
    adminPhone1: process.env.ADMIN_PHONE_1 || '8421001308',
    adminPhone2: process.env.ADMIN_PHONE_2 || '9822309345',
    admin1Formatted: whatsappService.formatPhoneNumber(process.env.ADMIN_PHONE_1 || '8421001308'),
    admin2Formatted: whatsappService.formatPhoneNumber(process.env.ADMIN_PHONE_2 || '9822309345'),
    webhookVerifyToken: whatsappService.webhookVerifyToken,
    webhookEndpoint: '/api/webhooks/whatsapp',
    apiVersion: 'v20.0'
  });
});

// Live WhatsApp Real-Time Test to BOTH Admin Numbers independently
apiRouter.post('/admin/whatsapp/test', async (req: Request, res: Response) => {
  try {
    const admin1 = process.env.ADMIN_PHONE_1 || '8421001308';
    const admin2 = process.env.ADMIN_PHONE_2 || '9822309345';
    const nowStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const testMessage = `🔔 REAL-TIME NOTIFICATION TEST

👤 System: Official WhatsApp Cloud API
📱 Admin 1: ${admin1}
📱 Admin 2: ${admin2}
⏰ Time: ${nowStr}

⚡ Live notification test from Amol Tiles Admin Portal. Both administrator lines verified for near real-time delivery.`;

    console.log(`[Admin Test] Dispatching WhatsApp test to ${admin1} and ${admin2}...`);

    // Dispatch to Admin 1 and Admin 2 independently
    const [result1, result2] = await Promise.allSettled([
      whatsappService.sendMessage(admin1, testMessage),
      whatsappService.sendMessage(admin2, testMessage)
    ]);

    const admin1Data = result1.status === 'fulfilled'
      ? result1.value
      : { success: false, simulated: false, status: 'failed' as const, messageId: undefined, error: result1.reason?.message || 'Dispatch error' };
    const admin2Data = result2.status === 'fulfilled'
      ? result2.value
      : { success: false, simulated: false, status: 'failed' as const, messageId: undefined, error: result2.reason?.message || 'Dispatch error' };

    // Log in database
    const log1 = db.logNotification({
      notificationType: 'admin_manual_reply',
      channel: 'whatsapp',
      recipient: admin1,
      recipientRole: 'admin_1',
      status: admin1Data.status || (admin1Data.success ? 'sent' : 'failed'),
      deliveryStatus: admin1Data.success ? 'sent' : 'failed',
      whatsappMessageId: admin1Data.messageId,
      messageBody: testMessage,
      error: admin1Data.error
    });

    const log2 = db.logNotification({
      notificationType: 'admin_manual_reply',
      channel: 'whatsapp',
      recipient: admin2,
      recipientRole: 'admin_2',
      status: admin2Data.status || (admin2Data.success ? 'sent' : 'failed'),
      deliveryStatus: admin2Data.success ? 'sent' : 'failed',
      whatsappMessageId: admin2Data.messageId,
      messageBody: testMessage,
      error: admin2Data.error
    });

    return res.json({
      success: admin1Data.success || admin2Data.success,
      admin1: {
        phone: admin1,
        ...admin1Data,
        logId: log1.id
      },
      admin2: {
        phone: admin2,
        ...admin2Data,
        logId: log2.id
      }
    });
  } catch (err: any) {
    console.error('WhatsApp test error:', err);
    return res.status(500).json({ error: err.message || 'Failed to dispatch test WhatsApp notifications.' });
  }
});

// Resend appointment notification specifically to Admin 1, Admin 2, or Customer
apiRouter.post('/admin/appointments/:id/resend-whatsapp', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { targetRole } = req.body; // 'admin_1' | 'admin_2' | 'customer' | 'all'

    const apt = db.getAppointmentById(id);
    if (!apt) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    const admin1 = process.env.ADMIN_PHONE_1 || '8421001308';
    const admin2 = process.env.ADMIN_PHONE_2 || '9822309345';

    const adminMessage = `🔔 NEW APPOINTMENT

👤 Customer: ${apt.customerName}
📱 Mobile: ${apt.customerPhone}
🛎 Service: ${apt.service}
📅 Date: ${apt.appointmentDate}
⏰ Time: ${apt.appointmentTime}
🆔 Appointment ID: ${apt.id}

⚡ (Re-dispatched from Admin Portal)`;

    const customerMessage = `Hello ${apt.customerName} 👋

Thank you for contacting us.

Your appointment request has been received.

Appointment ID: ${apt.id}
Date: ${apt.appointmentDate}
Time: ${apt.appointmentTime}

Our team will contact you shortly for confirmation.

Thank you!`;

    const dispatches: any[] = [];

    if (targetRole === 'admin_1' || targetRole === 'all') {
      const res1 = await whatsappService.sendMessage(admin1, adminMessage);
      const st = res1.simulated ? 'simulated' : res1.success ? 'sent' : 'failed';
      db.updateAppointmentWhatsAppStatus(apt.id, 'admin_1', st, res1.messageId, res1.error);
      const l1 = db.logNotification({
        notificationType: 'new_appointment',
        channel: 'whatsapp',
        recipient: admin1,
        recipientRole: 'admin_1',
        status: st,
        deliveryStatus: res1.success ? 'sent' : 'failed',
        whatsappMessageId: res1.messageId,
        messageBody: adminMessage,
        error: res1.error,
        relatedId: apt.id
      });
      dispatches.push({ role: 'admin_1', recipient: admin1, ...res1, logId: l1.id });
    }

    if (targetRole === 'admin_2' || targetRole === 'all') {
      const res2 = await whatsappService.sendMessage(admin2, adminMessage);
      const st = res2.simulated ? 'simulated' : res2.success ? 'sent' : 'failed';
      db.updateAppointmentWhatsAppStatus(apt.id, 'admin_2', st, res2.messageId, res2.error);
      const l2 = db.logNotification({
        notificationType: 'new_appointment',
        channel: 'whatsapp',
        recipient: admin2,
        recipientRole: 'admin_2',
        status: st,
        deliveryStatus: res2.success ? 'sent' : 'failed',
        whatsappMessageId: res2.messageId,
        messageBody: adminMessage,
        error: res2.error,
        relatedId: apt.id
      });
      dispatches.push({ role: 'admin_2', recipient: admin2, ...res2, logId: l2.id });
    }

    if (targetRole === 'customer' || targetRole === 'all') {
      const resc = await whatsappService.sendMessage(apt.customerPhone, customerMessage);
      const st = resc.simulated ? 'simulated' : resc.success ? 'sent' : 'failed';
      db.updateAppointmentWhatsAppStatus(apt.id, 'customer', st, resc.messageId, resc.error);
      const lc = db.logNotification({
        notificationType: 'new_appointment',
        channel: 'whatsapp',
        recipient: apt.customerPhone,
        recipientRole: 'customer',
        status: st,
        deliveryStatus: resc.success ? 'sent' : 'failed',
        whatsappMessageId: resc.messageId,
        messageBody: customerMessage,
        error: resc.error,
        relatedId: apt.id
      });
      dispatches.push({ role: 'customer', recipient: apt.customerPhone, ...resc, logId: lc.id });
    }

    const updatedApt = db.getAppointmentById(apt.id);
    return res.json({ success: true, appointment: updatedApt, dispatches });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to re-dispatch WhatsApp.' });
  }
});

// --- 9. Webhooks for Official APIs ---

// Meta WhatsApp Cloud API Verification Handshake (GET)
apiRouter.get('/webhooks/whatsapp', (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const expectedToken = whatsappService.webhookVerifyToken;

  if (mode === 'subscribe' && token === expectedToken) {
    console.log('[Meta Webhook] Verification challenge successful.');
    return res.status(200).send(challenge);
  }

  console.warn(`[Meta Webhook] Handshake failed. Expected token "${expectedToken}", received "${token}"`);
  return res.status(403).json({ error: 'Verification token mismatch' });
});

// Meta WhatsApp Cloud API Delivery & Message Status Updates (POST)
apiRouter.post('/webhooks/whatsapp', (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log('[Meta Webhook Received]', JSON.stringify(body).slice(0, 200));

    if (body.object === 'whatsapp_business_account' && Array.isArray(body.entry)) {
      for (const entry of body.entry) {
        for (const change of entry.changes || []) {
          if (change.field === 'messages' && change.value) {
            const statuses = change.value.statuses || [];
            for (const statusObj of statuses) {
              const messageId = statusObj.id; // e.g., wamid.HBg...
              const status = statusObj.status; // 'sent' | 'delivered' | 'read' | 'failed'
              const timestamp = statusObj.timestamp;
              const error = statusObj.errors?.[0]?.message || statusObj.errors?.[0]?.title;
              const errorCode = statusObj.errors?.[0]?.code;

              console.log(`[Meta WhatsApp Webhook] Status update: ID ${messageId} -> ${status}`);
              db.updateNotificationWebhookStatus(messageId, status, timestamp, error, errorCode);
            }
          }
        }
      }
    }

    // Always respond with 200 OK to Meta to acknowledge receipt
    return res.status(200).json({ status: 'EVENT_RECEIVED' });
  } catch (err: any) {
    console.error('Meta webhook processing error:', err);
    return res.status(200).json({ status: 'ERROR_LOGGED' });
  }
});

apiRouter.post('/webhooks/telegram', (req: Request, res: Response) => {
  console.log('Received Telegram webhook event:', JSON.stringify(req.body).slice(0, 150));
  return res.status(200).json({ status: 'ok' });
});

apiRouter.post('/webhooks/sms', (req: Request, res: Response) => {
  console.log('Received SMS delivery report webhook:', JSON.stringify(req.body).slice(0, 150));
  return res.status(200).json({ status: 'DELIVERY_REPORT_ACKNOWLEDGED' });
});
