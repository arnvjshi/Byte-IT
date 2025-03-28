"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Card from "./Card"

export default function FlashCard({ front, back, difficulty }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div className="w-full h-full perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative w-full h-full transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          <Card className="w-full h-full flex flex-col justify-center items-center p-6">
            <div className="text-xl md:text-2xl font-medium text-white text-center">{front}</div>
            <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${getDifficultyColor()}`}></div>
            <div className="absolute bottom-4 text-gray-400 text-sm">Click to flip</div>
          </Card>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Card className="w-full h-full flex flex-col justify-center items-center p-6">
            <div className="text-lg md:text-xl text-gray-200 text-center">{back}</div>
            <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${getDifficultyColor()}`}></div>
            <div className="absolute bottom-4 text-gray-400 text-sm">Click to flip back</div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

