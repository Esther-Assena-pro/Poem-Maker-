import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const PoemBox = () => {
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const fetchPoem = async () => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY); 
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Écris un poème joyeux et court sur le soleil ";
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // Fetch a poem on initial render
    fetchPoem();

    // Fetch a new poem every 30 seconds
    const poemIntervalId = setInterval(fetchPoem, 30000);
    return () => clearInterval(poemIntervalId);
  }, []);

  return (
    <div>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{response}</p>}
    </div>
  );
};

export default PoemBox;
