"use client"

import { motion, AnimatePresence } from "framer-motion"
import Card from "./Card"

export default function MCQQuestion({
  question,
  options,
  selectedOption,
  isAnswered,
  onOptionSelect,
  explanation,
  difficulty,
}) {
  const getDifficultyLabel = () => {
    switch (difficulty) {
      case "easy":
        return "Easy"
      case "medium":
        return "Medium"
      case "hard":
        return "Hard"
      default:
        return difficulty
    }
  }

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500 text-white"
      case "medium":
        return "bg-yellow-500 text-black"
      case "hard":
        return "bg-red-500 text-white"
      default:
        return "bg-blue-500 text-white"
    }
  }

  return (
    <Card className="w-full p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-medium text-white">{question}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor()}`}>{getDifficultyLabel()}</span>
      </div>

      <div className="space-y-3 mt-6">
        {options.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: isAnswered ? 1 : 1.02 }}
            whileTap={{ scale: isAnswered ? 1 : 0.98 }}
            className={`
              p-4 rounded-lg cursor-pointer border transition-all
              ${
                isAnswered
                  ? option.is_correct
                    ? "bg-green-500/20 border-green-500"
                    : selectedOption === index
                      ? "bg-red-500/20 border-red-500"
                      : "bg-gray-800/50 border-gray-700"
                  : "bg-gray-800/50 border-gray-700 hover:border-gray-500"
              }
            `}
            onClick={() => onOptionSelect(index)}
          >
            <div className="flex items-center">
              <div className="mr-3">
                {isAnswered ? (
                  option.is_correct ? (
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : selectedOption === index ? (
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-500"></div>
                  )
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-500"></div>
                )}
              </div>
              <span className="text-gray-200">{option.text}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg"
          >
            <h4 className="text-white font-medium mb-2">Explanation:</h4>
            <p className="text-gray-300">{explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

