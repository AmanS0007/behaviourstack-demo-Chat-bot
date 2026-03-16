import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

// Import flow-specific response handlers
import handleNewCampaignResponse from '../responses/newCampaignResponses';
import handlePerformanceDebugResponse from '../responses/performanceDebugResponses';
import handleRegionalExpansionResponse from '../responses/regionalExpansionResponses';

const AIContext = createContext();

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within AIProvider');
  }
  return context;
};

export const AIProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm your AI marketing strategist. I'm here to guide you through every step. Let's create something amazing together! 🚀",
      timestamp: Date.now()
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  
  // Screen context - what's currently visible to the user
  const screenContext = useRef({
    currentFlow: null,
    currentStep: null,
    visibleComponents: [],
    campaignData: {},
    selectedItems: {},
    availableActions: [],
    lastAutoMessageKey: null // Track last auto-message to avoid duplicates
  });

  // Update context whenever screen changes
  const updateContext = useCallback((updates) => {
    screenContext.current = {
      ...screenContext.current,
      ...updates
    };
    console.log('🧠 AI Context Updated:', screenContext.current);
  }, []);

  // Get current context for AI
  const getContext = useCallback(() => {
    return screenContext.current;
  }, []);

  // Send automatic proactive message based on user action
  const sendAutoMessage = useCallback(async (messageKey, contentGenerator) => {
    // Avoid sending duplicate auto-messages
    if (screenContext.current.lastAutoMessageKey === messageKey) {
      console.log('⏭️ Skipping duplicate auto-message:', messageKey);
      return;
    }
    
    console.log('📨 Sending auto-message:', messageKey);
    screenContext.current.lastAutoMessageKey = messageKey;
    
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 800)); // Shorter delay for auto-messages
    
    const content = contentGenerator(screenContext.current);
    
    const assistantMessage = {
      id: `auto-${Date.now()}`,
      role: 'assistant',
      content,
      timestamp: Date.now(),
      isAuto: true // Mark as auto-generated
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  }, []);

  // Generate AI response based on context - ROUTES TO FLOW-SPECIFIC HANDLERS
  const generateResponse = useCallback(async (userMessage) => {
    const context = getContext();
    
    // Route to the correct flow handler based on currentFlow
    if (context.currentFlow === 'new-campaign') {
      return handleNewCampaignResponse(userMessage, context);
    }
    
    if (context.currentFlow === 'performance-debug') {
      return handlePerformanceDebugResponse(userMessage, context);
    }
    
    if (context.currentFlow === 'regional-expansion') {
      return handleRegionalExpansionResponse(userMessage, context);
    }
    
    // Generic fallback if no flow is set
    return `Hi! I'm your AI marketing strategist. I can help you with:

• **New Campaign Strategy** - Discover audiences and create high-performing ads
• **Performance Debugging** - Diagnose underperforming campaigns
• **Regional Expansion** - Find the best markets for growth

Which flow would you like to start?`;
  }, [getContext]);

  // Send message to AI (user-initiated)
  const sendMessage = useCallback(async (content) => {
    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate AI response
    const aiResponse = await generateResponse(content);
    
    const assistantMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: aiResponse,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  }, [generateResponse]);

  // Clear chat history
  const clearChat = useCallback(() => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: "Chat cleared. How can I help you?",
      timestamp: Date.now()
    }]);
    screenContext.current.lastAutoMessageKey = null;
  }, []);

  const value = {
    messages,
    isTyping,
    isChatOpen,
    setIsChatOpen,
    sendMessage,
    sendAutoMessage,
    clearChat,
    updateContext,
    getContext
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

// ==========================================
// AUTO-MESSAGE GENERATORS
// ==========================================

export const AutoMessages = {
  // ==========================================
  // NEW CAMPAIGN FLOW AUTO-MESSAGES
  // ==========================================
  
  // Product Input Completed
  productInputCompleted: (context) => {
    const product = context.campaignData?.product;
    const productName = product?.productName || 'your product';
    const category = product?.category;
    const price = product?.price;
    const channels = product?.selectedChannels || [];
    
    let message = `Excellent! I've got your details for **${productName}**. `;
    
    if (category) {
      message += `I see you're in the **${category}** space`;
      if (category.toLowerCase().includes('coffee')) {
        message += ` - specialty coffee is having a moment! ☕`;
      } else if (category.toLowerCase().includes('beauty')) {
        message += ` - the beauty market is booming! ✨`;
      } else if (category.toLowerCase().includes('fitness')) {
        message += ` - perfect timing with the wellness trend! 💪`;
      }
      message += `. `;
    }
    
    if (price) {
      message += `At **$${price}**, you're positioned `;
      const priceNum = parseFloat(price);
      if (priceNum < 50) {
        message += `as an accessible entry point - great for volume! `;
      } else if (priceNum < 200) {
        message += `in the sweet spot for value-conscious buyers. `;
      } else {
        message += `as a premium offering - we'll target quality-focused audiences. `;
      }
    }
    
    if (channels.length > 0) {
      const channelNames = channels.map(ch => 
        ch === 'meta' ? 'Meta' :
        ch === 'google' ? 'Google' :
        ch === 'tiktok' ? 'TikTok' :
        ch === 'linkedin' ? 'LinkedIn' : ch
      ).join(' & ');
      message += `\n\n📊 **Channels selected**: ${channelNames}\n`;
      message += `LCBM will now discover high-fit audiences across ${channels.length > 1 ? 'these platforms' : 'this platform'}!`;
    }
    
    message += `\n\n✨ **Next up**: I'll show you LCBM-discovered audiences perfectly matched to ${productName}. Ready?`;
    
    return message;
  },

  // Audiences Selected
  audiencesSelected: (context) => {
    const selected = context.selectedItems?.audiences || [];
    const productName = context.campaignData?.product?.productName || 'your product';
    
    if (selected.length === 0) return 'Please select at least one audience to continue!';
    
    const audienceNames = selected.map(id => 
      id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    );
    
    let message = `🎯 Nice choice! You've selected **${selected.length} audience${selected.length > 1 ? 's' : ''}**:\n\n`;
    
    audienceNames.forEach((name, i) => {
      message += `${i + 1}. **${name}**\n`;
    });
    
    message += `\nThese audiences are behaviorally aligned with ${productName}. `;
    
    if (selected.length === 1) {
      message += `Great start! I recommend selecting **2-3 total** audiences for optimal reach and testing opportunities.`;
    } else if (selected.length === 2) {
      message += `Excellent! You have good coverage now. Want to add one more for a solid test matrix?`;
    } else if (selected.length >= 3) {
      message += `Perfect! You have ${selected.length} audiences - enough for comprehensive testing and scale. 🚀`;
    }
    
    message += `\n\n💡 **Pro tip**: These audiences have different behavioral patterns but similar purchase intent. Perfect for creative testing!`;
    
    return message;
  },

  // Creatives Generated
  creativesGenerated: (context) => {
    const productName = context.campaignData?.product?.productName || 'your product';
    const audienceCount = context.selectedItems?.audiences?.length || 0;
    
    return `🎨 **Creative variants generated!**

I've created AI-optimized ad creatives for ${productName} using **Transsuasion AI**. Each variant is scored based on predicted performance with your ${audienceCount} selected audience${audienceCount > 1 ? 's' : ''}.

**What the scores mean**:
• **9.0+** = Exceptionally strong, high confidence
• **8.5-8.9** = Very good, solid performer
• **8.0-8.4** = Good baseline, room to optimize

The variants differ in:
✓ **Hooks** - Opening attention-grabbers
✓ **Visual direction** - Style and aesthetic
✓ **Copy angles** - Messaging approach
✓ **CTAs** - Calls to action

**My recommendation**: Test the top 2-3 variants to find your winner! 🏆`;
  },

  // Creatives Uploaded (Upload mode)
  creativesUploaded: (context) => {
    const productName = context.campaignData?.product?.productName || 'your product';
    const uploadedCount = context.visibleComponents?.creatives?.length || context.campaignData?.creatives?.length || 0;
    const audienceCount = context.selectedItems?.audiences?.length || 0;
    
    return `📤 **Creatives uploaded and scored!**

I've analyzed your ${uploadedCount} creative${uploadedCount > 1 ? 's' : ''} for ${productName} using **LCBM** and scored them against your ${audienceCount} selected audience${audienceCount > 1 ? 's' : ''}.

**What the scores mean**:
• **9.0+** = Exceptionally strong fit with your audiences
• **8.5-8.9** = Very good performer
• **8.0-8.4** = Good baseline, room to optimize

Your creatives are now ranked by predicted performance. 

**What you can do**:
• Review the scores and why they performed
• Select your top performer
• Generate AI variants to compare against your uploads

Want to see how AI-generated variants stack up? Click "Generate Variants" below! 🎯`;
  },

  // Comparison Variants Generated (Upload mode comparison)
  comparisonVariantsGenerated: (context) => {
    const productName = context.campaignData?.product?.productName || 'your product';
    const uploadedCount = context.visibleComponents?.uploaded?.length || 0;
    const aiCount = context.visibleComponents?.aiVariants?.length || 0;
    
    return `✨ **AI variants generated for comparison!**

Now you can compare your ${uploadedCount} uploaded creative${uploadedCount > 1 ? 's' : ''} against ${aiCount} AI-generated variant${aiCount > 1 ? 's' : ''} for ${productName}.

**All variants scored the same way**:
• Same LCBM scoring system
• Same audience targeting
• Same performance predictions

**Compare**:
• Which scores higher?
• Which hooks resonate better?
• Which visual direction works best?

Select your winner from either your uploads or AI variants! 🏆`;
  },

  // Campaign Summary Ready
  campaignSummaryReady: (context) => {
    const productName = context.campaignData?.product?.productName || 'your product';
    const audienceCount = context.campaignData?.audiences?.length || 0;
    
    return `✅ **Campaign Summary Generated!**

Your campaign for **${productName}** is ready to launch:

📊 **${audienceCount} high-fit audiences** selected
🎨 **Creative variants** optimized per audience
💰 **Budget & targeting** configured

**What you can do**:
• Review the full strategy
• Export campaign assets
• Download audience targeting specs
• Get implementation guide

Ready to take this live? 🚀`;
  },

  // ==========================================
  // PERFORMANCE DEBUG FLOW AUTO-MESSAGES
  // ==========================================
  
  // Campaign Uploaded
  campaignUploaded: (context) => {
    return `📊 **Campaign data received!**

I'm analyzing your campaign performance with LCBM...

**What I'm checking**:
✓ Creative fatigue signals
✓ Audience performance patterns
✓ Funnel drop-off points
✓ Budget allocation efficiency

Give me a moment to run the diagnosis... 🔍`;
  },

  // Diagnosis Complete
  diagnosisComplete: (context) => {
    const diagnosis = context.diagnosis;
    const severity = diagnosis?.severity?.toLowerCase() || 'medium';
    
    let emoji = '⚠️';
    if (severity === 'high') emoji = '🚨';
    if (severity === 'low') emoji = '💡';
    
    return `${emoji} **Diagnosis complete!**

I've identified the root cause of your performance issues. 

**Key findings**:
• Primary issue detected
• Underperforming audience segments identified
• Recovery roadmap generated

Check out the diagnosis above and ask me anything! I can explain:
• Why this is happening
• Which audiences to prioritize
• How to recover performance
• Expected impact of changes

**Quick question**: Want me to generate new creative variants to solve this? 🎨`;
  },

  // Creative Recovery Page Loaded
  creativeRecoveryPageLoaded: (context) => {
    return `🎨 **Creative Recovery Mode**

I can see your current creative and why it's underperforming.

**I can help you**:
• Generate new AI-optimized variants
• Explain what's not working
• Recommend which variant to test first
• Show expected performance improvements

Want me to generate recovery creatives? Just click the button above! 🚀`;
  },

  // Recovery Creatives Generated
  recoveryCreativesGenerated: (context) => {
    return `✨ **Recovery variants generated!**

I've created fresh creative alternatives designed to overcome the fatigue and performance issues.

**What's different**:
✓ New hooks to recapture attention
✓ Updated visual direction
✓ Fresh messaging angles
✓ Optimized CTAs

**My recommendation**: Deploy the highest-scoring variant immediately and set up A/B testing with the second-highest.

Expected recovery: **+45-60% CTR** within 7 days! 📈`;
  },

  // ==========================================
  // REGIONAL EXPANSION FLOW AUTO-MESSAGES
  // ==========================================
  
  // Company Info Submitted
  companyInfoSubmitted: (context) => {
    const company = context.campaignData?.company;
    const companyName = company?.companyName || 'your company';
    const industry = company?.industry || 'your industry';
    
    return `🌎 **Analyzing expansion opportunities for ${companyName}**

I'm running LCBM across 50+ US markets to find the best fit for ${industry}...

**What I'm evaluating**:
✓ Market demographics
✓ Competition landscape
✓ Growth trajectories
✓ Entry costs & barriers
✓ ROI predictions

This will take just a moment... 🔍`;
  },

  // Markets Recommended
  marketsRecommended: (context) => {
    const markets = context.campaignData?.markets || [];
    const preferenceRating = context.campaignData?.preferenceRating;
    
    let message = `🎯 **Market analysis complete!**

I've identified your top ${markets.length} expansion opportunities.`;

    if (preferenceRating) {
      message += ` I've also rated your preferred region (**${preferenceRating.stateOrRegion}**) - check it out above!`;
    }

    message += `

**Ask me**:
• "Why did you recommend [market]?"
• "Compare Austin vs Denver"
• "What's the ROI based on?"
• "Which market should I prioritize?"
• "Explain the fit scores"

Each market is scored based on YOUR company profile and industry. Let's find your perfect expansion! 🚀`;
    
    return message;
  }
};