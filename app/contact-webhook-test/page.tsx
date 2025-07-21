"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

// Direct webhook function for testing
const sendToWebhookOnly = async (formData: any) => {
  const webhookData = {
    data: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city || 'Roermond',
      message: formData.message
    }
  };

  const response = await fetch("https://services.leadconnectorhq.com/hooks/k90zUH3RgEQLfj7Yc55b/webhook-trigger/54670718-ea44-43a1-a81a-680ab3d5f67f", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(webhookData)
  });

  if (!response.ok) {
    throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
  }

  return {
    status: response.status,
    statusText: response.statusText,
    data: await response.text()
  };
}

export default function WebhookTestPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    details?: any;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await sendToWebhookOnly(formData);
      setResult({
        success: true,
        message: "Webhook test successful!",
        details: response
      });
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || "Unknown error occurred",
        details: error
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">GHL Webhook Test Page</h1>
        <Badge variant="secondary" className="mb-4">Testing Only - Not Indexed</Badge>
        <p className="text-gray-600">
          This page tests the GoHighLevel webhook integration only (EmailJS is bypassed).
          Use this to verify webhook connectivity and troubleshoot issues.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Contact Form</CardTitle>
          <CardDescription>
            Fill out the form to test the webhook endpoint directly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Test Naam"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="test@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              type="tel"
              placeholder="0612345678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <Input
              placeholder="Stad (optional)"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <Textarea
              placeholder="Test bericht voor webhook"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing Webhook...
                </>
              ) : (
                "Test Webhook"
              )}
            </Button>
          </form>

          {result && (
            <div className={`mt-6 p-4 rounded-lg border ${
              result.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center mb-2">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 mr-2" />
                )}
                <span className={`font-medium ${
                  result.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.message}
                </span>
              </div>
              
              {result.details && (
                <div className="mt-3">
                  <details className="text-sm">
                    <summary className="cursor-pointer font-medium">
                      Response Details
                    </summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                      {JSON.stringify(result.details, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Debug Information</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Webhook URL:</strong> https://services.leadconnectorhq.com/hooks/k90zUH3RgEQLfj7Yc55b/webhook-trigger/54670718-ea44-43a1-a81a-680ab3d5f67f</p>
              <p><strong>Expected Response:</strong> 200 OK</p>
              <p><strong>Data Format:</strong> JSON with nested "data" object</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}