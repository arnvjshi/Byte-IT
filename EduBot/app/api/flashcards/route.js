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

    // Create the prompt for generating flashcards
    const prompt = `
      Based on the following conversation, create 5 flashcards with questions and answers about the key concepts discussed.
      Each flashcard should have a clear question and a concise answer.
      Format your response as a JSON array of objects, each with 'question' and 'answer' fields.
      
      Conversation:
      ${conversationText}
      
      Response format example:
      [
        {
          "question": "What is photosynthesis?",
          "answer": "The process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll."
        },
        ...
      ]
    `

    // Generate the flashcards
    const result = await model.generateContent(prompt)
    const response = result.response.text()

    // Parse the JSON response
    // Note: In a production environment, you would want more robust parsing and error handling
    let flashcards = []
    try {
      // Extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        flashcards = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("Could not extract JSON from response")
      }
    } catch (error) {
      console.error("Error parsing flashcards:", error)
      // Fallback to sample flashcards
      flashcards = [
        { question: "Sample Question 1", answer: "Sample Answer 1" },
        { question: "Sample Question 2", answer: "Sample Answer 2" },
        { question: "Sample Question 3", answer: "Sample Answer 3" },
        { question: "Sample Question 4", answer: "Sample Answer 4" },
        { question: "Sample Question 5", answer: "Sample Answer 5" },
      ]
    }

    return NextResponse.json(flashcards)
  } catch (error) {
    console.error("Error in flashcards API:", error)
    return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 })
  }
}

