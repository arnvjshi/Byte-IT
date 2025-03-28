from flask import Flask, render_template, request, jsonify
import base64
import os
import google.generativeai as genai
from google.generativeai import types

app = Flask(__name__)

# Google Gemini AI Client Setup
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
model = "gemini-2.0-flash"

def get_ai_response(user_input):
    contents = [
        types.Content(role="user", parts=[types.Part.from_text(text=user_input)])
    ]
    tools = [types.Tool(google_search=types.GoogleSearch())]
    generate_content_config = types.GenerateContentConfig(tools=tools)

    response = client.models.generate_content_stream(
        model=model, contents=contents, config=generate_content_config
    )
    return "".join([chunk.text for chunk in response])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No input received"}), 400

    response = get_ai_response(user_input)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
