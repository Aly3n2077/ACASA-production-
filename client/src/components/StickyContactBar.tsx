import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { generateSimpleServiceMessage, generateWhatsAppUrl, WHATSAPP_PHONE } from "@/lib/whatsapp";

export default function StickyContactBar() {
  const handleWhatsAppClick = () => {
    const message = generateSimpleServiceMessage("appliance repair");
    const url = generateWhatsAppUrl(WHATSAPP_PHONE, message);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-40 shadow-lg">
      <div className="flex space-x-3">
        <Button 
          asChild
          className="flex-1 bg-primary hover:bg-secondary text-white py-3 px-4 font-medium"
        >
          <a href="tel:+27617260367">
            <Phone className="mr-2 h-4 w-4" />
            Call
          </a>
        </Button>
        <Button 
          onClick={handleWhatsAppClick}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 font-medium"
        >
          <i className="fab fa-whatsapp mr-2"></i>
          WhatsApp
        </Button>
      </div>
    </div>
  );
}
