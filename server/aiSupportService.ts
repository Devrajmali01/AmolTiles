import { GoogleGenAI } from '@google/genai';
import { db } from './db';
import { notificationService } from './notificationService';

const BUSINESS_KNOWLEDGE = `
BUSINESS IDENTITY & PROFILE:
- Business Name: Amol Tiles, Jath (अमोल टाईल्स, जत)
- Motto: "PREMIUM QUALITY PREMIUM SERVICE"
- Address: Satara Road, Jath. Taluka Jath, District Sangli - 416404, Maharashtra, India.
- Proprietors:
  • Pro. Ajit Shinde: +91 9822090345
  • Pro. Niraj Shinde: +91 9822309345
- Working Hours: Monday to Sunday: 8:30 AM – 8:30 PM (Open 7 days a week)

MATERIALS & SERVICES OFFERED:
1. Floor & Wall Tiles:
   - Grand GVT / PGVT Slabs: 800x1600mm, 1200x2400mm, 1200x1800mm (Marble look, Bookmatch, Carving, Satin Matt, High Gloss)
   - Polished Vitrified Tiles (PVT): 600x1200mm, 600x600mm (Double Charge, Nano polished)
   - Ceramic Wall Concepts: 300x600mm, 300x450mm with matching highlighters and anti-skid floor tiles
   - Heavy Duty Outdoor Pavers: 16mm thick, punching anti-skid tiles for parking, garden walkways, terrace, ramps
2. Natural Stone:
   - Kadappa Stone: Ideal for window sills, door frames, kitchen sink platforms, terrace coping
   - Granite Slabs: Black Galaxy, Rajasthan Black, Tan Brown, Jet Black for kitchen counter tops, staircase steps, door jambs
   - Italian Marble & Indian Marble Slabs
3. Sanitaryware & Bath Fittings:
   - Water closets (Wall hung, One-piece commodes), Table top designer wash basins, Pedestal sinks
4. Plumbing:
   - Finolex PVC/CPVC pipes and fittings, drainage lines, precision valves

SERVICES:
- Experience Center Visit & Free Consultation: In-store mockups and physical slab displays.
- 3D Room Simulator / Visualizer: Preview tiles in living rooms, bathrooms, kitchens, and outdoor spaces.
- Tile Box & Coverage Calculator: Accurate box counts including 10% cutting wastage.
- Sample Request Delivery: Architects and builders can order physical tile samples delivered to site.
- Whole-project billing and direct truckload delivery across Sangli, Solapur, Vijayapura (Bijapur), and Kolhapur regions.

APPOINTMENT BOOKING PROCESS:
- Customers can book online anytime via the "Experience Center" tab or click "Book Appointment".
- Select preferred date, convenient 2-hour time slot, and tile collection of interest.
- Automatic confirmation SMS, WhatsApp, and Email are sent immediately with a unique Appointment ID (e.g. APT-XXXXXX).
- Proprietors review and confirm the VIP architectural consultation.

APPOINTMENT STATUS CHECK:
- Customers can provide their Appointment ID (e.g., APT-842101) directly to this assistant to check real-time status (Pending, Confirmed, Rescheduled, Completed).

STRICT RULES:
- NEVER invent prices, discounts, or stock numbers. Instead advise: "Tile rates depend on surface finish, slab thickness, and order volume. Please visit our Satara Road Jath showroom or contact Pro. Ajit Shinde (9822090345) / Pro. Niraj Shinde (9822309345) for an exact quotation."
- NEVER confirm an appointment unilaterally. Only the store management confirms slots.
- If unsure or if customer asks for price quotes, discount deals, urgent delivery, or to talk to management:
  Offer human assistance and trigger human handoff.
`;

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  const key = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;
  if (!key) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

