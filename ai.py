import base64
import os
from google import genai
from google.genai import types


def generate():
    client = genai.Client(
        api_key=os.environ.get("GEMINI_API_KEY"),
    )

    model = "gemini-2.0-flash"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""A chatbot that quickly answers students' academic questions with detailed explanations.

"""),
            ],
        ),
        types.Content(
            role="model",
            parts=[
                types.Part.from_text(text="""Okay, I understand! I'm ready to be a chatbot that quickly answers students' academic questions with detailed explanations. I will do my best to provide accurate and helpful information. Do you have any questions you'd like me to answer as a test?
"""),
            ],
        ),
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""Sure"""),
            ],
        ),
        types.Content(
            role="model",
            parts=[
                types.Part.from_text(text="""Great! To start, can you give me a question a student might ask? I'm ready to demonstrate how I can answer with a detailed explanation.
"""),
            ],
        ),
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""What is photosynthesis?"""),
            ],
        ),
        types.Content(
            role="model",
            parts=[
                types.Part.from_text(text="""Photosynthesis is how plants, algae, and some bacteria use sunlight to create their own food in the form of sugars. Essentially, it's the process of converting light energy into chemical energy.

Here's a more detailed breakdown:

**1. What's needed for photosynthesis?**

*   **Sunlight:** This provides the energy for the process.
*   **Water (H2O):** Plants absorb water through their roots.
*   **Carbon Dioxide (CO2):** Plants take in carbon dioxide from the air through small openings called stomata, which are usually on the underside of leaves.
*   **Chlorophyll:** This is a green pigment found in chloroplasts (more on that below) that captures light energy.

**2. Where does photosynthesis happen?**

*   **Chloroplasts:** These are organelles (small structures within cells) found in plant cells, primarily in the mesophyll layer of leaves. Chloroplasts are like tiny food factories.
*   **Thylakoids:** Inside the chloroplasts are thylakoids, which look like flattened discs stacked on top of each other. The thylakoid membranes contain chlorophyll.
*   **Stroma:** This is the fluid-filled space around the thylakoids within the chloroplast.

**3. How does it work?**

Photosynthesis happens in two main stages:

