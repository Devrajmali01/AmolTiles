import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'architect' | 'dealer' | 'builder';
  passwordHash?: string;
  salt?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AppointmentRecord {
  id: string; // e.g. APT-842101
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  customerMessage?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'rescheduled' | 'completed';
  createdAt: string;
  updatedAt: string;
  rescheduledDate?: string;
  rescheduledTime?: string;
  reminderSent?: boolean;

  // Real-time WhatsApp Cloud API Delivery Tracking
  admin1WhatsAppStatus?: 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | 'simulated';
  admin1WhatsAppMessageId?: string;
  admin1WhatsAppError?: string;
  admin1WhatsAppTimestamp?: string;

  admin2WhatsAppStatus?: 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | 'simulated';
  admin2WhatsAppMessageId?: string;
  admin2WhatsAppError?: string;
  admin2WhatsAppTimestamp?: string;

  customerWhatsAppStatus?: 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | 'simulated';
  customerWhatsAppMessageId?: string;
  customerWhatsAppError?: string;
  customerWhatsAppTimestamp?: string;
}

export interface ContactRecord {
  id: string; // e.g. REQ-982201
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerMessage: string;
  category?: string;
  status: 'new' | 'replied' | 'in_progress' | 'closed';
  createdAt: string;
}

export interface NotificationLogRecord {
  id: string;
  notificationType: 'new_customer' | 'new_appointment' | 'appointment_status' | 'new_enquiry' | 'human_assistance' | 'appointment_reminder' | 'admin_manual_reply' | 'ai_auto_reply' | 'incoming_whatsapp';
  channel: 'whatsapp' | 'sms' | 'telegram' | 'email';
  recipient: string;
  recipientRole: 'admin_1' | 'admin_2' | 'customer';
  status: 'sent' | 'failed' | 'simulated';
  messageBody: string;
  sentAt: string;
  error?: string;
  responsePreview?: string;
  relatedId?: string; // appointment_id or request_id
  
  // Real-time WhatsApp Cloud API tracking
  whatsappMessageId?: string;
  deliveryStatus?: 'queued' | 'sent' | 'delivered' | 'read' | 'failed';
  deliveredAt?: string;
  readAt?: string;
  errorCode?: number;
}

export interface AdminMessageRecord {
  id: string;
  recipient: string;
  customerName?: string;
  channel: 'whatsapp' | 'sms' | 'telegram' | 'email';
  message: string;
  sentBy: string;
  status: 'sent' | 'failed' | 'simulated';
  sentAt: string;
  relatedAppointmentId?: string;
}

export interface AdminUserRecord {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  salt: string;
  role: 'admin' | 'superadmin';
  createdAt: string;
  lastLoginAt?: string;
}

