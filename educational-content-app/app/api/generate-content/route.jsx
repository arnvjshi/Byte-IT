import { NextResponse } from "next/server"
import axios from "axios"

// Get Flask backend URL from environment variable or use default
const FLASK_BACKEND_URL = process.env.FLASK_BACKEND_URL || "http://127.0.0.1:5000"

export async function POST(request) {
  try {
    const body = await request.json()
    const { topic, method } = body

    // Determine the appropriate endpoint based on the method
    let endpoint = ""
    if (method === "explanation") {
      endpoint = `${FLASK_BACKEND_URL}/generate_content`
    } else {
      endpoint = `${FLASK_BACKEND_URL}/get_learning_method`
    }

    // Make the actual API call to the Flask backend
    const response = await axios.post(endpoint, {
      topic,
      method,
    })

    // Return the response from the Flask backend
    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to generate content", details: error.message }, { status: 500 })
  }
}

