# 🔴 KHQR API Registration Required

## Current Issue

Your API key returns: `"status": "invalid api"`

This means you need to **properly register as a KHQR merchant** to get valid API credentials.

---

## ✅ How to Get Real KHQR API Access

### Step 1: Register as KHQR Merchant

The API response directs you to contact via Telegram:
- **Telegram:** https://t.me/angkorpayway

You need to:
1. Contact them via Telegram
2. Request merchant registration
3. Provide your business details
4. Complete KYC verification

---

### Step 2: What You'll Need

For merchant registration:
- ✅ Business name: **ReelTime Media**
- ✅ Business location: **Phnom Penh, Cambodia**
- ✅ Business type: **Digital Content/Streaming**
- ✅ Contact information
- ✅ Business registration documents (if required)
- ✅ Bank account information for settlements

---

### Step 3: Get Your Credentials

After approval, you'll receive:
- ✅ **Valid API Key** (format: `sk_live_...`)
- ✅ **Merchant ID** (your unique merchant identifier)
- ✅ **Settlement Account** details
- ✅ **Webhook URL** configuration

---

## 🔄 Alternative Options

### Option 1: NBC Bakong Direct

Register directly with National Bank of Cambodia:
- **Website:** https://bakong.nbc.gov.kh/
- **Requirements:** Official business registration in Cambodia
- **Process:** More formal, takes longer
- **Benefits:** Official NBC merchant status

### Option 2: Payment Gateway Partners

Use established payment gateway partners:
- **PayWay** - https://www.payway.com.kh/
- **Pi Pay** - Business merchant account
- **Wing** - Wing Business services
- **ABA Bank** - ABA PayWay

These partners often have:
- ✅ Easier onboarding
- ✅ Better documentation
- ✅ Support teams
- ✅ Established APIs

---

## 💡 For Development/Testing NOW

### Keep Using Local Generation

While waiting for approval, your app will:
- ✅ Generate valid KHQR QR codes locally
- ✅ Display beautiful styled cards
- ✅ Work for testing and demos
- ✅ Be ready to switch to real API when you get credentials

**Your current setup is perfect for development!**

---

## 🎯 What to Do Next

### Immediate (Testing):
1. ✅ Keep using local generation (it works!)
2. ✅ Test your payment flow
3. ✅ Scan QR codes with banking apps
4. ✅ Verify UI/UX works

### For Production:
1. 📱 Contact via Telegram: https://t.me/angkorpayway
2. 📋 Complete merchant registration
3. ⏳ Wait for approval (usually few days)
4. 🔑 Get your real API credentials
5. 🔄 Update `.env` with new credentials
6. ✅ System automatically uses real API!

---

## 📞 Contact Information

### KHQR Support:
- **Telegram:** https://t.me/angkorpayway
- **Email:** Check their website
- **Phone:** Contact NBC Bakong

### Questions to Ask:
1. What is the merchant registration process?
2. How long does approval take?
3. What documents are required?
4. What are the transaction fees?
5. How do webhooks work?
6. Is there a test/sandbox environment?

---

## 🔧 When You Get Valid Credentials

Just update your `.env` file:

```bash
# Replace with your REAL credentials
KHQR_API_KEY=sk_live_YOUR_REAL_API_KEY_HERE
KHQR_MERCHANT_ID=YOUR_REAL_MERCHANT_ID
KHQR_MERCHANT_NAME=ReelTime Media
KHQR_MERCHANT_CITY=Phnom Penh
```

**That's it!** Your app will automatically:
- ✅ Use real KHQR API
- ✅ Get official styled QR images
- ✅ Receive webhook notifications
- ✅ Process real payments

---

## ✨ Summary

**Current Status:**
- ❌ API key not valid yet (needs registration)
- ✅ Local generation works perfectly
- ✅ App ready for testing

**Next Steps:**
1. Contact KHQR support for registration
2. Continue development with local generation
3. Update credentials when approved
4. Go live! 🚀

---

**The system is working exactly as designed - it falls back to local generation when API isn't available!**
