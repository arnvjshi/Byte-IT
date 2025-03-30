import os
from datetime import datetime
from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
import google.generativeai as genai
import uuid

# Load environment variables
load_dotenv()

# Configure Gemini API with "gemini-2.0-flash"
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel(model_name="gemini-2.0-flash")

app = Flask(__name__)

def generate_learning_content(topic, content_type='explanation'):
    """Generate learning content using Gemini 2.0 Flash API."""
    try:
        # Define different prompts based on content type
        prompts = {
            'explanation': f"""Provide a detailed, academic-level explanation of {topic}.
            - Use clear, structured sections
            - Step-by-step breakdown of concepts
            - Include real-world applications
            - Maintain scientific accuracy
            - No markdown only text
            - Use proper line breaks and paragraphs
            - Suitable for high school and early college students""",

            'flashcards': f"""Generate 6-8 detailed flashcards for {topic}. Each flashcard should:
            - Have a front side with a question or term
            - Should be less than 20 words
            - A back side with a clear and concise explanation
            - Vary in difficulty
            - Cover key concepts""",

            'multiple_choice': f"""Create 6-8 multiple-choice questions about {topic}. Each question should:
            - Test conceptual understanding
            - Have 4 answer options
            - Clearly indicate the correct answer with an asterisk (*)
            - Provide an explanation for the correct answer"""
        }

        # Generate response using Gemini 2.0 Flash
        response = model.generate_content([prompts.get(content_type, prompts['explanation'])])
        
        return response.text if hasattr(response, 'text') else "Error generating content"

    except Exception as e:
        return f"Error generating content: {str(e)}"

def parse_flashcards(raw_text, topic):
    """Parse raw text into structured flashcard JSON."""
    flashcards = []
    card_pairs = raw_text.split('\n\n')
    
    for i, pair in enumerate(card_pairs, 1):
        if ':' in pair:
            try:
                front, back = pair.split(':', 1)
                flashcards.append({
                    "id": f"flashcard_{uuid.uuid4().hex[:8]}",
                    "front": front.strip(),
                    "back": back.strip(),
                    "difficulty": "easy",
                    "category": topic
                })
            except Exception:
                continue
    
    return {
        "topic": topic,
        "learning_method": "flashcards",
        "content": flashcards,
        "metadata": {
            "total_items": len(flashcards),
            "generated_at": datetime.now().isoformat()
        }
    }

def parse_multiple_choice(raw_text, topic):
    """Parse raw text into structured multiple-choice questions JSON."""
    questions = []
    question_blocks = raw_text.split('\n\n')
    
    for i, block in enumerate(question_blocks, 1):
        try:
            lines = block.split('\n')
            if len(lines) < 5:
                continue
            
            question = lines[0].strip()
            options = []
            
            for option in lines[1:5]:
                is_correct = '*' in option
                option_text = option.replace('*', '').strip()
                options.append({
                    "text": option_text,
                    "is_correct": is_correct
                })
            
            explanation = lines[5] if len(lines) > 5 else "No explanation provided."
            
            questions.append({
                "id": f"mcq_{uuid.uuid4().hex[:8]}",
                "question": question,
                "options": options,
                "explanation": explanation,
                "difficulty": "medium",
                "category": topic
            })
        except Exception:
            continue
    
    return {
        "topic": topic,
        "learning_method": "multiple_choice",
        "content": questions,
        "metadata": {
            "total_items": len(questions),
            "generated_at": datetime.now().isoformat()
        }
    }

@app.route('/')
def index():
    """Render the main page."""
    return render_template('index.html')

@app.route('/generate_content', methods=['POST'])
def generate_content():
    """Generate explanation for a given topic."""
    topic = request.json.get('topic', 'Photosynthesis')
    
    explanation = generate_learning_content(topic, 'explanation')
    
    return jsonify({
        "topic": topic,
        "explanation": explanation
    })

@app.route('/get_learning_method', methods=['POST'])
def get_learning_method():
    """Generate learning content based on method."""
    topic = request.json.get('topic', 'Photosynthesis')
    method = request.json.get('method', 'flashcards')
    
    # Generate content
    raw_content = generate_learning_content(topic, 
                                            'flashcards' if method == 'flashcards' 
                                            else 'multiple_choice')
    
    # Parse content based on method
    if method == 'flashcards':
        content = parse_flashcards(raw_content, topic)
    elif method == 'mcq':
        content = parse_multiple_choice(raw_content, topic)
    else:
        content = {
            "topic": topic,
            "learning_method": "unknown",
            "content": [],
            "metadata": {
                "total_items": 0,
                "generated_at": datetime.now().isoformat()
            }
        }
    
    return jsonify(content)

if __name__ == '__main__':
    app.run(debug=True)
