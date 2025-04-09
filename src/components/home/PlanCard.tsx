import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ChevronRight, Loader2 } from "lucide-react";

// Define the Plan type
export interface Plan {
  createdAt: string;
  modifiedAt: string | null;
  id: string;
  name: string;
  description: string;
  recurringInterval: string;
  isRecurring: boolean;
  isArchived: boolean;
  organizationId: string;
  metadata: Record<string, any>;
  prices: {
    createdAt: string;
    modifiedAt: string | null;
    id: string;
    amountType: string;
    isArchived: boolean;
    productId: string;
    type: string;
    recurringInterval: string;
    priceCurrency: string;
    priceAmount: number;
  }[];
  benefits: any[];
  medias: any[];
  attachedCustomFields: any[];
  isHighlighted?: boolean;
}

interface PlanCardProps {
  plan: Plan;
  isLoading: boolean;
  processingPlanId: string | null;
  onCheckout: (priceId: string) => void;
  formatCurrency: (amount: number, currency: string) => string;
}

export default function PlanCard({
  plan,
  isLoading,
  processingPlanId,
  onCheckout,
  formatCurrency,
}: PlanCardProps) {
  return (
    <Card
      key={plan.id}
      className={`flex flex-col h-full border ${plan.isHighlighted ? "bg-gradient-to-b from-blue-50 to-blue-100 shadow-xl border-blue-200" : "bg-white shadow-md hover:shadow-lg"} transition-all duration-300 rounded-xl overflow-hidden`}
    >
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-black">
            {plan.name || "Basic"}
          </CardTitle>
          {plan.isHighlighted && (
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 border-blue-300 font-medium px-3 py-1"
            >
              Recommended
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm font-medium text-gray-500">
          {plan.isRecurring
            ? `${plan.recurringInterval.charAt(0).toUpperCase() + plan.recurringInterval.slice(1)}ly`
            : "One-time"}
        </CardDescription>
        <div className="mt-4">
          {plan.prices && plan.prices.length > 0 && (
            <>
              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                {formatCurrency(
                  plan.prices[0].priceAmount,
                  plan.prices[0].priceCurrency,
                )}
              </span>
              <span className="text-gray-500 font-medium ml-1">
                /{plan.prices[0].recurringInterval}
              </span>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <Separator className="my-4 bg-gray-200" />
        <ul className="space-y-4">
          {plan.description &&
            plan.description.split("\n").map((feature, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{feature}</span>
              </li>
            ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${plan.isHighlighted ? "bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600" : "bg-black hover:bg-gray-800"} text-white font-medium py-6 rounded-lg shadow-sm transition-all duration-300`}
          onClick={() =>
            plan.prices &&
            plan.prices.length > 0 &&
            onCheckout(plan.prices[0].id)
          }
          disabled={isLoading || !plan.prices || plan.prices.length === 0}
        >
          {isLoading &&
          processingPlanId ===
            (plan.prices && plan.prices.length > 0 ? plan.prices[0].id : "") ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Subscribe Now
              <ChevronRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
