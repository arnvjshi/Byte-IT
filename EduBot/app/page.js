"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import ThreeBackground from "@/components/three-background"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, MessageCircleIcon, BookOpenIcon, BrainIcon } from "lucide-react"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ThreeBackground />
      </div>

      <div className="relative z-10">
        <header className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Learning</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </header>

        <main className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Learn Smarter with AI
            </h2>
            <p className="text-xl mb-8 text-gray-300 dark:text-gray-300">
              Personalized learning experiences powered by Gemini 2.0 Flash
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/chat">
                <Button className="px-8 py-6 text-lg rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300">
                  Start Learning Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
          >
            <FeatureCard
              icon={<MessageCircleIcon className="h-10 w-10 text-blue-500" />}
              title="AI Chat Assistant"
              description="Get instant answers and explanations from our AI powered by Gemini 2.0 Flash."
            />
            <FeatureCard
              icon={<BookOpenIcon className="h-10 w-10 text-blue-500" />}
              title="Interactive Flashcards"
              description="Review key concepts with AI-generated flashcards tailored to your learning needs."
            />
            <FeatureCard
              icon={<BrainIcon className="h-10 w-10 text-blue-500" />}
              title="Personalized Quizzes"
              description="Test your knowledge with custom quizzes created based on your conversations."
            />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div whileHover={{ y: -10 }} className="glass-card p-6">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 rounded-full neomorphic">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}

