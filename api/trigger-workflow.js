// api/trigger-workflow.js

const { createClient } = require("@supabase/supabase-js");

// Read keys from Vercel environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust for production
  res.setHeader(
    "Access-Control-Allow-Headers",
    "authorization, x-client-info, apikey, content-type"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // 1. Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Missing or invalid token" });
    }
    const token = authHeader.split(" ")[1];

    // 2. Verify user with Supabase
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

    // 3. Get automationId from request body
    const { automationId } = req.body;
    if (!automationId || typeof automationId !== "number") {
      return res
        .status(400)
        .json({ error: "Missing or invalid automationId in request body" });
    }

    // 4. Create Admin client
    const adminSupabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    // 5. Check Permissions & get Webhook URL
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
      .maybeSingle();

    if (permissionError) throw permissionError;
    if (!permissionData || !permissionData.Automations?.webhook_url) {
      return res
        .status(403)
        .json({ error: "Forbidden: Access denied or automation not found" });
    }

    const targetWebhookUrl = permissionData.Automations.webhook_url;
    const automationName = permissionData.Automations.name;
    console.log(
      `User ${user.email} authorized for ${automationName}. Triggering webhook.`
    );

    // 6. Trigger the Automation Webhook
    const automationResponse = await fetch(targetWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        userEmail: user.email,
        frontendData: req.body, // Pass original frontend data
      }),
    });

    if (!automationResponse.ok) {
      const errorBody = await automationResponse.text();
      console.error(
        `Webhook failed (${automationResponse.status}): ${errorBody}`
      );
      throw new Error(
        `Automation webhook failed: ${automationResponse.statusText}`
      );
    }

    // 7. Log Analytics Event (Best effort)
    adminSupabase
      .from("AnalyticsEvents")
      .insert({
        user_id: user.id,
        event_type: "workflow_triggered",
        details: { automationId: automationId, automationName: automationName },
      })
      .then(({ error: logError }) => {
        if (logError)
          console.error("Error logging analytics:", logError.message);
      });

    // 8. Send success response
    return res.status(200).json({
      message: `Automation '${automationName}' triggered successfully!`,
    });
  } catch (error) {
    console.error("Error in trigger-workflow:", error.message);
    const status =
      error.status || error.message.includes("Unauthorized")
        ? 401
        : error.message.includes("Forbidden")
        ? 403
        : 500;
    return res
      .status(status)
      .json({ error: error.message || "Internal Server Error" });
  }
};
