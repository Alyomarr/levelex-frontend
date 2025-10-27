// api/get-user-automations.js

const { createClient } = require("@supabase/supabase-js");

// These environment variables will be read from Vercel project settings
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
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
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

    // 3. Create Admin client (using Service Role Key)
    const adminSupabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    // 4. Fetch linked automations
    const { data: automations, error: fetchError } = await adminSupabase
      .from("UserAutomations")
      .select(
        `
        Automations ( id, name, description )
      `
      )
      .eq("user_id", user.id);

    if (fetchError) {
      console.error("Error fetching user automations:", fetchError.message);
      throw fetchError;
    }

    // 5. Format and return
    const availableAutomations =
      automations?.map((item) => item.Automations) || [];
    return res.status(200).json(availableAutomations);
  } catch (error) {
    console.error("Error in get-user-automations:", error.message);
    const status =
      error.status ||
      error.message.includes("Auth") ||
      error.message.includes("Unauthorized")
        ? 401
        : 500;
    return res
      .status(status)
      .json({ error: error.message || "Internal Server Error" });
  }
};