*   **Light-dependent reactions (or \"light reactions\"):**
    *   Chlorophyll absorbs sunlight. This energy splits water molecules into hydrogen ions, electrons, and oxygen.
    *   The energy from sunlight is converted into chemical energy, which is temporarily stored in molecules of ATP and NADPH.
    *   Oxygen is released as a byproduct.
*   **Light-independent reactions (or \"dark reactions\" / Calvin Cycle):**
    *   This stage doesn't directly require light.
    *   Carbon dioxide from the air is combined with an existing organic molecule in the stroma.
    *   Using the energy stored in ATP and NADPH from the light-dependent reactions, carbon dioxide is converted into glucose (a sugar). This process is called carbon fixation.
    *   The glucose can then be used to create other carbohydrates, such as cellulose and starch, which the plant uses for energy and building materials.

**4. The Overall Chemical Reaction**

The process of photosynthesis can be summarized by the following equation:

6CO2 + 6H2O + Light Energy → C6H12O6 + 6O2

*   **6CO2:** Six molecules of carbon dioxide
*   **6H2O:** Six molecules of water
*   **Light Energy:** Energy from sunlight
*   **C6H12O6:** One molecule of glucose (sugar)
*   **6O2:** Six molecules of oxygen

**5. Why is Photosynthesis Important?**

*   **Food Production:** Photosynthesis is the foundation of most food chains on Earth. Plants produce their own food through this process, and then animals eat plants, and other animals eat those animals, transferring the energy along the way.
*   **Oxygen Production:** Photosynthesis releases oxygen into the atmosphere, which is essential for the survival of humans and most other animals.
*   **Carbon Cycle:** Photosynthesis helps regulate the Earth's climate by removing carbon dioxide from the atmosphere.

**In simple terms:** Plants use sunlight, water, and carbon dioxide to make sugar (food) and oxygen.

I hope this explanation helps! Let me know if you have any other questions.
"""),
            ],
        ),
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""A chatbot that quickly answers students' academic questions with detailed explanations with gamefying and making flashcards for better understanding."""),
            ],
        ),
        types.Content(
            role="model",
            parts=[
                types.Part.from_text(text="""Okay, I've updated my understanding. I will now incorporate gamefication and flashcard creation into my responses to help students learn more effectively. I will also try to respond as quickly as possible while maintaining detailed explanations.

Here's how I envision the process:

1.  **Question Answering:** I'll provide a detailed, clear explanation of the student's question, similar to my previous response.
2.  **Gamefication:** I'll integrate elements of gamefication to make learning more engaging. This could include:

    *   **Quizzes:** Short multiple-choice or true/false questions related to the topic.
    *   **Challenges:** Asking the student to apply the knowledge they've gained to a specific scenario.
    *   **Points/Badges:** Awarding virtual points or badges for answering questions correctly or completing challenges.
    *   **Analogies/Real-world Connections:** Relating the concept to something familiar and interesting to the student.
3.  **Flashcard Creation:** I'll automatically generate flashcard-style summaries of key concepts and terms from the explanation. These could be presented in a digital format.

**Example:**

If a student asks \"What is the cell cycle?\", I would:

1.  Provide a detailed explanation of the cell cycle, including the different phases (G1, S, G2, M).
2.  Incorporate gamefication:

    *   **Quiz:** \"True or False: The S phase is when the cell divides.\"
    *   **Challenge:** \"Imagine you're a cell cycle controller. What would happen if the cell skipped the G1 phase?\"
3.  Generate flashcards:

    *   **Flashcard 1 (Front):** Cell Cycle
    *   **Flashcard 1 (Back):** The series of events that take place in a cell leading to its division and duplication of its DNA (replication) to produce two new daughter cells.
    *   **Flashcard 2 (Front):** Mitosis
    *   **Flashcard 2 (Back):** Part of the cell cycle in which chromosomes are separated into two identical sets in two nuclei.

Do you have any suggestions on how I can better implement the gamefication and flashcard creation aspects? Also, would you like me to answer the photosynthesis question again, but this time with the gamefication and flashcard features?
"""),
            ],
        ),
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""ask the learner how he'd like to play by quiz or challenge or whatever is suitable """),
            ],
        ),
        types.Content(
            role="model",
            parts=[
                types.Part.from_text(text="""Okay, I understand. I will now incorporate a step where I ask the learner how they'd like to engage with the material through gamification, offering options like quizzes, challenges, or other suitable methods.

Here's the updated process:

1.  **Question Answering:** Provide a detailed, clear explanation of the student's question.
2.  **Gamification Preference:** Ask the student how they would like to engage with the material for better understanding. For example: \"Would you like to test your knowledge with a quiz, apply what you've learned in a challenge, or explore another method to help you understand?\"
3.  **Gamification Implementation:** Based on the student's choice, I will implement the chosen gamification method.
4.  **Flashcard Creation:** Automatically generate flashcard-style summaries of key concepts and terms from the explanation.

Now, let's try this out with the photosynthesis question.

**Original Question:** What is photosynthesis?

**My Response:**

Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy in the form of sugars. They use sunlight, water, and carbon dioxide to create their own food and release oxygen as a byproduct.

Now, how would you like to engage with this information to help you understand it better? Would you prefer a quick quiz, a challenge where you apply this knowledge, or another method?
"""),
            ],
        ),
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""flash cards
"""),
            ],
        ),
        types.Content(
            role="model",
            parts=[
                types.Part.from_text(text="""Okay, great! You've chosen flashcards. Here are some flashcards based on the photosynthesis explanation:

**Flashcard 1:**

*   **Front:** Photosynthesis
*   **Back:** The process by which plants, algae, and some bacteria convert light energy into chemical energy (sugars).

**Flashcard 2:**

*   **Front:** Reactants of Photosynthesis
*   **Back:** Sunlight, Water (H2O), Carbon Dioxide (CO2)

**Flashcard 3:**

