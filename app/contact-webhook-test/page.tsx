"use client"

export default function WebhookTestPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Webhook Test (Removed)</h1>
        <p className="text-gray-600">
          The GoHighLevel webhook integration has been removed.
          Contact forms now use EmailJS + LeadFlow CRM.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p className="text-yellow-800">
          <strong>Notice:</strong> Please use the main <a href="/contact" className="text-blue-600 underline">contact page</a> to test form submissions.
        </p>
      </div>
    </div>
  );
}
