"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeftIcon, SendIcon, MoonIcon, SunIcon, BookOpenIcon, BrainIcon, MessageCircleIcon } from "lucide-react"
import ChatMessage from "@/components/chat-message"
import FlashcardView from "@/components/flashcard-view"
import QuizView from "@/components/quiz-view"

export default function ChatPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const queryClient = useQueryClient()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [activeTab, setActiveTab] = useState("chat")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  // Load messages from localStorage
  useEffect(() => {
    setMounted(true)
    const savedMessages = localStorage.getItem("chatMessages")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  // Save messages to localStorage
  useEffect(() => {
    if (mounted && messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages))
    }
  }, [messages, mounted])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    if (mounted) {
      inputRef.current?.focus()
    }
  }, [mounted])

  const sendMessageMutation = useMutation({
    mutationFn: async (message) => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, mode: activeTab }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      return response.json()
    },
    onMutate: (message) => {
      // Optimistically update UI
      const newUserMessage = { role: "user", content: message }
      setMessages((prev) => [...prev, newUserMessage])
      setInput("")
      setIsTyping(true)
    },
    onSuccess: (data) => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])

      // If we're in flashcard or quiz mode, update those views
      if (activeTab === "flashcards") {
        queryClient.setQueryData(["flashcards"], data.flashcards || [])
      } else if (activeTab === "quiz") {
        queryClient.setQueryData(["quiz"], data.quiz || [])
      }
    },
    onError: (error) => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
      console.error("Error sending message:", error)
    },
  })

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    sendMessageMutation.mutate(input)
  }

  const { data: flashcards } = useQuery({
    queryKey: ["flashcards"],
    queryFn: async () => {
      if (messages.length === 0) return []

      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate flashcards")
      }

      return response.json()
    },
    enabled: activeTab === "flashcards" && messages.length > 0,
  })

  const { data: quiz } = useQuery({
    queryKey: ["quiz"],
    queryFn: async () => {
      if (messages.length === 0) return []

      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate quiz")
      }

      return response.json()
    },
    enabled: activeTab === "quiz" && messages.length > 0,
  })

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")} aria-label="Go back">
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">AI Learning Assistant</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="self-center mb-4">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircleIcon className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex items-center gap-2">
              <BookOpenIcon className="h-4 w-4" />
              <span>Flashcards</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <BrainIcon className="h-4 w-4" />
              <span>Quiz</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col space-y-4">
            <div className="flex-1 overflow-y-auto p-4 glass-card">
              <AnimatePresence>
                {messages.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="mb-4 p-4 rounded-full neomorphic">
                      <MessageCircleIcon className="h-12 w-12 text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Start a Conversation</h2>
                    <p className="text-gray-400 max-w-md">
                      Ask any question to begin learning with our AI assistant powered by Gemini 2.0 Flash.
                    </p>
                  </motion.div>
                ) : (
                  messages.map((message, index) => <ChatMessage key={index} message={message} />)
                )}
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold">AI</span>
                    </div>
                    <Card className="p-3 max-w-[80%]">
                      <div className="typing-indicator">Thinking...</div>
                    </Card>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 neomorphic"
              />
              <Button
                type="submit"
                disabled={!input.trim() || sendMessageMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <SendIcon className="h-5 w-5" />
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="flashcards" className="flex-1">
            <FlashcardView flashcards={flashcards || []} />
          </TabsContent>

          <TabsContent value="quiz" className="flex-1">
            <QuizView quiz={quiz || []} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

