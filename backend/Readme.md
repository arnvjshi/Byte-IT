## [**EduBot**](https://edu-bot-six.vercel.app/) : _AI-Powered Learning Platform_

An AI-driven learning platform built using **Next.js** (frontend) and **Flask** (backend). It leverages **Gemini 2.0 Flash** for generating explanations, flashcards, MCQs, and quizzes based on user preferences.

## Features
- **AI-Powered Content Generation**: Explanations, flashcards, and quizzes based on user input.
- **Real-time API Calls**: Utilizes Gemini 2.0 Flash for fast and dynamic responses.
- **Interactive Learning**: Supports user-chosen learning styles.
- **Scalable Architecture**: Frontend in Next.js, backend in Flask.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS, Three.js
- **Backend**: Flask, Python
- **AI Model**: Gemini 2.0 Flash
- **Database**: MongoDB (optional for user data and progress tracking)

## Installation

### Prerequisites
- Node.js & npm
- Python & pip

### Setup
```bash
# Clone the repository
git clone https://github.com/arnvjshi/EduBot.git
cd your-repo

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
```

## Running the Project

### Start the Backend
```bash
cd backend
python flaskapp.py
```

### Start the Frontend
```bash
cd frontend
npm run dev
```

## API Endpoints
- `POST /generate` - Generate explanations, flashcards, or quizzes

## Contributing
Feel free to submit issues and pull requests to improve the project.

## License
This project is licensed under the MIT License.
