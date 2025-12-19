# 🔐 Google OAuth Setup Guide for Screen Time Journey

## 📋 Google Cloud Console Setup

### Step 1: Configure OAuth Consent Screen
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **OAuth consent screen**
3. Select **External** user type
4. Fill in required fields:
   - **Application name**: Screen Time Journey
   - **User support email**: merijnkok959595@gmail.com
   - **Developer contact**: merijnkok959595@gmail.com
   - **Authorized domains**: `screentimejourney.com`

### Step 2: Add Test Users (Required for Testing)
Since your OAuth consent screen is not verified, you need to add test users:

1. In OAuth consent screen, scroll to **Test users** section
2. Add these email addresses:
   - `merijnkok959595@gmail.com` (your own email)
   - Any other emails you want to test with

**⚠️ Important**: Only these test users can sign in with Google until your app is verified!

### Step 3: OAuth Credentials (Already Created)
✅ **Your Google OAuth Credentials:**
- **Client ID**: `590214170166-q0ccfs0npfkafonusgtn75n2r2ge16b0.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-***************************` (provided separately)

## 🚀 AWS Cognito Integration

### Step 4: Configure Cognito User Pool
1. Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
2. Select your User Pool: `eu-north-1_1kSVbpQXN`
3. Navigate to **Sign-in experience** → **Federated identity provider sign-in**

### Step 5: Add Google as Identity Provider
1. Click **Add identity provider**
2. Select **Google**
3. Enter your Google OAuth credentials:
   - **Client ID**: `590214170166-q0ccfs0npfkafonusgtn75n2r2ge16b0.apps.googleusercontent.com`
   - **Client secret**: `GOCSPX-***************************` (use the secret provided separately)
   - **Authorized scopes**: `openid email profile`

### Step 6: Configure App Client Settings
1. Go to **App integration** → **App clients**
2. Select your app client: `5j2nk1vlfok15ss7mh242bpd1h`
3. Configure **Hosted UI**:
   - **Allowed callback URLs**:
     - `https://screentimejourney.com/product/screentimejourney?checkout=true`
     - `http://localhost:3003/product/screentimejourney?checkout=true` (for local dev)
   - **Allowed sign-out URLs**:
     - `https://screentimejourney.com`
     - `http://localhost:3003` (for local dev)
   - **Identity providers**: Select **Google**
   - **OAuth 2.0 grant types**: Authorization code grant
   - **OAuth scopes**: `openid`, `email`, `profile`

### Step 7: Note Your Cognito Domain
After setup, you'll get a Cognito domain like:
`https://YOUR-COGNITO-DOMAIN.auth.eu-north-1.amazoncognito.com`

## 🔧 Environment Variables Setup

### Step 8: Update Vercel Environment Variables
Add these to your **marketing site** Vercel project:

```bash
# Google OAuth Configuration  
NEXT_PUBLIC_OAUTH_DOMAIN=YOUR-COGNITO-DOMAIN.auth.eu-north-1.amazoncognito.com
NEXT_PUBLIC_OAUTH_REDIRECT_SIGNIN=https://screentimejourney.com/product/screentimejourney?checkout=true
NEXT_PUBLIC_OAUTH_REDIRECT_SIGNOUT=https://screentimejourney.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=590214170166-q0ccfs0npfkafonusgtn75n2r2ge16b0.apps.googleusercontent.com
```

**Replace `YOUR-COGNITO-DOMAIN` with your actual Cognito domain!**

## ✅ Testing Checklist

### Local Testing:
- [ ] Add test users to Google OAuth consent screen
- [ ] Configure Cognito with Google identity provider
- [ ] Update local environment variables
- [ ] Test Google sign-in locally at `http://localhost:3003/signin`

### Production Testing:
- [ ] Deploy environment variables to Vercel
- [ ] Test Google sign-in at `https://screentimejourney.com/signin`
- [ ] Verify redirect to checkout after successful authentication

## 📝 Current Status

✅ **Completed:**
- Google OAuth application created
- Client ID and secret obtained
- React components updated to support Google OAuth
- Authentication flow configured (signin → checkout)

🔄 **Next Steps:**
1. Find your Cognito domain name
2. Configure Google as identity provider in Cognito
3. Update environment variables with actual domain
4. Add test users to Google OAuth consent
5. Test the flow!

## 🆘 Troubleshooting

**Problem**: "OAuth access is restricted to the test users"
**Solution**: Add your email to test users in Google Cloud Console

**Problem**: Google OAuth not working
**Solution**: Verify callback URLs match exactly between Google Console and Cognito

**Problem**: Authentication redirect not working  
**Solution**: Check that redirect URLs are configured in both Google Console and Cognito

---

**🎯 Goal**: After setup, users can click "Sign In with Google" → authenticate → automatically redirect to Stripe checkout!