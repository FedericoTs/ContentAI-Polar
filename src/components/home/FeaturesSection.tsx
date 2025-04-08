import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  MessageSquare,
  Mail,
  Video,
  Zap,
  Clock,
  BarChart,
  Sparkles,
} from "lucide-react";

// Feature interface
interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
  formatIcons?: JSX.Element[];
}

export default function FeaturesSection() {
  // Content format icons
  const blogIcon = <FileText className="h-6 w-6 text-teal-600" />;
  const socialIcon = <MessageSquare className="h-6 w-6 text-teal-600" />;
  const emailIcon = <Mail className="h-6 w-6 text-teal-600" />;
  const videoIcon = <Video className="h-6 w-6 text-teal-600" />;

  // Sample features data
  const features: Feature[] = [
    {
      title: "Blog to Social Media",
      description:
        "Transform long-form blog content into engaging social media posts optimized for each platform.",
      icon: <FileText className="h-10 w-10 text-teal-600" />,
      formatIcons: [blogIcon, socialIcon],
    },
    {
      title: "Video to Blog & Email",
      description:
        "Convert video content into comprehensive blog posts and targeted email campaigns.",
      icon: <Video className="h-10 w-10 text-teal-600" />,
      formatIcons: [videoIcon, blogIcon, emailIcon],
    },
    {
      title: "Email to Social & Video",
      description:
        "Turn your email newsletters into social media content and script outlines for video production.",
      icon: <Mail className="h-10 w-10 text-teal-600" />,
      formatIcons: [emailIcon, socialIcon, videoIcon],
    },
    {
      title: "Any to All Formats",
      description:
        "Take any content type and transform it into all other formats with a single click.",
      icon: <Zap className="h-10 w-10 text-teal-600" />,
      formatIcons: [blogIcon, socialIcon, emailIcon, videoIcon],
    },
  ];

  // Additional benefits
  const benefits: Feature[] = [
    {
      title: "Save Time",
      description:
        "Reduce content creation time by up to 90% with AI-powered transformations.",
      icon: <Clock className="h-10 w-10 text-teal-600" />,
    },
    {
      title: "Increase Reach",
      description:
        "Expand your audience by publishing optimized content across multiple channels.",
      icon: <BarChart className="h-10 w-10 text-teal-600" />,
    },
    {
      title: "Maintain Brand Voice",
      description:
        "Our AI preserves your unique brand voice and messaging across all content formats.",
      icon: <Sparkles className="h-10 w-10 text-teal-600" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-teal-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-200 border-none">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-teal-900">
            Content Repurposing Made Simple
          </h2>
          <p className="text-teal-700 max-w-[700px] mx-auto">
            Transform your existing content into multiple formats with just a
            few clicks. Save time and resources while maintaining consistent
            messaging across all channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-teal-100 bg-gradient-to-b from-white to-teal-50 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-teal-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-teal-700 mb-4">{feature.description}</p>
                {feature.formatIcons && (
                  <div className="flex items-center justify-between mt-4 bg-white p-2 rounded-lg border border-teal-100">
                    {feature.formatIcons.map((icon, i) => (
                      <div key={i} className="flex items-center justify-center">
                        {i > 0 && i < feature.formatIcons!.length && (
                          <div className="mx-1 text-teal-400">→</div>
                        )}
                        {icon}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-teal-900">
            Additional Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-teal-100 bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="mb-4">{benefit.icon}</div>
                  <CardTitle className="text-teal-900">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-teal-700">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
