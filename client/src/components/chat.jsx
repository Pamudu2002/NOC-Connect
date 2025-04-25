import { useState, useEffect, useRef } from 'react';

// Dummy data for contacts and conversations
const dummyContacts = [
  {
    _id: '1',
    name: 'John Smith',
    lastMessage: 'Hey, how are you doing?',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    unread: 2,
    avatar: 'J'
  },
  {
    _id: '2',
    name: 'Sarah Johnson',
    lastMessage: 'The project is due tomorrow!',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    unread: 0,
    avatar: 'S'
  },
  {
    _id: '3',
    name: 'David Lee',
    lastMessage: 'Did you see the game last night?',
    timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
    unread: 3,
    avatar: 'D'
  },
  {
    _id: '4',
    name: 'Emily Chen',
    lastMessage: 'Thanks for your help with the report.',
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
    unread: 0,
    avatar: 'E'
  },
  {
    _id: '5',
    name: 'Michael Brown',
    lastMessage: "Let me know when you're free to discuss.",
    timestamp: new Date(Date.now() - 4 * 86400000).toISOString(),
    unread: 0,
    avatar: 'M'
  }
];

// Dummy messages for each contact
const dummyMessages = {
  '1': [
    {
      _id: '101',
      senderId: '1',
      receiverId: 'current-user',
      message: 'Hey there!',
      createdAt: new Date(Date.now() - 60 * 60000).toISOString()
    },
    {
      _id: '102',
      senderId: 'current-user',
      receiverId: '1',
      message: 'Hi John! How are you?',
      createdAt: new Date(Date.now() - 58 * 60000).toISOString()
    },
    {
      _id: '103',
      senderId: '1',
      receiverId: 'current-user',
      message: "I'm doing well! Just finished that project we were working on.",
      createdAt: new Date(Date.now() - 45 * 60000).toISOString()
    },
    {
      _id: '104',
      senderId: '1',
      receiverId: 'current-user',
      message: 'The client was really happy with the results.',
      createdAt: new Date(Date.now() - 44 * 60000).toISOString()
    },
    {
      _id: '105',
      senderId: 'current-user',
      receiverId: '1',
      message: "That's great news! Should we schedule a follow-up meeting?",
      createdAt: new Date(Date.now() - 30 * 60000).toISOString()
    },
    {
      _id: '106',
      senderId: '1',
      receiverId: 'current-user',
      message: 'Hey, how are you doing?',
      createdAt: new Date(Date.now() - 15 * 60000).toISOString()
    }
  ],
  '2': [
    {
      _id: '201',
      senderId: 'current-user',
      receiverId: '2',
      message: "Sarah, how's the project coming along?",
      createdAt: new Date(Date.now() - 5 * 3600000).toISOString()
    },
    {
      _id: '202',
      senderId: '2',
      receiverId: 'current-user',
      message: "I'm about 80% done. Just need to finish the final report.",
      createdAt: new Date(Date.now() - 4.5 * 3600000).toISOString()
    },
    {
      _id: '203',
      senderId: 'current-user',
      receiverId: '2',
      message: 'Great! Do you need any help with that?',
      createdAt: new Date(Date.now() - 4 * 3600000).toISOString()
    },
    {
      _id: '204',
      senderId: '2',
      receiverId: 'current-user',
      message: "I think I've got it covered, but I'll let you know if anything comes up.",
      createdAt: new Date(Date.now() - 3.5 * 3600000).toISOString()
    },
    {
      _id: '205',
      senderId: '2',
      receiverId: 'current-user',
      message: 'The project is due tomorrow!',
      createdAt: new Date(Date.now() - 2 * 3600000).toISOString()
    }
  ],
  '3': [
    {
      _id: '301',
      senderId: '3',
      receiverId: 'current-user',
      message: 'Did you watch the game last night?',
      createdAt: new Date(Date.now() - 1.2 * 86400000).toISOString()
    },
    {
      _id: '302',
      senderId: 'current-user',
      receiverId: '3',
      message: 'Yeah, it was amazing! That last-minute goal was incredible.',
      createdAt: new Date(Date.now() - 1.1 * 86400000).toISOString()
    },
    {
      _id: '303',
      senderId: '3',
      receiverId: 'current-user',
      message: "I know! I couldn't believe they pulled it off.",
      createdAt: new Date(Date.now() - 1.05 * 86400000).toISOString()
    },
    {
      _id: '304',
      senderId: '3',
      receiverId: 'current-user',
      message: 'Are you going to watch the match this weekend?',
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString()
    }
  ],
  '4': [
    {
      _id: '401',
      senderId: 'current-user',
      receiverId: '4',
      message: 'Hi Emily, just sent over that report you asked for.',
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
    },
    {
      _id: '402',
      senderId: '4',
      receiverId: 'current-user',
      message: 'Got it! Taking a look now.',
      createdAt: new Date(Date.now() - 2.9 * 86400000).toISOString()
    },
    {
      _id: '403',
      senderId: '4',
      receiverId: 'current-user',
      message: 'This looks great! Just what I needed.',
      createdAt: new Date(Date.now() - 2.8 * 86400000).toISOString()
    },
    {
      _id: '404',
      senderId: '4',
      receiverId: 'current-user',
      message: 'Thanks for your help with the report.',
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
    }
  ],
  '5': [
    {
      _id: '501',
      senderId: '5',
      receiverId: 'current-user',
      message: 'Do you have time for a quick meeting today?',
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString()
    },
    {
      _id: '502',
      senderId: 'current-user',
      receiverId: '5',
      message: "I'm available between 2-4pm today.",
      createdAt: new Date(Date.now() - 4.9 * 86400000).toISOString()
    },
    {
      _id: '503',
      senderId: '5',
      receiverId: 'current-user',
      message: "Perfect! Let's do 3pm then.",
      createdAt: new Date(Date.now() - 4.8 * 86400000).toISOString()
    },
    {
      _id: '504',
      senderId: '5',
      receiverId: 'current-user',
      message: "Let me know when you're free to discuss.",
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString()
    }
  ]
}

