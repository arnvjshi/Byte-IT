import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(request) {
  try {
    const { messages } = await request.json()

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 })
    }

    // Extract the conversation content
    const conversationText = messages
      .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n\n")

    // Get the model - using Gemini 2.0 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Create the prompt for generating quiz questions
    const prompt = `
      Based on the following conversation, create a 5-question multiple-choice quiz about the key concepts discussed.
      Each question should have 4 options with one correct answer.
      Format your response as a JSON array of objects, each with 'question', 'options' (array of strings), and 'correctAnswer' (index of the correct option as a string) fields.
      
      Conversation:
      ${conversationText}
      
      Response format example:
      [
        {
          "question": "What is the capital of France?",
          "options": ["London", "Berlin", "Paris", "Madrid"],
          "correctAnswer": "2"
        },
        ...
      ]
    `

    // Generate the quiz
    const result = await model.generateContent(prompt)
    const response = result.response.text()

    // Parse the JSON response
    // Note: In a production environment, you would want more robust parsing and error handling
    let quiz = []
    try {
      // Extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        quiz = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("Could not extract JSON from response")
      }
    } catch (error) {
      console.error("Error parsing quiz:", error)
      // Fallback to sample quiz
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

    return NextResponse.json(quiz)
  } catch (error) {
    console.error("Error in quiz API:", error)
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 })
  }
}

