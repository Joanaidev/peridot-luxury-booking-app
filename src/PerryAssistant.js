import React, { useState, useEffect } from 'react';

const PerryAssistant = ({ currentStep, selectedPackage, selectedAddons, clientInfo }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => {
      addPerryMessage("Hi! I'm Perry, your photography concierge! 👋 How can I help you today?");
    }, 1000);
  }, []);

  const addPerryMessage = (message) => {
    setMessages(prev => [...prev, { type: 'perry', content: message, timestamp: new Date() }]);
  };

  const addUserMessage = (message) => {
    setMessages(prev => [...prev, { type: 'user', content: message, timestamp: new Date() }]);
  };

  const handleUserMessage = (message) => {
    addUserMessage(message);
    setUserInput('');
    
    setTimeout(() => {
      const response = getPerryResponse(message.toLowerCase());
      addPerryMessage(response);
    }, 1000);
  };

  const getPerryResponse = (message) => {
    if (message.includes('cancel') || message.includes('reschedule') || message.includes('policy')) {
      return "Smart to check that! Our complete policies are detailed at peridotimages.mypixieset.com/faqs/ - covers cancellations, rescheduling, weather contingencies, everything you'd want to know!";
    }
    
    if (message.includes('wear') || message.includes('outfit') || message.includes('prepare')) {
      return "Perfect question! Our comprehensive style guide at peridotimages.mypixieset.com/faqs/ covers outfits, colors, hair, makeup - like having a personal stylist guide you!";
    }
    
    if (message.includes('photos') || message.includes('delivery') || message.includes('when')) {
      return "Great question! Image delivery timing, formats, and our gallery system are all explained at peridotimages.mypixieset.com/faqs/ - you'll get the complete timeline there!";
    }

    if (message.includes('difference') || message.includes('package') || message.includes('compare')) {
      return "Happy to explain! Basic (15 photos) is perfect for minimalists. Premium (30+ photos) captures your family's story completely. Most families with 2+ people find Premium hits the sweet spot. What's your family size?";
    }

    if (message.includes('special needs') || message.includes('custom') || message.includes('specific')) {
      return "That sounds like it deserves personalized attention! For specialized requests, imagesbyperidot@gmail.com can work out all the details to make this perfect for your situation.";
    }

    return "That's a great question! For detailed info, check our FAQ at peridotimages.mypixieset.com/faqs/ or reach out to imagesbyperidot@gmail.com for personalized help. What else can I clarify about our packages?";
  };

  const quickActions = [
    "What's the difference between packages?",
    "What should I wear?",
    "When will I get photos?",
    "Contact the team"
  ];

  if (!isVisible) return null;

  return (
    <div className="perry-assistant" style={{ display: 'block', zIndex: 9999 }}>
      {!isOpen ? (
        <div 
          className="perry-bubble perry-pulse"
          onClick={() => setIsOpen(true)}
          title="Chat with Perry"
          style={{ 
            position: 'fixed', 
            bottom: '20px', 
            left: '20px', 
            zIndex: 9999,
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
            border: '2px solid white',
            fontSize: '1.5rem',
            animation: 'perryPulse 2s infinite'
          }}
        >
          💬
        </div>
      ) : (
        <div 
          className="perry-chat-panel"
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            width: '320px',
            height: '400px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <div 
            className="perry-header"
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div className="perry-title" style={{ fontWeight: 600 }}>
              Perry - Photography Concierge
            </div>
            <button 
              className="perry-close"
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
          
          <div 
            className="perry-messages"
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`perry-message ${msg.type}`}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: msg.type === 'perry' ? '#f8fafc' : '#3b82f6',
                  color: msg.type === 'perry' ? '#2d3748' : 'white',
                  alignSelf: msg.type === 'perry' ? 'flex-start' : 'flex-end',
                  maxWidth: '80%',
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}
              >
                {msg.content}
              </div>
            ))}
            
            {messages.length === 0 && (
              <div 
                className="perry-message perry"
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  color: '#2d3748',
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}
              >
                Hi! I'm Perry, your photography concierge. I can help explain packages, answer questions, or direct you to the right resources. What would you like to know? 📸
              </div>
            )}
            
            <div 
              className="perry-quick-actions"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: '12px'
              }}
            >
              {quickActions.map((action, index) => (
                <button 
                  key={index}
                  className="perry-quick-btn"
                  onClick={() => handleUserMessage(action)}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
          
          <div 
            className="perry-input-area"
            style={{
              padding: '12px 16px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              gap: '8px'
            }}
          >
            <input
              type="text"
              className="perry-input"
              placeholder="Ask me anything..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && userInput.trim() && handleUserMessage(userInput)}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
            />
            <button 
              className="perry-send"
              onClick={() => userInput.trim() && handleUserMessage(userInput)}
              style={{
                background: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes perryPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default PerryAssistant;
