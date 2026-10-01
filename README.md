# Sanlam WhatsApp Assistant

Starter application for a WhatsApp-first Sanlam enquiry assistant.

## Included
- Product information library for Funeral Cover, Life Cover, EssentialMED, Invest to Own, Tax-Free Investment and Retirement Annuity.
- Lead qualification architecture.
- Thabiso handover link: +27 72 742 3895.
- Admin dashboard shell.
- WhatsApp Cloud API webhook verification endpoint.
- No quote generation and no personalised financial advice.

## Run
npm install
npm run dev

## WhatsApp connection
1. Create/configure the official WhatsApp Business Platform/Cloud API setup in Meta.
2. Add the values in `.env.local` using `.env.example`.
3. Set the webhook callback URL to `/api/whatsapp/webhook`.
4. Use the same verify token in Meta and `WHATSAPP_VERIFY_TOKEN`.
5. Implement message sending using the approved Cloud API credentials.

The current POST endpoint deliberately logs incoming events only. This prevents the number from being put into production automation before the credentials and approved message flows are configured.