export class AiSupportService {
  /**
   * Process customer chat query with grounded business knowledge
   */
  public async handleCustomerChat(options: {
    message: string;
    customerName?: string;
    customerPhone?: string;
    conversationHistory?: Array<{ role: 'user' | 'assistant'; text: string }>;
  }): Promise<{ reply: string; needsHandoff: boolean; appointmentFound?: any }> {
    const userMessage = options.message.trim();

    // 1. Check for Appointment ID inquiry pattern (e.g. APT-123456 or #APT-123456)
    const aptMatch = userMessage.match(/APT-\d{4,8}/i);
    if (aptMatch) {
      const aptId = aptMatch[0].toUpperCase();
      const apt = db.getAppointmentById(aptId);
      if (apt) {
        let statusDesc = '';
        if (apt.status === 'confirmed') {
          statusDesc = `✅ <b>CONFIRMED</b> for <b>${apt.appointmentDate}</b> at <b>${apt.appointmentTime}</b>. Our specialists are ready to welcome you!`;
        } else if (apt.status === 'pending') {
          statusDesc = `⏳ <b>PENDING REVIEW</b>. Our team will verify the schedule and confirm shortly.`;
        } else if (apt.status === 'rescheduled') {
          statusDesc = `🔄 <b>RESCHEDULED</b> to <b>${apt.appointmentDate} (${apt.appointmentTime})</b>.`;
        } else if (apt.status === 'completed') {
          statusDesc = `🎉 <b>COMPLETED</b>. Thank you for visiting Amol Tiles, Jath!`;
        } else {
          statusDesc = `❌ <b>CANCELLED</b>. You can schedule a new appointment anytime.`;
        }

        return {
          reply: `I found your appointment record:\n\n` +
            `• <b>Appointment ID:</b> ${apt.id}\n` +
            `• <b>Customer:</b> ${apt.customerName}\n` +
            `• <b>Service:</b> ${apt.service}\n` +
            `• <b>Status:</b> ${statusDesc}\n\n` +
            `Need to adjust your time slot or speak with Pro. Ajit Shinde / Pro. Niraj Shinde? Just let me know!`,
          needsHandoff: false,
          appointmentFound: apt
        };
      } else {
        return {
          reply: `I checked our system for <b>${aptId}</b>, but couldn't locate an appointment with that ID. Please verify the digits or share your registered mobile number so I can forward this to our team.`,
          needsHandoff: false
        };
      }
    }

    // 2. Check for explicit request to talk to human staff/manager or request for exact price quote
    const lower = userMessage.toLowerCase();
    const explicitHandoffTriggers = [
      'talk to human',
      'human assistance',
      'speak with owner',
      'call me back',
      'speak with manager',
      'talk to ajit',
      'talk to niraj',
      'connect me with staff',
      'human support'
    ];

    const wantsHuman = explicitHandoffTriggers.some(t => lower.includes(t));
    if (wantsHuman && options.customerPhone) {
      await notificationService.sendHumanHandoffAlert({
        customerName: options.customerName || 'Website Visitor',
        customerPhone: options.customerPhone,
        customerMessage: userMessage
      });

      return {
        reply: "Thanks! I've forwarded your message to our team. Someone will get back to you shortly on " + options.customerPhone + ".",
        needsHandoff: true
      };
    }

    // 3. Query Gemini AI with trusted knowledge base
    const ai = getAI();
    if (ai) {
      try {
        const prompt = `
You are the Official 24/7 AI Customer Support Assistant for "Amol Tiles, Jath" (अमोल टाईल्स, जत) on WhatsApp and Website.
Provide a direct, real, helpful, and polite response to the customer based strictly on the trusted business knowledge.

Language Rule:
- If the customer writes in Marathi (मराठी) or Devanagari, reply in natural Marathi.
- If the customer writes in Hindi (हिंदी), reply in polite Hindi.
- If in English, reply in clean, welcoming English.
- Always sound like a warm, knowledgeable showroom advisor from Amol Tiles, Jath.

Key Facts:
- Store Location: Satara Road, Jath, Taluka Jath, Sangli District - 416404.
- Hours: 8:30 AM to 8:30 PM (All 7 days open, Monday to Sunday).
- Proprietors: Pro. Ajit Shinde (+91 9822090345) & Pro. Niraj Shinde (+91 9822309345).
- Products: Grand GVT/PGVT Slabs (800x1600mm, 1200x2400mm), PVT 600x1200mm, Ceramic wall concepts, 16mm outdoor pavers, Kadappa stone, Granite slabs (Black Galaxy, Jet Black), Italian marble, Finolex plumbing, luxury sanitaryware.

Strict Constraints:
1. Never invent prices or discount figures. For exact quotes, invite them to visit our Satara Road showroom or call Pro. Ajit Shinde (9822090345) / Pro. Niraj Shinde (9822309345).
2. Keep response concise, readable, and ideal for WhatsApp/Chat (use friendly emojis, bullet points).
3. If they ask about stock or custom tile size, confirm we have wide collections and invite them to visit or send floor plan.

Trusted Knowledge:
${BUSINESS_KNOWLEDGE}

Customer Query: "${userMessage}"
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt
        });

        const replyText = response.text?.trim() || "Thank you for reaching out to Amol Tiles, Jath! How may we assist with your tiles, granite, or bathroom fittings today?";

        const needsHandoff = replyText.toLowerCase().includes("forward your question to our team") ||
          replyText.toLowerCase().includes("i am not sure");

        if (needsHandoff && options.customerPhone) {
          await notificationService.sendHumanHandoffAlert({
            customerName: options.customerName || 'Website Visitor',
            customerPhone: options.customerPhone,
            customerMessage: userMessage
          });
        }

        return {
          reply: replyText,
          needsHandoff
        };
      } catch (err: any) {
        console.error('Gemini Support AI error (trying fallback):', err);
      }
    }

    // 4. Robust Knowledge Base Fallback if AI key is absent
    if (lower.includes('hour') || lower.includes('time') || lower.includes('open') || lower.includes('close')) {
      return {
        reply: "Amol Tiles, Jath is open **Monday to Sunday from 8:30 AM to 8:30 PM** (open all 7 days). You are always welcome to visit our experience center on Satara Road, Jath!",
        needsHandoff: false
      };
    }

    if (lower.includes('location') || lower.includes('address') || lower.includes('where') || lower.includes('satara road')) {
      return {
        reply: "📍 **Amol Tiles Showroom & Flagship Center**:\nSatara Road, Jath, Taluka Jath, District Sangli - 416404, Maharashtra.\nProprietors: Pro. Ajit Shinde (9822090345) & Pro. Niraj Shinde (9822309345).",
        needsHandoff: false
      };
    }

    if (lower.includes('appointment') || lower.includes('book') || lower.includes('consult')) {
      return {
        reply: "You can book a VIP consultation appointment directly on our website under the **Experience Center** tab! Choose your date, preferred 2-hour slot, and tile collection. We will immediately send you an Appointment ID and notify our team.",
        needsHandoff: false
      };
    }

    if (lower.includes('kadappa') || lower.includes('granite') || lower.includes('marble') || lower.includes('paver') || lower.includes('slab')) {
      return {
        reply: "Yes! At Amol Tiles, we have a complete stock of **Kadappa stone** (window frames, kitchen slabs), **Black Granite** (countertops, steps), **Italian & Indian Marble**, **Grand GVT Slabs (800x1600mm & 1200x2400mm)**, and **16mm Heavy-Duty Outdoor Pavers**.",
        needsHandoff: false
      };
    }

    // Default fallback
    if (options.customerPhone) {
      await notificationService.sendHumanHandoffAlert({
        customerName: options.customerName || 'Website Visitor',
        customerPhone: options.customerPhone,
        customerMessage: userMessage
      });
      return {
        reply: "Thanks! I've forwarded your message to our team. Someone will get back to you shortly.",
        needsHandoff: true
      };
    }

    return {
      reply: "I'm not sure about that. I'll forward your question to our team. Please share your mobile number or contact Pro. Ajit Shinde (9822090345) / Pro. Niraj Shinde (9822309345).",
      needsHandoff: false
    };
  }

  /**
   * Generates a real, intelligent, professional auto-reply for WhatsApp / SMS dispatch
   * No manual composing needed by the admin!
   */
  public async generateSmartRealReply(options: {
    preset: 'confirm_appointment' | 'send_catalog' | 'share_location' | 'pricing_guide' | 'custom_ai';
    customerName: string;
    customerPhone?: string;
    appointmentDetails?: {
      id?: string;
      service?: string;
      date?: string;
      time?: string;
    };
    customPrompt?: string;
    language?: 'en' | 'mr' | 'hi';
  }): Promise<{ message: string; channel: 'whatsapp' }> {
    const ai = getAI();
    const customer = options.customerName || 'Valued Customer';
    const apt = options.appointmentDetails;

    // Fast robust fallback generation
    let defaultTemplate = '';
    if (options.preset === 'confirm_appointment') {
      defaultTemplate = `Hello ${customer} 👋\n\nGreetings from Amol Tiles, Jath!\n\nYour appointment is confirmed:\n🆔 Appointment ID: ${apt?.id || 'APT-ONLINE'}\n📅 Date: ${apt?.date || 'Confirmed Date'}\n⏰ Slot: ${apt?.time || 'Scheduled Slot'}\n🛎 Service: ${apt?.service || 'VIP Tile & Sanitaryware Consultation'}\n\n📍 Showroom: Satara Road, Jath, Dist. Sangli\n📞 Contact: Pro. Ajit Shinde (9822090345) / Pro. Niraj Shinde (9822309345)\n\nWe look forward to welcoming you!`;
    } else if (options.preset === 'share_location') {
      defaultTemplate = `Hello ${customer} 👋\n\n📍 *Amol Tiles Experience Center & Showroom*\nAddress: Satara Road, Jath, Taluka Jath, Sangli District - 416404, Maharashtra.\n\n🕒 Timings: 8:30 AM - 8:30 PM (Open 7 Days a week)\n\nGoogle Maps: https://maps.google.com/?q=Amol+Tiles+Jath+Satara+Road\n\nContact Persons:\n👤 Pro. Ajit Shinde: +91 9822090345\n👤 Pro. Niraj Shinde: +91 9822309345`;
    } else if (options.preset === 'send_catalog') {
      defaultTemplate = `Hello ${customer} 👋\n\nHere is the latest collection portfolio from Amol Tiles, Jath:\n\n✨ *Grand GVT Slabs*: 800x1600mm & 1200x2400mm (Carving, High Gloss, Satin Matt)\n✨ *Polished Vitrified*: 600x1200mm & 600x600mm Double Charge\n✨ *Natural Stone*: Rajasthan Black Granite, Kadappa Stone for window sills\n✨ *Outdoor*: 16mm Heavy-Duty Parking Pavers\n✨ *Plumbing & Sanitary*: Finolex CPVC/PVC, Wall-hung closets\n\nVisit our Satara Road Jath showroom to explore 500+ physical mockups!`;
    } else if (options.preset === 'pricing_guide') {
      defaultTemplate = `Hello ${customer} 👋\n\nThank you for inquiring with Amol Tiles, Jath!\n\nTile pricing is based on surface finish, slab dimensions (600x1200 up to 1200x2400mm), and project square footage. We provide wholesale factory-direct pricing for direct truckloads across Sangli, Solapur, and Bijapur.\n\nPlease share your room dimensions or visit our showroom on Satara Road, Jath. You can also directly discuss special builder rates with:\n📞 Pro. Ajit Shinde: 9822090345\n📞 Pro. Niraj Shinde: 9822309345`;
    } else {
      defaultTemplate = `Hello ${customer} 👋\n\nThank you for contacting Amol Tiles, Jath! ${options.customPrompt || 'We are pleased to assist you with your project requirements.'}\n\nShowroom: Satara Road, Jath (8:30 AM - 8:30 PM)\nProprietors: Pro. Ajit Shinde (9822090345) & Pro. Niraj Shinde (9822309345).`;
    }

    if (!ai) {
      return { message: defaultTemplate, channel: 'whatsapp' };
    }

    try {
      const prompt = `
You are the official communications advisor for "Amol Tiles, Jath" (अमोल टाईल्स, जत).
Generate a REAL, high-quality, personalized WhatsApp reply message for customer "${customer}".
Do NOT generate a generic placeholder. Generate a complete, ready-to-dispatch message.

Context:
Preset requested: ${options.preset}
Appointment details: ${JSON.stringify(apt || {})}
Custom notes or instructions: ${options.customPrompt || 'None'}
Desired language: ${options.language || 'en'}

Business details:
- Name: Amol Tiles, Jath
- Address: Satara Road, Jath, Taluka Jath, Sangli District - 416404
- Timings: Monday to Sunday, 8:30 AM - 8:30 PM
- Proprietors: Pro. Ajit Shinde (9822090345) & Pro. Niraj Shinde (9822309345)
- Collections: GVT Slabs (800x1600, 1200x2400), Kadappa, Black Granite, 16mm Outdoor Pavers, Sanitaryware, Finolex plumbing.

Requirements:
- WhatsApp formatting (*bold*, friendly emojis, clean line breaks).
- Warm, polite, authoritative tone.
- Do NOT include markdown code fences (like \`\`\`).
- Output ONLY the exact message text ready to be sent on WhatsApp.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt
      });

      const messageText = response.text?.trim() || defaultTemplate;
      return { message: messageText, channel: 'whatsapp' };
    } catch (err) {
      console.error('Gemini smart reply error, using template:', err);
      return { message: defaultTemplate, channel: 'whatsapp' };
    }
  }
}

export const aiSupportService = new AiSupportService();
