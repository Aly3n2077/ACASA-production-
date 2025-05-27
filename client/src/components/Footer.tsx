import { Snowflake, Phone, Mail } from "lucide-react";

export default function Footer() {
  const services = [
    "AC Installation",
    "Refrigeration Repair",
    "Compressor Service",
    "Gas Refills",
    "Emergency Service"
  ];

  const contactDetails = [
    { icon: "fas fa-phone", text: "+267 72 123 456", href: "tel:+26772123456" },
    { icon: "fas fa-envelope", text: "info@aaroncoolteck.co.za", href: "mailto:info@aaroncoolteck.co.za" },
    { icon: "fas fa-map-marker-alt", text: "Gaborone, Botswana", href: null },
    { icon: "fas fa-clock", text: "24/7 Emergency", href: null }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Snowflake className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Aaron Cool</h3>
                <p className="text-gray-400">Appliance Services</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Professional appliance repair and maintenance services throughout Botswana. Trusted by families and businesses since 2009.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://wa.me/26772123456" 
                className="bg-green-500 hover:bg-green-600 p-3 rounded-lg transition-colors"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
              <a 
                href="tel:+26772123456" 
                className="bg-primary hover:bg-secondary p-3 rounded-lg transition-colors"
                aria-label="Phone"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a 
                href="mailto:info@aaroncoolteck.co.za" 
                className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2 text-gray-300">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-300">
              {contactDetails.map((detail, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <i className={`${detail.icon} text-primary`}></i>
                  {detail.href ? (
                    <a href={detail.href} className="hover:text-white transition-colors">
                      {detail.text}
                    </a>
                  ) : (
                    <span>{detail.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2024 Aaron Cool Appliance Services. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
