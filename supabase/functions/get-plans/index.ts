import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Polar } from "npm:@polar-sh/sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting get-plans function");

    // Log environment variables (without exposing sensitive values)
    const accessToken = Deno.env.get("POLAR_ACCESS_TOKEN");
    const organizationId = Deno.env.get("POLAR_ORGANIZATION_ID");

    console.log("Environment check:", {
      "POLAR_ACCESS_TOKEN exists": !!accessToken,
      "POLAR_ORGANIZATION_ID exists": !!organizationId,
      "POLAR_ORGANIZATION_ID value": organizationId,
    });

    if (!accessToken) {
      throw new Error("POLAR_ACCESS_TOKEN is not set");
    }

    if (!organizationId) {
      throw new Error("POLAR_ORGANIZATION_ID is not set");
    }

    console.log("Initializing Polar client");
    const polar = new Polar({
      accessToken: accessToken,
      server: "sandbox",
    });

    console.log(
      "Calling polar.products.list with organizationId:",
      organizationId,
    );
    const { result } = await polar.products.list({
      isArchived: false,
      organizationId: organizationId,
    });

    console.log(
      "Polar API response received:",
      result ? "success" : "empty result",
    );
    console.log("Number of products returned:", result ? result.length : 0);

    if (!result || result.length === 0) {
      console.log("No products found in Polar");
    } else {
      console.log(
        "Products found:",
        result.map((p) => ({ id: p.id, name: p.name })),
      );
    }

    // Return just the items array for simpler client-side handling
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in get-plans function:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error("Error details:", {
      message: errorMessage,
      stack: errorStack,
    });

    return new Response(
      JSON.stringify({ error: errorMessage, details: errorStack }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }
});
