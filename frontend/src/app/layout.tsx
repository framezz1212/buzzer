import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Real-time Buzzer System',
  description: 'A real-time buzzer system built with Socket.io',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
