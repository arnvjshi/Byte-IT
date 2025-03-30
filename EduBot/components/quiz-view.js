"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckIcon, XIcon, BrainIcon } from "lucide-react"

export default function QuizView({ quiz = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  if (quiz.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 glass-card">
        <div className="mb-4 p-4 rounded-full neomorphic">
          <BrainIcon className="h-12 w-12 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Quiz Available</h2>
        <p className="text-gray-400 max-w-md">
          Start a conversation in the chat tab, then switch to this tab to generate a quiz based on your discussion.
        </p>
      </div>
    )
  }

  const currentQuestion = quiz[currentIndex]

  const handleAnswerSelect = (value) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: value,
    })
  }

  const goToNext = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const resetQuiz = () => {
    setCurrentIndex(0)
    setSelectedAnswers({})
    setShowResults(false)
  }

  const calculateScore = () => {
    let correctAnswers = 0
    quiz.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    return {
      score: correctAnswers,
      total: quiz.length,
      percentage: Math.round((correctAnswers / quiz.length) * 100),
    }
  }

  if (showResults) {
    const result = calculateScore()

    return (
      <div className="h-full flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-2xl"
        >
          <Card className="p-8 glass-card text-center">
            <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
            <div className="text-6xl font-bold mb-6 text-blue-500">{result.percentage}%</div>
            <p className="text-xl mb-8">
              You got {result.score} out of {result.total} questions correct
            </p>

            <div className="mb-8">
              {quiz.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.correctAnswer
                return (
                  <div key={index} className="mb-4 text-left">
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckIcon className="h-5 w-5 text-green-500 mt-1" />
                      ) : (
                        <XIcon className="h-5 w-5 text-red-500 mt-1" />
                      )}
                      <div>
                        <p className="font-medium">{question.question}</p>
                        <p className="text-sm text-gray-400">Your answer: {question.options[selectedAnswers[index]]}</p>
                        {!isCorrect && (
                          <p className="text-sm text-green-500">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <Button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Quiz</h2>
        <p className="text-gray-400">
          Question {currentIndex + 1} of {quiz.length}
        </p>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full max-w-2xl mb-8"
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>

          <RadioGroup value={selectedAnswers[currentIndex]} onValueChange={handleAnswerSelect} className="space-y-3">
            {currentQuestion.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <RadioGroupItem value={optionIndex.toString()} id={`option-${currentIndex}-${optionIndex}`} />
                <Label htmlFor={`option-${currentIndex}-${optionIndex}`} className="text-base cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Card>
      </motion.div>

      <div className="flex gap-4">
        <Button onClick={goToPrevious} disabled={currentIndex === 0} variant="outline" className="neomorphic">
          Previous
        </Button>
        <Button
          onClick={goToNext}
          disabled={selectedAnswers[currentIndex] === undefined}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {currentIndex === quiz.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  )
}

