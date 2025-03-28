"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import PageWrapper from "@/components/PageWrapper"
import Card from "@/components/Card"
import Button from "@/components/Button"

export default function ExplanationPage() {
  const [explanationData, setExplanationData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Get the explanation data from localStorage
    const data = localStorage.getItem("explanationData")
    if (data) {
      setExplanationData(JSON.parse(data))
    } else {
      // If no data, redirect to home
      router.push("/")
    }
  }, [router])

  if (!explanationData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-white">Loading...</div>
      </div>
    )
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{explanationData.topic}</h1>
          <p className="text-gray-300">Detailed Explanation</p>
        </motion.div>

        <Card className="w-full max-w-3xl p-6 mb-6">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-200 leading-relaxed whitespace-pre-line">{explanationData.content}</p>
          </div>

          <div className="mt-6 text-sm text-gray-400">
            Generated at: {new Date(explanationData.metadata.generated_at).toLocaleString()}
          </div>
        </Card>

        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    </PageWrapper>
  )
}

