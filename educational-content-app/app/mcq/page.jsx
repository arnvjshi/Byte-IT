"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import PageWrapper from "@/components/PageWrapper"
import Button from "@/components/Button"
import MCQQuestion from "@/components/MCQQuestion"

export default function MCQPage() {
  const [mcqData, setMcqData] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Get the MCQ data from localStorage
    const data = localStorage.getItem("mcqData")
    if (data) {
      setMcqData(JSON.parse(data))
    } else {
      // If no data, redirect to home
      router.push("/")
    }
  }, [router])

  if (!mcqData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const questions = mcqData.content

  const handleOptionSelect = (optionIndex) => {
    if (!isAnswered) {
      setSelectedOption(optionIndex)
      setIsAnswered(true)

      // Check if answer is correct and update score
      if (questions[currentIndex].options[optionIndex].is_correct) {
        setScore(score + 1)
      }
    }
  }

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedOption(null)
      setIsAnswered(false)
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{mcqData.topic}</h1>
          <p className="text-gray-300">Multiple Choice Questions</p>
        </motion.div>

        <div className="w-full max-w-2xl">
          <div className="mb-4 flex justify-between items-center">
            <div className="text-white">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="text-white">
              Score: {score} / {isAnswered ? currentIndex + 1 : currentIndex}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MCQQuestion
                question={questions[currentIndex].question}
                options={questions[currentIndex].options}
                selectedOption={selectedOption}
                isAnswered={isAnswered}
                onOptionSelect={handleOptionSelect}
                explanation={questions[currentIndex].explanation}
                difficulty={questions[currentIndex].difficulty}
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <Button onClick={() => router.push("/")}>Back to Home</Button>

            {isAnswered && (
              <Button onClick={goToNextQuestion} disabled={currentIndex === questions.length - 1}>
                {currentIndex === questions.length - 1 ? "Finish" : "Next Question"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

