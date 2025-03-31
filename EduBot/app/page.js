"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, MessageCircleIcon, BookOpenIcon, BrainIcon, Loader2 } from "lucide-react"
import dynamic from "next/dynamic"
import { Canvas } from "@react-three/fiber"
import { Environment, Stars, Float } from "@react-three/drei"

// Dynamic import of the interactive background component
const DynamicInteractiveBackground = dynamic(
  () => import("@/components/interactive-background"),
  { ssr: false, loading: () => <LoadingPlaceholder /> }
)

// Custom loading component with animation
function LoadingPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="text-blue-400 animate-pulse">Loading experience...</p>
      </div>
    </div>
  )
}

// Enhanced Three.js background
function EnhancedBackground() {
  return (
    <Canvas className="bg-black">
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="night" />
      <ambientLight intensity={0.1} />
      <Suspense fallback={null}>
        <DynamicInteractiveBackground />
      </Suspense>
    </Canvas>
  )
}

// Animated cursor component
function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", updatePosition)
    return () => window.removeEventListener("mousemove", updatePosition)
  }, [])

  return (
    <motion.div
      className="hidden md:block pointer-events-none fixed top-0 left-0 w-6 h-6 rounded-full bg-blue-500 mix-blend-screen z-50"
      animate={{ x: position.x - 12, y: position.y - 12 }}
      transition={{ type: "spring", damping: 20, mass: 0.3 }}
    />
  )
}

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <>
      <AnimatedCursor />
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-4xl font-bold text-blue-500"
            >
              EduBot
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative min-h-screen overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <EnhancedBackground />
        </div>
        
        <div className="relative z-10 backdrop-blur-sm backdrop-filter bg-black bg-opacity-30">
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="container mx-auto p-4 flex justify-between items-center"
          >
            <motion.h1 
              className="text-2xl font-bold"
              whileHover={{ 
                textShadow: "0 0 8px rgb(59, 130, 246)", 
                color: "#60a5fa" 
              }}
            >
              EduBot
            </motion.h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {theme === "dark" ? 
                  <SunIcon className="h-5 w-5 text-yellow-400" /> : 
                  <MoonIcon className="h-5 w-5 text-blue-400" />
                }
              </motion.div>
            </Button>
          </motion.header>

          <main className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                stiffness: 100
              }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h2 
                className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600"
                animate={{ 
                  backgroundPosition: ["0% center", "100% center", "0% center"],
                }}
                transition={{
                  duration: 10,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                Learn Smarter with AI
              </motion.h2>
              <motion.p 
                className="text-xl mb-8 text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                Personalized learning experiences powered by Gemini 2.0 Flash
              </motion.p>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/chat">
                  <Button className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 border-2 border-blue-400 border-opacity-20 shadow-lg shadow-blue-900/30 transition-all duration-300">
                    <motion.span
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Start Learning Now
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0)", 
                          "0 0 0 10px rgba(59, 130, 246, 0.3)",
                          "0 0 0 15px rgba(59, 130, 246, 0)"
                        ] 
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
            >
              <FeatureCard
                icon={<MessageCircleIcon className="h-10 w-10 text-blue-500" />}
                title="AI Chat Assistant"
                description="Get instant answers and explanations from our AI powered by Gemini 2.0 Flash."
                delay={0.2}
              />
              <FeatureCard
                icon={<BookOpenIcon className="h-10 w-10 text-blue-500" />}
                title="Interactive Flashcards"
                description="Review key concepts with AI-generated flashcards tailored to your learning needs."
                delay={0.4}
              />
              <FeatureCard
                icon={<BrainIcon className="h-10 w-10 text-blue-500" />}
                title="Personalized Quizzes"
                description="Test your knowledge with custom quizzes created based on your conversations."
                delay={0.6}
              />
            </motion.div>
          </main>
          
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="container mx-auto p-4 text-center text-gray-500 text-sm mt-16"
          >
            <p>© {new Date().getFullYear()} EduBot. Empowering learning through AI.</p>
          </motion.footer>
        </div>
      </div>
    </>
  )
}

function FeatureCard({ icon, title, description, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 100, damping: 10 }}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        borderColor: "rgba(59, 130, 246, 0.5)"
      }}
      className="glass-card p-8 rounded-xl backdrop-blur-lg bg-slate-900/40 border border-slate-700/50 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div 
          className="mb-4 p-4 rounded-full bg-slate-800/80 border border-blue-900/50"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              filter: ["drop-shadow(0 0 0px rgba(59, 130, 246, 0.8))", "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))", "drop-shadow(0 0 0px rgba(59, 130, 246, 0.8))"] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {icon}
          </motion.div>
        </motion.div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}