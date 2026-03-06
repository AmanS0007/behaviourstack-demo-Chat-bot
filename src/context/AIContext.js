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
      content: "Hi! I'm your AI marketing strategist. I can answer any questions about your campaign, explain recommendations, or help you make decisions. What would you like to know?",
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
    availableActions: []
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

  // Generate AI response based on context
  const generateResponse = useCallback(async (userMessage) => {
    const context = getContext();
    const response = await simulateAIResponse(userMessage, context);
    return response;
  }, [getContext]);

  // Send message to AI
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
  }, []);

  const value = {
    messages,
    isTyping,
    isChatOpen,
    setIsChatOpen,
    sendMessage,
    clearChat,
    updateContext,
    getContext
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

// ==========================================
// AI RESPONSE SIMULATION
// ==========================================

async function simulateAIResponse(userMessage, context) {
  const lowerMessage = userMessage.toLowerCase();
  
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
    
    // Correlation/Overlap
    if (lowerMessage.includes('correlation') || lowerMessage.includes('overlap') || lowerMessage.includes('relation')) {
      if (selected.length < 2) {
        return "Select 2 or more audiences and I'll analyze their behavioral overlap!";
      }
      
      const overlapPercent = Math.floor(Math.random() * 15) + 10;
      
      return `📊 **Audience Overlap Analysis:**

**Estimated Overlap:** ${overlapPercent}% of users fit multiple segments

**What this means:**
• ${100 - overlapPercent}% unique reach between audiences (good!)
• Low cannibalization risk
• You're efficiently expanding your addressable market

**Behavioral Correlation:**
• Strong alignment in "quality-conscious" signals (87% match)
• Similar content consumption patterns around research/reviews
• Different channel preferences (Meta vs Google)

**Recommendation:**
Run these in separate ad sets with tailored creative. The low overlap means you're not wasting budget on duplicate reach, and the behavioral similarity means your core value prop can work across both with minor tweaks.

Need help crafting messaging for each audience?`;
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
    
    // If no specific match, let it fall through to generic handler
  }
  
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
  // CREATIVE INTELLIGENCE PAGE
  // ==========================================
  if (context.currentStep === 'creative-intelligence') {
    const selectedAudienceCount = context.campaignData?.audiences?.length || 0;
    
    if (lowerMessage.includes('score') || lowerMessage.includes('creative')) {
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
• **9.0+**: Extremely high predicted performance
• **8.5-8.9**: Strong performers, safe bets
• **8.0-8.4**: Good baseline, room for optimization
• **<8.0**: May underperform, consider regeneration

Want me to explain what makes a specific variant score higher?`;
    }

    if (lowerMessage.includes('upload') || lowerMessage.includes('existing')) {
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
  // PERFORMANCE DEBUG - UPLOAD
  // ==========================================
  if (context.currentStep === 'campaign-upload') {
    if (lowerMessage.includes('upload') || lowerMessage.includes('connect') || lowerMessage.includes('how')) {
      return `📊 **Campaign Data Options:**

You can get your campaign data into the system in two ways:

**1. Upload File:**
Export your campaign data from your ad platform:
• Google Ads → Reports → Download as CSV/Excel
• Meta Ads Manager → Export campaign data
• TikTok Ads → Analytics → Export

**2. Direct Connection (Coming Soon):**
Connect your ad account directly for real-time analysis. We'll pull:
• Campaign performance metrics
• Creative performance breakdown
• Audience engagement data
• Funnel conversion stats

**What We Analyze:**
Once uploaded, LCBM + Transsuasion AI will diagnose:
• Creative fatigue signals
• Audience saturation
• Funnel drop-off points
• Budget allocation issues
• Creative-audience mismatches

Ready to upload your data?`;
    }

    if (lowerMessage.includes('what') && (lowerMessage.includes('analyze') || lowerMessage.includes('look'))) {
      return `🔍 **What We Look For:**

Our AI diagnosis scans for common performance issues:

**Creative Issues:**
• Declining CTR (fatigue)
• High frequency, low engagement
• Creative-audience mismatch

**Audience Issues:**
• Saturation (reaching same people)
• Wrong targeting (low relevance)
• Budget spread too thin

**Funnel Issues:**
• High bounce rates
• Cart abandonment
• Landing page problems

**Budget Issues:**
• Inefficient allocation
• Overspending on low performers
• Missing high-opportunity segments

The system gives you specific, actionable recovery strategies for each issue found.`;
    }
  }

  // ==========================================
  // PERFORMANCE DEBUG - ANALYZING
  // ==========================================
  if (context.currentStep === 'analyzing-performance') {
    return `⏳ **Analysis in Progress...**

LCBM is currently analyzing your campaign data across multiple dimensions:

✓ Creative performance patterns
✓ Audience engagement signals
✓ Funnel conversion rates
✓ Budget efficiency metrics

This usually takes 10-15 seconds. Hang tight!

Once complete, you'll get:
• Root cause diagnosis
• Severity assessment
• Expected recovery impact
• Step-by-step action plan`;
  }

  // ==========================================
  // PERFORMANCE DEBUG - RESULTS
  // ==========================================
  if (context.currentStep === 'diagnosis-results') {
    const diagnosis = context.diagnosis;
    
    if (lowerMessage.includes('why') || (lowerMessage.includes('explain') && lowerMessage.includes('issue'))) {
      return `🎯 **Why This Is Happening:**

${diagnosis?.root_cause || 'The diagnosis shows performance degradation due to multiple factors.'}

**Why Creative Fatigue Occurs:**
When the same creative runs too long, your audience sees it repeatedly. This causes:
• Banner blindness (people stop noticing)
• Decreased engagement over time
• Higher CPAs as interested users are exhausted

**Industry Benchmark:**
Most creatives have a 2-4 week optimal lifespan. After 30+ days, performance typically drops 20-40%.

Your creative has been running 47 days — well past the optimal refresh window.

**The Fix:**
Rotate in fresh creatives with different:
• Hooks (opening lines/visuals)
• Angles (problem framing)
• Proof points (testimonials, stats)
• CTAs (different calls to action)

Want help generating new creative variants now?`;
    }

    if (lowerMessage.includes('how') && (lowerMessage.includes('fix') || lowerMessage.includes('recover'))) {
      return `🔧 **Recovery Roadmap:**

Based on the diagnosis, here's your action plan:

**Immediate (Today):**
1. Pause the fatigued creative
2. Deploy 2-3 new variants (or generate with AI)
3. Set up A/B testing framework

**This Week:**
1. Monitor new creative performance daily
2. Scale winners, pause losers by day 3
3. Adjust budget allocation to top performers

**Ongoing:**
1. Set creative refresh schedule (every 21 days)
2. Build creative testing pipeline
3. Monitor fatigue signals (frequency, CTR trends)

**Expected Timeline:**
• Days 1-3: CTR stabilizes
• Days 4-7: CTR recovers 40-60%
• Week 2+: Full recovery + optimization

Need help with any specific step?`;
    }

    if (lowerMessage.includes('audience') || lowerMessage.includes('who')) {
      const audiences = diagnosis?.affected_audiences || [];
      
      if (audiences.length === 0) {
        return `I don't see specific audience data in the current diagnosis. Upload your campaign data again or ask about the overall performance issues!`;
      }

      return `👥 **Affected Audiences Breakdown:**

${audiences.map(aud => `**${aud.name}:**
• Impact Level: ${aud.impact}
• CTR Decline: ${aud.ctr_drop}
• Status: ${aud.impact === 'High' ? '⚠️ Needs immediate attention' : '⚡ Monitor closely'}`).join('\n\n')}

**Why These Audiences?**
Audiences showing the biggest drops have seen your creative the most times (high frequency). They've developed "ad blindness."

**What To Do:**
1. **High Impact Audiences:** Pause current creative immediately, deploy fresh variants
2. **Medium Impact Audiences:** Introduce 1-2 new creatives, run alongside current
3. **Low Impact Audiences:** Monitor but continue current approach

Want to see how new creative would perform with these audiences?`;
    }

    if (lowerMessage.includes('kpi') || lowerMessage.includes('metrics') || lowerMessage.includes('ctr') || lowerMessage.includes('cpa')) {
      const kpis = diagnosis?.kpi_deltas || {};
      
      return `📊 **KPI Analysis:**

${Object.entries(kpis).map(([key, data]) => `**${key.toUpperCase()}:**
• Was: ${data.previous}
• Now: ${data.current}
• Change: ${data.change > 0 ? '+' : ''}${data.change}%
• Status: ${data.change < 0 && (key === 'ctr' || key === 'conversionRate') ? '🔴 Declining' : data.change > 0 && key === 'cpa' ? '🔴 Increasing (bad)' : '🟢 Stable'}`).join('\n\n')}

**What This Means:**
• **CTR Drop:** Creative fatigue — people aren't clicking anymore
• **CPA Increase:** Paying more per conversion due to inefficiency
• **Conversion Rate Drop:** Landing page or offer mismatch

**Correlation:**
These metrics are interconnected. When CTR drops, you pay more for each click (higher CPA), and fewer of those clicks convert.

**Fix Priority:**
1. Creative refresh (fixes CTR)
2. Audience optimization (fixes targeting)
3. Landing page review (fixes conversion rate)

Which metric concerns you most?`;
    }

    if (lowerMessage.includes('benchmark') || lowerMessage.includes('normal')) {
      return `📈 **Industry Benchmarks:**

Here's how your performance compares:

**Your Campaign:**
• CTR: 2.97%
• CPA: $13.95
• Conversion Rate: 4.74%

**Industry Average (E-commerce):**
• CTR: 3.2-4.5%
• CPA: $8-15
• Conversion Rate: 5-7%

**Analysis:**
• CTR: Below average (creative fatigue likely)
• CPA: Within range but trending up ⚠️
• Conversion Rate: Slightly below average

**Good News:**
Your fundamentals are solid — you're close to benchmarks. With creative refresh, you should see:
• CTR → 4-5% (above average)
• CPA → $9-11 (improved efficiency)
• Conversion Rate → 6-7% (better qualification)

The diagnosis shows this is fixable with creative rotation!`;
    }

    if (lowerMessage.includes('confidence') || lowerMessage.includes('sure') || lowerMessage.includes('certain')) {
      const confidence = diagnosis?.confidence || 0.89;
      
      return `🎯 **Diagnosis Confidence:**

**${Math.round(confidence * 100)}% confidence** in this diagnosis.

**How We Calculate This:**
LCBM analyzes multiple signals:
• Historical performance patterns (40%)
• Creative lifecycle data (30%)
• Audience behavior signals (20%)
• Industry benchmark comparison (10%)

**Why ${Math.round(confidence * 100)}%?**
Your data shows clear creative fatigue patterns:
✓ Declining CTR over time
✓ Increased frequency without engagement
✓ Performance curves match fatigue signature
✓ Timeline (47 days) exceeds optimal window

**What This Means:**
High confidence = high likelihood the diagnosis is correct and recovery actions will work.

**Uncertainty Factors:**
• External market changes (~5%)
• Seasonal variations (~3%)
• Competitive landscape shifts (~3%)

Bottom line: This diagnosis is highly reliable. The recommended actions should work.`;
    }
    
    // Let it fall through to generic handler if no match
  }

  // ==========================================
  // REGIONAL EXPANSION - INPUT
  // ==========================================
  if (context.currentStep === 'company-input') {
    if (lowerMessage.includes('template') || lowerMessage.includes('example')) {
      return `💡 **Quick Start Templates:**

I've provided 3 example companies to help you get started:

**Peak Fitness Co.** (Fitness)
• Perfect if you're in health/wellness
• Shows fitness market recommendations

**Vela Beauty Labs** (Beauty)
• Great for cosmetics/skincare brands
• Premium beauty market focus

**Ember Roasts Coffee** (Coffee)
• Specialty food/beverage example
• Community-focused expansion

Click any template to auto-fill the form, then customize for your business!

**Or start fresh:**
Just fill in your actual company details and I'll analyze markets specific to your industry and goals.`;
    }

    if (lowerMessage.includes('industry') || lowerMessage.includes('which')) {
      return `🏢 **Industry Selection:**

Choose the industry that best fits your business:

**Available Options:**
• **Fitness & Wellness** → Health clubs, studios, training
• **Beauty & Cosmetics** → Salons, skincare, makeup
• **Coffee & Beverage** → Cafes, specialty drinks
• **Technology** → Software, hardware, services
• **Retail** → Stores, e-commerce, products
• **Food & Restaurant** → Dining, catering, food products

**Why It Matters:**
Different industries thrive in different markets. For example:
• Fitness → Active lifestyle cities (Austin, Denver)
• Beauty → Premium markets (LA, Miami)
• Coffee → Creative class hubs (Portland, Seattle)
• Tech → Innovation centers (SF, Austin, Boston)

Your industry choice helps LCBM find the best demographic and cultural matches!`;
    }

    if (lowerMessage.includes('revenue') || lowerMessage.includes('size')) {
      return `💰 **Annual Revenue:**

This helps us recommend markets that match your scale:

**Why We Ask:**
• **$500K-2M:** Focus on emerging markets with lower entry costs
• **$2M-10M:** Mix of established + growth markets
• **$10M+:** Premium markets with high competition but strong ROI

**Entry Cost Correlation:**
Your revenue indicates your expansion budget:
• Smaller revenue → Lower cost markets (Nashville, Austin suburbs)
• Larger revenue → Can handle premium markets (LA, NYC, Miami)

**Be Honest:**
Accurate revenue = better recommendations. We match market entry costs to your likely budget.

Don't worry - this info is only used for analysis, not stored or shared!`;
    }

    if (lowerMessage.includes('goals') || lowerMessage.includes('expansion')) {
      return `🎯 **Expansion Goals:**

Be specific here - it helps LCBM understand what you're looking for:

**Good Examples:**
• "Target health-conscious millennials in warm climates"
• "Premium beauty customers, high disposable income"
• "College towns with specialty coffee culture"
• "Tech professionals who value artisanal products"

**What We Look For:**
• **Demographics:** Age, income, lifestyle
• **Culture:** Values, interests, behaviors
• **Geography:** Climate, region preferences
• **Competition:** Saturation tolerance

**Bad Examples:**
• "Make money" (too vague)
• "Everywhere" (not strategic)
• "Cheap markets" (oversimplified)

**Pro Tip:**
Think about your best existing customers. What markets have similar demographics?`;
    }

    if (lowerMessage.includes('geography') || lowerMessage.includes('location') || lowerMessage.includes('region') || lowerMessage.includes('where')) {
      return `🗺️ **Target Geography:**

Specify where you want to expand to narrow down recommendations:

**Options:**
• **Specific regions:** "Southeast US", "Pacific Northwest", "Midwest"
• **State focus:** "California", "Texas", "Florida"
• **City preferences:** "Tech hubs", "College towns", "Beach cities"
• **Climate:** "Warm weather markets", "Four seasons"
• **Market size:** "Major metros only", "Mid-size cities"

**Why It Helps:**
If you already know which regions you're considering, I can focus the analysis there instead of evaluating all 50+ markets.

**Leave blank if:**
You want LCBM to evaluate all US markets objectively without geographic constraints.

**Examples:**
• "Western states only"
• "Cities within 500 miles of Chicago"
• "Warm climate, coastal markets"
• "Anywhere in Texas or Arizona"`;
    }

    if (lowerMessage.includes('how') && lowerMessage.includes('work')) {
      return `🔍 **How Market Analysis Works:**

Once you submit your info, here's what happens:

**Step 1: LCBM Analysis (5-10 seconds)**
• Analyzes 50+ US metro markets (or your specified geography)
• Evaluates demographics, culture, competition
• Calculates fit scores based on your profile

**Step 2: Scoring (Multi-Factor)**
• **Demographic Match (40%):** Age, income, lifestyle fit
• **Cultural Alignment (30%):** Values, behaviors, trends
• **Market Opportunity (20%):** Size, growth, saturation
• **Entry Feasibility (10%):** Costs, competition, barriers

**Step 3: Recommendations**
You get top 3 markets with:
• Fit score (0-100)
• Expected ROI
• Entry costs
• Timeline estimate
• Key advantages

**Data Sources:**
• US Census demographic data
• Consumer behavior studies
• Market research databases
• Competitive intelligence

Ready to analyze?`;
    }
  }

  // ==========================================
  // REGIONAL EXPANSION - ANALYZING
  // ==========================================
  if (context.currentStep === 'analyzing-markets') {
    const targetGeo = context.campaignData?.company?.targetGeography;
    
    return `🗺️ **Market Analysis in Progress...**

LCBM is currently evaluating:

✓ Demographics across ${targetGeo ? `markets in ${targetGeo}` : '50+ US metros'}
✓ Cultural fit indicators
✓ Competition levels by market
✓ Entry cost estimates
✓ ROI projections

**What We're Looking For:**
Markets where your business would thrive based on:
• Customer demographic match
• Cultural receptivity
• Growth potential
• Manageable competition

This takes about 10-15 seconds. Hang tight!`;
  }

  // ==========================================
  // REGIONAL EXPANSION - RESULTS
  // ==========================================
  if (context.currentStep === 'market-recommendations') {
    const markets = context.visibleComponents?.markets || [];
    const companyName = context.campaignData?.company?.name || 'your business';
    const industry = context.campaignData?.company?.industry || 'your industry';
    
    if (lowerMessage.includes('compare') || lowerMessage.includes('difference') || lowerMessage.includes('vs')) {
      if (markets.length < 2) {
        return `I need at least 2 markets to compare! Once you see the recommendations, ask me to compare them.`;
      }

      return `📊 **Market Comparison for ${companyName}:**

Let me break down the top 3 markets:

**${markets[0]?.city || 'Market 1'}:**
• Fit Score: ${markets[0]?.fitScore || 'N/A'} (Highest)
• ROI: ${markets[0]?.roi || 'N/A'}
• Entry Cost: ${markets[0]?.entryCost || 'N/A'}
• Timeline: ${markets[0]?.timeline || 'N/A'}
• **Best For:** Fastest ROI, strongest fit

**${markets[1]?.city || 'Market 2'}:**
• Fit Score: ${markets[1]?.fitScore || 'N/A'}
• ROI: ${markets[1]?.roi || 'N/A'}
• Entry Cost: ${markets[1]?.entryCost || 'N/A'}
• Timeline: ${markets[1]?.timeline || 'N/A'}
• **Best For:** Balance of fit + scale

**${markets[2]?.city || 'Market 3'}:**
• Fit Score: ${markets[2]?.fitScore || 'N/A'}
• ROI: ${markets[2]?.roi || 'N/A'}
• Entry Cost: ${markets[2]?.entryCost || 'N/A'}
• Timeline: ${markets[2]?.timeline || 'N/A'}
• **Best For:** Lower risk, established market

**My Recommendation:**
Start with #1 (${markets[0]?.city}) if you want the best fit and fastest results. Consider #2 (${markets[1]?.city}) if you prefer a larger market with more long-term potential.

Want to know more about a specific market?`;
    }

    if (lowerMessage.includes('why') || lowerMessage.includes('fit score') || lowerMessage.includes('calculate')) {
      return `🎯 **How Fit Scores Work:**

Fit scores (0-100) measure how well a market matches ${companyName}:

**Score Breakdown:**
• **90-100:** Exceptional fit, high success probability
• **85-89:** Very strong fit, solid opportunity
• **80-84:** Good fit, manageable risk
• **<80:** Possible but higher risk

**Calculation Factors:**

**Demographics (40%):**
• Age distribution vs your target
• Income levels vs your price point
• Lifestyle indicators

**Cultural Alignment (30%):**
• Values match (health, beauty, craft, etc.)
• Consumption patterns
• Brand receptivity

**Market Dynamics (20%):**
• Population size and growth
• Competition saturation
• Economic trends

**Entry Feasibility (10%):**
• Real estate costs
• Regulatory environment
• Local business climate

**Your Top Market:**
${markets[0]?.city} scored ${markets[0]?.fitScore || '90+'} because it excels across all factors, especially demographic and cultural alignment with ${industry}.

Want to know why a specific market scored the way it did?`;
    }

    if (lowerMessage.includes('roi') || lowerMessage.includes('return') || lowerMessage.includes('profit')) {
      return `💰 **Understanding ROI Projections:**

ROI (Return on Investment) shows expected returns vs entry costs:

**How to Read It:**
• **3.5x ROI** = For every $1 invested, expect $3.50 back
• Calculated over 24-month period
• Based on ${industry} benchmarks + market specifics

**Your Top Markets:**
${markets.map((m, i) => `${i + 1}. **${m?.city}:** ${m?.roi} ROI
   • Entry Cost: ${m?.entryCost}
   • Breakeven: ~${m?.roi && parseFloat(m.roi) > 3 ? '8-12' : '12-18'} months
   • 24-month profit: ${m?.entryCost && m?.roi ? `~$${Math.round(parseFloat(m.entryCost.replace(/[^0-9.]/g, '')) * (parseFloat(m.roi.replace('x', '')) - 1))}K` : 'N/A'}`).join('\n\n')}

**What Affects ROI:**
• **Higher Fit Score** = Better conversion, faster growth
• **Lower Entry Costs** = Faster breakeven
• **Market Size** = Long-term revenue potential
• **Competition** = Pricing power, market share

**Conservative Estimates:**
These are conservative projections. Many ${industry} businesses exceed these ROIs in high-fit markets.

**Risk Factors:**
• Execution quality (your team)
• Marketing effectiveness
• Economic conditions
• Local competition responses

Want to know more about entry costs or timeline?`;
    }

    if (lowerMessage.includes('cost') || lowerMessage.includes('entry') || lowerMessage.includes('expensive')) {
      return `💵 **Entry Cost Breakdown:**

Entry costs include everything needed to launch in a new market:

**What's Included:**

**Real Estate (40-50%):**
• Lease deposits
• Build-out/renovations
• Furniture & equipment

**Marketing (20-30%):**
• Market research
• Launch campaigns
• Brand awareness
• Local partnerships

**Operations (15-25%):**
• Initial inventory
• Staffing & training
• Permits & licenses
• Insurance

**Contingency (10-15%):**
• Unexpected costs
• Market adjustments
• Buffer for delays

**Your Markets:**
${markets.map((m, i) => `${i + 1}. **${m?.city}:** ${m?.entryCost}
   • Real Estate: ${m?.entryCost ? `~$${Math.round(parseFloat(m.entryCost.replace(/[^0-9.]/g, '')) * 0.45)}K` : 'N/A'}
   • Marketing: ${m?.entryCost ? `~$${Math.round(parseFloat(m.entryCost.replace(/[^0-9.]/g, '')) * 0.25)}K` : 'N/A'}
   • Operations: ${m?.entryCost ? `~$${Math.round(parseFloat(m.entryCost.replace(/[^0-9.]/g, '')) * 0.20)}K` : 'N/A'}
   • Contingency: ${m?.entryCost ? `~$${Math.round(parseFloat(m.entryCost.replace(/[^0-9.]/g, '')) * 0.10)}K` : 'N/A'}`).join('\n\n')}

**Lower Cost Options:**
If entry costs are too high, consider:
• Smaller markets (suburbs)
• Pop-up or temporary locations
• Partnership models
• Digital-first expansion

Need help budgeting for a specific market?`;
    }

    if (lowerMessage.includes('timeline') || lowerMessage.includes('long') || lowerMessage.includes('when')) {
      return `⏱️ **Expansion Timeline:**

Timeline estimates show realistic launch schedules:

**Typical Phases:**

**Planning (1-2 months):**
• Market research validation
• Site selection
• Business plan finalization
• Funding secured

**Setup (2-4 months):**
• Lease negotiation & signing
• Build-out & renovations
• Permits & licenses
• Staffing & training

**Pre-Launch (1-2 months):**
• Soft opening
• Marketing ramp-up
• Systems testing
• Community engagement

**Launch (Month 1):**
• Grand opening
• Full operations
• Performance monitoring

**Your Markets:**
${markets.map((m, i) => `${i + 1}. **${m?.city}:** ${m?.timeline}
   • Faster than average: ${m?.timeline?.includes('4-') || m?.timeline?.includes('5-') ? 'Yes - streamlined entry' : 'Standard timeline'}
   • Main factors: ${m?.timeline?.includes('4-') ? 'Lower complexity, proven model' : 'Standard market entry'}`).join('\n\n')}

**Speed It Up:**
• Use proven templates
• Hire local experts
• Start marketing pre-launch
• Leverage existing vendor relationships

**Don't Rush:**
Faster isn't always better. Proper setup = better long-term results.

Questions about a specific phase?`;
    }

    if (lowerMessage.includes('which') || lowerMessage.includes('recommend') || lowerMessage.includes('choose')) {
      return `🎯 **My Recommendation for ${companyName}:**

Based on your profile, here's my priority order:

**#1: ${markets[0]?.city}** ⭐
**Why:** Highest fit score (${markets[0]?.fitScore}) + strong ROI (${markets[0]?.roi})

**Best For:**
• First expansion (proven demand)
• Fastest path to profitability
• Strongest cultural alignment

**Timeline:** ${markets[0]?.timeline}
**Investment:** ${markets[0]?.entryCost}

---

**#2: ${markets[1]?.city}** 
**Why:** Larger market + balanced risk/reward

**Best For:**
• Second location
• Scaling after #1 success
• More long-term potential

**Timeline:** ${markets[1]?.timeline}
**Investment:** ${markets[1]?.entryCost}

---

**My Strategy:**
1. Start with ${markets[0]?.city} (6-12 months)
2. Validate model and optimize
3. Expand to ${markets[1]?.city} (12-18 months)
4. Consider ${markets[2]?.city} after proving concept

**Why This Order?**
• Lower risk (highest fit first)
• Learn and optimize before scaling
• Build momentum and case studies
• Manageable resource allocation

**Budget Recommendation:**
If you can only do one: ${markets[0]?.city}
If you can do two: ${markets[0]?.city} + ${markets[1]?.city} (staggered 6 months)

Want to dive deeper into any specific market?`;
    }

    if (lowerMessage.includes('risk') || lowerMessage.includes('concern') || lowerMessage.includes('worry')) {
      return `⚠️ **Risk Assessment for ${companyName}:**

Every expansion has risks. Here's what to watch:

**Market-Specific Risks:**

**${markets[0]?.city}:**
• **Low Risk:** Highest fit score, proven demand indicators
• **Watch:** Market saturation if delayed entry
• **Mitigation:** Move quickly, differentiate clearly

**${markets[1]?.city}:**
• **Medium Risk:** Larger market = more competition
• **Watch:** Standing out in crowded space
• **Mitigation:** Strong branding, niche positioning

**${markets[2]?.city}:**
• **Medium Risk:** Lower fit score needs stronger execution
• **Watch:** Longer ramp-up time
• **Mitigation:** Patient capital, market education

**General Risks:**

**Economic (Medium):**
• Recession could delay growth
• **Mitigation:** Conservative budgeting, flexible leases

**Competitive (Medium-High):**
• Local competition response
• **Mitigation:** Unique value prop, community focus

**Execution (High):**
• Your biggest risk - implementation quality
• **Mitigation:** Hire local expertise, proven playbooks

**How To De-Risk:**
1. Start with highest fit market (${markets[0]?.city})
2. Soft launch before grand opening
3. Test marketing before full investment
4. Build local partnerships early
5. Keep contingency budget (15%)

**Success Probability:**
With good execution in ${markets[0]?.city}: 75-85% success rate (${industry} average: 60%)

Feel confident or need more info on risks?`;
    }
    
    // Let it fall through to generic handler if no match
  }

  // ==========================================
  // GENERIC HELPFUL RESPONSES
  // ==========================================
  if (lowerMessage.includes('help')) {
    const stepName = context.currentStep?.replace(/-/g, ' ') || 'this page';
    
    // Different suggestions based on current step
    let suggestions = '';
    
    if (context.currentStep === 'audience-selection') {
      suggestions = '• Comparing audiences\n• Explaining fit scores\n• Recommending best audiences\n• Understanding LCBM';
    } else if (context.currentStep === 'product-input') {
      suggestions = '• Channel selection\n• Using templates\n• Product description tips';
    } else if (context.currentStep === 'creative-intelligence') {
      suggestions = '• Creative scores\n• Why variants differ\n• Which variant to choose\n• Hook/copy effectiveness';
    } else if (context.currentStep === 'campaign-upload') {
      suggestions = '• How to upload data\n• What we analyze\n• File format requirements\n• Platform connections';
    } else if (context.currentStep === 'analyzing-performance') {
      suggestions = '• What\'s being analyzed\n• How long it takes\n• What happens next';
    } else if (context.currentStep === 'diagnosis-results') {
      suggestions = '• Why the issue occurred\n• How to fix it\n• Understanding KPIs\n• Affected audiences\n• Recovery timeline\n• Confidence levels';
    } else if (context.currentStep === 'company-input') {
      suggestions = '• Using templates\n• Industry selection\n• Revenue importance\n• Target geography\n• Expansion goals tips';
    } else if (context.currentStep === 'analyzing-markets') {
      suggestions = '• What\'s being analyzed\n• How scoring works\n• What happens next';
    } else if (context.currentStep === 'market-recommendations') {
      suggestions = '• Comparing markets\n• Understanding fit scores\n• ROI projections\n• Entry costs\n• Timeline estimates\n• Which to choose\n• Risk assessment';
    } else {
      suggestions = '• Explaining recommendations\n• Understanding scores\n• Making decisions';
    }
    
    return `I'm here to help! Here's what I can do right now:

📍 **Where you are:** ${stepName}

💬 **Ask me about:**
${suggestions}

Just ask your question in plain English!`;
  }
  
  // Default fallback - context-specific examples
  const stepName = context.currentStep?.replace(/-/g, ' ') || 'this page';
  
  let exampleQuestions = [];
  
  if (context.currentStep === 'audience-selection') {
    exampleQuestions = [
      '"What\'s the difference between these audiences?"',
      '"Which audience should I prioritize?"',
      '"Explain the fit score"'
    ];
  } else if (context.currentStep === 'product-input') {
    exampleQuestions = [
      '"How do I use the templates?"',
      '"Which channels should I select?"',
      '"What makes a good product description?"'
    ];
  } else if (context.currentStep === 'creative-intelligence') {
    exampleQuestions = [
      '"Why did this variant score higher?"',
      '"Which creative should I use?"',
      '"How are these scores calculated?"'
    ];
  } else if (context.currentStep === 'campaign-upload') {
    exampleQuestions = [
      '"How do I upload my data?"',
      '"What file format should I use?"',
      '"Can I connect directly to my ad account?"'
    ];
  } else if (context.currentStep === 'diagnosis-results') {
    exampleQuestions = [
      '"Why is this happening?"',
      '"How do I fix this?"',
      '"Explain the KPI changes"'
    ];
  } else if (context.currentStep === 'company-input') {
    exampleQuestions = [
      '"Which template should I use?"',
      '"Why does industry matter?"',
      '"How important is revenue size?"',
      '"Should I specify target geography?"'
    ];
  } else if (context.currentStep === 'market-recommendations') {
    exampleQuestions = [
      '"Compare these markets"',
      '"Which market should I choose?"',
      '"Explain the ROI projections"'
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