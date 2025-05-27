import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, Info, TriangleAlert } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { generateServiceQuoteMessage, generateWhatsAppUrl, WHATSAPP_PHONE } from "@/lib/whatsapp";
import type { InsertContactInquiry } from "@shared/schema";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  serviceType: z.string().min(1, "Please select a service type"),
  description: z.string().min(10, "Please describe your issue in detail"),
  preferredDate: z.string().optional(),
  urgency: z.string().default("Regular Service"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      description: "",
      preferredDate: "",
      urgency: "Regular Service",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactInquiry) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({
        title: "Request Submitted",
        description: "We'll respond within 30 minutes during business hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly via WhatsApp.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    // Generate WhatsApp message and open it
    const whatsappMessage = generateServiceQuoteMessage(data);
    const whatsappUrl = generateWhatsAppUrl(WHATSAPP_PHONE, whatsappMessage);
    window.open(whatsappUrl, '_blank');

    // Also submit to backend
    const contactData: InsertContactInquiry = {
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      serviceType: data.serviceType,
      description: data.description,
      preferredDate: data.preferredDate || undefined,
      urgency: data.urgency,
    };

    contactMutation.mutate(contactData);
  };

  const handleWhatsAppDirect = () => {
    const message = "Hi, I need appliance repair service. Can you help?";
    const url = generateWhatsAppUrl(WHATSAPP_PHONE, message);
    window.open(url, '_blank');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+27 61 726 0367",
      href: "tel:+27617260367"
    },
    {
      icon: Mail,
      title: "Email",
      content: "mabwedziva@gmail.com",
      href: "mailto:mabwedziva@gmail.com"
    },
    {
      icon: MapPin,
      title: "Service Area",
      content: "Gaborone & Surrounding Areas",
      href: null
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Fri: 7:00 AM - 6:00 PM\nSat: 8:00 AM - 4:00 PM\nSun: Emergency only",
      href: null
    }
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Get Your Quote Today</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to fix your appliance? Contact us for a fast, professional service quote. We're here to help 24/7.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Service Quote</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+267 XX XXX XXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AC Installation & Repair">AC Installation & Repair</SelectItem>
                            <SelectItem value="Refrigeration Services">Refrigeration Services</SelectItem>
                            <SelectItem value="Compressor Replacement">Compressor Replacement</SelectItem>
                            <SelectItem value="Gas Refills (R134a, R410a)">Gas Refills (R134a, R410a)</SelectItem>
                            <SelectItem value="Government & Public Services">Government & Public Services</SelectItem>
                            <SelectItem value="Emergency Service">Emergency Service</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe Your Issue</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            placeholder="Please describe the problem with your appliance..."
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Urgency Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Regular Service">Regular Service</SelectItem>
                              <SelectItem value="Same Day Preferred">Same Day Preferred</SelectItem>
                              <SelectItem value="Emergency (ASAP)">Emergency (ASAP)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-4 text-lg font-semibold"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Submitting...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <Info className="inline w-4 h-4 mr-1" />
                  We'll respond within 30 minutes during business hours. For emergencies, call directly.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-8">
            {/* WhatsApp Contact */}
            <Card className="bg-green-500 text-white">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fab fa-whatsapp text-3xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">WhatsApp Direct</h3>
                    <p className="text-green-100">Fastest way to reach us</p>
                  </div>
                </div>
                <p className="text-green-100 mb-6">
                  Get instant quotes and book appointments through WhatsApp. We respond immediately during business hours.
                </p>
                <Button 
                  onClick={handleWhatsAppDirect}
                  className="bg-white hover:bg-gray-100 text-green-600 font-semibold"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Start WhatsApp Chat
                </Button>
              </CardContent>
            </Card>
            
            {/* Contact Details */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <info.icon className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{info.title}</div>
                        {info.href ? (
                          <a href={info.href} className="text-primary hover:underline whitespace-pre-line">
                            {info.content}
                          </a>
                        ) : (
                          <div className="text-gray-600 whitespace-pre-line">{info.content}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Emergency Notice */}
            <Card className="bg-yellow-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <TriangleAlert className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Emergency Service</h3>
                </div>
                <p className="mb-4">
                  For urgent cooling system failures, call us directly. We provide 24/7 emergency service for critical situations.
                </p>
                <Button 
                  asChild
                  className="bg-white hover:bg-gray-100 text-yellow-600 font-semibold"
                >
                  <a href="tel:+27617260367">
                    <Phone className="mr-2 h-4 w-4" />
                    Emergency Call
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
