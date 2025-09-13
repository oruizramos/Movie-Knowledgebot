FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1
WORKDIR /app

# Small build deps if needed
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy entire project into image
COPY . /app

# Work from backend folder 
WORKDIR /app/backend

# Expose port Koyeb will route to
ENV PORT=8080
EXPOSE 8080

# Start Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--proxy-headers"]
