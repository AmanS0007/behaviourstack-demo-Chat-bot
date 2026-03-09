import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

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

  // NEW: Send automatic proactive message based on user action
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

  // Generate AI response based on context
  const generateResponse = useCallback(async (userMessage) => {
    const context = getContext();
    const response = await simulateAIResponse(userMessage, context);
    return response;
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
    sendAutoMessage, // NEW: Expose auto-message function
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
  // New Campaign Flow - Product Input Completed
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

  // Audience Selection - When user selects audiences
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

  // Creative Intelligence - When creatives are generated
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

  // Creative Intelligence - When user uploads creatives
  creativesUploaded: (context) => {
    const creatives = context.visibleComponents?.creatives || [];
    const productName = context.campaignData?.product?.productName || 'your product';
    const audienceCount = context.selectedItems?.audiences?.length || 0;
    
    if (creatives.length === 0) return '';
    
    // Sort by score to find best and worst
    const sortedCreatives = [...creatives].sort((a, b) => (b.lcbm_score || 0) - (a.lcbm_score || 0));
    const topScore = sortedCreatives[0]?.lcbm_score || 0;
    const avgScore = creatives.reduce((sum, c) => sum + (c.lcbm_score || 0), 0) / creatives.length;
    
    let message = `📊 **LCBM scoring complete!**\n\n`;
    message += `I've analyzed your ${creatives.length} uploaded creative${creatives.length > 1 ? 's' : ''} for ${productName} against your ${audienceCount} selected audience${audienceCount > 1 ? 's' : ''}.\n\n`;
    
    message += `**Results:**\n`;
    message += `• Top score: **${topScore.toFixed(1)}** - ${topScore >= 8.5 ? 'Excellent fit!' : topScore >= 8.0 ? 'Solid performer' : 'Room for improvement'}\n`;
    message += `• Average score: **${avgScore.toFixed(1)}**\n`;
    message += `• Total creatives analyzed: **${creatives.length}**\n\n`;
    
    if (topScore >= 8.5) {
      message += `🎯 **Great news!** Your top creative is well-aligned with your audience preferences. `;
      message += `The LCBM model predicts strong performance based on behavioral signals.\n\n`;
    } else if (topScore >= 8.0) {
      message += `👍 **Good foundation!** Your creatives show decent alignment. `;
      message += `Consider generating AI variants to see if we can push the scores higher.\n\n`;
    } else {
      message += `💡 **Optimization opportunity!** Your creatives could benefit from refinement. `;
      message += `I recommend generating AI variants optimized for your audience's behavioral preferences.\n\n`;
    }
    
    message += `**Want to see how AI-generated variants compare?** I can create 4 optimized alternatives!`;
    
    return message;
  },

  // Creative Intelligence - When comparison variants are generated
  comparisonVariantsGenerated: (context) => {
    const uploadedCreatives = context.visibleComponents?.uploaded || [];
    const aiVariants = context.visibleComponents?.aiVariants || [];
    
    if (aiVariants.length === 0) return '';
    
    const uploadedTop = uploadedCreatives.length > 0 
      ? Math.max(...uploadedCreatives.map(c => c.lcbm_score || 0))
      : 0;
    const aiTop = Math.max(...aiVariants.map(v => v.lcbm_score || 0));
    
    let message = `✨ **AI variants generated for comparison!**\n\n`;
    message += `I've created 4 AI-optimized variants to compare against your uploaded creatives.\n\n`;
    
    message += `**Score Comparison:**\n`;
    message += `• Your top uploaded: **${uploadedTop.toFixed(1)}**\n`;
    message += `• AI top variant: **${aiTop.toFixed(1)}**\n`;
    
    if (aiTop > uploadedTop + 0.3) {
      message += `\n🚀 **Big opportunity!** The AI variants are scoring **${(aiTop - uploadedTop).toFixed(1)} points higher**. `;
      message += `They're better optimized for your audience's behavioral patterns and content affinities.\n\n`;
      message += `**My recommendation:** Test at least one AI variant alongside your uploaded creative!`;
    } else if (aiTop > uploadedTop) {
      message += `\n📈 **Slight edge to AI!** The AI variants are scoring marginally higher (${(aiTop - uploadedTop).toFixed(1)} points). `;
      message += `Both approaches could work well.\n\n`;
      message += `**My recommendation:** A/B test your top uploaded vs the top AI variant to find your winner.`;
    } else {
      message += `\n💪 **Your creatives are strong!** Your uploaded creative is matching or beating the AI variants. `;
      message += `You've got a good understanding of what resonates!\n\n`;
      message += `**My recommendation:** Stick with your top performer, or test both to validate.`;
    }
    
    return message;
  },

  // Performance Debug - File uploaded
  campaignUploaded: (context) => {
    const fileName = context.campaignData?.name || 'your campaign';
    
    return `📊 **Campaign data received!**

I've got your file: **${fileName}**

LCBM + Transsuasion AI are now analyzing:
✓ Creative performance trends
✓ Audience engagement patterns
✓ Funnel conversion metrics
✓ Budget efficiency signals

This will take about 10-15 seconds. I'll diagnose exactly what's happening and give you actionable recovery steps. Hang tight! ⏳`;
  },

  // Performance Debug - Diagnosis complete
  diagnosisComplete: (context) => {
    const diagnosis = context.diagnosis;
    const campaignData = context.campaignData;
    const issue = diagnosis?.issue || 'Performance issues detected';
    const severity = diagnosis?.severity || 'Medium';
    const confidence = diagnosis?.confidence || 0.85;
    
    let message = `✅ **Diagnosis Complete!**\n\n`;
    
    // Show what was analyzed
    if (campaignData) {
      message += `**Campaign Analyzed**: ${campaignData.name || 'Your campaign'}\n`;
      message += `📊 **Key Metrics Processed**:\n`;
      message += `• Spend: ${campaignData.spend || 'N/A'}\n`;
      message += `• Impressions: ${campaignData.impressions || 'N/A'}\n`;
      message += `• Clicks: ${campaignData.clicks || 'N/A'}\n`;
      message += `• Conversions: ${campaignData.conversions || 'N/A'}\n`;
      message += `• CTR: ${campaignData.ctr || 'N/A'}\n`;
      message += `• CPA: ${campaignData.cpa || 'N/A'}\n\n`;
    }
    
    // Show diagnosis
    message += `🔍 **Issue Identified**: ${issue}\n`;
    message += `⚠️ **Severity**: ${severity}\n`;
    message += `📈 **Confidence**: ${Math.round(confidence * 100)}%\n\n`;
    
    // Show impact
    if (diagnosis?.kpi_deltas) {
      message += `**Performance Changes Detected**:\n`;
      if (diagnosis.kpi_deltas.ctr) {
        message += `• CTR: ${diagnosis.kpi_deltas.ctr.previous} → ${diagnosis.kpi_deltas.ctr.current} (${diagnosis.kpi_deltas.ctr.change > 0 ? '+' : ''}${diagnosis.kpi_deltas.ctr.change}%)\n`;
      }
      if (diagnosis.kpi_deltas.cpa) {
        message += `• CPA: ${diagnosis.kpi_deltas.cpa.previous} → ${diagnosis.kpi_deltas.cpa.current} (${diagnosis.kpi_deltas.cpa.change > 0 ? '+' : ''}${diagnosis.kpi_deltas.cpa.change}%)\n`;
      }
      if (diagnosis.kpi_deltas.conversionRate) {
        message += `• Conv. Rate: ${diagnosis.kpi_deltas.conversionRate.previous} → ${diagnosis.kpi_deltas.conversionRate.current} (${diagnosis.kpi_deltas.conversionRate.change > 0 ? '+' : ''}${diagnosis.kpi_deltas.conversionRate.change}%)\n`;
      }
      message += `\n`;
    }
    
    message += `${severity === 'High' ? '🚨' : '⚠️'} This is **${severity.toLowerCase()} priority** and needs immediate attention.\n\n`;
    
    message += `**Root Cause**: ${diagnosis?.root_cause || 'Performance degradation detected across key metrics.'}\n\n`;
    
    message += `**Expected Recovery**: ${diagnosis?.expected_improvement || '+40-50% performance improvement'}\n\n`;
    
    message += `💡 I've prepared ${diagnosis?.recovery_actions?.length || 4} actionable recovery steps. Want to see the full recovery plan? Ask me!`;
    
    return message;
  },

  // Performance Debug - Creative Recovery Page Loaded
  creativeRecoveryPageLoaded: (context) => {
    const diagnosis = context.diagnosis;
    const uploadedFile = context.visibleComponents?.uploadedCreative;
    
    let message = `📸 **Creative Recovery Mode Activated!**\n\n`;
    
    if (uploadedFile) {
      message += `I can see your uploaded creative: **${uploadedFile.name}**\n\n`;
    }
    
    message += `**What Went Wrong:**\n`;
    message += `${diagnosis?.root_cause || 'Your creative is experiencing performance fatigue.'}\n\n`;
    
    message += `**The Solution:**\n`;
    message += `Generate fresh AI-optimized variants with:\n`;
    message += `✓ New hooks your audience hasn't seen\n`;
    message += `✓ Different visual directions\n`;
    message += `✓ Fresh copy angles\n`;
    message += `✓ Optimized CTAs\n\n`;
    
    message += `**Expected Impact:** ${diagnosis?.expected_improvement || '+45-60% CTR recovery'}\n\n`;
    
    message += `Ready to generate performance-optimized alternatives? Click "Generate AI variants" below! 🚀`;
    
    return message;
  },

  // Regional Expansion - Company info submitted
  companyInfoSubmitted: (context) => {
    const company = context.campaignData?.company;
    const companyName = company?.companyName || 'Your company';
    const industry = company?.industry || 'your industry';
    const revenue = company?.revenue;
    
    let message = `🌎 **Company Profile Received!**\n\n`;
    
    message += `**${companyName}**\n`;
    message += `Industry: ${industry}\n`;
    if (revenue) {
      const formattedRevenue = parseInt(revenue) >= 1000000 
        ? `$${(parseInt(revenue) / 1000000).toFixed(1)}M` 
        : `$${parseInt(revenue).toLocaleString()}`;
      message += `Revenue: ${formattedRevenue}\n`;
    }
    message += `\n`;
    
    message += `🔍 **Analyzing 50+ US markets...**\n`;
    message += `LCBM is evaluating:\n`;
    message += `• Demographics & population growth\n`;
    message += `• Competitive landscape\n`;
    message += `• Entry costs & ROI potential\n`;
    message += `• Industry-specific fit scores\n\n`;
    
    if (company?.preferenceState) {
      message += `📍 I'll also rate your preferred region: **${company.preferenceState}**\n\n`;
    }
    
    message += `Hang tight! This will take just a moment... ⏱️`;
    
    return message;
  },

  // Regional Expansion - Markets recommended
  marketsRecommended: (context) => {
    const company = context.campaignData?.company;
    const markets = context.campaignData?.markets || [];
    const preferenceRating = context.campaignData?.preferenceRating;
    const companyName = company?.companyName || 'your company';
    
    if (markets.length === 0) return '';
    
    const topMarket = markets[0];
    
    let message = `✅ **Market Analysis Complete!**\n\n`;
    
    // If they provided a preference, talk about it
    if (preferenceRating) {
      message += `📍 **Your Preference: ${preferenceRating.stateOrRegion}**\n`;
      message += `Fit Score: **${preferenceRating.fitScore}** (${preferenceRating.verdict})\n`;
      message += `${preferenceRating.summary}\n\n`;
      
      // Compare to top recommendation
      if (topMarket.fit_score > preferenceRating.fitScore) {
        message += `💡 **Worth noting:** Our #1 recommendation scores **${topMarket.fit_score}** - higher than your preference. `;
        message += `${topMarket.name} may offer better ROI potential for ${company?.industry || 'your industry'}.\n\n`;
      } else if (preferenceRating.stateOrRegion.toLowerCase().includes(topMarket.name.toLowerCase().split(',')[0])) {
        message += `🎯 **Great instincts!** Your preference aligns with our top recommendation!\n\n`;
      }
    }
    
    message += `🏆 **Top Recommendation: ${topMarket.name}**\n`;
    message += `• Fit Score: **${topMarket.fit_score}**\n`;
    message += `• ROI: **${topMarket.predicted_roi}**\n`;
    message += `• Entry Cost: **${topMarket.entry_cost}**\n`;
    message += `• Timeline: **${topMarket.timeline}**\n\n`;
    
    message += `**Why ${topMarket.name}?**\n`;
    message += `${topMarket.reason}\n\n`;
    
    if (markets.length > 1) {
      message += `I've also identified **${markets.length - 1} other strong market${markets.length > 2 ? 's' : ''}** worth considering. `;
    }
    
    message += `Want to dive deeper into any market? Ask me anything! 💬`;
    
    return message;
  },

  // Regional Expansion - Company info submitted
  companyInfoSubmitted: (context) => {
    const company = context.campaignData?.company;
    const companyName = company?.name || 'your company';
    const industry = company?.industry;
    const revenue = company?.revenue;
    
    let message = `👋 Thanks! I've got the details for **${companyName}**.\n\n`;
    
    if (industry) {
      message += `**Industry**: ${industry}`;
      if (industry === 'Coffee') {
        message += ` ☕ - The specialty coffee market is thriving!`;
      } else if (industry === 'Fitness') {
        message += ` 💪 - Wellness is a booming sector!`;
      } else if (industry === 'Beauty') {
        message += ` ✨ - Beauty brands are seeing strong growth!`;
      }
      message += `\n`;
    }
    
    if (revenue) {
      message += `**Revenue**: ${revenue}`;
      const revenueNum = parseFloat(revenue.replace(/[^0-9.]/g, ''));
      if (revenueNum < 2) {
        message += ` - Perfect for emerging market entry strategies`;
      } else if (revenueNum < 5) {
        message += ` - You're ready for strategic expansion!`;
      } else {
        message += ` - Great position for aggressive growth!`;
      }
      message += `\n`;
    }
    
    message += `\n🗺️ **Next**: LCBM will analyze 50+ US markets to find your best expansion opportunities. `;
    message += `I'll show you the top 3 markets with fit scores, ROI projections, and entry costs!`;
    
    return message;
  }
};

// ==========================================
// AI RESPONSE SIMULATION
// ==========================================

async function simulateAIResponse(userMessage, context) {
  const lowerMessage = userMessage.toLowerCase();
  
  // ==========================================
  // PRODUCT INPUT PAGE
  // ==========================================
  if (context.currentStep === 'product-input') {
    if (lowerMessage.includes('channel')) {
      return `📱 **Channel Selection Guide:**

Your channel choices determine where LCBM searches for audiences:

**Meta (Facebook & Instagram):**
• Richest behavioral data
• Best for B2C, lifestyle products
• Excellent content affinity signals

**Google Ads:**
• Intent-based behavioral data
• Great for research-heavy purchases
• Strong purchase timing signals

**TikTok:**
• Best for under-35 demographics
• Trend-driven behavioral patterns
• High engagement signals

**LinkedIn:**
• B2B and professional audiences
• Career/role-based behaviors
• Premium product positioning

**Recommendation:**
Start with Meta + Google for broadest behavioral coverage. Add TikTok if your product appeals to Gen Z/Millennials.

Currently selected: ${context.campaignData?.product?.selectedChannels?.length || 0} channels`;
    }
    
    if (lowerMessage.includes('template') || lowerMessage.includes('example')) {
      return `💡 **Using Templates:**

The quick-start templates show you what good product input looks like:

• **Coffee Brand**: Beverage space, premium positioning
• **Beauty Brand**: Clean beauty, ingredient-focused
• **Fitness Brand**: Connected device, performance-oriented

Click any template to auto-fill, then customize for your product. LCBM will use this information to discover behaviorally-similar audiences.

**Pro tip:** The more specific your product description, the better LCBM can discover precise audience matches!`;
    }
  }
  
  // ==========================================
  // AUDIENCE SELECTION PAGE
  // ==========================================
  if (context.currentStep === 'audience-selection') {
    const audiences = context.visibleComponents?.audiences || [];
    const selected = context.selectedItems?.audiences || [];
    const productName = context.campaignData?.product?.productName || 'your product';
    
    // Compare audiences
    if (lowerMessage.includes('difference') || lowerMessage.includes('compare')) {
      if (selected.length < 2) {
        return "You need to select at least 2 audiences to compare. Click on the audience cards to select them, then ask me again!";
      }
      
      const audienceNames = selected.map(id => 
        id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      );
      
      // If 2 audiences, do detailed comparison
      if (selected.length === 2) {
        return `Great question! Let me compare **${audienceNames[0]}** vs **${audienceNames[1]}** for ${productName}:

**${audienceNames[0]}:**
• Typically has higher engagement with premium content
• More established purchase patterns
• Smaller but more qualified audience
• Best for: Brand building, premium positioning

**${audienceNames[1]}:**
• Broader reach and scale potential
• More price-sensitive behavior signals  
• Larger total addressable market
• Best for: Volume growth, market penetration

💡 **Pro tip:** These audiences complement each other well. Use ${audienceNames[0]} for your hero creative with premium messaging, and ${audienceNames[1]} for volume campaigns with value-focused angles.

Want me to explain the specific behavioral signals for either?`;
      }
      
      // If 3+ audiences, do overview comparison
      let message = `Great question! Let me compare all **${selected.length} selected audiences** for ${productName}:\n\n`;
      
      audienceNames.forEach((name, index) => {
        message += `**${index + 1}. ${name}:**\n`;
        
        // Assign characteristics based on position
        if (index === 0) {
          message += `• Highest fit score - strongest behavioral match\n`;
          message += `• Most aligned with your core product value\n`;
          message += `• Best for: Primary targeting, testing creative messaging\n`;
        } else if (index === 1) {
          message += `• Strong fit with broader reach potential\n`;
          message += `• Good balance of quality and scale\n`;
          message += `• Best for: Scaling winners, expanding market\n`;
        } else {
          message += `• Solid fit score with unique characteristics\n`;
          message += `• Different behavioral patterns than primary audiences\n`;
          message += `• Best for: Testing new angles, diversifying reach\n`;
        }
        message += `\n`;
      });
      
      message += `**Key Insights:**\n`;
      message += `• These ${selected.length} audiences have **low overlap** - you're reaching distinct user groups\n`;
      message += `• Each audience responds to different messaging angles\n`;
      message += `• Recommended budget split: 50% / ${Math.round(50 / (selected.length - 1))}% / ${Math.round(50 / (selected.length - 1))}%\n\n`;
      message += `**My recommendation:** Start with your highest-fit audience, validate creative, then scale to the others.\n\n`;
      message += `Want deeper analysis on any specific audience?`;
      
      return message;
    }
    
    // Best audience recommendation
    if ((lowerMessage.includes('which') || lowerMessage.includes('what')) && 
        (lowerMessage.includes('best') || lowerMessage.includes('recommend') || lowerMessage.includes('choose') || lowerMessage.includes('prioritize'))) {
      
      if (audiences.length === 0) {
        return "Once LCBM finishes discovering audiences, I can recommend the best ones for your campaign!";
      }
      
      return `🎯 **My Recommendation for ${productName}:**

Based on LCBM analysis, here's what I'd do:

**Primary Target (Start Here):**
Select the audience with **fit score 90+**. This represents the strongest behavioral match with your product. These people are already primed for what you're selling.

**Scale Play (Add for Reach):**
Include the audience with **3M+ reach**. This expands your total addressable market while maintaining decent fit (85+ score).

**Dark Horse (Test Opportunity):**
Try one "unexpected" audience in the 85-89 range. Sometimes these surprise with strong performance and lower CPAs due to less competition.

**Budget Split:**
• 50% to your primary (highest fit)
• 30% to your scale play
• 20% to your test audience

Selected audiences: ${selected.length}. Need ${Math.max(0, 3 - selected.length)} more for optimal coverage.

Want me to explain why any specific audience scored the way it did?`;
    }
    
    // Explain fit score
    if (lowerMessage.includes('fit score') || (lowerMessage.includes('how') && lowerMessage.includes('score'))) {
      return `📈 **Understanding Fit Scores:**

The fit score (0-100) is calculated by **LCBM** (Latent Consumer Behaviour Model) based on:

**1. Behavioral Signals (40% weight)**
• Purchase patterns similar to your existing customers
• Content engagement (what they click, watch, share)
• Platform usage patterns

**2. Content Affinities (30% weight)**  
• Types of content they consume
• Influencers/brands they follow
• Topics they engage with

**3. Purchase Intent Indicators (30% weight)**
• Research behavior (reading reviews, comparisons)
• Timing signals (life events, seasonal patterns)
• Budget indicators (price sensitivity signals)

**Score Ranges:**
• **90-100**: Extremely high fit, prioritize these
• **85-89**: Strong fit, excellent for scaling
• **80-84**: Good fit, test carefully
• **<80**: May require heavy creative adaptation

Your selected audiences are scoring ${selected.length > 0 ? 'well' : 'not selected yet'}. The model has ${context.campaignData?.product?.existingCustomers || '0'} existing customer profiles to learn from.

Want me to break down a specific audience's score?`;
    }
    
    // Explain LCBM
    if (lowerMessage.includes('lcbm') || (lowerMessage.includes('how does') && lowerMessage.includes('work'))) {
      return `🧠 **How LCBM Works:**

LCBM (Latent Consumer Behaviour Model) is an AI model based on academic research that discovers audiences by analyzing behavioral patterns.

**The Process:**
1. **Analyzes** ${context.campaignData?.product?.existingCustomers || 'your existing'} customers
2. **Identifies** behavioral patterns (what they consume, share, click)
3. **Discovers** similar behavioral clusters across ${context.campaignData?.product?.selectedChannels?.length || 'multiple'} channels
4. **Ranks** new audiences by behavioral similarity

**Why It Works:**
Traditional targeting uses demographics (age, gender, location). LCBM uses **behavioral signals** - what people actually do, not just who they are.

Example: Two 30-year-old males in Austin might have completely different purchasing behaviors. LCBM finds people who *behave like your customers*, regardless of demographics.

**Data Sources:**
${context.campaignData?.product?.selectedChannels?.map(ch => 
  ch === 'meta' ? 'Meta' :
  ch === 'google' ? 'Google' :
  ch === 'tiktok' ? 'TikTok' : 
  ch === 'linkedin' ? 'LinkedIn' : ch
).join(', ') || 'Multiple platforms'}

Want to know more about a specific discovery?`;
    }
  }
  
  // ==========================================
  // CREATIVE INTELLIGENCE PAGE
  // ==========================================
  if (context.currentStep === 'creative-intelligence') {
    const selectedAudienceCount = context.campaignData?.audiences?.length || 0;
    
    if (lowerMessage.includes('score') || lowerMessage.includes('creative') || lowerMessage.includes('variant')) {
      return `🎨 **Creative Scoring with LCBM + Transsuasion AI:**

Your creative scores are based on alignment with your ${selectedAudienceCount} selected audience${selectedAudienceCount > 1 ? 's' : ''} preferences:

**What We Analyze:**
• Hook strength (matches content affinities)
• Visual direction (aligned with consumption patterns)
• Copy angle (resonates with behavioral motivations)
• CTA effectiveness (matches decision-making patterns)

**The Models:**
• **LCBM**: Validates audience alignment
• **Transsuasion AI**: Predicts persuasion effectiveness

**Score Ranges:**
• **9.0+**: Exceptionally strong, high confidence
• **8.5-8.9**: Strong performers, safe bets
• **8.0-8.4**: Good baseline, room for optimization
• **<8.0**: May underperform, consider regeneration

Want me to explain what makes a specific variant score higher?`;
    }

    if (lowerMessage.includes('which') && (lowerMessage.includes('choose') || lowerMessage.includes('use') || lowerMessage.includes('best'))) {
      return `🏆 **Which Creative to Choose:**

Here's my recommendation:

**Primary (Launch with this):**
Choose the **highest scoring variant** (9.0+). This has the strongest predicted performance.

**Secondary (Test alongside):**
Pick one variant with a **different approach** (different hook or angle) but still 8.5+ score. This gives you A/B test data.

**Test Matrix:**
If you want robust testing:
• 50% budget → Top variant
• 30% budget → Second variant  
• 20% budget → Wild card (different style)

**Pro tip:** The top 2-3 variants often have similar scores but different approaches. Test them to find what resonates best with YOUR specific audience!

Want me to explain the differences between specific variants?`;
    }

    if (lowerMessage.includes('upload') || lowerMessage.includes('existing') || lowerMessage.includes('own')) {
      return `📤 **Upload Your Existing Creatives:**

You can upload your current ads and I'll:
• Score them using LCBM + Transsuasion AI
• Show you how they align with your selected audiences
• Generate improved alternatives if needed
• Compare your creatives vs AI-generated ones side-by-side

**Supported formats:** JPG, PNG, MP4
**What we analyze:** Hooks, visuals, copy, CTAs

Want to see how your current creatives stack up against AI-generated variants?`;
    }
  }

  // ==========================================
  // PERFORMANCE DEBUG / DIAGNOSIS RESULTS
  // ==========================================
  if (context.currentStep === 'campaign-upload' || 
      context.currentStep === 'analyzing-performance' || 
      context.currentStep === 'diagnosis-results') {
    
    const diagnosis = context.diagnosis;
    const campaignData = context.campaignData;
    
    // Upload instructions
    if (context.currentStep === 'campaign-upload' && 
        (lowerMessage.includes('upload') || lowerMessage.includes('format') || lowerMessage.includes('how'))) {
      return `📤 **How to Upload Your Campaign Data:**

**Supported Formats:**
• CSV files (.csv)
• Excel files (.xlsx, .xls)
• Direct exports from Google Ads, Meta Ads, TikTok Ads

**What We Need:**
At minimum, your file should include:
• Campaign name or ID
• Spend/budget data
• Impressions
• Clicks
• Conversions
• CTR (or we'll calculate it)
• CPA (or we'll calculate it)

**Pro tip:** Export directly from your ad platform for the most accurate analysis. Most platforms have a "Download Report" or "Export Data" option.

Ready to upload? Just drag and drop or click "Choose File"!`;
    }
    
    // What gets analyzed
    if (lowerMessage.includes('analyze') || lowerMessage.includes('what') && lowerMessage.includes('do')) {
      return `🔍 **What LCBM + Transsuasion AI Analyze:**

**Creative Performance:**
• CTR trends over time
• Creative fatigue signals
• Hook effectiveness decay
• Visual engagement patterns

**Audience Behavior:**
• Engagement rate changes
• Audience saturation indicators
• Behavioral pattern shifts
• Segment performance variance

**Funnel Metrics:**
• Conversion rate trends
• Drop-off points
• CPA efficiency
• ROAS optimization opportunities

**Budget Efficiency:**
• Spend allocation effectiveness
• Wasted spend identification
• Optimization opportunities
• ROI improvement potential

**The AI will pinpoint the exact issue** and give you a recovery roadmap with predicted improvement!`;
    }
    
    // Why is this happening (root cause)
    if (diagnosis && (lowerMessage.includes('why') || lowerMessage.includes('cause') || lowerMessage.includes('reason'))) {
      return `🔎 **Root Cause Analysis:**

${diagnosis.root_cause || 'Performance degradation detected across key metrics.'}

**What This Means:**
${diagnosis.issue === 'Creative Fatigue Detected' ? 
`Your ad creative has been shown to the same audiences too many times. They've developed "banner blindness" and are scrolling past your ads.

**Why It Happens:**
• Ad creative running 40+ days without refresh
• Same hooks/visuals shown repeatedly
• Audience saturation reached
• Novelty factor completely gone

**The Fix:** Fresh creative variants with new hooks, angles, and visuals will recapture attention.` :
`Your campaign is experiencing performance issues that need addressing. The AI has identified specific metrics that are declining and traced them to their root cause.`}

**Confidence Level:** ${Math.round((diagnosis.confidence || 0.85) * 100)}% - ${diagnosis.confidence >= 0.9 ? 'Very high' : diagnosis.confidence >= 0.8 ? 'High' : 'Medium'}

Want to see the recovery plan?`;
    }
    
    // How to fix
    if (diagnosis && (lowerMessage.includes('fix') || lowerMessage.includes('recover') || lowerMessage.includes('solve') || lowerMessage.includes('action'))) {
      const actions = diagnosis.recovery_actions || [];
      
      let response = `🛠️ **Recovery Action Plan:**\n\n`;
      response += `I've identified **${actions.length} key actions** to recover performance:\n\n`;
      
      actions.forEach((action, idx) => {
        response += `**${idx + 1}. ${action}**\n`;
        
        // Add context for specific actions
        if (action.includes('new creative') || action.includes('variants')) {
          response += `   → You can generate AI-optimized variants or upload new creatives\n`;
        } else if (action.includes('Pause')) {
          response += `   → Stop the bleeding immediately to prevent wasted spend\n`;
        } else if (action.includes('A/B')) {
          response += `   → Test new approaches to find what works now\n`;
        } else if (action.includes('rotation')) {
          response += `   → Prevent future fatigue with systematic creative refresh\n`;
        }
        response += `\n`;
      });
      
      response += `**Expected Recovery:** ${diagnosis.expected_improvement || '+40-50% performance improvement'}\n\n`;
      response += `**Timeline:** Most recovery plans show results within 7-14 days.\n\n`;
      response += `Ready to start? I can help you generate new creative variants right now!`;
      
      return response;
    }
    
    // Explain KPI changes
    if (diagnosis?.kpi_deltas && (lowerMessage.includes('kpi') || lowerMessage.includes('metric') || lowerMessage.includes('change') || lowerMessage.includes('drop'))) {
      const deltas = diagnosis.kpi_deltas;
      
      let response = `📉 **KPI Performance Changes:**\n\n`;
      
      if (deltas.ctr) {
        response += `**Click-Through Rate (CTR):**\n`;
        response += `• Previous: ${deltas.ctr.previous}\n`;
        response += `• Current: ${deltas.ctr.current}\n`;
        response += `• Change: ${deltas.ctr.change > 0 ? '+' : ''}${deltas.ctr.change}%\n`;
        response += `${deltas.ctr.change < -20 ? '🚨 Critical drop - immediate action needed\n' : deltas.ctr.change < -10 ? '⚠️ Significant decline\n' : ''}\n`;
      }
      
      if (deltas.cpa) {
        response += `**Cost Per Acquisition (CPA):**\n`;
        response += `• Previous: ${deltas.cpa.previous}\n`;
        response += `• Current: ${deltas.cpa.current}\n`;
        response += `• Change: ${deltas.cpa.change > 0 ? '+' : ''}${deltas.cpa.change}%\n`;
        response += `${deltas.cpa.change > 30 ? '🚨 Costs spiking - efficiency lost\n' : deltas.cpa.change > 15 ? '⚠️ Rising costs\n' : ''}\n`;
      }
      
      if (deltas.conversionRate) {
        response += `**Conversion Rate:**\n`;
        response += `• Previous: ${deltas.conversionRate.previous}\n`;
        response += `• Current: ${deltas.conversionRate.current}\n`;
        response += `• Change: ${deltas.conversionRate.change > 0 ? '+' : ''}${deltas.conversionRate.change}%\n`;
        response += `${deltas.conversionRate.change < -15 ? '🚨 Major conversion drop\n' : deltas.conversionRate.change < -5 ? '⚠️ Declining conversions\n' : ''}\n`;
      }
      
      response += `\n**What This Means:**\n`;
      response += `These metrics are interconnected. ${diagnosis.issue || 'The performance issue'} is causing a cascade effect across your funnel.\n\n`;
      response += `**The Good News:** Fixing the root cause will improve all these metrics simultaneously!`;
      
      return response;
    }
    
    // Confidence explanation
    if (diagnosis && (lowerMessage.includes('confidence') || lowerMessage.includes('sure') || lowerMessage.includes('certain'))) {
      const confidence = diagnosis.confidence || 0.85;
      const confidencePercent = Math.round(confidence * 100);
      
      return `📊 **Diagnosis Confidence: ${confidencePercent}%**

**What This Means:**
${confidence >= 0.9 ? 
`Very high confidence - the AI is ${confidencePercent}% certain this is the root cause. The signal patterns are clear and match known issue signatures.` :
confidence >= 0.8 ?
`High confidence - the AI is ${confidencePercent}% certain. The data strongly points to this diagnosis, with clear supporting evidence.` :
`Medium confidence - the AI is ${confidencePercent}% certain. There's good evidence, but some ambiguity in the signals.`}

**How Confidence is Calculated:**
• Pattern matching against thousands of campaign issues
• Signal strength and consistency
• Data completeness and quality
• Cross-validation across multiple metrics

**Bottom Line:** ${confidence >= 0.85 ? 'You can act on this diagnosis with confidence.' : 'Consider this diagnosis seriously, but monitor results closely.'}

The recovery actions are designed to work regardless, so even with ${confidencePercent}% confidence, taking action is the right move!`;
    }
  }

  // ==========================================
  // CREATIVE RECOVERY PAGE (Performance Debug)
  // ==========================================
  if (context.currentStep === 'creative-recovery') {
    const diagnosis = context.diagnosis;
    
    // Why did my creative stop working?
    if (lowerMessage.includes('why') && (lowerMessage.includes('stop') || lowerMessage.includes('not working') || lowerMessage.includes('fail'))) {
      return `🔍 **Why Your Creative Stopped Working:**

${diagnosis?.root_cause || 'Your ad creative has been running too long and audiences are experiencing banner blindness.'}

**Creative Fatigue Happens When:**
• Same creative runs 40+ days without refresh
• Audiences see the same hooks/visuals repeatedly
• Novelty factor is completely gone
• Engagement drops as familiarity increases

**What Your Data Shows:**
${diagnosis?.issue === 'Creative Fatigue Detected' ? 
`Your creative has been running for 47 days. CTR dropped 32% in the last 14 days alone. Your audiences have seen this creative so many times, they're scrolling right past it.` :
`Performance metrics show declining engagement patterns consistent with creative fatigue.`}

**The Fix:** Fresh creative variants with new hooks, angles, and visuals will recapture attention and re-engage your audience.

Want me to explain what makes a good recovery creative?`;
    }
    
    // What makes a good recovery creative?
    if (lowerMessage.includes('good') && lowerMessage.includes('recovery')) {
      return `🎨 **What Makes a Good Recovery Creative:**

**1. Fresh Hooks (Most Important)**
• Use completely different opening lines
• Test new attention-grabbers your audience hasn't seen
• Avoid any similarity to fatigued creative
• Example: If old hook was "Save Time", try "Reclaim Your Day"

**2. New Visual Direction**
• Different color palette
• New photography style or illustration approach
• Fresh layout and composition
• Avoid visual elements from fatigued creative

**3. Different Copy Angles**
• Shift messaging approach entirely
• If old angle was "convenience", try "results"
• Test different value propositions
• New storytelling approach

**4. Optimized CTAs**
• Different call-to-action wording
• New urgency or incentive angle
• Test various CTA styles

**5. Behavioral Alignment**
• Still match your audience's content affinities
• Address their behavioral patterns
• Maintain brand voice while being fresh

**Expected Impact:**
Recovery creatives typically see **+45-60% CTR improvement** within 7 days by recapturing lost attention.

The AI variants I can generate follow all these principles. Ready to create them?`;
    }
    
    // How are these variants different?
    if (lowerMessage.includes('different') || lowerMessage.includes('compare')) {
      if (context.visibleComponents?.generatedVariants?.length > 0) {
        return `🔄 **How These Variants Differ From Your Original:**

**Your Original Creative:**
• Has been running 47+ days
• Audiences have seen it repeatedly
• CTR declined 32% recently
• Suffering from banner blindness

**AI-Generated Recovery Variants:**

Each variant uses a completely different approach:

**Variant 1 - Fresh Hook**
• New opening that grabs attention
• Different angle on your value prop
• Untested by your audience

**Variant 2 - New Visual Direction**
• Different color scheme and style
• Fresh imagery approach
• Breaks pattern recognition

**Variant 3 - Alternative Copy Angle**
• Different messaging strategy
• New storytelling approach
• Addresses pain points differently

**Variant 4 - Combination Play**
• Mixes best elements
• Unique positioning
• Maximum differentiation

**Key Difference:**
Each variant scores **8.5+** because it's optimized for your audience's behavioral preferences WHILE being completely fresh. It's the best of both worlds: relevance + novelty.

Your audience will see these as brand new ads, not the same fatigued creative they've been ignoring.`;
      }
      
      return `I'll be able to show you how the variants differ once you generate them! Click "Generate AI variants" and I'll explain each one's unique approach.`;
    }
    
    // Which variant should I test first?
    if ((lowerMessage.includes('which') || lowerMessage.includes('what')) && 
        (lowerMessage.includes('first') || lowerMessage.includes('test') || lowerMessage.includes('use') || lowerMessage.includes('deploy'))) {
      
      if (context.visibleComponents?.generatedVariants?.length > 0) {
        const variants = context.visibleComponents.generatedVariants;
        const topVariant = variants.reduce((prev, current) => 
          (current.lcbm_score || 0) > (prev.lcbm_score || 0) ? current : prev
        );
        
        return `🏆 **Which Variant to Test First:**

**My Recommendation: ${topVariant.name}**

**Why This One First:**
• Highest LCBM score: **${topVariant.lcbm_score}**
• Strongest predicted performance
• Best alignment with audience preferences
• Proven hook pattern for recovery

**Hook:** "${topVariant.hook}"

This hook is designed to recapture attention from fatigued audiences. It's different enough from your original to feel fresh, while still being relevant to your audience's behavioral patterns.

**Testing Strategy:**

**Week 1 (Immediate):**
• Deploy ${topVariant.name} at 100% budget
• Pause fatigued creative completely
• Monitor CTR recovery

**Week 2 (After validation):**
• If CTR improves 30%+, keep it
• Add second-highest variant for A/B testing
• Split 70/30 budget

**Week 3+ (Scale):**
• Rotate in 3rd variant
• Prevent new fatigue with regular rotation
• Test 2-3 variants continuously

**Expected Timeline:**
• Days 1-3: CTR recovery begins
• Days 4-7: Full recovery (+45-60% CTR)
• Week 2+: Sustained performance

Start with ${topVariant.name}, validate recovery, then scale!`;
      }
      
      return `Once you generate the variants, I'll recommend which one to test first based on LCBM scores and recovery potential!`;
    }
  }

  // ==========================================
  // REGIONAL EXPANSION FLOW
  // ==========================================
  if (context.currentStep === 'company-input' ||
      context.currentStep === 'analyzing-markets' ||
      context.currentStep === 'market-recommendations') {
    
    const company = context.campaignData?.company;
    const markets = context.campaignData?.markets || []; // FIXED: was context.visibleComponents?.markets
    const preferenceRating = context.campaignData?.preferenceRating;
    
    // Template selection questions
    if (context.currentStep === 'company-input' && 
        (lowerMessage.includes('template') || lowerMessage.includes('example'))) {
      return `💡 **Using Templates:**

The quick-start templates show you what good company input looks like:

• **Peak Fitness Co.**: Fitness industry, $2.5M revenue, expanding from West Coast
• **Vela Beauty Labs**: Beauty industry, $4.2M revenue, East Coast expansion
• **Ember Roasts Coffee**: Coffee industry, $1.8M revenue, specialty coffee markets

Click any template to auto-fill, then customize for your company. LCBM will use this information to discover perfect expansion markets based on:
• Industry fit and behavioral patterns
• Current market positioning
• Revenue scale and expansion readiness
• Geographic and cultural alignment

**Pro tip:** The more specific your expansion goals, the better LCBM can discover precise market matches!`;
    }
    
    // Why industry matters
    if (lowerMessage.includes('industry') && lowerMessage.includes('matter')) {
      return `🏭 **Why Industry Matters for Market Selection:**

Your industry determines which markets will be most receptive to your business:

**Industry-Specific Factors:**
• **Fitness**: Markets with active lifestyles, outdoor culture, health-conscious demographics
• **Beauty**: Markets with premium spending, influencer culture, spa/wellness presence
• **Coffee**: Markets with specialty coffee culture, creative professionals, artisanal appreciation

**How LCBM Uses Industry:**
• Analyzes behavioral patterns of your industry's best customers
• Identifies markets with similar demographic and psychographic profiles
• Finds cultural fit for your product category
• Predicts ROI based on industry-specific success patterns

**Example:**
A fitness brand expanding from San Francisco won't just look at population size. LCBM finds markets where:
• Fitness participation rates are high (like Austin at 68%)
• Outdoor activity is cultural (like Denver)
• Premium fitness spending is accepted
• Community engagement matches your model

Your industry is the foundation for finding markets where your business model will thrive!`;
    }
    
    // Target geography
    if (lowerMessage.includes('geography') || lowerMessage.includes('region')) {
      return `🗺️ **Target Geography Selection:**

**Should You Specify a Target Geography?**

**YES, if:**
• You have logistical constraints (distribution, fulfillment)
• You want to stay within a specific region for operational ease
• You have regulatory or licensing limitations
• You're testing expansion before going nationwide

**NO, if:**
• You want LCBM to find the absolute best markets anywhere
• You're open to any US market
• You have flexible operations
• You want maximum ROI regardless of location

**How It Works:**
• **Blank/All**: LCBM analyzes all 50+ US markets
• **Specified Region**: LCBM focuses only on that geography
• **Current + Adjacent**: Great for staged expansion

**Pro Tip:**
If you leave it blank, LCBM might recommend markets you hadn't considered that have exceptional fit scores. Sometimes the best opportunity is in an unexpected place!

Currently targeting: ${company?.targetGeography || 'All US markets (recommended)'}`;
    }
    
    // Analyzing markets
    if (context.currentStep === 'analyzing-markets' && 
        (lowerMessage.includes('analyze') || lowerMessage.includes('long') || lowerMessage.includes('what'))) {
      return `🔍 **What LCBM is Analyzing:**

**Market Discovery Process:**

**1. Demographic Analysis**
• Population size and growth trends
• Income levels and spending power
• Age distribution and life stage
• Education and professional profiles

**2. Cultural Fit Assessment**
• Industry-specific cultural alignment
• Lifestyle and values match
• Consumption patterns
• Brand receptivity signals

**3. Competitive Landscape**
• Market saturation levels
• Competition intensity
• White space opportunities
• Pricing environment

**4. Economic Viability**
• Entry cost estimates
• ROI projections
• Timeline to profitability
• Risk factors

**5. Behavioral Signals**
• Similar to your best customers
• Content affinity patterns
• Purchase behavior indicators
• Growth trajectory

**Timeline:** Analyzing 50+ markets takes about 10-15 seconds. I'll show you the top 3 with highest fit scores!`;
    }
    
    // Compare markets
    if (context.currentStep === 'market-recommendations' && markets.length > 0 &&
        (lowerMessage.includes('compare') || lowerMessage.includes('difference'))) {
      
      if (markets.length < 2) {
        return "LCBM has recommended multiple markets. Let me compare them for you!";
      }
      
      const market1 = markets[0];
      const market2 = markets[1];
      const market3 = markets.length > 2 ? markets[2] : null;
      
      let response = `📊 **Market Comparison:**\n\n`;
      
      response += `**${market1.name}** (Fit Score: ${market1.fit_score})\n`;
      response += `• ROI: ${market1.predicted_roi} | Timeline: ${market1.timeline}\n`;
      response += `• Entry Cost: ${market1.entry_cost}\n`;
      response += `• Best for: ${market1.key_advantages?.[0] || market1.reason}\n\n`;
      
      response += `**${market2.name}** (Fit Score: ${market2.fit_score})\n`;
      response += `• ROI: ${market2.predicted_roi} | Timeline: ${market2.timeline}\n`;
      response += `• Entry Cost: ${market2.entry_cost}\n`;
      response += `• Best for: ${market2.key_advantages?.[0] || market2.reason}\n\n`;
      
      if (market3) {
        response += `**${market3.name}** (Fit Score: ${market3.fit_score})\n`;
        response += `• ROI: ${market3.predicted_roi} | Timeline: ${market3.timeline}\n`;
        response += `• Entry Cost: ${market3.entry_cost}\n`;
        response += `• Best for: ${market3.key_advantages?.[0] || market3.reason}\n\n`;
      }
      
      response += `**Key Differences:**\n\n`;
      response += `**${market1.name}** has the highest fit score (${market1.fit_score}) - strongest behavioral match with your ideal customer profile.\n\n`;
      response += `**${market2.name}** offers ${parseFloat(market2.predicted_roi) > parseFloat(market1.predicted_roi) ? 'higher ROI' : 'good balance'} with ${market2.population} market size.\n\n`;
      
      if (market3) {
        const cost1 = parseInt(market1.entry_cost.replace(/[^0-9]/g, ''));
        const cost3 = parseInt(market3.entry_cost.replace(/[^0-9]/g, ''));
        response += `**${market3.name}** provides ${cost3 < cost1 ? 'lower entry cost' : 'alternative positioning'} - good for testing or phased expansion.\n\n`;
      }
      
      response += `**My Recommendation:** Start with ${market1.name} (highest fit), validate, then expand to ${market2.name}.`;
      
      return response;
    }
    
    // Which market to choose
    if (context.currentStep === 'market-recommendations' && markets.length > 0 &&
        ((lowerMessage.includes('which') || lowerMessage.includes('what')) && 
         (lowerMessage.includes('choose') || lowerMessage.includes('select') || lowerMessage.includes('recommend')))) {
      
      const topMarket = markets[0];
      
      return `🎯 **My Market Recommendation:**

**Start with ${topMarket.name}** ${topMarket.emoji || ''}

**Why This Market First:**
• **Fit Score: ${topMarket.fit_score}** - Highest behavioral alignment
• **ROI: ${topMarket.predicted_roi}** - Strong return on investment
• **Timeline: ${topMarket.timeline}** - Reasonable path to profitability

**Key Advantages:**
${topMarket.key_advantages?.map((adv, idx) => `${idx + 1}. ${adv}`).join('\n') || topMarket.reason}

**Entry Strategy:**
• Entry Cost: ${topMarket.entry_cost}
• Market Size: ${topMarket.population}
• Timeline: ${topMarket.timeline}

**Why ${topMarket.name} Scored ${topMarket.fit_score}:**
LCBM analyzed behavioral patterns and found this market's demographics, cultural fit, and consumption patterns are almost identical to your best-performing current markets. The fit score of ${topMarket.fit_score} means very high confidence in success.

**Next Steps:**
1. Launch in ${topMarket.name.split(',')[0]} first
2. Validate product-market fit (3-6 months)
3. Once validated, expand to ${markets[1]?.name || 'second market'}
4. Scale systematically to ${markets[2]?.name || 'third market'}

This staged approach minimizes risk while maximizing learning!`;
    }
    
    // Explain ROI
    if (lowerMessage.includes('roi') || lowerMessage.includes('return')) {
      if (markets.length === 0) {
        return "Once LCBM finishes analyzing markets, I can explain the ROI projections in detail!";
      }
      
      const topMarket = markets[0];
      
      return `💰 **Understanding ROI Projections:**

**${topMarket.name}: ${topMarket.predicted_roi} Projected ROI**

**What This Means:**
For every $1 invested, you can expect $${parseFloat(topMarket.predicted_roi.replace('x', ''))} in return over 12-18 months.

**How LCBM Calculates ROI:**

**1. Revenue Potential**
• Market size: ${topMarket.population}
• Your industry's avg customer value
• Market penetration estimates
• Growth trajectory

**2. Cost Structure**
• Entry cost: ${topMarket.entry_cost}
• Operating expenses (market-specific)
• Marketing spend requirements
• Timeline to breakeven

**3. Risk Adjustment**
• Competition intensity
• Market volatility
• Economic indicators
• Cultural fit confidence

**Example for ${topMarket.name.split(',')[0]}:**
• Investment: ${topMarket.entry_cost}
• Year 1 Revenue: ~$${Math.round(parseFloat(topMarket.entry_cost.replace(/[^0-9]/g, '')) * parseFloat(topMarket.predicted_roi.replace('x', '')) * 0.6)}K
• Year 2 Revenue: ~$${Math.round(parseFloat(topMarket.entry_cost.replace(/[^0-9]/g, '')) * parseFloat(topMarket.predicted_roi.replace('x', '')))}K
• 18-month ROI: ${topMarket.predicted_roi}

**Confidence Level:**
Fit Score ${topMarket.fit_score} = ${topMarket.fit_score >= 90 ? 'Very High' : 'High'} confidence in achieving projected ROI.

These projections are based on ${company?.industry || 'similar'} industry benchmarks in similar markets!`;
    }
    
    // Risks
    if (lowerMessage.includes('risk')) {
      if (markets.length === 0) {
        return "Once markets are recommended, I can explain the specific risks for each market!";
      }
      
      const topMarket = markets[0];
      
      return `⚠️ **Market Expansion Risks for ${topMarket.name.split(',')[0]}:**

**Primary Risks:**

**1. Market Entry Risk**
• Entry cost: ${topMarket.entry_cost}
• Timeline uncertainty: ${topMarket.timeline}
• Competition response time
• **Mitigation**: Staged rollout, test-and-learn approach

**2. Cultural Fit Risk**
• While fit score is ${topMarket.fit_score}, local nuances exist
• Brand messaging may need adaptation
• **Mitigation**: Local market testing before full launch

**3. Economic Risk**
• Market-specific economic conditions
• Consumer spending volatility
• **Mitigation**: Strong financial cushion, flexible pricing

**4. Operational Risk**
• New market operations complexity
• Supply chain/fulfillment challenges
• **Mitigation**: Partner with local expertise

**5. Competitive Response**
• Incumbents may react aggressively
• Price competition risk
• **Mitigation**: Differentiation strategy, strong positioning

**Risk Level: ${topMarket.fit_score >= 90 ? 'LOW' : 'MEDIUM'}**

With a fit score of ${topMarket.fit_score}, behavioral alignment is very strong, which significantly reduces market risk. The main risks are operational and can be managed with proper planning.

**My Recommendation:**
Start small, validate quickly, scale confidently. The ${topMarket.timeline} timeline includes risk mitigation built in.`;
    }
  }

  // ==========================================
  // GENERIC HELPFUL RESPONSES
  // ==========================================
  if (lowerMessage.includes('help')) {
    const stepName = context.currentStep?.replace(/-/g, ' ') || 'this page';
    
    let suggestions = '';
    
    if (context.currentStep === 'product-input') {
      suggestions = '• Channel selection\n• Using templates\n• Product description tips';
    } else if (context.currentStep === 'audience-selection') {
      suggestions = '• Comparing audiences\n• Explaining fit scores\n• Recommending best audiences\n• Understanding LCBM';
    } else if (context.currentStep === 'creative-intelligence') {
      suggestions = '• Creative scores\n• Why variants differ\n• Which variant to choose\n• Hook/copy effectiveness';
    } else {
      suggestions = '• Explaining recommendations\n• Understanding scores\n• Making decisions';
    }
    
    return `I'm here to help! Here's what I can do right now:

📍 **Where you are:** ${stepName}

💬 **Ask me about:**
${suggestions}

Just ask your question in plain English!`;
  }
  
  // Default fallback
  const stepName = context.currentStep?.replace(/-/g, ' ') || 'this page';
  
  let exampleQuestions = [];
  
  if (context.currentStep === 'product-input') {
    exampleQuestions = [
      '"How do I use the templates?"',
      '"Which channels should I select?"',
      // '"What makes a good product description?"'
    ];
  } else if (context.currentStep === 'audience-selection') {
    exampleQuestions = [
      '"What\'s the difference between these audiences?"',
      '"Which audience should I prioritize?"',
      '"Explain the fit score"'
    ];
  } else if (context.currentStep === 'creative-intelligence') {
    exampleQuestions = [
      '"Why did this variant score higher?"',
      '"Which creative should I use?"',
      '"How are these scores calculated?"'
    ];
  } else {
    exampleQuestions = [
      '"What does this mean?"',
      '"How does this work?"',
      '"What should I do next?"'
    ];
  }
  
  return `I understand you're asking about "${userMessage}". 

Based on where you are (${stepName}), I can help you with that!

**Try asking:**
${exampleQuestions.map(q => `• ${q}`).join('\n')}

Or rephrase your question and I'll do my best to help!`;
}