export interface DatabaseSchema {
  users: UserRecord[];
  appointments: AppointmentRecord[];
  contacts: ContactRecord[];
  notification_logs: NotificationLogRecord[];
  messages: AdminMessageRecord[];
  admin_users: AdminUserRecord[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const finalSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, finalSalt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt: finalSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const calculated = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return calculated === hash;
}

class Database {
  private data: DatabaseSchema = {
    users: [],
    appointments: [],
    contacts: [],
    notification_logs: [],
    messages: [],
    admin_users: []
  };

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        
        // Ensure admin user 8421001308 exists and password amoltiles4545 is set
        const creds = hashPassword('amoltiles4545', 'amol_tiles_admin_salt');
        const hasOwner = this.data.admin_users?.some(a => a.username === '8421001308');
        if (!hasOwner) {
          if (!this.data.admin_users) this.data.admin_users = [];
          this.data.admin_users.push({
            id: 'adm-02',
            username: '8421001308',
            name: 'Admin Owner (8421001308)',
            passwordHash: creds.hash,
            salt: creds.salt,
            role: 'superadmin',
            createdAt: new Date().toISOString()
          });
        }
        // Update admin default hash to amoltiles4545 as well
        const adminUser = this.data.admin_users?.find(a => a.username === 'admin');
        if (adminUser) {
          adminUser.passwordHash = creds.hash;
          adminUser.salt = creds.salt;
        }
        this.save();
      } else {
        this.seedInitialData();
        this.save();
      }
    } catch (err) {
      console.error('Database initialization error:', err);
      this.seedInitialData();
    }
  }

  private seedInitialData() {
    const adminCreds = hashPassword('amoltiles4545', 'amol_tiles_admin_salt');
    
    this.data.admin_users = [
      {
        id: 'adm-01',
        username: 'admin',
        name: 'Pro. Ajit Shinde / Niraj Shinde',
        passwordHash: adminCreds.hash,
        salt: adminCreds.salt,
        role: 'superadmin',
        createdAt: new Date().toISOString()
      },
      {
        id: 'adm-02',
        username: '8421001308',
        name: 'Admin Owner (8421001308)',
        passwordHash: adminCreds.hash,
        salt: adminCreds.salt,
        role: 'superadmin',
        createdAt: new Date().toISOString()
      }
    ];

    this.data.users = [
      {
        id: 'usr-101',
        name: 'Rajesh Patil',
        email: 'rajesh.patil@example.com',
        phone: '9822114455',
        role: 'architect',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: 'usr-102',
        name: 'Vikram Deshmukh',
        email: 'vikram.deshmukh@example.com',
        phone: '9422003344',
        role: 'customer',
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
      }
    ];

    this.data.appointments = [
      {
        id: 'APT-842101',
        customerName: 'Architect Rajesh Patil',
        customerPhone: '9822114455',
        customerEmail: 'rajesh.patil@example.com',
        service: 'Grand GVT Slabs (800x1600mm & 1200x2400mm)',
        appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        appointmentTime: '11:00 AM - 01:00 PM',
        customerMessage: 'Looking for 3,500 sq.ft living area vitrified flooring and bookmatch marble walls for villa project.',
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        id: 'APT-842102',
        customerName: 'Vikram Deshmukh',
        customerPhone: '9422003344',
        customerEmail: 'vikram.deshmukh@example.com',
        service: 'Polished Vitrified Flooring (600x1200mm)',
        appointmentDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        appointmentTime: '03:00 PM - 05:00 PM',
        customerMessage: 'Require tiles and granite for newly constructed 2-story bungalow in Jath.',
        status: 'confirmed',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
      }
    ];

    this.data.contacts = [
      {
        id: 'REQ-982201',
        customerName: 'Sanjay Jadhav',
        customerPhone: '9822334455',
        customerEmail: 'sanjay.jadhav@example.com',
        customerMessage: 'Need quote for Black Galaxy Granite and Kadappa stone for 1200 sq.ft parking and steps.',
        category: 'Granite & Kadappa Inquiry',
        status: 'new',
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
      }
    ];

    this.data.notification_logs = [
      {
        id: 'log-01',
        notificationType: 'new_appointment',
        channel: 'whatsapp',
        recipient: '8421001308',
        recipientRole: 'admin_1',
        status: 'sent',
        messageBody: '📅 NEW APPOINTMENT\n\nAppointment ID: APT-842101\nCustomer: Architect Rajesh Patil\nMobile: 9822114455\nService: Grand GVT Slabs',
        sentAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        relatedId: 'APT-842101'
      },
      {
        id: 'log-02',
        notificationType: 'new_appointment',
        channel: 'sms',
        recipient: '9822309345',
        recipientRole: 'admin_2',
        status: 'sent',
        messageBody: '📅 NEW APPOINTMENT\n\nAppointment ID: APT-842101\nCustomer: Architect Rajesh Patil\nMobile: 9822114455',
        sentAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        relatedId: 'APT-842101'
      },
      {
        id: 'log-03',
        notificationType: 'new_appointment',
        channel: 'whatsapp',
        recipient: '9822114455',
        recipientRole: 'customer',
        status: 'sent',
        messageBody: 'Hello Architect Rajesh Patil 👋\n\nThank you for booking an appointment with us.\nAppointment ID: APT-842101',
        sentAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        relatedId: 'APT-842101'
      }
    ];
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save database file:', err);
    }
  }

  // --- Users ---
  public getUsers(): UserRecord[] {
    return this.data.users;
  }

  public getUserByEmailOrPhone(identifier: string): UserRecord | undefined {
    const clean = identifier.trim().toLowerCase();
    return this.data.users.find(u => 
      u.email.toLowerCase() === clean || 
      u.phone.replace(/\D/g, '') === clean.replace(/\D/g, '')
    );
  }

  public createUser(user: { name: string; email: string; phone: string; role?: UserRecord['role']; password?: string }): UserRecord {
    let passwordHash: string | undefined;
    let salt: string | undefined;

    if (user.password) {
      const res = hashPassword(user.password);
      passwordHash = res.hash;
      salt = res.salt;
    }

    const newRecord: UserRecord = {
      id: `usr-${Date.now().toString().slice(-6)}`,
      name: user.name.trim(),
      email: user.email.trim().toLowerCase(),
      phone: user.phone.trim(),
      role: user.role || 'customer',
      passwordHash,
      salt,
      createdAt: new Date().toISOString()
    };

    this.data.users.unshift(newRecord);
    this.save();
    return newRecord;
  }

  public updateUserLogin(userId: string) {
    const user = this.data.users.find(u => u.id === userId);
    if (user) {
      user.lastLoginAt = new Date().toISOString();
      this.save();
    }
  }

  // --- Appointments ---
  public getAppointments(): AppointmentRecord[] {
    return this.data.appointments;
  }

  public getAppointmentById(id: string): AppointmentRecord | undefined {
    return this.data.appointments.find(a => a.id.toUpperCase() === id.trim().toUpperCase());
  }

  public createAppointment(apt: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    service: string;
    appointmentDate: string;
    appointmentTime: string;
    customerMessage?: string;
  }): AppointmentRecord {
    // Generate unique ID in format APT-XXXXXX
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const appointmentId = `APT-${randomSuffix}`;

    const newRecord: AppointmentRecord = {
      id: appointmentId,
      customerName: apt.customerName.trim(),
      customerPhone: apt.customerPhone.trim(),
      customerEmail: apt.customerEmail.trim(),
      service: apt.service.trim(),
      appointmentDate: apt.appointmentDate.trim(),
      appointmentTime: apt.appointmentTime.trim(),
      customerMessage: apt.customerMessage?.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.data.appointments.unshift(newRecord);
    this.save();
    return newRecord;
  }

  public updateAppointmentStatus(
    id: string, 
    status: AppointmentRecord['status'], 
    options?: { newDate?: string; newTime?: string }
  ): AppointmentRecord | null {
    const apt = this.data.appointments.find(a => a.id === id);
    if (!apt) return null;

    apt.status = status;
    apt.updatedAt = new Date().toISOString();

    if (options?.newDate) {
      apt.rescheduledDate = options.newDate;
      apt.appointmentDate = options.newDate;
    }
    if (options?.newTime) {
      apt.rescheduledTime = options.newTime;
      apt.appointmentTime = options.newTime;
    }

    this.save();
    return apt;
  }

  public markReminderSent(id: string) {
    const apt = this.data.appointments.find(a => a.id === id);
    if (apt) {
      apt.reminderSent = true;
      this.save();
    }
  }

  // --- Contacts / Enquiries ---
  public getContacts(): ContactRecord[] {
    return this.data.contacts;
  }

  public createContact(contact: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerMessage: string;
    category?: string;
  }): ContactRecord {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const requestId = `REQ-${randomSuffix}`;

    const newRecord: ContactRecord = {
      id: requestId,
      customerName: contact.customerName.trim(),
      customerPhone: contact.customerPhone.trim(),
      customerEmail: contact.customerEmail.trim(),
      customerMessage: contact.customerMessage.trim(),
      category: contact.category || 'General Product Enquiry',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    this.data.contacts.unshift(newRecord);
    this.save();
    return newRecord;
  }

  public updateContactStatus(id: string, status: ContactRecord['status']) {
    const item = this.data.contacts.find(c => c.id === id);
    if (item) {
      item.status = status;
      this.save();
    }
  }

  // --- Notification Logs ---
  public getNotificationLogs(): NotificationLogRecord[] {
    return this.data.notification_logs;
  }

  public logNotification(log: Omit<NotificationLogRecord, 'id' | 'sentAt'>): NotificationLogRecord {
    const newLog: NotificationLogRecord = {
      id: `log-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 1000)}`,
      ...log,
      sentAt: new Date().toISOString()
    };

    this.data.notification_logs.unshift(newLog);
    // Keep max 500 logs
    if (this.data.notification_logs.length > 500) {
      this.data.notification_logs = this.data.notification_logs.slice(0, 500);
    }
    this.save();
    return newLog;
  }

  public updateLogStatus(logId: string, status: 'sent' | 'failed' | 'simulated', error?: string) {
    const log = this.data.notification_logs.find(l => l.id === logId);
    if (log) {
      log.status = status;
      if (error) log.error = error;
      this.save();
    }
  }

  public updateLogRecord(logId: string, updates: Partial<NotificationLogRecord>) {
    const log = this.data.notification_logs.find(l => l.id === logId);
    if (log) {
      Object.assign(log, updates);
      this.save();
    }
  }

  /**
   * Updates notification log and associated appointment status when Meta Webhook sends delivery status (sent, delivered, read, failed)
   */
  public updateNotificationWebhookStatus(
    whatsappMessageId: string,
    deliveryStatus: 'sent' | 'delivered' | 'read' | 'failed',
    timestamp?: string,
    error?: string,
    errorCode?: number
  ) {
    const timeIso = timestamp ? new Date(Number(timestamp) * 1000).toISOString() : new Date().toISOString();
    
    // Find matching notification log
    const log = this.data.notification_logs.find(
      l => l.whatsappMessageId === whatsappMessageId || (l.responsePreview && l.responsePreview.includes(whatsappMessageId))
    );

    if (log) {
      log.deliveryStatus = deliveryStatus;
      if (deliveryStatus === 'delivered') log.deliveredAt = timeIso;
      if (deliveryStatus === 'read') log.readAt = timeIso;
      if (deliveryStatus === 'failed') {
        log.status = 'failed';
        if (error) log.error = error;
        if (errorCode) log.errorCode = errorCode;
      } else if (deliveryStatus === 'delivered' || deliveryStatus === 'read') {
        log.status = 'sent';
      }

      // If associated with an appointment, update appointment status
      if (log.relatedId && log.relatedId.startsWith('APT-')) {
        const apt = this.data.appointments.find(a => a.id === log.relatedId);
        if (apt) {
          if (log.recipientRole === 'admin_1') {
            apt.admin1WhatsAppStatus = deliveryStatus;
            apt.admin1WhatsAppTimestamp = timeIso;
            if (error) apt.admin1WhatsAppError = error;
          } else if (log.recipientRole === 'admin_2') {
            apt.admin2WhatsAppStatus = deliveryStatus;
            apt.admin2WhatsAppTimestamp = timeIso;
            if (error) apt.admin2WhatsAppError = error;
          } else if (log.recipientRole === 'customer') {
            apt.customerWhatsAppStatus = deliveryStatus;
            apt.customerWhatsAppTimestamp = timeIso;
            if (error) apt.customerWhatsAppError = error;
          }
        }
      }
      this.save();
    }
  }

  /**
   * Update appointment specific WhatsApp status directly
   */
  public updateAppointmentWhatsAppStatus(
    appointmentId: string,
    role: 'admin_1' | 'admin_2' | 'customer',
    status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | 'simulated',
    messageId?: string,
    error?: string
  ) {
    const apt = this.data.appointments.find(a => a.id === appointmentId);
    if (!apt) return;

    const timeIso = new Date().toISOString();
    if (role === 'admin_1') {
      apt.admin1WhatsAppStatus = status;
      if (messageId) apt.admin1WhatsAppMessageId = messageId;
      if (error) apt.admin1WhatsAppError = error;
      apt.admin1WhatsAppTimestamp = timeIso;
    } else if (role === 'admin_2') {
      apt.admin2WhatsAppStatus = status;
      if (messageId) apt.admin2WhatsAppMessageId = messageId;
      if (error) apt.admin2WhatsAppError = error;
      apt.admin2WhatsAppTimestamp = timeIso;
    } else if (role === 'customer') {
      apt.customerWhatsAppStatus = status;
      if (messageId) apt.customerWhatsAppMessageId = messageId;
      if (error) apt.customerWhatsAppError = error;
      apt.customerWhatsAppTimestamp = timeIso;
    }
    this.save();
  }

  // --- Admin Messages ---
  public getMessages(): AdminMessageRecord[] {
    return this.data.messages;
  }

  public logAdminMessage(msg: Omit<AdminMessageRecord, 'id' | 'sentAt'>): AdminMessageRecord {
    const newRecord: AdminMessageRecord = {
      id: `msg-${Date.now().toString().slice(-8)}`,
      ...msg,
      sentAt: new Date().toISOString()
    };
    this.data.messages.unshift(newRecord);
    this.save();
    return newRecord;
  }

  // --- Admin Users ---
  public getAdminUsers(): AdminUserRecord[] {
    return this.data.admin_users;
  }

  public verifyAdminLogin(username: string, passwordOrPin: string): boolean {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (passwordOrPin || '').trim();

    // 1. Direct password match for amoltiles4545
    if (cleanPass === 'amoltiles4545' || cleanPass.toLowerCase() === 'amoltiles4545') {
      return true;
    }

    // 2. Direct match if admin enters 8421001308 or PIN 1308/9345
    if (cleanPass === '8421001308' || cleanPass === '1308' || cleanPass === '9345' || cleanPass === 'admin123') {
      return true;
    }

    // 3. Check username is 8421001308 or admin with valid password
    if (cleanUser === '8421001308' || cleanUser === 'admin') {
      if (cleanPass === 'amoltiles4545' || cleanPass.toLowerCase() === 'amoltiles4545' || cleanPass === '1308' || cleanPass === 'admin123') {
        return true;
      }
    }

    const admin = this.data.admin_users?.find(a => a.username.toLowerCase() === cleanUser || a.id === cleanUser);
    if (!admin) {
      // If user left username blank or standard, and supplied amoltiles4545
      return cleanPass.toLowerCase() === 'amoltiles4545';
    }
    return verifyPassword(cleanPass, admin.passwordHash, admin.salt) || cleanPass.toLowerCase() === 'amoltiles4545';
  }

  // --- Aggregated Stats ---
  public getStats() {
    const totalAppointments = this.data.appointments.length;
    const pendingAppointments = this.data.appointments.filter(a => a.status === 'pending').length;
    const confirmedAppointments = this.data.appointments.filter(a => a.status === 'confirmed').length;
    const cancelledAppointments = this.data.appointments.filter(a => a.status === 'cancelled').length;
    const completedAppointments = this.data.appointments.filter(a => a.status === 'completed').length;
    const rescheduledAppointments = this.data.appointments.filter(a => a.status === 'rescheduled').length;

    const totalCustomers = this.data.users.length;
    const totalEnquiries = this.data.contacts.length;
    const newEnquiries = this.data.contacts.filter(c => c.status === 'new').length;

    const totalNotifications = this.data.notification_logs.length;
    const successfulNotifications = this.data.notification_logs.filter(n => n.status === 'sent' || n.status === 'simulated').length;
    const failedNotifications = this.data.notification_logs.filter(n => n.status === 'failed').length;

    return {
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      cancelledAppointments,
      completedAppointments,
      rescheduledAppointments,
      totalCustomers,
      totalEnquiries,
      newEnquiries,
      totalNotifications,
      successfulNotifications,
      failedNotifications,
      adminPhone1: process.env.ADMIN_PHONE_1 || '8421001308',
      adminPhone2: process.env.ADMIN_PHONE_2 || '9822309345'
    };
  }
}

export const db = new Database();
