import { useState, useEffect, useRef } from "react";
import { api } from "../api/api";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "How can I help?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const chatModalRef = useRef(null);
  
  // State to store the current page URL
  const [currentPage, setCurrentPage] = useState("");
  
  // State to track whether suggestions should be shown
  // Initial state is true so suggestions appear with the first bot message
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  // Object mapping page URLs to their specific suggestions
  // This can be expanded with more pages and suggestions as needed
  const pageSuggestions = {
    "/": ["Want to learn how to sponsor an athlete? I can guide you!", "Looking to volunteer for upcoming events? Here's how to get started."],
    "/signup": ["Need help choosing the right account type? I can explain the options.", "Facing issues with the sign-up form? Let me walk you through it."],
    "/signin": ["Forgot your password? I can help you recover it.", "Having trouble logging in? Let's troubleshoot together."],
    "/volunteer": ["Want to know the benefits of volunteering with NOC Sri Lanka?", "Need help submitting your volunteer application?"],
    "/aboutus": ["Curious about our mission and vision? I can summarize it for you.", "Want to know how NOC Sri Lanka supports athletes nationwide?"],
    // Add more pages and their suggestions as needed
  };
  
  // Function to get current page suggestions based on URL
  const getCurrentPageSuggestions = () => {
    // Default suggestions if page is not found in our mapping
    const defaultSuggestions = ["Tell me more about Connect NOC", "How can I contact support?"];
    
    // Return page-specific suggestions or default ones
    return pageSuggestions[currentPage] || defaultSuggestions;
  };

  // Update current page when component mounts and URL changes
  useEffect(() => {
    // Get the pathname from window location
    const updateCurrentPage = () => {
      const path = window.location.pathname;
      setCurrentPage(path);
    };
    
    // Set initial page
    updateCurrentPage();
    
    // Listen for URL changes (for SPAs)
    window.addEventListener('popstate', updateCurrentPage);
    
    return () => {
      window.removeEventListener('popstate', updateCurrentPage);
    };
  }, []);
  
  // Function to handle when a suggestion is clicked
  const handleSuggestionClick = async (suggestion) => {
    // Hide suggestions when a suggestion is clicked
    setShowSuggestions(false);
    
    // Add the suggestion as a user message
    const userMessage = { text: suggestion, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    try {
      // Send the suggestion to the API as if the user typed it
      const botRes = await api.post("/chat", { userID: "12345", message: suggestion });
      const botReply = botRes.data.response;
      console.log(botReply);
      setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
      
      // Show suggestions again after bot responds
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error sending suggestion:", error);
      setMessages(prev => [...prev, { text: "Sorry, I couldn't process your request.", sender: "bot" }]);
      
      // Show suggestions even after error
      setShowSuggestions(true);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Hide suggestions when user sends their own message
    setShowSuggestions(false);
    
    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    try {
      const botRes = await api.post("/chat", { userID: "12345", message: input });
      const botReply = botRes.data.response;
      console.log(botReply);
      setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
      
      // Show suggestions again after bot responds
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { text: "Sorry, I couldn't process your request.", sender: "bot" }]);
      
      // Show suggestions even after error
      setShowSuggestions(true);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  // Handle clicking outside to close the chat
  useEffect(() => {
    function handleClickOutside(event) {
      if (chatModalRef.current && !chatModalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, showSuggestions]); // Added showSuggestions as dependency to scroll when suggestions appear

  // Initialize chat when component mounts
  useEffect(() => {
    const initChat = async () => {
      try {
        const res = await api.post("/chat/init", { userID: "12345" });
        console.log("Chat initialized:", res.data);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initChat();
  }, []);

  // Handle Enter key press for sending messages
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Render the suggestion buttons
  const renderSuggestions = () => {
    if (!showSuggestions || loading) return null;
    
    return (
      <div className="w-full flex flex-col items-end space-y-2 mt-2 mb-4">
        <div className="text-xs text-sky-600 font-medium ml-1 mb-1">Suggested questions:</div>
        {getCurrentPageSuggestions().map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="px-4 py-2 bg-gradient-to-r from-sky-950 to-sky-800 text-sky-50 rounded-lg text-left border-2 border-sky-700 hover:bg-sky-100 transition-colors shadow-md w-4/5"
          >
            {suggestion}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Side Chat Button - Hidden when chat is open */}
      <button 
        onClick={toggleChat}
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-sky-800 to-sky-400 text-sky-200 p-3 rounded-l-lg shadow-lg hover:bg-sky-950 transition-all z-50 ${isOpen ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-100 translate-x-0'}`}
        style={{ 
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          padding: '20px 8px',
          transitionProperty: 'opacity, transform',
          transitionDuration: '300ms'
        }}
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span>Chat with Connect NOC</span>
        </div>
      </button>

      {/* Side Sliding Chat Modal */}
      <div 
        ref={chatModalRef}
        className={`fixed top-0 right-0 w-80 md:w-96 h-full bg-white shadow-2xl z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'transform-none' : 'translate-x-full'} `}
        style={{ borderLeft: '1px solid #e5e7eb' }}
      >
        <div className="w-full h-full flex flex-col overflow-hidden">
          {/* Chat Header */}
              <div className="flex flex-col">  
                          <div className="border-b-1 px-4 py-3 bg-gradient-to-r from-sky-800 to-sky-400 flex  justify-between items-center rounded-t-lg">
                               <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3 overflow-hidden">
            
                                             <img 
                                             src="./chatlogo.png" 
                                             alt="Logo" 
                                             className="w-full h-full object-cover"
                                                   />
                                        </div>
                                        <div className="flex flex-col">
                                             <span className="text-sm text-sky-200">Chat with</span>
                                             <span className="font-bold text-sky-200">Connect NOC</span>
                                        </div>
                               </div>
                               <button 
                                    onClick={toggleChat} 
                                    className="text-sky-200 hover:text-sky-400 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    aria-label="Close chat"
                               >
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                               </svg>
                               </button>
                          </div>
                          {/*tag line*/}
                          <div className="px-4 py-3 bg-gradient-to-r from-sky-700 to-sky-400 relative w-full">
                                 <div className="text-sky-200 mb-2">
                                      <span className="text-lg">We are here to help you</span>
                                 </div>
                                 <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                                      <svg className="w-full h-8" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                      <path 
                                      d="M0,120 C300,40 900,40 1200,120 L1200,120 L0,120 Z" 
                                      className="fill-sky-900"
                                      />
                                      </svg>
                                 </div>
                          </div>
              </div>
          
          {/* Chat Body */}
          <div 
            ref={chatContainerRef} 
            className="flex-grow flex flex-col w-full px-4 py-3 space-y-4 overflow-y-auto bg-sky-900"
          >
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <span 
                  className={`px-4 py-2  rounded-lg break-words ${msg.sender === "user" ? "bg-gradient-to-r from-sky-700 to-sky-400 text-sky-200" : "bg-sky-950 text-sky-50"}`}
                  style={{
                    wordBreak: "break-word",
                    maxWidth: "75%",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start">
                <span className="px-4 py-2 text-white rounded-lg bg-gray-500">
                  Thinking...
                </span>
              </div>
            )}
            
            {/* Show suggestions as part of the chat flow - moved from fixed position */}
            {isOpen && messages.length > 0 && !loading && showSuggestions && (
              <div className="flex justify-start w-full">
                {renderSuggestions()}
              </div>
            )}
          </div>

          {/* Chat Footer */}
          <div className="border-t-1 flex items-center p-3 bg-gradient-to-r from-sky-700 to-sky-400 rounded-b-lg">
            <div className="flex flex-wrap w-full relative shadow-xl">
              <textarea
                placeholder="Type here..."
                className="w-full rounded-lg px-4 py-2 border-2 pr-10 resize-none bg-sky-950 text-sky-50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={1}
                style={{
                  minHeight: "36px",
                  maxHeight: "100px",
                  overflowY: "auto",
                }}
              />
              <button
                type="button"
                onClick={handleSend}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                disabled={loading || input.trim() === ""}
              >
                <img src="./send.png" alt="Send" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}