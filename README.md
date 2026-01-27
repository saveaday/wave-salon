<div align="center">
<img width="1200" height="475" alt="Wave Beauty Lounge" src="https://storage.googleapis.com/dvizfb.firebasestorage.app/tenants/x0P8bcooVLMknfD0FL86KcxOsMH3/uploads/Cj1ex7FLammjz5L_xGoX7.png" />
</div>

# Wave Beauty Lounge - Link Page

Premium beauty services in Dubai. This is a webhook-triggered static site for Wave Beauty Lounge's link-in-bio page.

## Architecture

This site uses a **webhook-triggered static build** approach:

1. **Trigger**: Backend sends HTTP POST to GitHub's `repository_dispatch` API
2. **Payload**: POST includes all content data (profile, links, catalogue, etc.)
3. **Build**: GitHub Actions builds static site with injected content
4. **Deploy**: Static HTML/JS/CSS deployed to GitHub Pages
5. **Runtime**: No API calls - all content is baked into the build

## Local Development

**Prerequisites:** Node.js 20+

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) for AI features:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Deployment via Webhook

To trigger a deployment with updated content, send a POST request to GitHub's repository_dispatch API:

```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/YOUR_ORG/wave-salon/dispatches \
  -d '{
    "event_type": "publish_content",
    "client_payload": {
      "data": {
        "linkPage": {
          "id": "S2V9G5SaxmImN3mM0rGi",
          "slug": "p-x0P8b-dpib9e",
          "profile": {
            "name": "Wave Beauty Lounge",
            "bio": "Premium beauty services in Dubai",
            "logo": "https://...",
            "address": "Dubai",
            "email": "mail@saveaday.ai",
            "phone": "+971569737344"
          },
          "theme": {
            "background": "bg-gray-50",
            "buttonStyle": "rounded",
            "font": "sans"
          },
          "links": [...]
        },
        "catalogue": {...}
      }
    }
  }'
```

## Webhook Payload Structure

The `client_payload.data` object should contain:

- **linkPage** (required): Profile, links, theme configuration
- **catalogue** (optional): Services/products catalogue
- **survey** (optional): Customer survey configuration
- **leadForm** (optional): Lead capture form configuration

See [implementation_plan.md](docs/implementation_plan.md) for full payload schema.

## Features

- 🎨 Customizable themes and styling
- 📱 Fully responsive design
- 🔗 Social media links (Instagram, Facebook, WhatsApp)
- 📋 Services catalogue with categories and pricing
- 🤖 AI-powered brand insights (Gemini API)
- ⚡ Lightning-fast static site
- 🚀 Automated deployment via webhooks

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide Icons
- Google Gemini AI

---

© 2026 Wave Beauty Lounge | Powered by SaveADay
