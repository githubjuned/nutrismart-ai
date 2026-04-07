import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Send, Bot, AlertTriangle } from 'lucide-react';

const ChatCoach = () => {
  const { profile } = useContext(UserContext);
  const [messages, setMessages] = useState([
    { id: 1, text: `Hi ${profile.name}! I'm NutriSmart AI powered by Gemini. Ask me how to hit your diet goals under your ₹${profile.budget} daily budget.`, sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    if (!profile.geminiApiKey) {
      setMessages(prev => [...prev, { id: Date.now(), text: "⚠️ Please enter your Gemini API Key in the Settings page to use the AI Coach.", sender: 'bot' }]);
      setInput('');
      return;
    }

    const userText = input;
    const userMsg = { id: Date.now(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const systemContext = `You are a friendly, highly intelligent Indian health coach named NutriSmart AI. 
The user is ${profile.name}, Age ${profile.age}, Weight ${profile.weight}kg, Diet ${profile.diet}, Goal: ${profile.goal}.
Their TOTAL daily food budget is extremely strict: ₹${profile.budget} INR.
Keep responses very concise (1-3 small sentences), friendly, and extremely cost-aware. Recommend real Indian ingredient names (dal, paneer, soya, eggs, moong) and give realistic rough price estimates in INR.`;

    const chatHistory = messages.map(m => `**${m.sender === 'user' ? 'User' : 'NutriSmart AI'}**: ${m.text}`).join('\n');
    const prompt = `${systemContext}\n\nChat History:\n${chatHistory}\n\n**User**: ${userText}\n**NutriSmart AI**:`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${profile.geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7 }
        })
      });

      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      const botText = data.candidates[0].content.parts[0].text;
      
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botText.replace(/\*\*/g,'').trim(), sender: 'bot' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "I'm having trouble connecting to Google Gemini right now. Please check your API key.", sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ minHeight: '80vh' }}>
      <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-xl shadow-sm">
        <div className="bg-primary-light p-2 rounded-full text-primary">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="text-lg mb-0 font-bold">NutriCoach AI</h1>
          <p className="text-xs text-green-600 font-semibold mb-0">Powered by Gemini</p>
        </div>
      </div>

      {!profile.geminiApiKey && (
        <div className="bg-orange-50 border border-orange-200 p-2 rounded mb-2 text-xs text-orange-800 flex items-center gap-2">
           <AlertTriangle size={14}/> Add your API key in Settings.
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-sm' : 'bg-white text-dark rounded-bl-sm whitespace-pre-wrap'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-gray-200 text-dark rounded-2xl rounded-bl-sm p-3 text-sm shadow-sm animate-pulse">
               Thinking...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input 
          type="text" 
          className="input-field flex-1 rounded-full shadow-sm" 
          placeholder="Ask a health/budget question..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
        />
        <button type="submit" className={`p-3 rounded-full shadow-sm transition-colors flex items-center justify-center ${!input.trim() || isTyping ? 'bg-gray-300 text-gray-500' : 'bg-primary text-white hover:bg-primary-hover'}`} disabled={!input.trim() || isTyping}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatCoach;
