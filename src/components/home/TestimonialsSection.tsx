import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, Clock, DollarSign, BarChart } from "lucide-react";

// Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  metrics?: {
    timeSaved: string;
    costReduction: string;
    reachIncrease: string;
  };
}

// Metric card interface
interface MetricCard {
  title: string;
  value: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

export default function TestimonialsSection() {
  // Sample testimonials data with metrics
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Content Marketing Director",
      company: "TechFlow",
      content:
        "Tempo AI has transformed our content strategy. We're now able to create content for all our channels in a fraction of the time, while maintaining our brand voice perfectly.",
      avatar: "sarah",
      metrics: {
        timeSaved: "85%",
        costReduction: "70%",
        reachIncrease: "3.5x",
      },
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Digital Marketing Lead",
      company: "InnovateCorp",
      content:
        "I've tried many AI content tools, but Tempo AI stands out with its ability to truly understand our brand voice and create authentic content across formats. Our engagement has skyrocketed.",
      avatar: "michael",
      metrics: {
        timeSaved: "75%",
        costReduction: "65%",
        reachIncrease: "2.8x",
      },
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "CMO",
      company: "DigitalWave",
      content:
        "Our team was spending days repurposing content manually. With Tempo AI, we now create an entire month's worth of content across all channels in just hours. The ROI has been incredible.",
      avatar: "aisha",
      metrics: {
        timeSaved: "90%",
        costReduction: "80%",
        reachIncrease: "4.2x",
      },
    },
  ];

  // Metrics cards data
  const metricCards: MetricCard[] = [
    {
      title: "Time Saved",
      value: "85%",
      description: "Average reduction in content creation time",
      icon: <Clock className="h-8 w-8" />,
      color: "bg-teal-100 text-teal-700",
    },
    {
      title: "Cost Reduction",
      value: "72%",
      description: "Average decrease in content production costs",
      icon: <DollarSign className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Reach Increase",
      value: "3.5x",
      description: "Average growth in audience engagement",
      icon: <BarChart className="h-8 w-8" />,
      color: "bg-indigo-100 text-indigo-700",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-200 border-none">
            Results
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-teal-900">
            Real Results from Real Customers
          </h2>
          <p className="text-teal-700 max-w-[700px] mx-auto">
            See how marketing teams are saving time and resources while
            expanding their reach with Tempo AI.
          </p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {metricCards.map((metric, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 ${metric.color} border`}
            >
              <div className="flex items-center justify-center mb-4">
                {metric.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                {metric.title}
              </h3>
              <div className="text-center">
                <span className="text-3xl font-bold">{metric.value}</span>
              </div>
              <p className="text-center mt-2">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-teal-100 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.avatar}`}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-teal-900">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription>
                      {testimonial.role}, {testimonial.company}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-teal-700 mb-4">{testimonial.content}</p>

                {testimonial.metrics && (
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-teal-100">
                    <div className="text-center">
                      <div className="text-teal-900 font-bold">
                        {testimonial.metrics.timeSaved}
                      </div>
                      <div className="text-xs text-teal-600">Time Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-teal-900 font-bold">
                        {testimonial.metrics.costReduction}
                      </div>
                      <div className="text-xs text-teal-600">
                        Cost Reduction
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-teal-900 font-bold">
                        {testimonial.metrics.reachIncrease}
                      </div>
                      <div className="text-xs text-teal-600">
                        Reach Increase
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
