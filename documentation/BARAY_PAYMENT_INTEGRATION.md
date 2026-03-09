# Baray Payment Integration

This document describes the Baray payment integration for ReelTime Media.

## Overview

Baray is an API integration service for Cambodia that connects merchants with multiple local banks (ABA, ACLEDA, Sathapana, Wing) through a single technical integration.

## Setup

### 1. Get Credentials

Sign up at [dash.baray.io](https://dash.baray.io) and obtain your credentials:
- `api_key` - Public identifier for API calls
- `sk` - Secret key (Base64, 32 bytes) for encryption
- `iv` - Initialization vector (Base64, 16 bytes) for encryption

### 2. Environment Variables

Add to your `.env.local` file:

```env
BARAY_API_KEY=bry_live_xxxxxxxxxxxxxxxxxxxx
BARAY_SECRET_KEY=your-base64-encoded-secret-key
BARAY_IV=your-base64-encoded-iv
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 3. Configure Webhook URL

In your Baray dashboard, set the webhook callback URL to:
```
https://your-domain.com/api/payments/baray/webhook
```

## Payment Flow

```
┌─────────────┐      ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Customer  │      │   Your App  │     │    Baray    │     │    Bank     │
└──────┬──────┘      └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                    │                   │                   │
       │ 1. Click Pay       │                   │                   │
       │───────────────────>│                   │                   │
       │                    │                   │                   │
       │                    │ 2. Create Intent  │                   │
       │                    │   (encrypted)     │                   │
       │                    │──────────────────>│                   │
       │                    │                   │                   │
       │                    │ 3. Intent ID      │                   │
       │                    │<──────────────────│                   │
       │                    │                   │                   │
       │ 4. Redirect to     │                   │                   │
       │   pay.baray.io     │                   │                   │
       │<───────────────────│                   │                   │
       │                    │                   │                   │
       │ 5. Select Bank     │                   │                   │
       │────────────────────────────────────────>                   │
       │                    │                   │                   │
       │ 6. Complete Payment│                   │                   │
       │────────────────────────────────────────────────────────────>
       │                    │                   │                   │
       │                    │ 7. Webhook        │                   │
       │                    │<──────────────────│                   │
       │                    │                   │                   │
       │ 8. Redirect to     │                   │                   │
       │   success page     │                   │                   │
       │<───────────────────│                   │                   │
```

## API Endpoints

### Create Payment Intent

`POST /api/payments/baray`

**Request Body:**
```json
{
  "amount": 4.99,
  "currency": "USD",
  "contentType": "movie",
  "contentId": "movie-123",
  "contentTitle": "Movie Title"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "intent_id": "itn-xxxxx",
    "payment_url": "https://pay.baray.io/itn-xxxxx",
    "order_id": "RTM-xxxxx"
  }
}
```

### Webhook Handler

`POST /api/payments/baray/webhook`

Receives payment confirmations from Baray with encrypted order ID.

**Webhook Payload:**
```json
{
  "encrypted_order_id": "<aes_encrypted_order_id>",
  "bank": "aba"
}
```

## Files

```
lib/baray/
├── index.ts      # Main exports
├── client.ts     # Core functions (encrypt, decrypt, create intent)
└── types.ts      # TypeScript types

app/api/payments/baray/
├── route.ts           # Create payment intent endpoint
└── webhook/
    └── route.ts       # Webhook handler
```

## Supported Banks

| Bank           | Code     | Payment Methods              |
| -------------- | -------- | ---------------------------- |
| ABA Bank       | `aba`    | KHQR, Card Payment, Deeplink |
| ACLEDA Bank    | `acleda` | KHQR, Deeplink               |
| Sathapana Bank | `spn`    | KHQR                         |
| Wing           | `wing`   | Mobile Wallet                |

## Currencies

- **USD** - Minimum $0.03
- **KHR** - Minimum 100 KHR

## Security

- All payloads are encrypted using AES-256-CBC
- Secret key and IV must never be exposed client-side
- Webhook payloads are verified by successful decryption
- All payments are processed by licensed Cambodian banks

## Testing

1. Create API keys with `DEVELOPMENT` target in Baray dashboard
2. Use development credentials for testing
3. Payments won't process real money in development mode

## Troubleshooting

### "Missing Baray credentials" error
Ensure all three environment variables are set:
- `BARAY_API_KEY`
- `BARAY_SECRET_KEY`
- `BARAY_IV`

### "Failed to decrypt payload" error
Verify your `sk` and `iv` credentials match what's in your Baray dashboard.

### Webhook not received
1. Check webhook URL is correctly configured in Baray dashboard
2. Ensure your endpoint is publicly accessible (not localhost)
3. Check server logs for any errors

## References

- [Baray API Documentation](https://baray.io/llm.txt)
- [Baray Dashboard](https://dash.baray.io)
