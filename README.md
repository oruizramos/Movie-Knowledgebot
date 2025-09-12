# KnowledgeBot

KnowledgeBot is a full-stack, AI-powered question-answering application focused on movies. It allows users to ask questions about films and receive responses dynamically. It supports both OpenAI API-driven answers and a mock fallback for offline or quota-limited scenarios, making it robust for demonstration and testing purposes.

---

## Table of Contents
* [Project Overview](#project-overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Folder Structure](#folder-structure)
* [Setup & Installation](#setup--installation)
* [Usage](#usage)
* [Caveats & Limitations](#caveats--limitations)
* [Ideas for improvement](#ideas-for-improvement)
* [License](#license)

---

## Project Overview

KnowledgeBot is designed to showcase:

* Dynamic AI responses: Uses OpenAI GPT-3.5 API to generate answers about movies.
* Mock fallback: Ensures functionality even when API quota is exceeded.
* Flexible prompts: Supports different response styles (concise, detailed, bullet).
* Interactive frontend: React-based UI with dynamic banners showing the backend mode.

This project is ideal for demonstrating full-stack development, AI integration, and prompt engineering concepts to recruiters and hiring managers.

---

## Features
* Ask questions about movies from a CSV knowledge base.
* Receive AI-generated or simulated answers depending on API availability.
* Dynamic top banner indicating the mode (OpenAI or Mock).
* Bottom banner/source label showing answer provenance.
* Retry functionality for failed OpenAI calls.
* Multiple prompt styles: Concise, Detailed, Bullet.

---

## Tech Stack

### Frontend
* React (JSX)
* Tailwind CSS (utility-first styling)
* Axios (HTTP requests)

### Backend
* FastAPI (Python)
* SQLite (for logging and basic data storage)
* Pandas (to handle CSV knowledge base)
* OpenAI Python client
* python-dotenv (environment variables)

### Development Tools
* Node.js & npm (frontend)
* VS Code (recommended)
* Tailwind CSS Intellisense

---

## Folder Structure

knowledgebot/
├── backend/
│   ├── main.py             # FastAPI backend
│   ├── db.py               # SQLite initialization
│   ├── utils.py            # Prompt loader & logging
│   ├── prompts/            # YAML prompt templates
│   ├── requirements.txt
│   └── knowledgebot_logs.db
├── data/
│   └── imdb_movies.csv     # Knowledge base
├── experiments/
│   └── prompt_logs.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── AnswerDisplay.jsx
│   │   │   └── QuestionInput.jsx
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
└── README.md

---

## Setup & Installation

### Backend

Create a virtual environment.

```
python -m venv venv 
```
Install dependencies.

```
pip install -r backend/requirements.txt
```

Create a `.env` file in backend/.
```
OPENAI_API_KEY=your_openai_api_key
```

Start the backend server.
```
uvicorn backend.main:app --reload
```

### Frontend
Install Node dependencies.

```
cd frontend 
npm install
```
Start the development server.
``` 
npm start
```

The app will be available at http://localhost:3000.

---

## Usage
* Type a movie-related question in the input box.
* Select a prompt style (Concise, Detailed, Bullet).
* Click Ask.
* View AI or mock responses in the answer box.
* Retry with OpenAI if a mock answer is shown due to quota limits.

### Example:
* **Question**: "Give me a summary of The Matrix."
* **Prompt style**: Concise
* **Output**: AI-generated summary or mock fallback if quota exceeded.

---

## Caveats & Limitations
* OpenAI API quota: Limited free tier may trigger mock fallback frequently.
* Knowledge base: Currently limited to the CSV file (imdb_movies.csv) — only 50 movies in the dataset. Can expand for richer context.
* Frontend warnings: VS Code may flag @tailwind rules in index.css. This does not affect production builds.
* Dynamic banners: Mode displays update based on last API call response — small timing differences may occur.

---

## Ideas for improvement:

* Expand the CSV knowledge base.
* Add more complex prompt engineering.
* Enable user authentication and personalized logs.
* Integrate more data sources (IMDb API, TMDB, etc.).

---