*   **Front:** Products of Photosynthesis
*   **Back:** Glucose (Sugar), Oxygen (O2)

**Flashcard 4:**

*   **Front:** Chlorophyll
*   **Back:** Green pigment in plants that absorbs sunlight for photosynthesis.

**Flashcard 5:**

*   **Front:** Where does Photosynthesis take place?
*   **Back:** Chloroplasts (specifically in the thylakoid membranes and stroma)

These flashcards summarize the key concepts of photosynthesis. You can use them to quickly review the definition, the necessary components, and the products of the process.

Would you like me to generate more flashcards on a specific aspect of photosynthesis, or would you like to move on to a new question?
"""),
            ],
        ),
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""make this a flask app compatible with frontend
"""),
            ],
        ),
        types.Content(
            role="model",
            parts=[
                types.Part.from_text(text="""Okay, I understand. You want me to structure the output in a way that's easily integrated into a Flask web application with a frontend. This means providing the information in a format like JSON that can be easily parsed and displayed.

Here's how I can modify my response to be Flask/Frontend compatible:

```python
import json

def photosynthesis_response():
    explanation = \"Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy in the form of sugars. They use sunlight, water, and carbon dioxide to create their own food and release oxygen as a byproduct.\"

    flashcards = [
        {
            \"front\": \"Photosynthesis\",
            \"back\": \"The process by which plants, algae, and some bacteria convert light energy into chemical energy (sugars).\"
        },
        {
            \"front\": \"Reactants of Photosynthesis\",
            \"back\": \"Sunlight, Water (H2O), Carbon Dioxide (CO2)\"
        },
        {
            \"front\": \"Products of Photosynthesis\",
            \"back\": \"Glucose (Sugar), Oxygen (O2)\"
        },
        {
            \"front\": \"Chlorophyll\",
            \"back\": \"Green pigment in plants that absorbs sunlight for photosynthesis.\"
        },
        {
            \"front\": \"Where does Photosynthesis take place?\",
            \"back\": \"Chloroplasts (specifically in the thylakoid membranes and stroma)\"
        }
    ]

    response = {
        \"explanation\": explanation,
        \"flashcards\": flashcards
    }

    return json.dumps(response)

# Example usage (to see the output):
if __name__ == '__main__':
    print(photosynthesis_response())
```

**Explanation:**

1.  **`photosynthesis_response()` Function:** This function encapsulates all the information related to the photosynthesis question.
2.  **`explanation` Variable:**  This holds the detailed explanation of photosynthesis.
3.  **`flashcards` List:** This is a list of dictionaries. Each dictionary represents a flashcard, with keys \"front\" and \"back\" for the two sides of the card.
4.  **`response` Dictionary:** This dictionary combines the `explanation` and `flashcards` into a single structure.
5.  **`json.dumps(response)`:**  This converts the Python dictionary into a JSON string.  JSON is a standard format for transmitting data between a server and a web browser.

**How to use this in Flask:**

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/photosynthesis')
def photosynthesis():
    explanation = \"Photosynthesis is the process...\"  # (Same explanation as before)
    flashcards = [...] # (Same flashcards as before)

    response = {
        \"explanation\": explanation,
        \"flashcards\": flashcards
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
```

**Frontend (JavaScript Example):**

```javascript
fetch('/photosynthesis')
  .then(response => response.json())
  .then(data => {
    console.log(data.explanation);
    console.log(data.flashcards);
    //  Use the data to update your HTML elements
    //  For example, display the explanation in a <p> tag
    //  and create <div> elements for each flashcard
  });
```

**Key improvements and how this addresses the prompt:**

*   **JSON Format:** The output is now a JSON string, making it directly usable in web applications.
*   **Structured Data:** The data is organized into a clear hierarchy (explanation and flashcards), making it easy to parse and display on the frontend.
*   **Flask Example:**  I've provided a basic Flask example to show how to serve this data from a route.
*   **Frontend Example:** I've included a JavaScript example to demonstrate how to fetch the data from the Flask server and access the explanation and flashcards.
*   **Clear Separation:** The code is now well-structured, with a dedicated function for generating the response.

This structure allows you to easily:

*   Display the explanation in a designated area of your webpage.
*   Dynamically create flashcard elements using the `flashcards` array.
*   Handle user interactions (e.g., flipping the flashcards).

Now, going forward, I will try to structure my responses in this JSON format by default, assuming that's what you need for your Flask/Frontend setup. Let me know if you have any other requirements!
"""),
            ],
        ),
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""update respectively in get code too
"""),
            ],
        ),
        types.Content(
            role="model",
            parts=[
                types.Part.from_text(text="""Okay, I will update the `photosynthesis` function in the Flask code snippet to use the same data structure and return the response using `jsonify`. Here's the updated Flask code:

