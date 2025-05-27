import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { generateWhatsAppUrl, WHATSAPP_PHONE } from "@/lib/whatsapp";
import type { Service } from "@shared/schema";

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const handleServiceRequest = (service: Service) => {
    const url = generateWhatsAppUrl(WHATSAPP_PHONE, service.whatsappMessage);
    window.open(url, '_blank');
  };

  const handleEmergencyCall = () => {
    window.open('tel:+27617260367', '_self');
  };

  if (isLoading) {
    return (
      <section id="services" className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!services || services.length === 0) {
    return (
      <section id="services" className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Services Unavailable</h2>
          <p className="text-gray-600">Unable to load services at this time. Please contact us directly.</p>
        </div>
      </section>
    );
  }

  const getServiceImage = (category: string) => {
    switch (category) {
      case 'cooling':
        return 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300';
      case 'refrigeration':
        return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300';
      case 'compressor':
        return 'https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300';
      case 'gas':
        return 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300';
      case 'government':
        return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300';
      case 'emergency':
        return 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300';
      default:
        return 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300';
    }
  };

  const getIconColor = (category: string) => {
    switch (category) {
      case 'cooling': return 'text-primary';
      case 'refrigeration': return 'text-blue-600';
      case 'compressor': return 'text-green-600';
      case 'gas': return 'text-yellow-600';
      case 'government': return 'text-purple-600';
      case 'emergency': return 'text-white';
      default: return 'text-primary';
    }
  };

  const getIconBg = (category: string) => {
    switch (category) {
      case 'cooling': return 'bg-primary/10';
      case 'refrigeration': return 'bg-blue-50';
      case 'compressor': return 'bg-green-50';
      case 'gas': return 'bg-yellow-50';
      case 'government': return 'bg-purple-50';
      case 'emergency': return 'bg-white/20';
      default: return 'bg-primary/10';
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Expert Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional appliance repair and installation services with transparent pricing and guaranteed quality workmanship.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden group ${
                service.category === 'emergency' ? 'bg-gradient-to-br from-yellow-500 to-orange-600 text-white' : 'bg-white'
              }`}
            >
              <div className="relative">
                <img 
                  src={getServiceImage(service.category)}
                  alt={`${service.name} - Professional appliance repair service`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-semibold ${service.category === 'emergency' ? 'text-white' : 'text-gray-900'}`}>
                    {service.name}
                  </h3>
                  <div className={`${getIconBg(service.category)} p-2 rounded-lg`}>
                    <i className={`${service.icon} ${getIconColor(service.category)}`}></i>
                  </div>
                </div>
                
                <p className={`mb-4 ${service.category === 'emergency' ? 'text-orange-100' : 'text-gray-600'}`}>
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-sm ${service.category === 'emergency' ? 'text-orange-200' : 'text-gray-500'}`}>
                    <Clock className="inline w-4 h-4 mr-1" />
                    {service.duration}
                  </div>
                  <div className={`text-lg font-semibold ${service.category === 'emergency' ? 'text-white' : 'text-primary'}`}>
                    {service.priceFrom > 0 ? `From P${service.priceFrom}` : service.category === 'government' ? 'Custom Quote' : 'Emergency Rates'}
                  </div>
                </div>
                
                {service.category === 'emergency' ? (
                  <Button 
                    onClick={handleEmergencyCall}
                    className="w-full bg-white hover:bg-gray-100 text-yellow-600 py-3 px-4 font-medium"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    Call Now
                  </Button>
                ) : (
                  <Button 
                    onClick={() => handleServiceRequest(service)}
                    className="w-full bg-primary hover:bg-secondary text-white py-3 px-4 font-medium"
                  >
                    <i className="fab fa-whatsapp mr-2"></i>
                    Request Quote
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
