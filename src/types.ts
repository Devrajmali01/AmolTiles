export interface CollectionItem {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  categoryLabel: string;
  heroImage: string;
  cardImage: string;
  accentColor: string;
  tags: string[];
  features: string[];
  idealFor: string[];
  tileIds: string[];
  ctaLabel?: string;
}

export interface CatalogueItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'GVT Slabs' | 'Polished Vitrified' | 'Ceramic Wall' | 'Outdoor Paver' | 'Kitchen Concepts' | 'Sanitaryware';
  year: string;
  pages: number;
  fileSize: string;
  coverImage: string;
  pdfUrl: string;
  description: string;
  featured?: boolean;
  isNew?: boolean;
  dimensions: string[];
  tileCount: number;
  tags: string[];
  minPricePerSqFt?: number;
  maxPricePerSqFt?: number;
  priceRangeLabel?: string;
  pagesData: CataloguePage[];
}

export interface CataloguePage {
  pageNumber: number;
  title: string;
  imageUrl: string;
  category: string;
  hotspots?: {
    x: number; // percentage
    y: number; // percentage
    tileId: string;
    tileName: string;
  }[];
}

export interface TileProduct {
  id: string;
  code: string;
  name: string;
  category: string;
  size: string;
  finish: string;
  application: string[];
  look: string;
  textureUrl: string;
  roomPreviewUrl: string;
  thickness: string;
  coveragePerBoxSqFt: number;
  pcsPerBox: number;
  waterAbsorption: string;
  randomFacesCount: number;
  grade: string;
  catalogId: string;
  catalogName: string;
  catalogPage: number;
  description: string;
}

export interface RoomScene {
  id: string;
  name: string;
  roomType: string;
  defaultFloorTileId: string;
  defaultWallTileId: string;
  defaultFeatureWallTileId?: string;
  baseRoomImage: string;
}

export interface FilterState {
  category: string;
  search: string;
  size: string;
  finish: string;
  application: string;
  look: string;
  sortBy: 'featured' | 'newest' | 'name' | 'size';
}

export interface SampleRequest {
  tileIds: string[];
  customerName: string;
  email: string;
  phone: string;
  companyName?: string;
  userType: 'Architect' | 'Interior Designer' | 'Builder / Developer' | 'Homeowner' | 'Dealer / Distributor';
  address: string;
  city: string;
  state: string;
  pincode: string;
  projectAreaSqFt?: number;
  notes?: string;
}

export interface DealerInfo {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  type: 'Exclusive Amol World Showroom' | 'Authorized Dealer' | 'Experience Center';
}

export interface AppointmentRecord {
  id: string;
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

  // Real-time WhatsApp Delivery Tracking
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
  relatedId?: string;

  // Real-time Meta Cloud API tracking
  whatsappMessageId?: string;
  deliveryStatus?: 'queued' | 'sent' | 'delivered' | 'read' | 'failed';
  deliveredAt?: string;
  readAt?: string;
  errorCode?: number;
}
