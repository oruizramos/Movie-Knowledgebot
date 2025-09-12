import React, { useState } from "react";

export default function QuestionInput({ onAsk }) {
  const [question, setQuestion] = useState("");
  const [promptType, setPromptType] = useState("concise");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAsk(question, promptType);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md">
      <input
        type="text"
        placeholder="Ask a question about movies..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="p-2 border rounded"
      />
      <select
        value={promptType}
        onChange={(e) => setPromptType(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="concise">Concise</option>
        <option value="detailed">Detailed</option>
        <option value="bullet">Bullet</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Ask</button>
    </form>
  );
}
