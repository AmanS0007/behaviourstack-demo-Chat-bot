// ==========================================
// 🚀 NEW CAMPAIGN FLOW - AI RESPONSES
// Handles all steps: product-input, audience-selection, 
// creative-mode-selection, creative-intelligence, campaign-summary
// ==========================================

/**
 * Main handler for New Campaign flow responses
 * @param {string} userMessage - The user's message
 * @param {object} context - Current screen context
 * @returns {string} AI response
 */
export function handleNewCampaignResponse(userMessage, context) {
    const lowerMessage = userMessage.toLowerCase();
    
    // ==========================================
    // PRODUCT INPUT STEP
    // ==========================================
    if (context.currentStep === 'product-input') {
      // Channel selection question
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
      
      // Template question
      if (lowerMessage.includes('template') || lowerMessage.includes('example')) {
        return `💡 **Using Templates:**
  
  The quick-start templates show you what good product input looks like:
  
  • **Coffee Brand**: Beverage space, premium positioning
  • **Beauty Brand**: Clean beauty, ingredient-focused
  • **Fitness Brand**: Connected device, performance-oriented
  
  Click any template to auto-fill, then customize for your product. LCBM will use this information to discover behaviorally-similar audiences.
  
  **Pro tip:** The more specific your product description, the better LCBM can discover precise audience matches!`;
      }
      
      // General product input help
      return `📝 **Product Input Help:**
  
  Fill in your product details so LCBM can find the perfect audiences for you.
  
  **Required fields:**
  • Product name
  • Category  
  • Channels (where you want to advertise)
  
  **Optional but recommended:**
  • Price (helps with audience targeting)
  • Description (improves audience matching)
  
  **Ask me:**
  • "What channels should I choose?"
  • "How do templates work?"
  • "What if my product spans multiple categories?"
  
  Ready to discover audiences? Just fill in the form and click "Discover Audiences"! 🚀`;
    }
    
    // ==========================================
    // AUDIENCE SELECTION STEP
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
  
  **LCBM (Latent Consumer Behaviour Model)** is our AI that discovers high-intent audiences by analyzing behavioral patterns.
  
  **What it does:**
  1. **Analyzes your product** - Understands category, positioning, and value props
  2. **Scans platform data** - Looks across Meta, Google, TikTok for behavioral signals
  3. **Identifies patterns** - Finds users with purchase-predictive behaviors
  4. **Scores audiences** - Ranks segments by fit, reach, and conversion likelihood
  
  **What makes it different:**
  • Goes beyond demographics to **actual behavior**
  • Finds "hidden" audiences you wouldn't discover manually
  • Predicts performance **before** you spend budget
  • Updates based on your campaign results
  
  **The result:** You get audiences that are already behaviorally primed to buy from you - not just lookalikes or broad interests.
  
  **Example:** Instead of "Women 25-45 interested in fitness," LCBM finds "Women who engage with injury recovery content, follow PT accounts, and research home equipment in evenings" - WAY more specific! 🎯
  
  Want to know more about a specific audience?`;
      }
      
      // How many audiences to select
      if (lowerMessage.includes('how many')) {
        return `🎯 **How Many Audiences to Select:**
  
  **Minimum:** 1 (but not recommended)
  **Recommended:** 3-4
  **Maximum:** No limit, but diminishing returns after 5
  
  **Why 3-4 is optimal:**
  
  **Testing perspective:**
  • Enough variance to find your winner
  • Not so many that budget gets spread too thin
  • Allows meaningful A/B testing
  
  **Budget perspective:**
  • If budget < $5K/month: Start with 2-3
  • If budget $5K-$20K: Go with 3-4
  • If budget > $20K: Can handle 4-5+
  
  **Strategic perspective:**
  • One HIGH fit (90+) - your primary
  • One SCALE play (85-89 with big reach)
  • One TEST audience (unexpected segment)
  
  **Current selection:** ${selected.length} audiences
  **My recommendation:** ${selected.length < 3 ? `Add ${3 - selected.length} more for optimal testing` : selected.length === 3 ? 'Perfect! This is the sweet spot 🎯' : 'You have good coverage, but watch budget spread'}
  
  Want help choosing which ones?`;
      }
      
      // Fallback for audience selection
      return `🎯 **Audience Selection Help:**
  
  I can help you understand these LCBM-discovered audiences!
  
  **Ask me:**
  • "Which audience should I choose?"
  • "Compare [audience 1] vs [audience 2]"
  • "How do fit scores work?"
  • "How many audiences should I select?"
  • "What is LCBM?"
  
  **Selection tips:**
  ✓ Pick at least 3 audiences
  ✓ Mix high-fit (90+) with scale (85-89)
  ✓ Consider reach AND fit score
  ✓ Look for low overlap between segments
  
  Currently selected: ${selected.length} audiences. Ready to move forward? 🚀`;
    }
    
    // ==========================================
    // CREATIVE MODE SELECTION STEP
    // ==========================================
    if (context.currentStep === 'creative-mode-selection') {
      // AI generation question
      if (lowerMessage.includes('ai') || lowerMessage.includes('generate')) {
        return `🤖 **AI Creative Generation:**
  
  I'll create 4 strategic creative variants for you, each with:
  
  **What you get:**
  • **Unique hooks** - Attention-grabbing openers
  • **Visual direction** - Style and aesthetic guidance
  • **Copy angles** - Messaging approach
  • **CTA recommendations** - Optimal calls-to-action
  • **LCBM scores** - Predicted performance (0-10 scale)
  • **Asset suggestions** - Image/video recommendations
  
  **Generation process:**
  1. Analyzes your selected audiences
  2. Creates variants targeting different psychographics
  3. Scores each based on predicted performance
  4. Provides rationale for each approach
  
  **Time:** ~5 seconds
  **Cost:** Free (part of LCBM)
  
  **Best for:** Testing new products, finding winning angles, rapid iteration
  
  Ready to generate? Click "Generate AI Creatives" above! 🎨`;
      }
      
      // Upload question
      if (lowerMessage.includes('upload')) {
        return `📤 **Upload Your Own Creatives:**
  
  Already have creative assets? Upload them and I'll score them!
  
  **What I'll do:**
  • Analyze your uploaded creatives
  • Score them against your audiences (LCBM score 0-10)
  • Predict performance metrics
  • Suggest improvements
  
  **Supported formats:**
  • Images: JPG, PNG, GIF
  • Videos: MP4, MOV
  • Multiple files: Upload as many as you want
  
  **What I analyze:**
  ✓ Visual composition
  ✓ Brand alignment
  ✓ Audience fit
  ✓ Predicted CTR & engagement
  
  **Pro tip:** Upload 2-3 different approaches to see which scores highest!
  
  Click "Upload Creatives" above to get started! 📁`;
      }
      
      // Which should I choose
      if (lowerMessage.includes('which') || lowerMessage.includes('should i')) {
        return `🤔 **AI Generate vs Upload:**
  
  **Choose AI Generate if:**
  ✓ You're just starting out
  ✓ You want fresh creative ideas
  ✓ You need multiple test variants quickly
  ✓ You want to see what performs best
  
  **Choose Upload if:**
  ✓ You have existing brand assets
  ✓ You want to score current creatives
  ✓ You have a specific visual style
  ✓ You need to validate existing work
  
  **My recommendation:** 
  Do BOTH! Generate AI variants to see what LCBM recommends, then upload your own to compare scores. The AI might surprise you with angles you hadn't considered! 🎯
  
  **Pro move:** Generate first, see what scores high, THEN create your own inspired by the top performers.
  
  What sounds better for you?`;
      }
      
      // Fallback
      return `🎨 **Creative Mode Selection:**
  
  Choose how you want to create your ad creatives:
  
  **Option 1: AI Generate** 🤖
  • Fast (5 seconds)
  • Multiple variants
  • Strategic angles
  • LCBM-scored
  
  **Option 2: Upload Your Own** 📤
  • Use existing assets
  • Get LCBM scores
  • Performance predictions
  • Improvement suggestions
  
  **Ask me:**
  • "How does AI generation work?"
  • "What can I upload?"
  • "Which should I choose?"
  
  Ready to create high-performing ads? Choose an option above! 🚀`;
    }
    
    // ==========================================
    // CREATIVE INTELLIGENCE STEP
    // ==========================================
    if (context.currentStep === 'creative-intelligence') {
      // Import and use the creative intelligence handler
      const creativeIntelligenceResponses = require('./creativeIntelligenceResponses');
      return creativeIntelligenceResponses.handleCreativeIntelligenceResponse(userMessage, context);
    }
    
    // ==========================================
    // CAMPAIGN SUMMARY STEP
    // ==========================================
    if (context.currentStep === 'campaign-summary') {
      // Export campaign
      if (lowerMessage.includes('export') || lowerMessage.includes('download')) {
        return `📥 **Export Campaign Assets:**
  
  You can download everything you need to launch:
  
  **Available exports:**
  • **Campaign Strategy PDF** - Full overview with audience insights
  • **Creative Assets** - All images/videos as ZIP
  • **Audience Targeting Specs** - Platform-ready targeting parameters
  • **Implementation Guide** - Step-by-step launch instructions
  
  **What's included in each:**
  
  **📄 Strategy PDF:**
  • Product overview
  • Selected audiences with fit scores
  • Creative recommendations
  • Budget allocation
  • Expected performance
  
  **🎨 Creative ZIP:**
  • All selected variants
  • Multiple formats (square, story, landscape)
  • Asset metadata
  
  **🎯 Targeting Specs:**
  • Meta Ads format
  • Google Ads format
  • TikTok Ads format (if applicable)
  
  **Pro tip:** Share the Strategy PDF with stakeholders, use the Targeting Specs with your media buyer!
  
  Click the export buttons above to download! 📦`;
      }
      
      // Next steps
      if (lowerMessage.includes('next') || lowerMessage.includes('launch') || lowerMessage.includes('implement')) {
        return `🚀 **Next Steps to Launch:**
  
  **1. Review Everything (5 min)**
  ✓ Check your selected audiences
  ✓ Confirm creative variants
  ✓ Verify budget allocation
  
  **2. Export Assets (2 min)**
  ✓ Download creative files
  ✓ Get targeting specifications
  ✓ Save campaign summary
  
  **3. Set Up in Ad Platform (15-30 min)**
  ✓ Create campaigns in Meta/Google/TikTok
  ✓ Upload creatives
  ✓ Apply LCBM targeting specs
  ✓ Set budgets as recommended
  
  **4. Launch & Monitor (Ongoing)**
  ✓ Start campaigns
  ✓ Monitor for 3-5 days
  ✓ Check against predicted metrics
  ✓ Optimize based on data
  
  **Need help?**
  • "How do I set up in Meta Ads?"
  • "What budget should I use?"
  • "How long should I test?"
  
  Your campaign is ready - let's get it live! 💪`;
      }
      
      // Budget question
      if (lowerMessage.includes('budget')) {
        const audienceCount = context.campaignData?.audiences?.length || 3;
        return `💰 **Budget Recommendations:**
  
  **Minimum viable budget:**
  • **$50/day per audience** = $${50 * audienceCount}/day total
  • Allows platform algorithms to optimize
  • Enough data for meaningful insights
  
  **Recommended budget:**
  • **$100-200/day per audience** = $${100 * audienceCount}-${200 * audienceCount}/day total
  • Faster learning period
  • Better audience reach
  • More reliable data
  
  **Optimal budget:**
  • **$300+/day per audience** = $${300 * audienceCount}+/day total
  • Maximum platform performance
  • Broad reach within each audience
  • Robust testing capabilities
  
  **Your situation:**
  • ${audienceCount} audiences selected
  • Recommended: $${100 * audienceCount}-${200 * audienceCount}/day
  
  **Pro tip:** Start with recommended budget for 7 days, then scale winners. Don't go below minimum or platforms won't optimize effectively!
  
  **Budget split:**
  ${Array.from({length: audienceCount}, (_, i) => `• Audience ${i + 1}: ${i === 0 ? '40%' : `${Math.round(60 / (audienceCount - 1))}%`}`).join('\n')}
  
  Need help calculating ROI?`;
      }
      
      // Fallback for campaign summary
      return `✅ **Campaign Summary Ready!**
  
  Your campaign is complete and ready to launch!
  
  **What you can do:**
  • Review all selected audiences and creatives
  • Export campaign assets
  • Download targeting specs
  • Get implementation guide
  
  **Ask me:**
  • "How do I export everything?"
  • "What are the next steps?"
  • "What budget should I use?"
  • "How do I launch in Meta/Google?"
  
  Ready to go live? Click the export buttons above! 🚀`;
    }
    
    // ==========================================
    // FALLBACK - GENERAL NEW CAMPAIGN HELP
    // ==========================================
    return `🚀 **New Campaign Strategy:**
  
  I'm here to help you create a high-performing campaign!
  
  **Current step:** ${context.currentStep || 'Getting started'}
  
  **What I can help with:**
  • Product input and channel selection
  • Understanding audience fit scores
  • Comparing different audiences
  • Creative strategy and generation
  • Campaign export and implementation
  
  **Ask me anything!** I'll provide step-specific guidance based on where you are in the flow. 💪`;
  }
  
  export default handleNewCampaignResponse;