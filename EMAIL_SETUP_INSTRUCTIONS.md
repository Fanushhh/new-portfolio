# EmailJS Setup Instructions

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. Go to the **Email Services** section in your dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email
5. **Note down your Service ID** (you'll need this later)

## Step 3: Create Email Template
1. Go to the **Email Templates** section
2. Click **Create New Template**
3. Use this template content:

### Template Subject:
```
New Contact Form Message from {{from_name}}
```

### Template Body:
```
Hello {{to_name}},

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Date: {{submission_date}}
Time: {{submission_time}}

Message:
{{message}}

---
Additional Information:
- Website: {{website_url}}
- User Agent: {{user_agent}}

Reply to: {{reply_to}}

This message was sent from your portfolio contact form.
```

### IMPORTANT: Template Settings
Make sure your EmailJS template settings are configured as follows:

1. **To Email**: Set to `{{to_email}}` or manually enter your email
2. **From Name**: Set to `{{from_name}}`
3. **From Email**: Use your verified email service (not `{{from_email}}`)
4. **Reply To**: Set to `{{reply_to}}` so replies go to the form submitter

4. **Note down your Template ID** (you'll need this later)

## Step 4: Get Your User ID
1. Go to the **Account** section in your dashboard
2. Find your **User ID** (also called Public Key)
3. **Note down your User ID**

## Step 5: Configure Your Website
1. Open the `email-config.js` file in your project
2. Replace the placeholder values with your actual credentials:

```javascript
const EMAIL_CONFIG = {
    USER_ID: 'your_actual_user_id_here',
    SERVICE_ID: 'your_actual_service_id_here',
    TEMPLATE_ID: 'your_actual_template_id_here'
};
```

## Step 6: Test Your Setup
1. Open your website in a browser
2. Fill out the contact form
3. Submit the form
4. Check your email (fgabriel.mihailescu@gmail.com) for the message

## Template Variables Explained

The following variables are automatically populated from your contact form:

- `{{from_name}}` - Visitor's name from the form
- `{{from_email}}` - Visitor's email from the form
- `{{message}}` - Visitor's message from the form
- `{{submission_date}}` - Date when form was submitted
- `{{submission_time}}` - Time when form was submitted
- `{{website_url}}` - URL of your website
- `{{user_agent}}` - Visitor's browser information
- `{{reply_to}}` - Set to visitor's email for easy replies

## Troubleshooting

### Common Errors:

**412 Error - Gmail API insufficient scopes:**
1. Go to EmailJS dashboard → Email Services
2. Find your Gmail service and click "Reconnect Service"
3. Grant ALL permissions including "Send emails"
4. Make sure service shows as "Connected" with green status

**422 Error - Template mismatch:**
1. Check that template variables match exactly what you're sending
2. Verify template is saved properly
3. Test template in EmailJS dashboard

**General troubleshooting:**
1. Check browser console for error messages
2. Verify all IDs in `email-config.js` are correct
3. Make sure your email service is properly connected in EmailJS
4. Check EmailJS dashboard for any error logs
5. Try using EmailJS test feature to verify service works

## Security Note
Your EmailJS credentials are safe to use in frontend code as they're designed for client-side use. However, consider setting up domain restrictions in your EmailJS dashboard to prevent unauthorized use.

## Free Tier Limits
- 200 emails per month
- Upgrade to paid plans for higher limits if needed

That's it! Your contact form should now send real emails to fgabriel.mihailescu@gmail.com.