import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init({
  publicKey: "sjJ8kK6U9wFjY0zX9",
});

// EmailJS service and template IDs
export const EMAILJS_SERVICE_ID = "service_1rruujp";
export const EMAILJS_TEMPLATE_ID = "template_rkcpzhg";

// GoHighLevel webhook URL
const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/k90zUH3RgEQLfj7Yc55b/webhook-trigger/54670718-ea44-43a1-a81a-680ab3d5f67f";

// Debug mode for troubleshooting
const DEBUG_MODE = false;

interface EmailFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  city?: string;
}

// Send data to EmailJS
const sendViaEmailJS = async (formData: EmailFormData): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      city: formData.city || '',
      contact_number: Math.random() * 100000 | 0,
    };

    if (DEBUG_MODE) {
      console.log('Sending via EmailJS:', templateParams);
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status !== 200) {
      if (DEBUG_MODE) {
        console.error('EmailJS failed with status:', response.status);
      }
      return false;
    }

    if (DEBUG_MODE) {
      console.log('EmailJS success:', response);
    }
    return true;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('EmailJS error:', error);
    }
    return false;
  }
};

// Send data to GoHighLevel webhook
const sendToWebhook = async (formData: EmailFormData): Promise<boolean> => {
  try {
    const webhookData = {
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city || 'Roermond',
        message: formData.message
      }
    };

    if (DEBUG_MODE) {
      console.log('Sending to GHL webhook:', webhookData);
    }

    const response = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(webhookData)
    });

    if (!response.ok) {
      if (DEBUG_MODE) {
        console.error('Webhook failed with status:', response.status, await response.text());
      }
      return false;
    }
    
    if (DEBUG_MODE) {
      console.log('Webhook success:', response.status);
    }
    return true;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Webhook error:', error);
    }
    return false;
  }
};

// Main send function with dual submission
export const sendEmail = async (formData: EmailFormData): Promise<void> => {
  if (DEBUG_MODE) {
    console.log('Starting dual submission for:', formData);
  }

  // Send to both services simultaneously
  const [emailJSSuccess, webhookSuccess] = await Promise.allSettled([
    sendViaEmailJS(formData),
    sendToWebhook(formData)
  ]);

  const emailJSResult = emailJSSuccess.status === 'fulfilled' ? emailJSSuccess.value : false;
  const webhookResult = webhookSuccess.status === 'fulfilled' ? webhookSuccess.value : false;

  if (DEBUG_MODE) {
    console.log('Results - EmailJS:', emailJSResult, 'Webhook:', webhookResult);
  }

  // Only throw error if BOTH methods fail
  if (!emailJSResult && !webhookResult) {
    console.error('Both EmailJS and webhook failed');
    throw new Error('Failed to send contact form data');
  }

  if (DEBUG_MODE) {
    console.log('At least one submission succeeded');
  }
};
