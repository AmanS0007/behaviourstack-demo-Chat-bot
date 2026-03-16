// ==========================================
// 🌎 REGIONAL EXPANSION FLOW - AI RESPONSES
// Handles all steps: company-input, analyzing-markets,
// market-recommendations
// ==========================================

/**
 * Main handler for Regional Expansion flow responses
 * @param {string} userMessage - The user's message
 * @param {object} context - Current screen context
 * @returns {string} AI response
 */
export function handleRegionalExpansionResponse(userMessage, context) {
    const lowerMessage = userMessage.toLowerCase();
    
    // ==========================================
    // COMPANY INPUT STEP
    // ==========================================
    if (context.currentStep === 'company-input') {
      // Template question
      if (lowerMessage.includes('template') || lowerMessage.includes('example')) {
        return `💡 **Using Templates:**
  
  The templates give you a head start with pre-filled company data:
  
  **☕ Ember Roasts Coffee**
  • Specialty coffee & beverages
  • Current markets: Seattle, Portland, SF
  • Looking to expand craft coffee culture
  
  **✨ Vela Beauty Labs**
  • Clean beauty & skincare
  • Current markets: LA, Miami
  • Targeting luxury & wellness markets
  
  **💪 Peak Fitness Co.**
  • Fitness & wellness equipment
  • Current markets: CA, NY
  • Expanding to health-conscious metros
  
  **How to use:**
  1. Click any template card
  2. Form auto-fills with example data
  3. Customize for YOUR company
  4. Click "Analyze Market Opportunities"
  
  **Pro tip:** Even if you use a template, update it with YOUR actual revenue, current markets, and expansion goals for more accurate recommendations!
  
  Ready to try one? Click a template above! 🚀`;
      }
      
      // What industry to select
      if (lowerMessage.includes('industry') || lowerMessage.includes('category')) {
        return `🏢 **Choosing Your Industry:**
  
  **Why it matters:**
  Different industries thrive in different markets. Your industry determines:
  • Which demographics I prioritize
  • What market characteristics matter most
  • ROI predictions and entry cost estimates
  
  **How to choose:**
  
  **Be specific:**
  ✅ "Specialty Coffee"
  ❌ "Food & Beverage"
  
  ✅ "Clean Beauty & Skincare"  
  ❌ "Retail"
  
  ✅ "Connected Fitness Equipment"
  ❌ "Technology"
  
  **Not sure which category?**
  Pick the one that best describes your PRIMARY offering. If you're multi-category, choose the one that drives most revenue.
  
  **Examples:**
  • Coffee shop → "Specialty Coffee & Beverages"
  • Skincare brand → "Clean Beauty & Skincare"
  • Fitness wearable → "Fitness & Wellness Tech"
  • B2B SaaS → "Software/SaaS"
  • DTC apparel → "Fashion & Apparel"
  
  **Current field:** ${context.campaignData?.company?.industry || 'Not filled yet'}
  
  The more specific you are, the better my market recommendations! 🎯`;
      }
      
      // Required fields question
      if (lowerMessage.includes('required') || lowerMessage.includes('need to fill')) {
        return `📋 **Required vs Optional Fields:**
  
  **Required (must fill):**
  ✅ **Company Name**
  ✅ **Industry**
  
  That's it! Just 2 fields minimum.
  
  **Strongly Recommended:**
  💡 **Current Markets** - Helps me avoid suggesting where you already are
  💡 **Expansion Goals** - Focuses recommendations on what YOU want
  💡 **Annual Revenue** - Improves ROI predictions
  
  **Optional but Helpful:**
  • **Preferred State/Region** - I'll rate it and compare to top recommendations
  
  **Why fill optional fields?**
  • More accurate market recommendations
  • Better ROI predictions
  • Personalized insights based on YOUR situation
  • Comparison against your preferences
  
  **Can skip optional?**
  Yes! But you'll get more generic recommendations.
  
  **My recommendation:**
  Spend 2 minutes filling everything - the insights will be WAY better! 💪`;
      }
      
      // Revenue question
      if (lowerMessage.includes('revenue') || lowerMessage.includes('don\'t know')) {
        return `💰 **Don't Know Your Revenue?**
  
  **No problem!** Here's what to do:
  
  **Estimate it:**
  • Last 12 months total sales
  • Include all revenue streams
  • Rough estimate is fine
  
  **Why I need it:**
  • Determines recommended market size
  • Predicts ROI more accurately
  • Suggests appropriate entry costs
  
  **Ballpark ranges:**
  • **<$1M**: Early-stage, focus on lower entry costs
  • **$1M-$5M**: Growth-stage, balanced approach  
  • **$5M-$20M**: Scaling, can handle premium markets
  • **$20M+**: Mature, focus on strategic expansion
  
  **Don't have exact number?**
  Pick the range that's closest! I'll use it to calibrate recommendations.
  
  **Really don't want to share?**
  Leave it blank - I'll give recommendations but ROI predictions will be less accurate.
  
  **Current value:** ${context.campaignData?.company?.revenue ? `$${context.campaignData.company.revenue}` : 'Not filled'}
  
  Just a ballpark is totally fine! 📊`;
      }
      
      // Preferred state question
      if (lowerMessage.includes('prefer') && lowerMessage.includes('state')) {
        return `📍 **Preferred State/Region Feature:**
  
  **What it does:**
  Tell me where YOU'RE thinking of expanding, and I'll:
  • Rate it against your company profile
  • Show pros and cons
  • Compare it to my top recommendations
  
  **How to use:**
  Just enter state names, cities, or regions:
  • "Texas" or "Austin, TX"
  • "Colorado" or "Denver"
  • "Florida" or "Miami, FL"
  
  **What you'll get:**
  • **Fit Score** (0-100) - How well it matches your industry
  • **Verdict** - Strong fit / Good fit / Moderate fit
  • **Pros** - Advantages of this market
  • **Cons** - Considerations and challenges
  • **Summary** - My overall assessment
  
  **Then I'll show:**
  My top 3 recommendations so you can compare YOUR choice vs what LCBM suggests.
  
  **Example:**
  You: "I'm thinking Texas"
  Me: "Texas scores 89/100 for fitness! Here's why... BUT check out Colorado (91/100) and Denver specifically..."
  
  **Leave blank if:**
  You have no preference and want me to suggest markets fresh.
  
  Want to see how your preferred market stacks up? Enter it above! 🎯`;
      }
      
      // Fallback for company input
      return `🌎 **Company Input Help:**
  
  Fill in your company details to get personalized market recommendations!
  
  **Required fields:**
  ✅ Company name
  ✅ Industry
  
  **Recommended fields:**
  💡 Annual revenue
  💡 Current markets
  💡 Expansion goals
  💡 Preferred state/region
  
  **Ask me:**
  • "How do templates work?"
  • "What industry should I select?"
  • "Do I need to fill all fields?"
  • "I don't know my revenue"
  • "What's the preferred state feature?"
  
  Fill in the form above and click "Analyze Market Opportunities" when ready! 🚀`;
    }
    
    // ==========================================
    // ANALYZING MARKETS STEP
    // ==========================================
    if (context.currentStep === 'analyzing-markets') {
      // User shouldn't really chat during this 2-second step
      // but if they do, acknowledge it
      return `🔍 **Market Analysis in Progress...**
  
  I'm evaluating 50+ US markets right now based on your ${context.campaignData?.company?.industry || 'industry'} profile.
  
  **What I'm checking:**
  • Market demographics
  • Competitive landscape
  • Growth trajectories
  • Entry costs & barriers
  • ROI potential
  
  Almost done... hang tight! ⏳`;
    }
    
    // ==========================================
    // MARKET RECOMMENDATIONS STEP
    // ==========================================
    if (context.currentStep === 'market-recommendations') {
      const markets = context.campaignData?.markets || [];
      const preferenceRating = context.campaignData?.preferenceRating;
      const company = context.campaignData?.company;
      
      // Why did you recommend this market
      if (lowerMessage.includes('why') && (lowerMessage.includes('recommend') || lowerMessage.includes('austin') || lowerMessage.includes('denver') || lowerMessage.includes('miami') || lowerMessage.includes('nashville') || lowerMessage.includes('market'))) {
        if (markets.length === 0) {
          return "I haven't generated market recommendations yet. Enter your company info and click 'Analyze Market Opportunities'!";
        }
        
        // Try to find which market they're asking about
        let targetMarket = markets[0]; // Default to top market
        
        if (lowerMessage.includes('austin')) targetMarket = markets.find(m => m.name.toLowerCase().includes('austin')) || markets[0];
        if (lowerMessage.includes('denver')) targetMarket = markets.find(m => m.name.toLowerCase().includes('denver')) || markets[1];
        if (lowerMessage.includes('miami')) targetMarket = markets.find(m => m.name.toLowerCase().includes('miami')) || markets[2];
        if (lowerMessage.includes('nashville')) targetMarket = markets.find(m => m.name.toLowerCase().includes('nashville')) || markets[2];
        if (lowerMessage.includes('#1') || lowerMessage.includes('first') || lowerMessage.includes('top')) targetMarket = markets[0];
        if (lowerMessage.includes('#2') || lowerMessage.includes('second')) targetMarket = markets[1];
        if (lowerMessage.includes('#3') || lowerMessage.includes('third')) targetMarket = markets[2];
        
        return `🎯 **Why ${targetMarket.name}?**
  
  **Fit Score: ${targetMarket.fit_score}/100**
  
  **Core Reason:**
  ${targetMarket.reason}
  
  **Key Advantages:**
  ${targetMarket.key_advantages.map((adv, i) => `${i + 1}. ${adv}`).join('\n')}
  
  **Market Metrics:**
  • **Population:** ${targetMarket.population} metro area
  • **Predicted ROI:** ${targetMarket.predicted_roi}
  • **Entry Cost:** ${targetMarket.entry_cost}
  • **Timeline:** ${targetMarket.timeline}
  
  **Why the high fit score:**
  LCBM analyzed this market against your ${company?.industry || 'industry'} profile and found:
  ✓ Demographics align with your target customer
  ✓ Market growth trajectory is strong
  ✓ Competition level is manageable
  ✓ Entry barriers are reasonable
  ✓ ROI potential is excellent
  
  **Best for:**
  ${targetMarket.fit_score >= 90 ? 
    'Primary expansion target - highest confidence recommendation' :
    targetMarket.fit_score >= 87 ?
    'Strong secondary market - great for scaling after you validate primary' :
    'Solid opportunity - test carefully but good potential'}
  
  Want to compare this to another market? 🔍`;
      }
      
      // Compare markets
      if (lowerMessage.includes('compare')) {
        if (markets.length < 2) {
          return "I need at least 2 markets to compare! Generate recommendations first.";
        }
        
        const market1 = markets[0];
        const market2 = markets[1];
        
        return `⚖️ **Market Comparison:**
  
  **${market1.name} vs ${market2.name}**
  
  **Fit Scores:**
  • ${market1.name}: **${market1.fit_score}** ${market1.fit_score > market2.fit_score ? '🏆' : ''}
  • ${market2.name}: **${market2.fit_score}** ${market2.fit_score > market1.fit_score ? '🏆' : ''}
  
  **ROI Predictions:**
  • ${market1.name}: **${market1.predicted_roi}** ${parseFloat(market1.predicted_roi) > parseFloat(market2.predicted_roi) ? '🏆' : ''}
  • ${market2.name}: **${market2.predicted_roi}** ${parseFloat(market2.predicted_roi) > parseFloat(market1.predicted_roi) ? '🏆' : ''}
  
  **Entry Costs:**
  • ${market1.name}: **${market1.entry_cost}** ${parseFloat(market1.entry_cost.replace(/[$,K]/g, '')) < parseFloat(market2.entry_cost.replace(/[$,K]/g, '')) ? '🏆 (Lower)' : ''}
  • ${market2.name}: **${market2.entry_cost}** ${parseFloat(market2.entry_cost.replace(/[$,K]/g, '')) < parseFloat(market1.entry_cost.replace(/[$,K]/g, '')) ? '🏆 (Lower)' : ''}
  
  **Timeline to Launch:**
  • ${market1.name}: ${market1.timeline}
  • ${market2.name}: ${market2.timeline}
  
  **Key Differentiators:**
  
  **${market1.name}:**
  ${market1.key_advantages[0]}
  
  **${market2.name}:**
  ${market2.key_advantages[0]}
  
  **My recommendation:**
  ${market1.fit_score >= 90 && market1.fit_score > market2.fit_score ?
    `Start with ${market1.name} - highest fit score means strongest market-product alignment. Expand to ${market2.name} once you've validated the model.` :
    `Both are strong! ${market1.name} for ${market1.fit_score >= 92 ? 'premium positioning' : 'faster entry'}, ${market2.name} for ${market2.fit_score >= 92 ? 'premium positioning' : 'market size'}.`}
  
  Want details on a specific market? 🎯`;
      }
      
      // Fit score explanation
      if (lowerMessage.includes('fit score') || (lowerMessage.includes('how') && lowerMessage.includes('score'))) {
        return `📊 **Fit Score Explained:**
  
  **Range:** 0-100 (higher = better match)
  
  **What it measures:**
  How well a market aligns with YOUR company profile:
  • Industry fit (40%)
  • Demographic match (30%)
  • Competition landscape (20%)
  • Economic factors (10%)
  
  **Score Breakdown:**
  
  **90-100** 🔥
  • Exceptional fit
  • Highest confidence recommendation
  • Strong product-market alignment
  • Top priority for expansion
  
  **85-89** ✨
  • Very strong fit
  • Excellent opportunity
  • Great for scaling after primary validated
  • Solid secondary market
  
  **80-84** ✅
  • Good fit
  • Viable expansion option
  • Test carefully but solid potential
  • Consider for phase 2 expansion
  
  **75-79** 💡
  • Moderate fit
  • Requires adaptation
  • Higher risk, potentially higher reward
  • Strategic opportunity if timing is right
  
  **Below 75** ⚠️
  • Poor fit for your profile
  • Not recommended
  • Significant barriers or misalignment
  
  **Your markets:**
  ${markets.length > 0 ?
    `Scored ${Math.min(...markets.map(m => m.fit_score))}-${Math.max(...markets.map(m => m.fit_score))} - ${
      Math.max(...markets.map(m => m.fit_score)) >= 90 ? 'Exceptional matches!' :
      Math.max(...markets.map(m => m.fit_score)) >= 85 ? 'Very strong fits!' :
      'Good opportunities!'
    }` :
    'Generate recommendations to see scores!'}
  
  **Remember:** Fit score + your execution = success! 🚀`;
      }
      
      // ROI explanation
      if (lowerMessage.includes('roi') || lowerMessage.includes('return')) {
        return `💰 **Predicted ROI Explained:**
  
  **What it means:**
  For every $1 you invest in entering this market, you'll get back $X.XX within 18-24 months.
  
  **Example:**
  • **3.2x ROI** = Invest $100K → Return $320K
  • **2.8x ROI** = Invest $150K → Return $420K
  
  **How I calculate it:**
  
  **Factors considered:**
  • Market size & growth rate (30%)
  • Your industry's typical performance (25%)
  • Competition level (20%)
  • Entry costs vs revenue potential (15%)
  • Economic conditions (10%)
  
  **ROI Ranges:**
  
  **3.5x+** 🔥
  • Exceptional return
  • High-growth market
  • Strong product-market fit
  • Low competition / high demand
  
  **3.0-3.4x** ✨
  • Very good return
  • Solid growth potential
  • Good market conditions
  • Balanced risk/reward
  
  **2.5-2.9x** ✅
  • Good return
  • Moderate growth
  • Acceptable for strategic expansion
  • Standard market conditions
  
  **Below 2.5x** ⚠️
  • Lower return
  • Higher risk or saturation
  • Consider only if strategic
  
  **Your markets:**
  ${markets.length > 0 ?
    markets.map(m => `• ${m.name}: **${m.predicted_roi}**`).join('\n') :
    'Generate recommendations to see ROI predictions!'}
  
  **Important:** 
  These are PREDICTIONS based on industry data. Your actual ROI depends on:
  ✓ Execution quality
  ✓ Marketing effectiveness
  ✓ Product-market fit
  ✓ Timing
  ✓ Competition response
  
  Think of this as "likely outcome" not "guaranteed outcome"! 📈`;
      }
      
      // Which market to prioritize
      if ((lowerMessage.includes('which') || lowerMessage.includes('what')) && 
          (lowerMessage.includes('prioritize') || lowerMessage.includes('first') || lowerMessage.includes('start'))) {
        
        if (markets.length === 0) {
          return "Generate market recommendations first, then I can tell you which to prioritize!";
        }
        
        const top = markets[0];
        
        return `🎯 **Market Prioritization Strategy:**
  
  **Start with: ${top.name}** 🏆
  
  **Why #1:**
  • **Highest fit score:** ${top.fit_score}/100
  • **Strong ROI:** ${top.predicted_roi}
  • **Reason:** ${top.reason}
  
  **Phase 1 (Months 1-6):**
  1. **Launch in ${top.name}**
     • Focus 100% resources here
     • Validate product-market fit
     • Build repeatable playbook
  
  **Phase 2 (Months 6-12):**
  2. **Expand to ${markets[1]?.name || 'Market #2'}**
     • Use learnings from ${top.name}
     • Adapt what worked
     • Scale with confidence
  
  **Phase 3 (Months 12-18):**
  3. **Enter ${markets[2]?.name || 'Market #3'}**
     • Now you have proven model
     • Faster execution
     • Lower risk
  
  **Why this sequence?**
  • Validates concept in best market first
  • Builds confidence and case studies
  • Allows for learning and iteration
  • Reduces overall risk
  • Creates momentum
  
  **Don't try to do all 3 at once!**
  Spreading resources across multiple markets dilutes impact. Master one, then scale.
  
  **Timeline:**
  • ${top.name}: ${top.timeline}
  • Expected ROI: ${top.predicted_roi}
  • Entry cost: ${top.entry_cost}
  
  Ready to dive deeper into ${top.name}? 🚀`;
      }
      
      // Entry cost explanation
      if (lowerMessage.includes('entry cost') || lowerMessage.includes('how much')) {
        return `💵 **Entry Cost Breakdown:**
  
  **What's included:**
  
  **Market Research & Setup (20%):**
  • Local market research
  • Competitive analysis
  • Location scouting (if physical)
  • Legal/regulatory setup
  
  **Marketing & Launch (40%):**
  • Market awareness campaigns
  • Local advertising (6 months)
  • Brand positioning
  • Launch events
  
  **Operations (30%):**
  • Staffing/hiring
  • Infrastructure setup
  • Inventory (if applicable)
  • Distribution setup
  
  **Contingency (10%):**
  • Unexpected costs
  • Market testing
  • Adjustments
  
  **Your markets:**
  ${markets.length > 0 ?
    markets.map(m => `• **${m.name}:** ${m.entry_cost} (Timeline: ${m.timeline})`).join('\n') :
    'Generate recommendations to see costs!'}
  
  **How to reduce costs:**
  
  **Bootstrap approach:**
  • Remote testing first
  • Digital-only launch
  • Partner with locals
  • **Estimated savings:** 30-40%
  
  **Standard approach:**
  • Full market entry
  • Physical presence (if needed)
  • Comprehensive marketing
  • **Full entry cost:** As listed
  
  **Premium approach:**
  • Accelerated timeline
  • Maximum market impact
  • Comprehensive presence
  • **Cost:** +20-30% above estimate
  
  **Pro tip:**
  Start with bootstrap in highest-fit market, prove concept, THEN do full entry in markets 2 & 3!
  
  Want ROI projections based on these costs? 📊`;
      }
      
      // Preference state score explanation
      if (preferenceRating && (lowerMessage.includes('prefer') || lowerMessage.includes('my state') || lowerMessage.includes('my region'))) {
        return `📍 **Your Preferred Region: ${preferenceRating.stateOrRegion}**
  
  **Fit Score: ${preferenceRating.fitScore}/100**
  **Verdict: ${preferenceRating.verdict}**
  
  **My assessment:**
  ${preferenceRating.summary}
  
  **Pros:**
  ${preferenceRating.pros.map((p, i) => `${i + 1}. ${p}`).join('\n')}
  
  **Considerations:**
  ${preferenceRating.cons.map((c, i) => `${i + 1}. ${c}`).join('\n')}
  
  **How it compares to my recommendations:**
  ${markets.length > 0 ? `
  My top recommendation (${markets[0].name}) scores **${markets[0].fit_score}** vs your preference at **${preferenceRating.fitScore}**.
  
  ${markets[0].fit_score > preferenceRating.fitScore ?
    `**${markets[0].name} scores ${markets[0].fit_score - preferenceRating.fitScore} points higher** because:\n${markets[0].key_advantages[0]}\n\n**Recommendation:** Consider ${markets[0].name} as primary, ${preferenceRating.stateOrRegion} as secondary.` :
    `Your preference scores well! ${preferenceRating.stateOrRegion} is a solid choice.\n\n**Recommendation:** ${preferenceRating.verdict === 'Strong fit' ? 'Go for it!' : 'Validate carefully but good potential.'}`}
  ` : 'Generate recommendations to compare!'}
  
  **Bottom line:**
  ${preferenceRating.fitScore >= 85 ?
    `${preferenceRating.stateOrRegion} is a strong choice for your ${company?.industry || 'industry'}. Trust your instincts!` :
    `${preferenceRating.stateOrRegion} could work, but check out my top recommendations - they might perform better.`}
  
  Want details on why my top rec scored differently? 🎯`;
      }
      
      // Fallback for market recommendations
      return `🌎 **Market Recommendations Ready!**
  
  I've analyzed markets based on your ${company?.companyName || 'company'} profile.
  
  **Your top markets:**
  ${markets.length > 0 ?
    markets.map((m, i) => `${i + 1}. **${m.name}** - Fit: ${m.fit_score}/100`).join('\n') :
    'Generate recommendations to see your markets!'}
  
  ${preferenceRating ? `\n**Your preference:** ${preferenceRating.stateOrRegion} (Fit: ${preferenceRating.fitScore}/100)` : ''}
  
  **Ask me:**
  • "Why did you recommend [market]?"
  • "Compare Austin vs Denver"
  • "What's the fit score mean?"
  • "Which market should I prioritize?"
  • "Explain the ROI"
  • "How much does entry cost?"
  
  Check out the detailed market cards above and let me know what you need! 🚀`;
    }
    
    // ==========================================
    // FALLBACK - GENERAL REGIONAL EXPANSION HELP
    // ==========================================
    return `🌎 **Regional Expansion Intelligence:**
  
  I'm here to help you find the best markets for expansion!
  
  **Current step:** ${context.currentStep || 'Getting started'}
  
  **What I can help with:**
  • Company profile setup
  • Market analysis
  • Fit score explanations
  • ROI predictions
  • Market comparisons
  • Prioritization strategy
  
  **Ask me anything!** I'll provide step-specific guidance. 💪`;
  }
  
  export default handleRegionalExpansionResponse;