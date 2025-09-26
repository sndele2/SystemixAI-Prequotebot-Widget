# Prequote Proxy (Netlify Function)

This function handles CORS + OPTIONS and forwards POST to your n8n webhook.

## Local dev
1. Install Netlify CLI:
   npm i -g netlify-cli
2. Login:
   netlify login
3. Run locally:
   netlify dev
   # Local URL:
   # http://localhost:8888/.netlify/functions/prequote

Test locally:
curl -i -X OPTIONS "http://localhost:8888/.netlify/functions/prequote" \
 -H "Origin: https://example.com" \
 -H "Access-Control-Request-Method: POST"

curl -i -X POST "http://localhost:8888/.netlify/functions/prequote" \
 -H "Content-Type: application/json" \
 -d '{"session_id":"demo123","message":"Website redesign, $3–5k, 4–6 weeks."}'

## Deploy
Option A: Git-linked (recommended)
- Push this folder to GitHub.
- In Netlify dashboard > Add new site > Import from Git > pick the repo.
- Set Environment Variable:
  N8N_URL = https://systemixai.app.n8n.cloud/webhook/prequote
- Deploy. The function URL will be:
  https://<your-site>.netlify.app/.netlify/functions/prequote

Option B: CLI deploy
netlify deploy --prod

## Use in widget
Set:
const ENDPOINT = "https://<your-site>.netlify.app/.netlify/functions/prequote";
