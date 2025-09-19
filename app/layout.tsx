import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Costa - Insurance Management Dashboard",
  description: "Professional dashboard for managing car insurance accident reports and customer data",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute>{children}</ProtectedRoute>
          </Suspense>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
