"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

// Custom SVG Line Art Robot Icon
const RobotIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="6" width="16" height="12" rx="4" />
    <path d="M3 12V9a9 9 0 0 1 18 0v3" />
    <rect x="1" y="10" width="3" height="6" rx="1" />
    <rect x="20" y="10" width="3" height="6" rx="1" />
    <circle cx="9" cy="12" r="1.5" fill="currentColor" />
    <circle cx="15" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// Simple FAQ logic
const getBotResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes("fee") || lowerInput.includes("cost")) {
    return "The annual fee for B.Com is ₹45,000 and for B.A. is ₹35,000. There is also a one-time admission fee of ₹5,000.";
  }
  if (lowerInput.includes("admission") || lowerInput.includes("apply")) {
    return "Admissions for 2026 are currently open. You can apply through our online portal by clicking 'Admissions' in the top menu.";
  }
  if (lowerInput.includes("course") || lowerInput.includes("program")) {
    return "We currently offer two main undergraduate programs: Bachelor of Commerce (B.Com) and Bachelor of Arts (B.A.).";
  }
  if (lowerInput.includes("contact") || lowerInput.includes("phone") || lowerInput.includes("email")) {
    return "You can reach our Admission Office at +1 (555) 123-4567 or email admissions@gvhcollege.edu.";
  }
  if (lowerInput.includes("facility") || lowerInput.includes("campus") || lowerInput.includes("sports")) {
    return "Our campus features modern classrooms, a well-stocked library, expansive sports grounds, and various student clubs.";
  }
  
  return "I'm a virtual assistant here to help! Try asking about admissions, courses, fees, or contact information.";
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! Welcome to GVH College. How can I help you today?", isUser: false }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), text: inputText, isUser: true };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText("");

    setTimeout(() => {
      const responseText = getBotResponse(newUserMsg.text);
      const newBotMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, isUser: false };
      setMessages(prev => [...prev, newBotMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl z-50 p-0 bg-accent text-white flex items-center justify-center cursor-pointer border-2 border-white"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        style={{ display: isOpen ? "none" : "flex" }}
        aria-label="Open Chatbot"
        suppressHydrationWarning={true}
      >
        <RobotIcon className="w-8 h-8" />
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden flex flex-col h-[500px] max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-navbar text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center border border-gray-600">
                  <RobotIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-sans font-bold text-lg tracking-wide block leading-tight">GVH Assistant</span>
                  <span className="text-xs text-green-400 font-medium flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Close Chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-end space-x-2 max-w-[85%] ${msg.isUser ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative ${msg.isUser ? "bg-accent text-white" : "bg-navbar text-white"}`}>
                      {msg.isUser ? <User className="w-5 h-5" /> : <RobotIcon className="w-5 h-5" />}
                    </div>
                    <div className={`px-4 py-2 rounded-2xl ${msg.isUser ? "bg-accent text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"}`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-200">
              <form onSubmit={handleSend} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm"
                />
                <button 
                  type="submit" 
                  disabled={!inputText.trim()}
                  className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-accent/90"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