```python
from flask import Flask, jsonify

app = Flask(__name__)

def get_photosynthesis_data():
    \"\"\"Returns photosynthesis explanation and flashcards in a dictionary.\"\"\"
    explanation = \"Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy in the form of sugars. They use sunlight, water, and carbon dioxide to create their own food and release oxygen as a byproduct.\"

    flashcards = [
        {
            \"front\": \"Photosynthesis\",
            \"back\": \"The process by which plants, algae, and some bacteria convert light energy into chemical energy (sugars).\"
        },
        {
            \"front\": \"Reactants of Photosynthesis\",
            \"back\": \"Sunlight, Water (H2O), Carbon Dioxide (CO2)\"
        },
        {
            \"front\": \"Products of Photosynthesis\",
            \"back\": \"Glucose (Sugar), Oxygen (O2)\"
        },
        {
            \"front\": \"Chlorophyll\",
            \"back\": \"Green pigment in plants that absorbs sunlight for photosynthesis.\"
        },
        {
            \"front\": \"Where does Photosynthesis take place?\",
            \"back\": \"Chloroplasts (specifically in the thylakoid membranes and stroma)\"
        }
    ]

    data = {
        \"explanation\": explanation,
        \"flashcards\": flashcards
    }
    return data


@app.route('/photosynthesis')
def photosynthesis():
    \"\"\"Returns the photosynthesis data as JSON.\"\"\"
    photosynthesis_data = get_photosynthesis_data()
    return jsonify(photosynthesis_data)  # Flask automatically converts the dictionary to JSON


if __name__ == '__main__':
    app.run(debug=True)
```

**Key Changes:**

1.  **`get_photosynthesis_data()` Function:** I've moved the data creation (explanation and flashcards) into a separate function called `get_photosynthesis_data()`. This makes the code more organized and reusable.
2.  **`jsonify()`:** The `photosynthesis()` route now uses `jsonify()` to directly convert the dictionary returned by `get_photosynthesis_data()` into a JSON response. Flask automatically sets the correct `Content-Type` header for you.

**Why this is better:**

*   **Organization:** Separating the data creation from the route handling makes the code easier to read and maintain.
*   **Reusability:** The `get_photosynthesis_data()` function can be used in other parts of your application if you need the same data.
*   **Conciseness:** The route handler is now very simple and focused on its core task: returning the data as JSON.
*   **Flask's Built-in JSON Handling:** Using `jsonify` leverages Flask's built-in capabilities for handling JSON responses, ensuring consistency and proper formatting.

Now the Flask app will serve the photosynthesis explanation and flashcards as a JSON object when you visit the `/photosynthesis` route. The frontend JavaScript code from my previous response will work seamlessly with this updated Flask code.
"""),
            ],
        ),
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""INSERT_INPUT_HERE"""),
            ],
        ),
    ]
    tools = [
        types.Tool(google_search=types.GoogleSearch())
    ]
    generate_content_config = types.GenerateContentConfig(
        tools=tools,
        response_mime_type="text/plain",
        system_instruction=[
            types.Part.from_text(text="""A chatbot that quickly answers students' academic questions with detailed explanations with gamefying and making flashcards for better understanding."""),
        ],
    )

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        print(chunk.text, end="")

if __name__ == "__main__":
    generate()
