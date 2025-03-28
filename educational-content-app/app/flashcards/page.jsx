"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import PageWrapper from "@/components/PageWrapper"
import Button from "@/components/Button"
import FlashCard from "@/components/FlashCard"

export default function FlashcardsPage() {
  const [flashcardsData, setFlashcardsData] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Get the flashcards data from localStorage
    const data = localStorage.getItem("flashcardsData")
    if (data) {
      setFlashcardsData(JSON.parse(data))
    } else {
      // If no data, redirect to home
      router.push("/")
    }
  }, [router])

  if (!flashcardsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const flashcards = flashcardsData.content

  const goToNextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col items-center p-4 pt-12 bg-primary">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{flashcardsData.topic}</h1>
          <p className="text-gray-300">Flashcards</p>
        </motion.div>

        <div className="w-full max-w-2xl mb-8">
          <div className="relative h-64 md:h-80">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <FlashCard
                  front={flashcards[currentIndex].front}
                  back={flashcards[currentIndex].back}
                  difficulty={flashcards[currentIndex].difficulty}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center mt-6">
            <Button onClick={goToPrevCard} disabled={currentIndex === 0} className="px-4">
              Previous
            </Button>

            <div className="text-white">
              {currentIndex + 1} / {flashcards.length}
            </div>

            <Button onClick={goToNextCard} disabled={currentIndex === flashcards.length - 1} className="px-4">
              Next
            </Button>
          </div>
        </div>

        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    </PageWrapper>
  )
}

