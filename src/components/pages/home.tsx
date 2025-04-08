import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  User,
  Zap,
  CheckCircle2,
  ArrowRight,
  Github,
  Twitter,
  Instagram,
  X,
  FileText,
  MessageSquare,
  Mail,
  Video,
  Repeat,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import { useEffect } from "react";
import { supabase } from "../../../supabase/supabase";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

// Import the extracted components
import FeaturesSection from "../home/FeaturesSection";
import TestimonialsSection from "../home/TestimonialsSection";
import PricingSection from "../home/PricingSection";

// Step interface for How It Works section
interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

export default function LandingPage() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    // Load plans data when component mounts
    const fetchPlans = async () => {
      try {
        await supabase.functions.invoke("supabase-functions-get-plans");
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };

    fetchPlans();
  }, []);

  // Define workflow steps for How It Works section
  const workflowSteps: WorkflowStep[] = [
    {
      id: 1,
      title: "Upload Your Content",
      description:
        "Simply upload your existing content in any format - blog posts, videos, presentations, or documents.",
      icon: <FileText className="h-12 w-12 text-teal-500" />,
    },
    {
      id: 2,
      title: "AI Analysis",
      description:
        "Our AI analyzes your content, identifying key messages, tone, and structure to preserve your brand voice.",
      icon: <Zap className="h-12 w-12 text-teal-500" />,
    },
    {
      id: 3,
      title: "Transform & Optimize",
      description:
        "Content is automatically transformed into multiple formats, optimized for each channel and audience.",
      icon: <Repeat className="h-12 w-12 text-teal-500" />,
    },
    {
      id: 4,
      title: "Review & Publish",
      description:
        "Review the generated content, make any final adjustments, and publish directly to your channels.",
      icon: <CheckCircle2 className="h-12 w-12 text-teal-500" />,
    },
  ];

  // Content format types for the hero section visualization
  const contentFormats = [
    { icon: <FileText className="h-8 w-8 text-teal-600" />, label: "Blog" },
    {
      icon: <MessageSquare className="h-8 w-8 text-teal-600" />,
      label: "Social",
    },
    { icon: <Mail className="h-8 w-8 text-teal-600" />, label: "Email" },
    { icon: <Video className="h-8 w-8 text-teal-600" />, label: "Video" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-teal-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="font-bold text-xl flex items-center text-teal-900"
            >
              <Zap className="h-6 w-6 mr-2 text-teal-600" />
              Tempo AI
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-teal-700 hover:text-teal-900"
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="gap-2 text-teal-700 hover:text-teal-900"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                          alt={user.email || ""}
                        />
                        <AvatarFallback>
                          {user.email?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline-block">
                        {user.email}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white border-teal-100"
                  >
                    <DropdownMenuLabel className="text-teal-900">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-teal-100" />
                    <DropdownMenuItem className="text-teal-700 hover:text-teal-900 focus:text-teal-900">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-teal-700 hover:text-teal-900 focus:text-teal-900">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-teal-100" />
                    <DropdownMenuItem
                      onSelect={() => signOut()}
                      className="text-teal-700 hover:text-teal-900 focus:text-teal-900"
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-teal-700 hover:text-teal-900"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-teal-600 text-white hover:bg-teal-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-white to-teal-50">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-8">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-teal-900 leading-tight">
                    <span className="text-teal-600">10X faster.</span>{" "}
                    <span className="text-teal-700">10X cheaper.</span>{" "}
                    <span className="block mt-2">Infinite possibilities.</span>
                  </h1>
                </div>
                <p className="text-lg md:text-xl text-teal-700">
                  Transform your existing content into multiple formats with AI.
                  Save time and resources while maintaining your brand voice
                  across all channels.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="bg-teal-600 text-white hover:bg-teal-700 w-full sm:w-auto"
                    >
                      Start Transforming Content
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-teal-300 text-teal-700 hover:border-teal-500 hover:text-teal-900 w-full sm:w-auto"
                  >
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-teal-700">
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                  <span>No credit card required</span>
                  <Separator
                    orientation="vertical"
                    className="h-4 mx-2 bg-teal-300"
                  />
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                  <span>Free tier available</span>
                  <Separator
                    orientation="vertical"
                    className="h-4 mx-2 bg-teal-300"
                  />
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                  <span>Cancel anytime</span>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-teal-200/60 via-teal-400/40 to-blue-300/30 rounded-3xl blur-2xl transform scale-110" />
                <div className="bg-white/80 backdrop-blur-sm border border-teal-200 rounded-xl shadow-xl overflow-hidden">
                  <div className="p-1 bg-gradient-to-r from-teal-200 via-teal-400 to-blue-300 rounded-t-xl">
                    <div className="flex items-center gap-2 px-3 py-1">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <div className="ml-2 text-xs text-teal-900 font-medium">
                        Content Transformation
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="bg-teal-50 p-4 rounded-lg border border-teal-100 mb-6 w-full">
                        <h3 className="text-teal-900 font-medium mb-2">
                          Original Content
                        </h3>
                        <p className="text-teal-700 text-sm">
                          Your comprehensive 2500-word blog post about
                          sustainable practices...
                        </p>
                      </div>

                      <div className="flex justify-center mb-4">
                        <Zap className="h-8 w-8 text-teal-500 animate-pulse" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 w-full">
                        {contentFormats.map((format, index) => (
                          <div
                            key={index}
                            className="bg-white p-3 rounded-lg border border-teal-100 flex items-center gap-2"
                          >
                            {format.icon}
                            <span className="text-teal-900 font-medium">
                              {format.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-teal-200/60 blur-[100px]" />
          <div className="absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-200/40 blur-[100px]" />
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-teal-900">
                How It Works
              </h2>
              <p className="text-teal-700 max-w-[700px] mx-auto">
                Our AI-powered platform makes content transformation simple and
                efficient. Follow these steps to multiply your content's reach
                and impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {workflowSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-teal-100 shadow-md w-full">
                    <h3 className="text-xl font-bold mb-3 text-teal-900">
                      {step.title}
                    </h3>
                    <p className="text-teal-700">{step.description}</p>
                  </div>
                  {step.id < workflowSteps.length && (
                    <div className="hidden lg:block absolute transform translate-x-[150px]">
                      <ArrowRight className="h-8 w-8 text-teal-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Using the extracted component */}
        <FeaturesSection />

        {/* Pricing Section - Using the extracted component */}
        <PricingSection />

        {/* Testimonials Section - Using the extracted component */}
        <TestimonialsSection />

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="bg-gradient-to-r from-teal-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-teal-100">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-teal-900">
                  Ready to Transform Your Content?
                </h2>
                <p className="text-lg md:text-xl mb-8 text-teal-700">
                  Join marketing teams who are already saving time and resources
                  with Tempo AI's content transformation platform.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="bg-teal-600 text-white hover:bg-teal-700 w-full sm:w-auto"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-teal-300 text-teal-700 hover:border-teal-500 hover:text-teal-900 w-full sm:w-auto"
                  >
                    Schedule a Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-teal-100 py-12">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link
                to="/"
                className="font-bold text-xl flex items-center mb-4 text-teal-900"
              >
                <Zap className="h-5 w-5 mr-2 text-teal-600" />
                Tempo AI
              </Link>
              <p className="text-teal-700 mb-4">
                An AI-powered platform that helps marketing teams transform
                existing content into multiple formats.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-teal-600 hover:text-teal-900"
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-teal-600 hover:text-teal-900"
                >
                  <X className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-teal-600 hover:text-teal-900"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-4 text-teal-900">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-teal-700 hover:text-teal-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-teal-700 hover:text-teal-900">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-teal-700 hover:text-teal-900">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-teal-700 hover:text-teal-900">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-4 text-teal-900">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-teal-700 hover:text-teal-900">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-teal-700 hover:text-teal-900">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-teal-700 hover:text-teal-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-teal-700 hover:text-teal-900">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-4 text-teal-900">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-teal-700 hover:text-teal-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-teal-700 hover:text-teal-900">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-teal-700 hover:text-teal-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-teal-700 hover:text-teal-900">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-teal-100" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-teal-700">
              © {new Date().getFullYear()} Tempo AI. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                to="#"
                className="text-sm text-teal-700 hover:text-teal-900"
              >
                Privacy
              </Link>
              <Link
                to="#"
                className="text-sm text-teal-700 hover:text-teal-900"
              >
                Terms
              </Link>
              <Link
                to="#"
                className="text-sm text-teal-700 hover:text-teal-900"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
