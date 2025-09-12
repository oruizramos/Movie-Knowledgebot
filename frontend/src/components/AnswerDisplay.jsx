import React from "react";

function AnswerDisplay({ answer, mode, onRetryOpenAI }) {
  // Determine source text explicitly, even when an error occurred
  const sourceText =
    mode === "OpenAI"
      ? "OpenAI API"
      : mode === "Mock"
      ? "Mock / Fallback"
      : "Unknown";

  return (
    <div className="w-full max-w-xl mt-6 p-4 border rounded shadow">
      <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
      {mode && (
        <p className="mt-2 text-sm text-gray-500">
          Source: {sourceText}
        </p>
      )}
      {onRetryOpenAI && (
        <button
          onClick={onRetryOpenAI}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry with OpenAI
        </button>
      )}
    </div>
  );
}

export default AnswerDisplay;
