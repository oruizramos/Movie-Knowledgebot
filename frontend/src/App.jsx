import React, { useState, useEffect } from "react"; 
import axios from "axios";
import QuestionInput from "./components/QuestionInput";
import AnswerDisplay from "./components/AnswerDisplay";

function App() {
  const [answer, setAnswer] = useState("");
  const [backendMode, setBackendMode] = useState(null);
  const [lastQuestion, setLastQuestion] = useState("");
  const [lastPromptType, setLastPromptType] = useState("concise");

  // Fetch backend mode on load
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get("http://localhost:8000/");
        setBackendMode(res.data.mode);
      } catch (err) {
        console.error(err);
        setBackendMode("Unknown");
      }
    };
    fetchStatus();
  }, []);

  const handleAsk = async (question, promptType) => {
    setLastQuestion(question);
    setLastPromptType(promptType);

    const formData = new FormData();
    formData.append("question", question);
    formData.append("prompt_type", promptType);

    try {
      const response = await axios.post("http://localhost:8000/ask", formData);

      // Always update backendMode from this request
      const newMode = response.data.mode || "Mock";

      setAnswer(
        response.data.error
          ? `[Error] ${response.data.error}\n\nMock Answer: ${response.data.answer}`
          : response.data.answer
      );

      // Force state update to refresh banners even if mode didn't change technically
      setBackendMode(null);  
      setTimeout(() => setBackendMode(newMode), 0);

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
      formData.append("force_openai", "true"); // backend should interpret this

      const response = await axios.post("http://localhost:8000/ask", formData);

      const newMode = response.data.mode || "Mock";

      setAnswer(
        response.data.error
          ? `[Error] ${response.data.error}\n\nMock Answer: ${response.data.answer}`
          : response.data.answer
      );

      setBackendMode(null);
      setTimeout(() => setBackendMode(newMode), 0);

    } catch (error) {
      setAnswer("Error contacting backend. Make sure it is running.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      {/* Dynamic Banner */}
      {backendMode && (
        <div
          className={`w-full text-center py-2 mb-4 rounded ${
            backendMode === "OpenAI"
              ? "bg-green-200 text-green-800"
              : backendMode === "Mock"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {backendMode === "OpenAI"
            ? "✅ OpenAI Mode Enabled — real API calls"
            : backendMode === "Mock"
            ? "⚠️ Mock Mode Enabled — simulated answers"
            : "❓ Backend Mode Unknown"}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">KnowledgeBot</h1>
      <QuestionInput onAsk={handleAsk} />
      <AnswerDisplay
        answer={answer}
        mode={backendMode}
        onRetryOpenAI={backendMode === "Mock" ? retryOpenAI : null}
      />
    </div>
  );
}

export default App;
