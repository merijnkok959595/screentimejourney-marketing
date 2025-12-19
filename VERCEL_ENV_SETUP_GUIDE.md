# 🚀 Vercel Environment Variables Setup Guide

## 📋 **What You Need to Do:**

### **Step 1: Upload Environment Variables to Vercel**
1. Go to: [Vercel Dashboard → screentimejourney.com → Settings → Environment Variables](https://vercel.com/merijnkok959595s-projects/screentimejourney.com/settings/environment-variables)

2. **Upload the file**: `marketing-site-vercel.env` (located on your Desktop)
   - Click **"Import .env File"** 
   - Select the `marketing-site-vercel.env` file
   - Set Environment: **Production, Preview, Development** (all three)

### **Step 2: Find Your Cognito Domain** ⚠️ **CRITICAL**
You MUST replace `YOUR_ACTUAL_COGNITO_DOMAIN` with your real domain:

1. Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
2. Select your User Pool: `eu-north-1_1kSVbpQXN`
3. Go to **"App integration"** → **"Domain"**
4. Your domain will look like: `screentimejourney-auth.auth.eu-north-1.amazoncognito.com`

5. **Update in Vercel**: 
   - Find: `NEXT_PUBLIC_OAUTH_DOMAIN`
   - Change to: `your-actual-domain.auth.eu-north-1.amazoncognito.com`

### **Step 3: Configure Google OAuth in Cognito** 
1. In AWS Cognito → **"Sign-in experience"** → **"Federated identity provider sign-in"**
2. Click **"Add identity provider"** → **"Google"**
3. Enter:
   - **Client ID**: `[Use the Client ID provided separately]`
   - **Client Secret**: `[Use the Client Secret provided separately]`  
   - **Authorized scopes**: `openid email profile`

### **Step 4: Update Google OAuth Redirect URLs**
1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Click your OAuth 2.0 Client ID
3. Add **Authorized redirect URIs**:
   ```
   https://your-cognito-domain.auth.eu-north-1.amazoncognito.com/oauth2/idpresponse
   https://screentimejourney.com/product/screentimejourney?checkout=true
   ```

### **Step 5: Test Google OAuth**
1. Deploy your changes: Vercel will auto-deploy after env vars are added
2. Visit: `https://screentimejourney.com/signin`
3. Click **"Sign In with Google"** → Should redirect to Google → Back to checkout! 🎉

---

## ✅ **Environment Variables Breakdown:**

### **🔐 Authentication (Required for Google OAuth)**
- `NEXT_PUBLIC_OAUTH_DOMAIN` ← **YOU MUST UPDATE THIS**
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` ← Already correct
- `GOOGLE_CLIENT_SECRET` ← Already correct

### **💳 Stripe (Required for Payments)**  
- `STRIPE_SECRET_KEY` ← Server-side payments
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` ← Client-side Stripe
- `NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_EUR` ← EUR price ID

### **🌍 Multi-Currency (Optional)**
- Various `NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_*` for different currencies

---

## 🆘 **Troubleshooting:**

**Problem**: Google OAuth doesn't work  
**Solution**: Make sure Cognito domain is correct and Google redirect URIs are updated

**Problem**: "Invalid redirect URI" error  
**Solution**: Check Google Console redirect URIs match your Cognito domain exactly

**Problem**: Stripe checkout fails  
**Solution**: Verify Stripe keys are correct in Vercel environment variables

---

## 🎯 **Next Steps After Upload:**
1. ✅ Upload env vars to Vercel  
2. ✅ Update Cognito domain placeholder
3. ✅ Configure Google OAuth in Cognito
4. ✅ Add redirect URIs to Google Console  
5. ✅ Test the complete flow: Start Now → Google Login → Checkout! 

**Your authentication system will be production-ready! 🚀**