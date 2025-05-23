import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Nav/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Projects from "./Pages/Pro/Projects";
import Footer from "./Pages/Footer/Footer";
import Guestbook from "./Pages/GuestBook/GuestBook";
import Chatbot from "./Pages/Chatbot/Chatbot";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />  
        <Route path="/guestbook" element={<Guestbook />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

