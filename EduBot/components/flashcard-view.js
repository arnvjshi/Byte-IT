"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon, RotateCwIcon } from "lucide-react"

export default function FlashcardView({ flashcards = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (flashcards.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 glass-card">
        <div className="mb-4 p-4 rounded-full neomorphic">
          <RotateCwIcon className="h-12 w-12 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Flashcards Yet</h2>
        <p className="text-gray-400 max-w-md">
          Start a conversation in the chat tab, then switch to this tab to generate flashcards based on your discussion.
        </p>
      </div>
    )
  }

  const currentCard = flashcards[currentIndex]

  const goToNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setFlipped(false)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setFlipped(false)
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Flashcards</h2>
        <p className="text-gray-400">
          Card {currentIndex + 1} of {flashcards.length}
        </p>
      </div>

      <div className="w-full max-w-2xl h-80 perspective-1000 mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${flipped ? "back" : "front"}`}
            initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setFlipped(!flipped)}
            className="w-full h-full cursor-pointer"
          >
            <Card className="w-full h-full flex items-center justify-center p-8 glass-card">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">{flipped ? "Answer" : "Question"}</h3>
                <p className="text-lg">{flipped ? currentCard.answer : currentCard.question}</p>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4">
        <Button onClick={goToPrevious} disabled={currentIndex === 0} variant="outline" className="neomorphic">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Previous
        </Button>
        <Button onClick={() => setFlipped(!flipped)} className="bg-blue-600 hover:bg-blue-700">
          <RotateCwIcon className="h-5 w-5 mr-2" />
          Flip Card
        </Button>
        <Button
          onClick={goToNext}
          disabled={currentIndex === flashcards.length - 1}
          variant="outline"
          className="neomorphic"
        >
          Next
          <ArrowRightIcon className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}

