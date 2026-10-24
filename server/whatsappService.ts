/**
 * Official Meta WhatsApp Cloud API Service
 * Endpoint: https://graph.facebook.com/v20.0/{PHONE_NUMBER_ID}/messages
 * Documentation: https://developers.facebook.com/docs/whatsapp/cloud-api
 */

export interface WhatsAppSendResult {
  success: boolean;
  status: 'sent' | 'failed' | 'simulated';
  messageId?: string; // Official Meta WAMID (e.g., wamid.HBgM...)
  error?: string;
  errorCode?: number;
  errorSubcode?: number;
  details?: any;
  simulated?: boolean;
}

export class WhatsAppService {
  private get token(): string | undefined {
    return process.env.WHATSAPP_TOKEN || process.env.WHATSAPP_API_KEY;
  }

  private get phoneNumberId(): string | undefined {
    return process.env.WHATSAPP_PHONE_NUMBER_ID;
  }

  public get businessAccountId(): string | undefined {
    return process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
  }

  public get webhookVerifyToken(): string {
    return process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || process.env.WHATSAPP_VERIFY_TOKEN || 'amol_tiles_secure_webhook_2026';
  }

  public get isConfigured(): boolean {
    return !!(this.token && this.phoneNumberId);
  }

  /**
   * Cleans and formats phone numbers strictly according to WhatsApp Cloud API standards:
   * E.164 without leading '+' (e.g. India 10 digits '8421001308' -> '918421001308')
   */
  public formatPhoneNumber(phone: string): string {
    if (!phone) return '';
    // Strip all non-digit characters
    let cleaned = phone.replace(/\D/g, '');

    // Remove leading single zero (e.g., 08421001308 -> 8421001308)
    if (cleaned.startsWith('0') && cleaned.length === 11) {
      cleaned = cleaned.substring(1);
    }

    // If 10 digits (Standard Indian Mobile), prepend India country code 91
    if (cleaned.length === 10) {
      cleaned = `91${cleaned}`;
    }

    return cleaned;
  }

  /**
   * Send WhatsApp Message using official WhatsApp Cloud API with automatic retry
   */
  public async sendMessage(
    recipientPhone: string,
    messageBody: string,
    options?: {
      templateName?: string;
      languageCode?: string;
      templateComponents?: any[];
      retryCount?: number;
    }
  ): Promise<WhatsAppSendResult> {
    const formattedRecipient = this.formatPhoneNumber(recipientPhone);

    if (!formattedRecipient || formattedRecipient.length < 10) {
      return {
        success: false,
        status: 'failed',
        error: `Invalid recipient phone number format: "${recipientPhone}" (must be at least 10 digits)`
      };
    }

    // If credentials are not yet supplied in backend environment variables, provide detailed simulation & log
    if (!this.token || !this.phoneNumberId) {
      const simId = `sim_wamid_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
      console.log(`\n======================================================`);
      console.log(`[WHATSAPP CLOUD API - READY FOR LIVE CREDENTIALS]`);
      console.log(`Recipient: +${formattedRecipient}`);
      console.log(`Status: Simulated (Set WHATSAPP_TOKEN and WHATSAPP_PHONE_NUMBER_ID in .env / Settings for live delivery)`);
      console.log(`Simulated Message ID: ${simId}`);
      console.log(`Message Preview:\n${messageBody}`);
      console.log(`======================================================\n`);

      return {
        success: true,
        status: 'simulated',
        simulated: true,
        messageId: simId
      };
    }

    const endpoint = `https://graph.facebook.com/v20.0/${this.phoneNumberId}/messages`;

    // Construct official payload
    let payload: any;
    if (options?.templateName) {
      payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: formattedRecipient,
        type: 'template',
        template: {
          name: options.templateName,
          language: {
            code: options.languageCode || 'en'
          },
          components: options.templateComponents || []
        }
      };
    } else {
      payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: formattedRecipient,
        type: 'text',
        text: {
          preview_url: false,
          body: messageBody
        }
      };
    }

    const maxRetries = options?.retryCount ?? 2;
    let lastError: any = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          // Exponential backoff with jitter
          await new Promise(res => setTimeout(res, 1000 * Math.pow(2, attempt) + Math.random() * 500));
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.messages && data.messages.length > 0) {
          const wamid = data.messages[0].id;
          console.log(`[WhatsApp Cloud API Success] Sent to +${formattedRecipient} | WAMID: ${wamid}`);
          return {
            success: true,
            status: 'sent',
            messageId: wamid,
            details: data
          };
        }

        // Parse Meta API Error
        const metaError = data.error || {};
        const errorCode = metaError.code;
        const errorSubcode = metaError.error_subcode;
        const errorMessage = metaError.message || `HTTP ${response.status} ${response.statusText}`;

        console.error(`[WhatsApp Cloud API Error] Code ${errorCode} (Subcode ${errorSubcode}): ${errorMessage}`);

        // If rate limited (code 130429 or HTTP 429), retry
        if ((response.status === 429 || errorCode === 130429 || errorCode === 80007) && attempt < maxRetries) {
          lastError = errorMessage;
          continue;
        }

        // Non-retryable error
        return {
          success: false,
          status: 'failed',
          errorCode,
          errorSubcode,
          error: `Meta WhatsApp API [Code ${errorCode || response.status}]: ${errorMessage}`,
          details: metaError
        };

      } catch (networkErr: any) {
        lastError = networkErr.message || 'Network request failed';
        if (attempt >= maxRetries) {
          return {
            success: false,
            status: 'failed',
            error: `WhatsApp connection error: ${lastError}`
          };
        }
      }
    }

    return {
      success: false,
      status: 'failed',
      error: `WhatsApp dispatch failed after retries: ${lastError}`
    };
  }
}

export const whatsappService = new WhatsAppService();
