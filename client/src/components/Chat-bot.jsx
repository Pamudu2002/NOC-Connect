import { useState, useEffect, useRef } from "react";
import { api } from "../api/api";

export default function ChatButton({currentPage}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "How can I help?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatID, setChatID] = useState(null);
  const chatContainerRef = useRef(null);
  const chatModalRef = useRef(null);
  
  // Add a new state to track if user has interacted
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  // State to track whether suggestions should be shown
  // Initial state is true so suggestions appear with the first bot message
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  // Object mapping page URLs to their specific suggestions
  const pageSuggestions = {
    "Home page": ["Want to learn how to sponsor an athlete? ", "Looking to volunteer for upcoming events? "],
    "Login page": ["I can't log in to my account, what should I do?", "Can I switch between sponsor and player accounts?"],
    "Admin page": ["How do I approve a new player registration?", "Where can I manage sponsor requests?"],
    "Player profile page": ["How can I update my sport or achievements?", "Where do I upload my latest competition photos?"],
    "Player profile view page": ["How can I sponsor this player?", "Can I contact this player or their coach?"],
    "signup page":["Need help choosing the right account type?","Facing issues with the sign-up form?"],
    "Sponsor dashboard page":["Where can I see the players I've already sponsored?","How do I make a new sponsorship contribution?"],
    "Volunteer page":["What roles are available for volunteers right now?","How will I know if my volunteer application is approved?"],
  };
  
  // Function to get current page suggestions based on URL
  const getCurrentPageSuggestions = () => {
    // Default suggestions if page is not found in our mapping
    const defaultSuggestions = ["Tell me more about Connect NOC", "How can I contact support?"];
    console.log(currentPage);
    // Return page-specific suggestions or default ones
    return pageSuggestions[currentPage] || defaultSuggestions;
  };

  // Function to handle when a suggestion is clicked
  const handleSuggestionClick = async (suggestion) => {
    // Mark that user has interacted and hide suggestions permanently
    setHasUserInteracted(true);
    setShowSuggestions(false);
    
    // Add the suggestion as a user message
    const userMessage = { text: suggestion, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    try {
      // Send the suggestion to the API as if the user typed it
      const botRes = await api.post("/chat", { chatID: chatID, message: suggestion });
      const botReply = botRes.data.response;
      console.log(botReply);
      setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
      
      // Don't show suggestions again after user interaction
      // Removed: setShowSuggestions(true);
    } catch (error) {
      console.error("Error sending suggestion:", error);
      setMessages(prev => [...prev, { text: "Sorry, I couldn't process your request.", sender: "bot" }]);
      
      // Don't show suggestions again after user interaction
      // Removed: setShowSuggestions(true);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Mark that user has interacted and hide suggestions permanently
    setHasUserInteracted(true);
    setShowSuggestions(false);
    
    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    try {
      const botRes = await api.post("/chat", { chatID: chatID, message: input });
      const botReply = botRes.data.response;
      console.log(botReply);
      setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
      
      // Don't show suggestions again after user interaction
      // Removed: setShowSuggestions(true);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { text: "Sorry, I couldn't process your request.", sender: "bot" }]);
      
      // Don't show suggestions again after user interaction
      // Removed: setShowSuggestions(true);
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
        const res = await api.post("/chat/init", { pageName: currentPage });
        console.log(res.data.chatID)
        setChatID(res.data.chatID);
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
    if (!showSuggestions || loading || hasUserInteracted) return null;
    
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
    <div className="relative z-[60]">
      {/* Side Chat Button - Hidden when chat is open */}
      <button 
        onClick={toggleChat}
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-sky-950 to-sky-600 text-sky-50 p-3 rounded-l-lg shadow-lg hover:bg-sky-950 transition-all z-50 ${isOpen ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-100 translate-x-0'}`}
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
                                             <span className="font-bold text-sky-200"> NOC Bot</span>
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
              <div className="flex items-center space-x-2 p-2">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-sky-50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-sky-50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="h-2 w-2 bg-sky-50 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
            )}
            
            {/* Show suggestions only at the start of conversation */}
            {isOpen && messages.length > 0 && !loading && !hasUserInteracted && showSuggestions && (
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