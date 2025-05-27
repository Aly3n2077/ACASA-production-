export interface WhatsAppMessageData {
  name?: string;
  phone?: string;
  serviceType?: string;
  description?: string;
  preferredDate?: string;
  urgency?: string;
}

export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function generateServiceQuoteMessage(data: WhatsAppMessageData): string {
  return `Hi Aaron Cool Appliance Services!

I'd like to request a service quote:

Name: ${data.name || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
Service Type: ${data.serviceType || 'Not specified'}
Description: ${data.description || 'Not provided'}
Preferred Date: ${data.preferredDate || 'Flexible'}
Urgency: ${data.urgency || 'Regular Service'}

Please provide a quote for this service. Thank you!`;
}

export function generateSimpleServiceMessage(serviceType: string): string {
  return `Hi, I need ${serviceType} service. Can you help?`;
}

export function generateEmergencyMessage(): string {
  return `Hi, I have an emergency appliance repair situation. Please help!`;
}

export const WHATSAPP_PHONE = "26772123456";
