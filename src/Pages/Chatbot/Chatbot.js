import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return; // Ignore empty messages

    // Add user message to chat
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Send message to DogguBot API
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.reply };

      // Add bot reply to chat
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error talking to DogguBot:", error);
    }

    setInput(""); // Clear input
  };

  return (
    <div style={styles.container}>
      <h1>Chat with DogguBot 🐶</h1>
      <div style={styles.chatbox}>
        {messages.map((msg, index) => (
          <p key={index} style={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
            <strong>{msg.sender === "user" ? "You" : "DogguBot"}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

// CSS-in-JS styles
const styles = {
  container: { textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: "20px" },
  chatbox: { border: "1px solid #ccc", padding: "10px", width: "400px", height: "300px", overflowY: "auto", margin: "0 auto" },
  inputContainer: { display: "flex", justifyContent: "center", marginTop: "10px" },
  input: { padding: "5px", width: "300px", marginRight: "5px" },
  button: { padding: "5px 10px", cursor: "pointer", backgroundColor: "#007bff", color: "white", border: "none" },
  userMessage: { textAlign: "right", color: "blue" },
  botMessage: { textAlign: "left", color: "green" }
};

export default Chatbot;