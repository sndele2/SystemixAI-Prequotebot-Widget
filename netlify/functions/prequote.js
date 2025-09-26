export async function handler(event, context) {
  // Set your n8n Production webhook URL via env var in Netlify dashboard.
  // Fallback default provided for convenience.
  const N8N_URL = process.env.N8N_URL || "https://systemixai.app.n8n.cloud/webhook/prequote";

  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Session-Id",
    "Access-Control-Max-Age": "86400",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors, body: "" };
  }

  // Forward POST to n8n
  if (event.httpMethod === "POST") {
    try {
      const res = await fetch(N8N_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If your n8n webhook requires auth, add it here:
          // "Authorization": `Bearer ${process.env.N8N_TOKEN}`,
        },
        body: event.body || "{}",
      });

      const text = await res.text();
      return {
        statusCode: res.status,
        headers: { "Content-Type": "application/json", ...cors },
        body: text,
      };
    } catch (err) {
      return {
        statusCode: 502,
        headers: cors,
        body: JSON.stringify({ error: "Upstream error", detail: String(err) }),
      };
    }
  }

  return { statusCode: 405, headers: cors, body: "Method Not Allowed" };
}
