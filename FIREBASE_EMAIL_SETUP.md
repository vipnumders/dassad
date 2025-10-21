# Firebase Email Authentication Setup Guide

## Step 1: Enable Email/Password Authentication in Firebase Console

### 🔥 **CRITICAL STEP - This must be done first!**

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: `gobal-vip-numbers`

2. **Navigate to Authentication**
   - In the left sidebar, click **"Authentication"**
   - If you haven't set up authentication yet, click **"Get started"**

3. **Enable Email/Password Provider**
   - Click on the **"Sign-in method"** tab
   - Find **"Email/Password"** in the list of providers
   - Click on **"Email/Password"**
   - **Toggle the first switch to "Enable"** (Email/Password)
   - **Toggle the second switch to "Enable"** (Email link - optional but recommended)
   - Click **"Save"**

4. **Verify Settings**
   - Make sure you see "Email/Password" as "Enabled" in the providers list
   - The status should show a green checkmark

## Step 2: Configure Authorized Domains

1. **Go to Authentication Settings**
   - In Authentication section, click **"Settings"** tab
   - Scroll down to **"Authorized domains"**

2. **Add Required Domains**
   - Click **"Add domain"**
   - Add: `localhost` (for local testing)
   - Add: Your production domain (if you have one)
   - Add: `127.0.0.1` (for local testing)

## Step 3: Test the Setup

1. **Open the test page**
   - Open `test-email-auth.html` in your browser
   - Click "Test Email Authentication"
   - If successful, you'll see "✅ Email authentication working!"

2. **Test in main app**
   - Open `index.html` in your browser
   - Try creating a new account
   - Try logging in with the created account

## Step 4: Troubleshooting Common Issues

### Issue: "auth/operation-not-allowed"
**Solution**: Email/Password provider is not enabled in Firebase Console
- Go to Firebase Console → Authentication → Sign-in method
- Enable Email/Password provider

### Issue: "auth/unauthorized-domain"
**Solution**: Domain not authorized
- Go to Firebase Console → Authentication → Settings
- Add your domain to authorized domains

### Issue: "auth/network-request-failed"
**Solution**: Network or Firebase project issues
- Check your internet connection
- Verify Firebase project is active
- Check Firebase Console for any service disruptions

### Issue: "auth/invalid-credential"
**Solution**: Wrong email/password or user doesn't exist
- Verify email and password are correct
- Try creating a new account first

## Step 5: Firebase Project Verification

### Check Project Status
1. Go to Firebase Console → Project Overview
2. Verify project name: `gobal-vip-numbers`
3. Check that the project is active (not paused or disabled)

### Verify Project ID
Your current configuration uses:
- Project ID: `gobal-vip-numbers`
- Auth Domain: `gobal-vip-numbers.firebaseapp.com`

Make sure these match exactly in your Firebase Console.

## Step 6: Browser Console Debugging

1. **Open Browser Developer Tools**
   - Press F12 or right-click → Inspect
   - Go to Console tab

2. **Look for Error Messages**
   - Any Firebase-related errors will appear here
   - Common error codes and their meanings are listed above

3. **Check Network Tab**
   - Look for failed requests to Firebase
   - Check if requests are being blocked

## Step 7: Test Commands

You can test Firebase connection directly in browser console:

```javascript
// Test Firebase connection
console.log('Firebase app:', firebase.app());

// Test auth object
console.log('Auth object:', firebase.auth());

// Test current user
firebase.auth().onAuthStateChanged(user => {
    console.log('Auth state changed:', user);
});
```

## Quick Fix Checklist

- [ ] Email/Password provider enabled in Firebase Console
- [ ] Authorized domains include localhost
- [ ] Firebase project is active
- [ ] Project ID matches configuration
- [ ] No browser console errors
- [ ] Internet connection is stable

## Still Having Issues?

If you're still unable to log in after following these steps:

1. **Check the diagnostic tool**: Open `firebase-diagnostic.html`
2. **Verify Firebase Console settings**: Double-check all settings
3. **Try a different browser**: Sometimes browser extensions interfere
4. **Clear browser cache**: Old cached data might cause issues
5. **Check Firebase status**: Visit https://status.firebase.google.com/

## Support Resources

- [Firebase Documentation](https://firebase.google.com/docs/auth/web/start)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Support](https://firebase.google.com/support)
