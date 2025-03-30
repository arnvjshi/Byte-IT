"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function ChatMessage({ message }) {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-start gap-3 mb-4", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold">AI</span>
        </div>
      )}

      <Card className={cn("p-3 max-w-[80%]", isUser ? "bg-blue-600 text-white" : "glass-card")}>
        <div className="whitespace-pre-wrap">{message.content}</div>
      </Card>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-700 dark:text-gray-300 font-bold">You</span>
        </div>
      )}
    </motion.div>
  )
}

