import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "LearnGenius - AI-Powered Learning",
  description: "Learn any topic with AI-generated explanations, flashcards, and quizzes",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <main className="min-h-screen bg-gradient-to-br from-primary to-primary-dark">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'