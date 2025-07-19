// EmailJS Configuration
// Replace these values with your actual EmailJS credentials

const EMAIL_CONFIG = {
    // Your EmailJS User ID (found in your EmailJS dashboard)
    USER_ID: 'ZUFI60sRcmDZk0ocU',
    
    // Your EmailJS Service ID (Gmail, Outlook, etc.)
    SERVICE_ID: 'service_a4mjyf9',
    
    // Your EmailJS Template ID
    TEMPLATE_ID: 'template_iktn4hi'
};

// EmailJS Template Variables (these will be populated from the form)
// Template should use these variable names:
/*
Template Content Example:

Subject: New Contact Form Message from {{from_name}}

Hello,

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Date: {{submission_date}}
Time: {{submission_time}}
User Agent: {{user_agent}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
*/

// Template Variables that will be sent:
const TEMPLATE_VARIABLES = {
    user_email: 'fgabriel.mihailescu@gmail.com',
    from_name: '', // Will be filled from form
    from_email: '', // Will be filled from form
    message: '', // Will be filled from form
    submission_date: '', // Will be auto-generated
    submission_time: '', // Will be auto-generated
    user_agent: '', // Will be auto-generated
    website_url: window.location.href
};