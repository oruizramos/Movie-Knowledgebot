from fastapi import FastAPI, Form
import pandas as pd
import os
from utils import load_prompt, save_log
from db import init_db
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

# Try importing OpenAI client
try:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    OPENAI_ENABLED = True
except Exception as e:
    client = None
    OPENAI_ENABLED = False
    print(f"⚠️ Failed to import OpenAI client: {e}")

app = FastAPI(title="KnowledgeBot")

# Add CORS middleware so React frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev: allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize SQLite
init_db()

# Load CSV knowledge base
df = pd.read_csv("../data/imdb_movies.csv")

# ✅ Print startup mode
if OPENAI_ENABLED:
    print("✅ OpenAI mode enabled — real API calls will be made.")
else:
    print("⚠️ Mock mode enabled — answers will be simulated.")

# Root endpoint to check status
@app.get("/")
async def root():
    return {
        "app": "KnowledgeBot",
        "status": "running",
        "mode": "OpenAI" if OPENAI_ENABLED else "Mock"
    }

@app.post("/ask")
async def ask_question(
    question: str = Form(...),
    prompt_type: str = Form("concise"),
    force_openai: str = Form(None)
):
    # Load prompt
    prompt_file = f"./prompts/{prompt_type}.yaml"
    prompt_template = load_prompt(prompt_file)["template"]

    context = "\n".join(df['title'].astype(str).tolist()[:50])
    prompt = prompt_template.replace("{context}", context).replace("{question}", question)

    answer = None
    error_msg = None
    use_openai = OPENAI_ENABLED and force_openai != "false"

    if use_openai:
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.5,
                max_tokens=300
            )
            answer = response.choices[0].message.content
        except Exception as e:
            # Detailed logging
            print(f"⚠️ OpenAI API call failed for question: '{question}'")
            print(f"   Exception: {e}")
            error_msg = str(e)
            # fallback still honors prompt_type
            if prompt_type == "concise":
                answer = f"[Concise Mock] {question}? → Short answer."
            elif prompt_type == "verbose":
                answer = f"[Verbose Mock] For your question: '{question}', here’s a longer simulated explanation with extra detail."
            else:
                answer = f"[Mock Fallback] For your question: '{question}', here’s a simulated answer."
    else:
        if not OPENAI_ENABLED:
            print(f"⚠️ OpenAI not enabled. Using mock fallback for question: '{question}'")
        elif force_openai == "false":
            print(f"ℹ️ force_openai=False. Using mock fallback for question: '{question}'")

        # differentiate based on prompt_type
        if prompt_type == "concise":
            answer = f"[Concise Mock] {question}? → Short answer."
        elif prompt_type == "verbose":
            answer = f"[Verbose Mock] For your question: '{question}', here’s a longer simulated explanation with extra detail."
        else:
            answer = f"[Mock Fallback] For your question: '{question}', here’s a simulated answer."

    # Log experiment
    save_log(question, prompt_type, answer)

    response_data = {"answer": answer, "mode": "OpenAI" if use_openai else "Mock"}
    if error_msg:
        response_data["error"] = error_msg

    return response_data
