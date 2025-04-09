import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar: string;
}

interface Metric {
  id: number;
  value: string;
  label: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechGrowth Inc.",
    testimonial:
      "Tempo AI has completely transformed our content strategy. We're now able to repurpose our blog posts into social media, email newsletters, and video scripts in minutes instead of days. The ROI has been incredible.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Content Manager",
    company: "GlobalReach Media",
    testimonial:
      "As a small team managing content for multiple clients, Tempo AI has been a game-changer. The quality of the transformed content is consistently on-brand and the time savings allow us to take on more clients.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Digital Marketing Lead",
    company: "Innovate Solutions",
    testimonial:
      "We've seen a 300% increase in engagement across channels since implementing Tempo AI. Being able to quickly adapt our content for different platforms while maintaining our brand voice has been invaluable.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
  },
];

const metrics: Metric[] = [
  {
    id: 1,
    value: "85%",
    label: "Time Saved",
    color: "bg-teal-50",
  },
  {
    id: 2,
    value: "3X",
    label: "Content Output",
    color: "bg-blue-50",
  },
  {
    id: 3,
    value: "68%",
    label: "Cost Reduction",
    color: "bg-emerald-50",
  },
  {
    id: 4,
    value: "4.9/5",
    label: "Customer Rating",
    color: "bg-cyan-50",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-teal-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-teal-900">
            Trusted by Marketing Teams
          </h2>
          <p className="text-teal-700 max-w-[700px] mx-auto">
            See how marketing professionals are transforming their content
            strategies and achieving remarkable results with Tempo AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white border-teal-100 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-teal-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-teal-700">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-teal-700 italic">
                  "{testimonial.testimonial}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 border border-teal-100 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8 text-teal-900">
            Real Results from Real Customers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 ${metric.color} border border-teal-100 text-center`}
              >
                <div className="text-3xl md:text-4xl font-bold text-teal-900 mb-2">
                  {metric.value}
                </div>
                <div className="text-teal-700">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
