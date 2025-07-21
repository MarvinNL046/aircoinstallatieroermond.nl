export const metadata = {
  title: 'Webhook Test - Not for Production',
  robots: {
    index: false,
    follow: false,
  },
}

export default function WebhookTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}