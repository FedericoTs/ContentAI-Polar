import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useAuth } from "../../../supabase/auth";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "../../../supabase/supabase";
import PlanCard, { Plan } from "./PlanCard";

export default function PricingSection() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    });

    // The new data structure provides the amount directly, not in cents
    return formatter.format(amount / 100);
  };

  // Handle checkout process
  const handleCheckout = async (priceId: string) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a plan.",
        variant: "default",
      });
      window.location.href = "/login?redirect=pricing";
      return;
    }

    setIsLoading(true);
    setProcessingPlanId(priceId);
    setError("");

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-create-checkout",
        {
          body: {
            productPriceId: priceId,
            successUrl: `${window.location.origin}/dashboard`,
            customerEmail: user.email || "",
            metadata: {
              user_id: user.id,
            },
          },
          headers: {
            "X-Customer-Email": user.email || "",
          },
        },
      );

      if (error) {
        throw error;
      }

      // Redirect to Stripe checkout
      if (data?.url) {
        toast({
          title: "Redirecting to checkout",
          description:
            "You'll be redirected to Stripe to complete your purchase.",
          variant: "default",
        });
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setError("Failed to create checkout session. Please try again.");
      toast({
        title: "Checkout failed",
        description:
          "There was an error creating your checkout session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setProcessingPlanId(null);
    }
  };

  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      setError("");

      try {
        console.log("Fetching plans from supabase function...");
        const functionName = "supabase-functions-get-plans";
        console.log(`Invoking function: ${functionName}`);

        const { data, error } = await supabase.functions.invoke(
          functionName,
          {},
        );

        console.log("Response received:", { data, error });

        if (error) {
          console.error("Supabase function error:", error);
          throw new Error(
            `Function error: ${error.message || JSON.stringify(error)}`,
          );
        }

        if (!data) {
          console.error("No data returned from function");
          throw new Error("No data returned from pricing function");
        }

        console.log("Raw plans data:", data);

        // Check if data is an array
        // Check if data has an items property (Polar API response format)
        const plansArray =
          data.items && Array.isArray(data.items) ? data.items : data;
        console.log("Plans array to process:", plansArray);

        // Process the plans data
        const processedPlans = plansArray.map((plan: Plan) => {
          console.log("Processing plan:", plan);
          return {
            ...plan,
            isHighlighted: plan.name.toLowerCase().includes("growth"),
          };
        });

        // Sort plans by tier if available in metadata, otherwise by price
        const sortedPlans = processedPlans.sort((a: Plan, b: Plan) => {
          // If tier exists in metadata, sort by tier
          if (a.metadata?.tier && b.metadata?.tier) {
            return a.metadata.tier - b.metadata.tier;
          }

          // Otherwise sort by price
          const aPrice =
            a.prices && a.prices.length > 0 ? a.prices[0].priceAmount : 0;
          const bPrice =
            b.prices && b.prices.length > 0 ? b.prices[0].priceAmount : 0;
          return aPrice - bPrice;
        });

        console.log("Final sorted plans:", sortedPlans);
        setPlans(sortedPlans);
      } catch (err: any) {
        console.error("Error fetching plans:", err);
        // More specific error message based on the error type
        const errorMessage =
          err.message ||
          "Failed to load pricing plans. Please try again later.";
        console.error("Setting error message:", errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 border-none font-medium px-3 py-1">
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 max-w-[700px] mx-auto text-lg">
            Choose the perfect plan for your needs. All plans include access to
            our core features. No hidden fees or surprises.
          </p>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
            <button
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setError("")}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isLoading={isLoading}
                processingPlanId={processingPlanId}
                onCheckout={handleCheckout}
                formatCurrency={formatCurrency}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              {isLoading ? (
                <p className="text-gray-600">Loading pricing plans...</p>
              ) : (
                <p className="text-gray-600">
                  No pricing plans available at this time.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
