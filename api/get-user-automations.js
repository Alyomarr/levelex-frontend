// api/get-user-automations.js

const { createClient } = require("@supabase/supabase-js");

// These environment variables need to be set in Vercel project settings
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Needed for admin client

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Or your specific frontend domain
  res.setHeader(
    "Access-Control-Allow-Headers",
    "authorization, x-client-info, apikey, content-type"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  // Handle OPTIONS request (CORS preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // --- Start Processing GET Request ---
  if (req.method !== "GET") {
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
    // Use the Anon Key client for this verification step
    const userSupabase = createClient(supabaseUrl, supabaseAnonKey);
    const {
      data: { user },
      error: userError,
    } = await userSupabase.auth.getUser(token);

    if (userError || !user) {
      console.error("Auth Error in get-user-automations:", userError?.message);
      return res
        .status(401)
        .json({ error: userError?.message || "Unauthorized: Invalid user" });
    }

    // 3. Create Admin client (using Service Role Key from Vercel Env Vars)
    // Needed to bypass RLS potentially if RLS is strict on Automations table
    const adminSupabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    // 4. Fetch automation details linked specifically to this user
    // Joins UserAutomations with Automations based on the foreign key
    const { data: automationsData, error: fetchError } = await adminSupabase
      .from("UserAutomations") // Start from the linking table
      .select(
        `
                Automations ( id, name, description )
            `
      ) // Select columns from the related Automations table
      .eq("user_id", user.id); // Filter for the currently logged-in user

    if (fetchError) {
      console.error(
        "Error fetching user automations from DB:",
        fetchError.message
      );
      // Check if the error indicates a missing table, which was the previous issue
      if (
        fetchError.message.includes("relation") &&
        fetchError.message.includes("does not exist")
      ) {
        return res
          .status(500)
          .json({ error: `Server configuration error: ${fetchError.message}` });
      }
      throw fetchError; // Throw other DB errors for generic handling
    }

    // 5. Format the data: Extract the Automations details from the join result
    // automationsData will be an array like [{ Automations: { id: 1, name: 'X', ... } }, ...]
    const availableAutomations =
      automationsData?.map((item) => item.Automations).filter(Boolean) || []; // filter(Boolean) removes nulls if join fails

    // 6. Return the formatted data
    return res.status(200).json(availableAutomations);
  } catch (error) {
    // Generic error handler
    console.error(
      "Critical Error in get-user-automations function:",
      error.message
    );
    const status =
      error.status || error.message.includes("Unauthorized") ? 401 : 500;
    // Return a generic message for security, log specific error server-side
    return res
      .status(status)
      .json({ error: "Failed to load automations due to an internal error." });
  }
};
