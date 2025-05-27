import { Button } from "@/components/ui/button";
import { Phone, Clock, Shield } from "lucide-react";
import { generateSimpleServiceMessage, generateWhatsAppUrl, WHATSAPP_PHONE } from "@/lib/whatsapp";

export default function Hero() {
  const handleWhatsAppBooking = () => {
    const message = generateSimpleServiceMessage("appliance repair");
    const url = generateWhatsAppUrl(WHATSAPP_PHONE, message);
    window.open(url, '_blank');
  };

  return (
    <section className="bg-gradient-to-br from-primary to-secondary text-white py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-white/20 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">Trusted Since 2009</span>
              </div>
              <div className="flex items-center space-x-1">
                {Array(5).fill(0).map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
                ))}
                <span className="text-sm ml-1">4.9/5 Rating</span>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Professional 
              <span className="text-yellow-400"> Appliance</span> 
              Repair & Service
            </h1>
            
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Expert AC installation, refrigeration repair, and appliance maintenance throughout Botswana. Fast, reliable service you can trust.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleWhatsAppBooking}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all"
              >
                <i className="fab fa-whatsapp text-xl mr-3"></i>
                Instant WhatsApp Booking
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 border-white/30 text-white px-8 py-4 text-lg font-semibold"
              >
                <a href="tel:+27617260367">
                  <Phone className="mr-3" />
                  Call Now
                </a>
              </Button>
            </div>
            
            <div className="mt-8 flex items-center space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Same Day Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Licensed & Insured</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional appliance technician repairing air conditioning unit" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-green-500 rounded-xl p-4 shadow-xl">
              <div className="text-center text-white">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
