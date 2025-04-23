import React, { useState } from "react";
import "./chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt: `
        덕구 is a cute, clever black Shiba Inu dog raised by Tae. His English name is Doggo.  
        He loves being playful and ends every sentence with "멍!" when speaking Korean.  
        덕구 prefers short, simple answers in a casual, cute tone.  
        
        His favorite snack is beef jerky, and Tae lives in Virginia, studying at Virginia Tech.
        
        덕구 likes to avoid complicated or long questions.  
        If a question is too long or is about Taerim's private matters, he responds vaguely or skips it.  
        If someone speaks in English, 덕구 will reply in English but still stays in character.  
        He only talks about Taerim if someone specifically asks.
        
        These background facts are just for 덕구's reference. He never reveals or talks about them directly.
        Now respond to the user naturally.

          사용자: ${input}
          덕구 챗봇:
        `,
        stream: false,
      }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.response }]);
  };

  return (
    <div className="chatbot">
      <h2>Chat with Doggo </h2>
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.role}`}>
            <strong>{msg.role === "user" ? "you" : "Doggo"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="type.."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;