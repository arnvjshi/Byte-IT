import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(request) {
  try {
    const { message, mode, messages = [] } = await request.json()

    // Create a history from previous messages
    const history = messages
      .filter((msg) => msg.role === "user" || msg.role === "assistant")
      .map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }))

    // Get the model - using Gemini 2.0 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Create a chat session
    const chat = model.startChat({
      history,
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    })

    // Prepare system prompt based on mode
    let systemPrompt = ""

    switch (mode) {
      case "flashcards":
        systemPrompt = `You are an educational AI assistant. The user is asking about a topic and wants to learn through flashcards. 
        Provide a detailed explanation, and then create 5 flashcards with questions and answers about the key concepts.
        Format your response as a detailed explanation first, followed by the flashcards.`
        break
      case "quiz":
        systemPrompt = `You are an educational AI assistant. The user is asking about a topic and wants to test their knowledge through a quiz. 
        Provide a detailed explanation, and then create a 5-question multiple-choice quiz about the key concepts.
        Each question should have 4 options with one correct answer.
        Format your response as a detailed explanation first, followed by the quiz questions and answers.`
        break
      default:
        systemPrompt = `You are an educational AI assistant powered by Gemini 2.0 Flash. 
        Provide detailed, accurate, and helpful responses to the user's questions.
        If appropriate, structure your response with clear headings and bullet points for better readability.`
    }

    // Send the message with the system prompt
    const result = await chat.sendMessage(`${systemPrompt}\n\nUser query: ${message}`)
    const response = result.response.text()

    // For flashcards and quiz modes, we would parse the response to extract the structured data
    // This is a simplified implementation
    let flashcards = []
    let quiz = []

    if (mode === "flashcards") {
      // In a real implementation, we would parse the response to extract flashcards
      // This is a placeholder
      flashcards = [
        { question: "Sample Question 1", answer: "Sample Answer 1" },
        { question: "Sample Question 2", answer: "Sample Answer 2" },
        { question: "Sample Question 3", answer: "Sample Answer 3" },
        { question: "Sample Question 4", answer: "Sample Answer 4" },
        { question: "Sample Question 5", answer: "Sample Answer 5" },
      ]
    } else if (mode === "quiz") {
      // In a real implementation, we would parse the response to extract quiz questions
      // This is a placeholder
      quiz = [
        {
          question: "Sample Question 1",
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: "0",
        },
        {
          question: "Sample Question 2",
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: "1",
        },
        {
          question: "Sample Question 3",
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: "2",
        },
        {
          question: "Sample Question 4",
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: "3",
        },
        {
          question: "Sample Question 5",
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: "0",
        },
      ]
    }

    return NextResponse.json({
      response,
      flashcards,
      quiz,
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}

