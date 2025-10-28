// api/trigger-workflow.js

const { createClient } = require("@supabase/supabase-js");

// These environment variables need to be set in Vercel project settings
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Needed for permission check & analytics

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Or your specific frontend domain
  res.setHeader(
    "Access-Control-Allow-Headers",
    "authorization, x-client-info, apikey, content-type"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  // Handle OPTIONS request (CORS preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // --- Start Processing POST Request ---
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // 1. Get user token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Missing or invalid token" });
    }
    const token = authHeader.split(" ")[1];

    // 2. Verify user with Supabase using the token
    const userSupabase = createClient(supabaseUrl, supabaseAnonKey);
    const {
      data: { user },
      error: userError,
    } = await userSupabase.auth.getUser(token);

    if (userError || !user) {
      console.error("Auth Error:", userError?.message);
      return res
        .status(401)
        .json({ error: userError?.message || "Unauthorized: Invalid user" });
    }

    // 3. Get requested automation ID from request body
    const { automationId } = req.body;
    if (!automationId || typeof automationId !== "number") {
      return res
        .status(400)
        .json({ error: "Missing or invalid automationId in request body" });
    }

    // 4. Create Admin client (using Service Role Key from Vercel Env Vars)
    const adminSupabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    // 5. Check Permissions & Get Webhook URL using Admin client
    const { data: permissionData, error: permissionError } = await adminSupabase
      .from("UserAutomations")
      .select(
        `
                id,
                Automations ( webhook_url, name )
            `
      )
      .eq("user_id", user.id)
      .eq("automation_id", automationId)
      .maybeSingle(); // Use maybeSingle to handle null result gracefully

    if (permissionError) {
      console.error(
        "Supabase query error checking permissions:",
        permissionError.message
      );
      throw new Error("Database error checking permissions."); // Generic error for client
    }
    if (!permissionData || !permissionData.Automations?.webhook_url) {
      // Log details server-side but return generic error to client
      console.warn(
        `Permission denied or automation/webhook missing for user ${user.id}, automation ${automationId}`
      );
      return res
        .status(403)
        .json({ error: "Forbidden: Access denied or automation not found" });
    }

    const targetWebhookUrl = permissionData.Automations.webhook_url;
    const automationName = permissionData.Automations.name;
    console.log(
      `User ${user.email} authorized for ${automationName}. Triggering webhook.`
    );

    // 6. Trigger the Specific Automation Webhook (n8n/Make)
    // Ensure the URL retrieved from DB is valid before fetching
    if (
      !targetWebhookUrl ||
      typeof targetWebhookUrl !== "string" ||
      !targetWebhookUrl.startsWith("http")
    ) {
      console.error(
        `Invalid webhook URL retrieved for automation ${automationId}: ${targetWebhookUrl}`
      );
      throw new Error("Server configuration error: Invalid webhook URL.");
    }

    const automationResponse = await fetch(targetWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        userEmail: user.email,
        frontendData: req.body, // Pass original frontend data
      }),
    });

    // Check if the webhook call itself failed (e.g., n8n returned 400 Bad Request, 404, 500)
    if (!automationResponse.ok) {
      const errorBody = await automationResponse.text(); // Get error details if possible
      console.error(
        `Webhook call failed with status ${automationResponse.status}: ${errorBody}`
      );
      // Return a more specific error based on webhook response
      throw new Error(
        `Automation webhook failed: ${automationResponse.statusText}`
      );
    }

    // 7. Log successful trigger to Analytics (Best effort - don't fail request if logging fails)
    adminSupabase
      .from("AnalyticsEvents")
      .insert({
        user_id: user.id,
        event_type: "workflow_triggered",
        details: { automationId: automationId, automationName: automationName },
      })
      .then(({ error: logError }) => {
        if (logError)
          console.error("Error logging analytics event:", logError.message);
      });

    // 8. Send success response back to the frontend
    return res
      .status(200)
      .json({
        message: `Automation '${automationName}' triggered successfully!`,
      });
  } catch (error) {
    // Generic error handler for unexpected issues
    console.error(
      "Critical Error in trigger-workflow function:",
      error.message
    );
    const status = error.status || 500; // Use specific status if available (like 401, 403)
    // Return a generic message for security, log specific error server-side
    return res
      .status(status)
      .json({
        error: "Failed to trigger automation due to an internal error.",
      });
  }
};
