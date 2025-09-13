// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionInput from "./components/QuestionInput";
import AnswerDisplay from "./components/AnswerDisplay";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

function App() {
  const [answer, setAnswer] = useState("");
  const [backendMode, setBackendMode] = useState(null);
  const [lastQuestion, setLastQuestion] = useState("");
  const [lastPromptType, setLastPromptType] = useState("concise");

  // New: banners
  const [topBanner, setTopBanner] = useState("");
  const [bottomBanner, setBottomBanner] = useState("");

  // Fetch backend mode + banners on load
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`${API_BASE}/`);
        setBackendMode(res.data.mode);
      } catch (err) {
        console.error("status fetch error", err);
        setBackendMode("Unknown");
      }
    };

    const fetchBanner = async () => {
      try {
        const res = await axios.get(`${API_BASE}/banner`);
        setTopBanner(res.data.top);
        setBottomBanner(res.data.bottom);
      } catch (err) {
        console.error("banner fetch failed", err);
      }
    };

    fetchStatus();
    fetchBanner();
  }, []);

  const handleAsk = async (question, promptType) => {
    setLastQuestion(question);
    setLastPromptType(promptType);

    const formData = new FormData();
    formData.append("question", question);
    formData.append("prompt_type", promptType);

    try {
      const response = await axios.post(`${API_BASE}/ask`, formData);

      const newMode = response.data.mode || "Mock";

      setAnswer(
        response.data.error
          ? `[Error] ${response.data.error}\n\nMock Answer: ${response.data.answer}`
          : response.data.answer
      );

      // Force re-render for banners and mode
      setBackendMode(null);
      setTimeout(() => setBackendMode(newMode), 0);

      // Refresh banners
      const bannerRes = await axios.get(`${API_BASE}/banner`);
      setTopBanner(bannerRes.data.top);
      setBottomBanner(bannerRes.data.bottom);
    } catch (error) {
      setAnswer("Error contacting backend. Make sure it is running.");
      setBackendMode("Unknown");
      console.error(error);
    }
  };

  const retryOpenAI = async () => {
    if (!lastQuestion) return;
    try {
      const formData = new FormData();
      formData.append("question", lastQuestion);
      formData.append("prompt_type", lastPromptType);
      formData.append("force_openai", "true");

      const response = await axios.post(`${API_BASE}/ask`, formData);
      const newMode = response.data.mode || "Mock";

      setAnswer(
        response.data.error
          ? `[Error] ${response.data.error}\n\nMock Answer: ${response.data.answer}`
          : response.data.answer
      );

      setBackendMode(null);
      setTimeout(() => setBackendMode(newMode), 0);

      const bannerRes = await axios.get(`${API_BASE}/banner`);
      setTopBanner(bannerRes.data.top);
      setBottomBanner(bannerRes.data.bottom);
    } catch (error) {
      setAnswer("Error contacting backend. Make sure it is running.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      {/* Dynamic Banner from backend */}
      {topBanner && (
        <div
          className={`w-full text-center py-2 mb-4 rounded ${
            backendMode === "OpenAI"
              ? "bg-green-200 text-green-800"
              : backendMode === "Mock"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {topBanner}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">KnowledgeBot</h1>
      <QuestionInput onAsk={handleAsk} />
      <AnswerDisplay
        answer={answer}
        mode={backendMode}
        bottomBanner={bottomBanner}
        onRetryOpenAI={backendMode === "Mock" ? retryOpenAI : null}
      />
    </div>
  );
}

export default App;
