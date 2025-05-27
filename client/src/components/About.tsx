import { Check } from "lucide-react";

export default function About() {
  const features = [
    {
      title: "Expert Technicians",
      description: "Our certified technicians have extensive experience with all major appliance brands and cooling systems."
    },
    {
      title: "Transparent Pricing",
      description: "No hidden fees or surprises. We provide upfront quotes and honest assessments for all repair work."
    },
    {
      title: "Quality Guarantee",
      description: "We stand behind our work with comprehensive warranties and follow-up service to ensure your satisfaction."
    }
  ];

  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "1000+", label: "Repairs Completed" },
    { value: "24/7", label: "Emergency Service" }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-8">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                Since 2009
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Your Trusted Appliance Repair Partner
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                For over 15 years, Aaron Cool Appliance Services has been Botswana's go-to solution for professional appliance repair and maintenance. We've built our reputation on quality workmanship, honest pricing, and exceptional customer service.
              </p>
            </div>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=900" 
              alt="Professional appliance repair team with tools and equipment" 
              className="rounded-2xl shadow-xl w-full h-auto"
            />
            
            {/* Certification Badge */}
            <div className="absolute top-6 left-6 bg-white rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <i className="fas fa-certificate text-primary"></i>
                <div>
                  <div className="font-semibold text-sm">Certified</div>
                  <div className="text-xs text-gray-600">HVAC Technicians</div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 right-6 bg-primary text-white rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <div className="text-lg font-bold">4.9★</div>
                <div className="text-xs">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
