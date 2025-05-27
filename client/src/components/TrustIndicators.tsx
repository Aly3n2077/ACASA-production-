import { Card, CardContent } from "@/components/ui/card";
import { Award, Shield, Clock, Users } from "lucide-react";

export default function TrustIndicators() {
  const indicators = [
    {
      icon: Award,
      title: "Licensed & Certified",
      description: "Fully licensed technicians with industry certifications",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: Shield,
      title: "Warranty Protected",
      description: "All work comes with comprehensive warranty coverage",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Clock,
      title: "Fast Response",
      description: "Same-day service available for urgent repairs",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Users,
      title: "1000+ Customers",
      description: "Trusted by homes and businesses across Botswana",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {indicators.map((indicator, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className={`w-16 h-16 ${indicator.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <indicator.icon className={`${indicator.iconColor} h-8 w-8`} />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">{indicator.title}</h3>
                <p className="text-gray-600">{indicator.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
