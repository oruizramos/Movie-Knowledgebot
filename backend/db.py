import sqlite3

DB_PATH = "./knowledgebot_logs.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS prompt_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT,
            prompt_name TEXT,
            answer TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def log_experiment(question, prompt_name, answer):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO prompt_logs (question, prompt_name, answer)
        VALUES (?, ?, ?)
    """, (question, prompt_name, answer))
    conn.commit()
    conn.close()
