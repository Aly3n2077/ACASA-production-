import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Snowflake, Phone } from "lucide-react";
import { generateSimpleServiceMessage, generateWhatsAppUrl, WHATSAPP_PHONE } from "@/lib/whatsapp";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" }
  ];

  const handleWhatsAppClick = () => {
    const message = generateSimpleServiceMessage("appliance repair");
    const url = generateWhatsAppUrl(WHATSAPP_PHONE, message);
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Emergency Banner */}
      <div className="bg-yellow-500 text-white py-2 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-medium">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            24/7 Emergency Service Available - Call{" "}
            <a href="tel:+26772123456" className="underline font-semibold">
              +267 72 123 456
            </a>
          </p>
        </div>
      </div>

      {/* Navigation Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Snowflake className="text-white text-xl" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Aaron Cool</h1>
                <p className="text-sm text-gray-600">Appliance Services</p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Button 
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center space-x-2"
              >
                <i className="fab fa-whatsapp"></i>
                <span>WhatsApp</span>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-lg text-gray-700 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button 
                    onClick={() => {
                      handleWhatsAppClick();
                      setIsOpen(false);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center space-x-2 w-full"
                  >
                    <i className="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    className="flex items-center justify-center space-x-2 w-full"
                  >
                    <a href="tel:+26772123456">
                      <Phone className="h-4 w-4" />
                      <span>Call Now</span>
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
