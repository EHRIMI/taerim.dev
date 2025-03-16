import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import "./GuestBook.css";

function Guestbook() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages from Firestore
  useEffect(() => {
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(db, "guestbook"));
      const messagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort messages by timestamp (newest first)
      messagesData.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
      setMessages(messagesData);
    };

    fetchMessages();
  }, []);

  // Submit new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "guestbook"), {
      text: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage(""); 
    window.location.reload(); 
  };

  return (
    <div className="guestbook-page">
      <div className="guestbook-container">
        
        {/* Left Side: Input Form */}
        <div className="guestbook-form-container">
          <h2>Guestbook</h2>
          <form onSubmit={handleSubmit} className="guestbook-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Leave message for Tae..."
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>

        {/* Right Side: Message Log */}
        <div className="guestbook-messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className="guestbook-message">
              <p>{msg.text}</p>
              {msg.timestamp && (
                <span className="timestamp">
                  {new Date(msg.timestamp.seconds * 1000).toLocaleString()}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Guestbook;