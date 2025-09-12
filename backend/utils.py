import yaml
from db import log_experiment

def load_prompt(prompt_file):
    with open(prompt_file, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def save_log(question, prompt_name, answer):
    log_experiment(question, prompt_name, answer)
