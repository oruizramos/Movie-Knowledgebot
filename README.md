# KnowledgeBot

KnowledgeBot is a proof-of-concept AI Q&A system focused on movies. It demonstrates the structure and flow of a full-stack AI application, including:

Frontend-backend interaction – React frontend communicates with a FastAPI backend.

Prompt-driven responses – Supports multiple response styles (Concise, Detailed, Bullet).

Flexible AI integration – Designed to work with the OpenAI GPT-3.5 API, but falls back to placeholder responses when API access is unavailable."

Data context handling – Uses a small CSV-based knowledge base to provide context for answers.

The project acts as a template / skeleton for anyone looking to build or experiment with AI-powered Q&A systems. While the current “mock” responses are placeholders, the architecture allows easy extension to real AI models or more sophisticated mock logic.

---

## Table of Contents
* [Project Overview](#project-overview)
* [Live Demo/Deployment](#Demo)
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

This project demonstrates full-stack development, AI integration, and prompt engineering concepts. 

---

## Live demo - Deployment

* CHECK IT LIVE HERE: https://movies-knowledgebot.netlify.app/

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

## Using Your Own OpenAI Key
* If you have an active OpenAI account with credits, you can test the AI-powered responses instead of the mock fallback:

* 1. Obtain your API key from OpenAI
* 2. Update your .env file in the backend/ folder

```
OPENAI_API_KEY=your_openai_api_key_here
```

* 3. Restart the backend server to apply the new key:

``` 
uvicorn backend.main:app --reload
```

* 4. The frontend will automatically detect OpenAI mode. When you ask questions, the app will attempt real AI responses instead of mock answers.

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
* OpenAI API quota: Limited free tier may trigger mock fallback frequently. Without a valid API key or with limited free-tier quota, real AI responses may not be available. The project still works for testing, demonstration, and prompt experimentation.
* Knowledge base: Currently limited to the CSV file (imdb_movies.csv) — only 50 movies in the dataset. Can expand for richer context.
* Frontend warnings: VS Code may flag @tailwind rules in index.css. This does not affect production builds.
* Dynamic banners: Mode displays update based on last API call response — small timing differences may occur.

---

## Ideas for improvement:

* Expand the CSV knowledge base.
* Add more complex prompt engineering.
* Enable user authentication and personalized logs.
* Integrate more data sources (IMDb API, TMDB, etc.).
* Swap the AI backend to a more generous or open model (e.g., Hugging Face Inference API, Cohere, or similar), allowing full AI-powered responses without hitting strict free-tier quotas.
* Improve mock fallback system to provide more realistic, varied placeholder answers, making the demo more illustrative for prompt testing.
* Add analytics and monitoring for prompt performance and response quality, enabling systematic evaluation and optimization.


---