const PopupTelegramChat = ({ currentUserId, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('chats');
  const [contacts, setContacts] = useState(dummyContacts);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Fetch messages when selected contact changes
  useEffect(() => {
    if (!selectedContactId) return;
    
    // Simulate loading
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setMessages(dummyMessages[selectedContactId] || []);
      setLoading(false);
      
      // Mark messages as read by updating contact
      setContacts(prev => 
        prev.map(contact => 
          contact._id === selectedContactId 
            ? { ...contact, unread: 0 } 
            : contact
        )
      );
    }, 500);
  }, [selectedContactId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContactId) return;
    
    // Create new message
    const newMsg = {
      _id: Date.now().toString(),
      senderId: 'current-user',
      receiverId: selectedContactId,
      message: newMessage,
      createdAt: new Date().toISOString()
    };
    
    // Add message to messages state
    setMessages(prev => [...prev, newMsg]);
    
    // Update contact's last message
    setContacts(prev => 
      prev.map(contact => 
        contact._id === selectedContactId 
          ? { ...contact, lastMessage: newMessage, timestamp: new Date().toISOString() } 
          : contact
      )
    );
    
    // Clear input
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString(undefined, { weekday: 'long' });
    } else {
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
  };

  const selectContact = (contactId) => {
    setSelectedContactId(contactId);
    setIsExpanded(true);
  };

  const handleBack = () => {
    setSelectedContactId(null);
  };

  const getSelectedContact = () => {
    return contacts.find(contact => contact._id === selectedContactId) || {};
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && selectedContactId) {
      // Reset to contacts view when minimizing from a chat
      setSelectedContactId(null);
    }
  };

  return (
    <div 
      ref={chatContainerRef}
      className="fixed bottom-4 right-4 z-50 flex flex-col shadow-lg rounded-lg bg-gray-900 text-white"
      style={{ 
        width: isExpanded ? '350px' : '60px',
        height: isExpanded ? '500px' : '60px',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      {/* Chat header */}
      <div className="bg-gray-800 border-b border-gray-700 flex items-center justify-between p-3">
        {isExpanded ? (
          <>
            <div className="flex items-center">
              {selectedContactId && (
                <button 
                  onClick={handleBack}
                  className="mr-3 text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              <h3 className="font-semibold text-blue-400">
                {selectedContactId ? getSelectedContact().name : 'Chats'}
              </h3>
            </div>
            <div className="flex items-center">
              <button 
                onClick={toggleExpand}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={onClose}
                className="ml-2 p-1 text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <button 
            onClick={toggleExpand}
            className="w-full h-full flex items-center justify-center text-blue-400 hover:text-blue-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        )}
      </div>
      
      {isExpanded && (
        <div className="flex-1 flex flex-col bg-gray-900 overflow-hidden">
          {!selectedContactId ? (
            /* Contacts list view */
            <div className="flex flex-col h-full">
              {/* Tabs */}
              <div className="flex border-b border-gray-800">
                <button 
                  className={`flex-1 py-2 text-sm font-medium ${activeTab === 'chats' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('chats')}
                >
                  Chats
                </button>
                <button 
                  className={`flex-1 py-2 text-sm font-medium ${activeTab === 'contacts' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('contacts')}
                >
                  Contacts
                </button>
              </div>
              
              {/* Contacts/Chats list - THIS PART SCROLLS */}
              <div className="flex-1 overflow-y-auto">
                {contacts.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No conversations yet
                  </div>
                ) : (
                  <div className="divide-y divide-gray-800">
                    {contacts.map(contact => (
                      <div 
                        key={contact._id}
                        className="p-3 hover:bg-gray-800 cursor-pointer transition-colors"
                        onClick={() => selectContact(contact._id)}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">
                            {contact.avatar}
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-blue-400">{contact.name}</h3>
                              <span className="text-xs text-gray-400">{formatDate(contact.timestamp)}</span>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-xs text-gray-400 truncate max-w-xs">{contact.lastMessage}</p>
                              {contact.unread > 0 && (
                                <span className="ml-2 bg-blue-600 text-white rounded-full px-1.5 text-xs">
                                  {contact.unread}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* New chat button - FIXED AT BOTTOM */}
              <div className="p-3 border-t border-gray-800 bg-gray-900">
                <button 
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  New Message
                </button>
              </div>
            </div>
          ) : (
            /* Chat view with selected contact */
            <div className="flex flex-col h-full">
              {/* Messages container - ONLY THIS PART SCROLLS */}
              <div 
                className="flex-1 overflow-y-auto p-3"
                style={{ 
                  backgroundImage: 'radial-gradient(circle at center, #1e293b 1px, transparent 1px)', 
                  backgroundSize: '20px 20px' 
                }}
              >
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <>
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        No messages yet
                      </div>
                    ) : (
                      messages.map(msg => (
                        <div 
                          key={msg._id}
                          className={`mb-2 max-w-xs flex ${msg.senderId === 'current-user' ? 'justify-end ml-auto' : 'justify-start'}`}
                        >
                          <div 
                            className={`p-2 rounded-lg text-sm break-words ${
                              msg.senderId === 'current-user' 
                                ? 'bg-blue-600 rounded-br-none text-white' 
                                : 'bg-gray-800 rounded-bl-none text-gray-100'
                            }`}
                          >
                            <p>{msg.message}</p>
                            <div className={`text-xs mt-1 ${msg.senderId === 'current-user' ? 'text-blue-200' : 'text-gray-400'}`}>
                              {formatTime(msg.createdAt)}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>
              
              {/* Message input - FIXED AT BOTTOM */}
              <form 
                onSubmit={handleSendMessage} 
                className="p-2 bg-gray-800 border-t border-gray-700 flex items-center"
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 rounded-full bg-gray-700 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  className="ml-2 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors disabled:bg-blue-800 disabled:cursor-not-allowed"
                  disabled={!newMessage.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PopupTelegramChat;
