import React, { useState, useRef, useEffect } from 'react';
import { useAI } from '../../context/AIContext';
import { Send, Minimize2, Maximize2, X, Sparkles, Brain, ChevronDown } from 'lucide-react';
import './ChatPanel.css';

function ChatPanel() {
  const { 
    messages, 
    isTyping, 
    sendMessage, 
    isChatOpen, 
    setIsChatOpen,
    getContext
  } = useAI();
  
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [contextStep, setContextStep] = useState('');
  const [refreshKey, setRefreshKey] = useState(0); // Force refresh trigger
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Watch for context changes and update contextStep state
  useEffect(() => {
    const interval = setInterval(() => {
      const context = getContext();
      if (context.currentStep && context.currentStep !== contextStep) {
        console.log('🔄 Context changed from', contextStep, 'to', context.currentStep);
        setContextStep(context.currentStep);
        setRefreshKey(prev => prev + 1); // Force re-render
      }
    }, 100); // Check every 100ms
    
    return () => clearInterval(interval);
  }, [getContext, contextStep]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle scroll to show/hide scroll-to-bottom button
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom && messages.length > 3);
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    await sendMessage(input);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Get suggestions based on current step - Simple and direct!
  const getSuggestedQuestions = () => {
    const step = contextStep;
    
    console.log('🔄 Getting suggestions for step:', step);
    
    if (step === 'product-input') {
      return [
        "How do I use the templates?",
        "Which channels should I select?",
        // "What makes a good product description?"
      ];
    } else if (step === 'audience-selection') {
      return [
        "What's the difference between these audiences?",
        "Which audience should I prioritize?",
        "Explain the fit score",
        "How does LCBM work?"
      ];
    } else if (step === 'creative-mode-selection') {
      return [
        "What's the difference between uploading and generating?",
        "How does AI generate variants?",
        "What file formats can I upload?",
        "Which option should I choose?"
      ];
    } else if (step === 'creative-intelligence') {
      return [
        "Why did this variant score higher?",
        "Which creative should I use?",
        "How are these scores calculated?",
        "Explain the hook strategy"
      ];
    } else if (step === 'campaign-upload') {
      return [
        "How do I upload my data?",
        "What file format should I use?",
        "What do you analyze?"
      ];
    } else if (step === 'analyzing-performance') {
      return [
        "What's being analyzed?",
        "How long will this take?",
        "What happens next?"
      ];
    } else if (step === 'diagnosis-results') {
      return [
        "Why is this happening?",
        "How do I fix this?",
        "Explain the KPI changes",
        "How confident is this diagnosis?"
      ];
    } else if (step === 'creative-recovery') {
      return [
        "Why did my creative stop working?",
        "What makes a good recovery creative?",
        "How are these variants different?",
        "Which variant should I test first?"
      ];
    } else if (step === 'company-input') {
      return [
        "Which template should I use?",
        "Why does industry matter?",
        "Should I specify target geography?"
      ];
    } else if (step === 'diagnosis-results') {
      return [
        "Why is this happening?",
        "How do I fix this?",
        "Explain the KPI changes",
        "How confident is this diagnosis?"
      ];
    } else if (step === 'creative-recovery') {
      return [
        "Why did my creative stop working?",
        "What makes a good recovery creative?",
        "How are these variants different?",
        "Which variant should I test first?"
      ];
    } else if (step === 'company-input') {
      return [
        "Which template should I use?",
        "Why does industry matter?",
        "Should I specify target geography?"
      ];
    } else if (step === 'analyzing-markets') {
      return [
        "What's being analyzed?",
        "How long will this take?",
        "What happens next?"
      ];
    } else if (step === 'market-recommendations') {
      return [
        "Compare these markets",
        "Which market should I choose?",
        "Explain the ROI projections",
        "What are the risks?"
      ];
    } else if (step === 'campaign-complete' || step === 'campaign-summary') {
      return [
        "Review my campaign summary",
        "How do I implement this?",
        "What results should I expect?",
        "What's the recommended budget?"
      ];
    }
    
    // Default fallback
    return [
      "How can you help me?",
      "What should I do next?",
      "Explain the recommendations"
    ];
  };

  const suggestedQuestions = getSuggestedQuestions();

  if (!isChatOpen) return null;

  return (
    <div className={`chat-panel ${isMinimized ? 'minimized' : ''}`}>
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="ai-avatar breathing">
            <Brain className="avatar-icon" />
          </div>
          <div className="chat-header-info">
            <h3 className="chat-title">AI Assistant</h3>
            <p className="chat-subtitle">Context-aware marketing expert</p>
          </div>
        </div>
        <div className="chat-header-actions">
          <button 
            className="icon-btn"
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Expand" : "Minimize"}
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button 
            className="icon-btn"
            onClick={() => setIsChatOpen(false)}
            title="Close chat"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Container */}
          <div 
            className="chat-messages" 
            ref={messagesContainerRef}
            onScroll={handleScroll}
          >
            {messages.length === 0 ? (
              // Empty State
              <div className="chat-empty-state">
                <div className="empty-state-icon">
                  <Sparkles size={48} />
                </div>
                <h4 className="empty-state-title">How can I help?</h4>
                <p className="empty-state-text">
                  I'm your AI marketing strategist. Ask me anything about your campaign, 
                  audiences, or creative strategies.
                </p>
              </div>
            ) : (
              // Messages
              <>
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`chat-message ${message.role}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="message-avatar pulse-glow">
                        <Sparkles size={16} />
                      </div>
                    )}
                    <div className="message-content">
                      {message.content}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="chat-message assistant">
                    <div className="message-avatar pulse-glow">
                      <Sparkles size={16} />
                    </div>
                    <div className="message-content typing-indicator">
                      <div className="ai-thinking">
                        <span className="ai-thinking-dot"></span>
                        <span className="ai-thinking-dot"></span>
                        <span className="ai-thinking-dot"></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </>
            )}

            {/* Scroll to Bottom Button */}
            {showScrollButton && (
              <button 
                className="scroll-to-bottom visible"
                onClick={scrollToBottom}
                aria-label="Scroll to bottom"
              >
                <ChevronDown size={20} />
              </button>
            )}
          </div>

          {/* Suggested Questions - ALWAYS VISIBLE */}
          <div className="suggested-questions persistent" key={`${contextStep}-${refreshKey}`}>
            <p className="suggestions-label">💬 Try asking:</p>
            <div className="suggestions-grid">
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={`${idx}-${refreshKey}`}
                  className="suggestion-chip"
                  onClick={() => {
                    setInput(question);
                    inputRef.current?.focus();
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="chat-input-wrapper">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Ask me anything about your campaign..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              aria-label="Chat input"
            />
            <button 
              className="send-btn"
              onClick={handleSend}
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatPanel;