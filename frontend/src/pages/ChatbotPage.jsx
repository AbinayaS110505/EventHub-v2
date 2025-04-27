import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/ChatbotPage.css';

const GEMINI_API_KEY = 'AIzaSyChAjFA_OavioNvokAtkZYB1aXFGZn8wPo';

const ChatbotPage = () => { 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

      const payload = {
        contents: [{ parts: [{ text: input }] }]
      };

      const res = await axios.post(url, payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      let botReply = res.data.candidates[0]?.content?.parts[0]?.text || "Sorry, I didn't understand that.";

      botReply = formatBotReply(botReply);

      const botMessage = { sender: 'bot', text: botReply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Gemini error:', error);
      const errorMessage = { sender: 'bot', text: "Oops! Could not reach Gemini API." };
      setMessages(prev => [...prev, errorMessage]);
    }

    setInput('');
  };

  const formatBotReply = (text) => {
   
    let cleaned = text.trim();

    cleaned = cleaned.replace(/\n{2,}/g, '</p><p>');

    cleaned = cleaned.replace(/\n/g, ' ');

    return `<p>${cleaned}</p>`; 
  };

  const handleBack = () => {
    navigate('/userdashboard'); 
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="top-bar">
        <button className="back-button" onClick={handleBack}>← Home</button>
      </div>

      <div className="messages">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={msg.sender}
            dangerouslySetInnerHTML={{ __html: msg.text }}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatbotPage;
