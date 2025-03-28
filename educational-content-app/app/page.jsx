"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import PageWrapper from "@/components/PageWrapper"
import Card from "@/components/Card"
import Button from "@/components/Button"
import LoadingIndicator from "@/components/LoadingIndicator"
import { useRouter } from "next/navigation"

export default function Home() {
  const [topic, setTopic] = useState("")
  const [method, setMethod] = useState("explanation")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (method === "explanation") {
        const res = await axios.post("/api/generate-content", {
          topic,
          method: "explanation",
        })

        // Store the response in localStorage to access it on the explanation page
        localStorage.setItem("explanationData", JSON.stringify(res.data))
        router.push("/explanation")
      } else if (method === "flashcards") {
        const res = await axios.post("/api/generate-content", {
          topic,
          method: "flashcards",
        })

        localStorage.setItem("flashcardsData", JSON.stringify(res.data))
        router.push("/flashcards")
      } else if (method === "mcq") {
        const res = await axios.post("/api/generate-content", {
          topic,
          method: "mcq",
        })

        localStorage.setItem("mcqData", JSON.stringify(res.data))
        router.push("/mcq")
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      alert("Failed to fetch data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-primary">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            Learn<span className="text-secondary">Genius</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">Your AI-powered learning companion</p>
        </motion.div>

        <Card className="w-full max-w-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="topic" className="block text-gray-200 font-medium">
                What would you like to learn about?
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Photosynthesis"
                className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="method" className="block text-gray-200 font-medium">
                Choose your learning method
              </label>
              <select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              >
                <option value="explanation">Explanation</option>
                <option value="flashcards">Flashcards</option>
                <option value="mcq">Multiple Choice Questions</option>
              </select>
            </div>

            <Button type="submit" disabled={loading || !topic}>
              {loading ? <LoadingIndicator /> : "Generate Learning Content"}
            </Button>
          </form>
        </Card>
      </div>
    </PageWrapper>
  )
}

