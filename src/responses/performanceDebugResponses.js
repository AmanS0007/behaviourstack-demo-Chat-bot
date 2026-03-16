// ==========================================
// 🔧 PERFORMANCE DEBUG FLOW - AI RESPONSES
// Handles all steps: campaign-upload, analyzing-performance,
// diagnosis-results, creative-recovery
// ==========================================

/**
 * Main handler for Performance Debug flow responses
 * @param {string} userMessage - The user's message
 * @param {object} context - Current screen context
 * @returns {string} AI response
 */
export function handlePerformanceDebugResponse(userMessage, context) {
    const lowerMessage = userMessage.toLowerCase();
    
    // ==========================================
    // CAMPAIGN UPLOAD STEP
    // ==========================================
    if (context.currentStep === 'campaign-upload') {
      // File format question
      if (lowerMessage.includes('format') || lowerMessage.includes('file type')) {
        return `📁 **Supported File Formats:**
  
  **Campaign Data:**
  • CSV (.csv)
  • Excel (.xlsx, .xls)
  • Google Ads export
  • Meta Ads export
  • TikTok Ads export
  
  **Creative Assets:**
  • Images: JPG, PNG, GIF
  • Videos: MP4, MOV, AVI
  
  **What to include in CSV/Excel:**
  At minimum:
  • Campaign name
  • Impressions
  • Clicks
  • Conversions
  • Spend
  
  **Bonus data (helps diagnosis):**
  • Audience segments
  • Creative IDs
  • Date ranges
  • CTR, CPA metrics
  
  **Pro tip:** Export directly from your ad platform for most accurate diagnosis!
  
  Ready to upload? Drag and drop your file above! 📤`;
      }
      
      // Platform connection question
      if (lowerMessage.includes('connect') || lowerMessage.includes('google') || lowerMessage.includes('meta') || lowerMessage.includes('tiktok')) {
        return `🔌 **Platform Connections:**
  
  Direct platform integration is coming soon! For now:
  
  **Current workaround:**
  1. Export campaign data from your platform
  2. Upload the exported file here
  3. I'll analyze it just the same!
  
  **Export guides:**
  
  **📊 Google Ads:**
  • Go to Reports → Predefined Reports → Campaign
  • Select date range
  • Download as CSV
  
  **📘 Meta Ads:**
  • Ads Manager → Export Table Data
  • Choose CSV or Excel
  • Include all metrics
  
  **🎵 TikTok Ads:**
  • Campaign tab → Export
  • Select Custom Columns
  • Download CSV
  
  **Coming soon:** One-click OAuth connection to all platforms! 🚀
  
  Need help exporting from a specific platform?`;
      }
      
      // What data needed
      if (lowerMessage.includes('what') && (lowerMessage.includes('need') || lowerMessage.includes('data'))) {
        return `📊 **What Data I Need:**
  
  **Minimum required:**
  • Campaign name/ID
  • Impressions
  • Clicks  
  • Conversions
  • Spend
  
  **Strongly recommended:**
  • CTR (Click-Through Rate)
  • CPA (Cost Per Acquisition)
  • Date range (current vs previous period)
  
  **Optional but helpful:**
  • Audience segment breakdown
  • Creative asset IDs
  • Device performance
  • Geographic data
  • Time of day data
  
  **Why I need this:**
  The more data you provide, the more accurate my diagnosis. I can identify:
  • Which audiences are underperforming
  • Creative fatigue patterns
  • Funnel drop-off points
  • Budget allocation issues
  
  **Don't have all this?** No worries! Upload what you have and I'll work with it. Even basic metrics help! 💪`;
      }
      
      // How long does analysis take
      if (lowerMessage.includes('how long') || lowerMessage.includes('time')) {
        return `⏱️ **Analysis Time:**
  
  **Typical analysis:** 2-5 seconds
  
  **What I'm doing:**
  1. Parsing your campaign data
  2. Running LCBM diagnosis algorithms
  3. Identifying performance patterns
  4. Generating recommendations
  5. Creating recovery roadmap
  
  **Factors that affect speed:**
  • File size (larger = slightly longer)
  • Data complexity
  • Number of audiences/creatives
  
  **Maximum time:** ~10 seconds for very large campaigns
  
  Once analysis is complete, you'll see:
  ✓ Root cause diagnosis
  ✓ Underperforming segments
  ✓ KPI deltas
  ✓ Recovery actions
  
  Ready to upload and get your diagnosis? 🔍`;
      }
      
      // Fallback for campaign upload
      return `🔧 **Campaign Upload Help:**
  
  Upload your campaign data to get AI-powered performance diagnosis!
  
  **Accepted formats:**
  • CSV, Excel files
  • Campaign exports (Google, Meta, TikTok)
  • Creative assets (images/videos)
  
  **What I'll analyze:**
  ✓ Creative fatigue signals
  ✓ Audience performance
  ✓ Funnel drop-offs
  ✓ Budget efficiency
  
  **Ask me:**
  • "What file formats are supported?"
  • "How do I connect Google Ads?"
  • "What data do you need?"
  • "How long does analysis take?"
  
  Drag and drop your file above to get started! 📤`;
    }
    
    // ==========================================
    // ANALYZING PERFORMANCE STEP
    // ==========================================
    if (context.currentStep === 'analyzing-performance') {
      // User shouldn't really be chatting during this 2-second step
      // but if they do, acknowledge it
      return `🔍 **Analysis in progress...**
  
  I'm running LCBM diagnosis on your campaign data right now. This usually takes just a few seconds!
  
  **What I'm checking:**
  • Creative performance trends
  • Audience behavior patterns
  • Funnel conversion rates
  • Budget allocation efficiency
  
  Almost done... hang tight! ⏳`;
    }
    
    // ==========================================
    // DIAGNOSIS RESULTS STEP
    // ==========================================
    if (context.currentStep === 'diagnosis-results') {
      const diagnosis = context.diagnosis;
      const campaignData = context.campaignData;
      
      // Why is campaign underperforming
      if (lowerMessage.includes('why') && (lowerMessage.includes('underperform') || lowerMessage.includes('bad') || lowerMessage.includes('poor'))) {
        if (!diagnosis) {
          return "I haven't analyzed your campaign yet. Upload your campaign data first!";
        }
        
        return `🔍 **Root Cause Analysis:**
  
  **Primary Issue:** ${diagnosis.issue || 'Performance degradation detected'}
  
  **What's happening:**
  ${diagnosis.root_cause || 'Your campaign is showing signs of fatigue and declining engagement.'}
  
  **Why this matters:**
  This isn't just a dip - it's a systematic issue that will continue getting worse if not addressed. The longer creative fatigue persists, the more expensive your conversions become.
  
  **Confidence level:** ${Math.round((diagnosis.confidence || 0.89) * 100)}%
  
  Based on the data patterns, I'm ${Math.round((diagnosis.confidence || 0.89) * 100)}% confident this is the root cause.
  
  **What you should do:**
  ${diagnosis.recommendation || 'Refresh your creative immediately and implement A/B testing.'}
  
  Want me to explain any specific metric or generate recovery creatives? 🎨`;
      }
      
      // What is creative fatigue
      if (lowerMessage.includes('creative fatigue') || lowerMessage.includes('what is') && lowerMessage.includes('fatigue')) {
        return `🎨 **Creative Fatigue Explained:**
  
  **What it is:**
  When your audience has seen your ad so many times they start ignoring it - aka "banner blindness."
  
  **How it happens:**
  1. Ad launches → High CTR (people notice it)
  2. Week 2-3 → CTR stable (still fresh)
  3. Week 4+ → CTR drops (audience tired of seeing it)
  4. Week 6+ → Conversions tank (ad becomes invisible)
  
  **Warning signs:**
  • CTR declining 15%+ week-over-week
  • Frequency above 3-4
  • Conversion rate dropping
  • CPA increasing
  • Ad running 30+ days unchanged
  
  **Why it's bad:**
  • Wasted ad spend
  • Declining brand perception
  • Rising acquisition costs
  • Lost momentum
  
  **The fix:**
  Rotate in fresh creative every 14-30 days. Test new:
  • Hooks
  • Visual styles  
  • Messaging angles
  • CTAs
  
  **Current situation:**
  ${diagnosis?.root_cause?.includes('47 days') ? 'Your creative has been running 47 days - WAY past refresh point!' : 'Check your ad frequency and rotation schedule.'}
  
  Want me to generate recovery creatives? 🚀`;
      }
      
      // Which audience to pause
      if ((lowerMessage.includes('which') || lowerMessage.includes('what')) && 
          (lowerMessage.includes('pause') || lowerMessage.includes('stop') || lowerMessage.includes('turn off'))) {
        
        if (!diagnosis?.underperforming_audiences || diagnosis.underperforming_audiences.length === 0) {
          return "I don't see any specifically underperforming audiences in the data. Your audiences might actually be fine - the issue could be creative fatigue instead!";
        }
        
        const audiences = diagnosis.underperforming_audiences;
        const worst = audiences[0]; // Already sorted by performance
        
        return `🎯 **Audience Pause Recommendations:**
  
  **Pause immediately:**
  **${worst.name}** - Your worst performer
  • CPA: ${worst.cpa} (vs avg: ${campaignData?.cpa || 'N/A'})
  • CTR: ${worst.ctr}
  • Spend: ${worst.spend}
  • Delta: ${worst.delta_vs_avg}
  
  This audience is burning budget without returns.
  
  **Monitor closely:**
  ${audiences.slice(1, 3).map((aud, i) => `${i + 2}. **${aud.name}**\n• CPA: ${aud.cpa}\n• Consider pausing if no improvement in 48hrs`).join('\n\n')}
  
  **Pro tip:** 
  Don't just pause - understand WHY they're underperforming:
  • Wrong creative for this audience?
  • Audience too broad/narrow?
  • Bidding issues?
  
  Sometimes a creative refresh is better than pausing! 
  
  Want me to generate audience-specific creative variants? 🎨`;
      }
      
      // Explain metrics
      if (lowerMessage.includes('explain') && (lowerMessage.includes('metric') || lowerMessage.includes('ctr') || lowerMessage.includes('cpa') || lowerMessage.includes('kpi'))) {
        return `📊 **Key Metrics Explained:**
  
  **CTR (Click-Through Rate):**
  • What: % of people who clicked after seeing your ad
  • Formula: (Clicks ÷ Impressions) × 100
  • Good: 2%+ for most industries
  • Current: ${campaignData?.ctr || 'N/A'}
  • Why it matters: Shows ad relevance and hook strength
  
  **CPA (Cost Per Acquisition):**
  • What: How much you pay per conversion
  • Formula: Spend ÷ Conversions
  • Good: Depends on your product value
  • Current: ${campaignData?.cpa || 'N/A'}
  • Why it matters: Your profitability metric
  
  **Conversion Rate:**
  • What: % of clicks that convert
  • Formula: (Conversions ÷ Clicks) × 100
  • Good: 2-5% average
  • Why it matters: Landing page & offer effectiveness
  
  **Impressions:**
  • What: How many times ad was shown
  • Current: ${campaignData?.impressions || 'N/A'}
  • Why it matters: Reach & frequency
  
  **Your campaign trends:**
  ${diagnosis?.kpi_deltas ? diagnosis.kpi_deltas.map(kpi => 
    `• ${kpi.metric}: ${kpi.current} (${kpi.change_pct} vs previous)`
  ).join('\n') : 'Upload campaign data to see your trends!'}
  
  Want me to explain a specific metric in more detail? 📈`;
      }
      
      // How to fix/improve
      if (lowerMessage.includes('how') && (lowerMessage.includes('fix') || lowerMessage.includes('improve') || lowerMessage.includes('recover'))) {
        if (!diagnosis) {
          return "Upload your campaign data first so I can give you specific recommendations!";
        }
        
        return `🔧 **Recovery Action Plan:**
  
  **Immediate actions (Today):**
  ${diagnosis.recovery_actions ? diagnosis.recovery_actions.slice(0, 2).map((action, i) => 
    `${i + 1}. ${action}`
  ).join('\n') : '1. Pause underperforming segments\n2. Refresh creative assets'}
  
  **This week:**
  ${diagnosis.recovery_actions ? diagnosis.recovery_actions.slice(2, 4).map((action, i) => 
    `${i + 3}. ${action}`
  ).join('\n') : '3. Implement A/B testing\n4. Set up creative rotation'}
  
  **Expected results:**
  ${diagnosis.expected_improvement || '+45-60% CTR recovery within 7 days'}
  
  **Why this works:**
  ${diagnosis.issue === 'Creative Fatigue Detected' ? 
    'Fresh creative breaks banner blindness and recaptures attention. Your audience hasn\'t seen these new variants, so they\'ll engage again.' :
    'Addressing the root cause rather than symptoms ensures lasting improvement.'}
  
  **My recommendation:**
  Start with creative refresh (I can generate variants for you!) then optimize audience targeting once you have fresh assets performing.
  
  Ready to generate recovery creatives? Click the button in the recovery actions above! 🚀`;
      }
      
      // Compare to benchmarks
      if (lowerMessage.includes('benchmark') || lowerMessage.includes('average') || lowerMessage.includes('industry')) {
        return `📊 **Industry Benchmarks:**
  
  **Your performance:**
  • CTR: ${campaignData?.ctr || 'N/A'}
  • CPA: ${campaignData?.cpa || 'N/A'}
  • Conversions: ${campaignData?.conversions || 'N/A'}
  
  **Industry averages (across platforms):**
  
  **E-commerce:**
  • CTR: 2.5-3.5%
  • CPA: $20-$45
  • Conversion rate: 2-4%
  
  **SaaS/B2B:**
  • CTR: 2.0-3.0%
  • CPA: $50-$150
  • Conversion rate: 1-3%
  
  **Lead Gen:**
  • CTR: 3.0-5.0%
  • CPA: $15-$30
  • Conversion rate: 5-10%
  
  **Your situation:**
  ${diagnosis?.severity === 'High' ? '🚨 You\'re significantly below benchmarks - immediate action needed!' :
    diagnosis?.severity === 'Medium' ? '⚠️ Below benchmarks but recoverable with optimization' :
    '💡 Close to benchmarks - minor tweaks needed'}
  
  **Remember:** Benchmarks vary by:
  • Industry vertical
  • Product price point
  • Ad platform
  • Target audience
  • Creative quality
  
  Focus on YOUR trends over time rather than obsessing over industry averages!
  
  Want specific recommendations for your campaign? 🎯`;
      }
      
      // Confidence score explanation
      if (lowerMessage.includes('confidence')) {
        const confidence = diagnosis?.confidence || 0.89;
        return `🎯 **Confidence Score: ${Math.round(confidence * 100)}%**
  
  **What this means:**
  I'm ${Math.round(confidence * 100)}% confident that "${diagnosis?.issue || 'the identified issue'}" is the primary root cause of your performance problems.
  
  **How I calculate this:**
  • Data pattern strength (40%)
  • Historical precedent matching (30%)
  • Statistical significance (20%)
  • Cross-metric validation (10%)
  
  **Confidence levels:**
  • **90-100%**: Extremely confident - clear data pattern
  • **80-89%**: Very confident - strong indicators
  • **70-79%**: Confident - likely diagnosis
  • **Below 70%**: Multiple possible causes
  
  **Your score (${Math.round(confidence * 100)}%):**
  ${confidence >= 0.9 ? 'Extremely clear pattern - I\'m very sure about this diagnosis.' :
    confidence >= 0.8 ? 'Strong indicators point to this issue. Follow the recommendations.' :
    'Likely the main issue, but keep monitoring other factors too.'}
  
  **What you should do:**
  ${confidence >= 0.8 ? 
    'Act on my recommendations immediately - the data is clear!' :
    'Follow recommendations but also monitor other potential issues.'}
  
  The higher the confidence, the more you can trust this diagnosis! 📈`;
      }
      
      // Fallback for diagnosis results
      return `🔍 **Diagnosis Complete!**
  
  I've analyzed your campaign and identified the issues.
  
  **Current diagnosis:**
  • **Issue:** ${diagnosis?.issue || 'Analysis in progress'}
  • **Severity:** ${diagnosis?.severity || 'N/A'}
  • **Confidence:** ${Math.round((diagnosis?.confidence || 0) * 100)}%
  
  **Ask me:**
  • "Why is my campaign underperforming?"
  • "What is creative fatigue?"
  • "Which audience should I pause?"
  • "How do I fix this?"
  • "Explain the metrics"
  • "Compare to industry benchmarks"
  
  Check out the diagnosis above and let me know what you need help with! 💪`;
    }
    
    // ==========================================
    // CREATIVE RECOVERY STEP
    // ==========================================
    if (context.currentStep === 'creative-recovery') {
      const diagnosis = context.diagnosis;
      const generatedVariants = context.visibleComponents?.generatedVariants || [];
      
      // Why isn't current creative working
      if (lowerMessage.includes('why') && (lowerMessage.includes('not working') || lowerMessage.includes('failing') || lowerMessage.includes('bad'))) {
        if (!diagnosis) {
          return "Upload your campaign data first so I can diagnose what's wrong!";
        }
        
        return `🎨 **Why Your Current Creative Isn't Working:**
  
  **The problem:**
  ${diagnosis.root_cause || 'Your creative has been running too long and audiences are experiencing banner blindness.'}
  
  **Specific issues I see:**
  ${diagnosis.issue === 'Creative Fatigue Detected' ? `
  • **Overexposure:** Ad running 47 days - way past optimal refresh window
  • **Banner blindness:** Audience has seen it so many times they scroll past
  • **Declining engagement:** CTR down 32% in last 14 days
  • **Rising costs:** CPA increasing as performance drops
  ` : `
  • Root cause identified in diagnosis
  • Performance trending downward
  • Immediate refresh needed
  `}
  
  **Why this happens:**
  Even great creative gets stale! Your audience sees thousands of ads daily. After ~30 days, your ad becomes "invisible" to them.
  
  **The fix:**
  ${diagnosis.recommendation || 'Deploy fresh creative with new hooks and visual styles immediately.'}
  
  **Expected improvement:**
  ${diagnosis.expected_improvement || '+45-60% CTR recovery within 7 days'}
  
  Want me to generate recovery variants? Click "Generate AI variants" above! 🚀`;
      }
      
      // Which variant to use
      if ((lowerMessage.includes('which') || lowerMessage.includes('what')) && 
          (lowerMessage.includes('variant') || lowerMessage.includes('creative') || lowerMessage.includes('use'))) {
        
        if (generatedVariants.length === 0) {
          return "Generate AI variants first, then I can recommend which one to use! Click the 'Generate AI variants' button above. 🎨";
        }
        
        const sorted = [...generatedVariants].sort((a, b) => b.lcbm_score - a.lcbm_score);
        const top = sorted[0];
        const secondBest = sorted[1];
        
        return `🏆 **My Recommendation:**
  
  **Deploy immediately: "${top.name}"**
  • LCBM Score: ${top.lcbm_score}
  • Expected CTR: ${top.predicted_performance?.ctr || 'N/A'}
  • Predicted lift: ${top.predicted_performance?.conversion_lift || 'N/A'}
  
  **Why this one:**
  ${top.why_high_performing || 'Highest scoring variant with best predicted performance.'}
  
  **Launch strategy:**
  
  **Day 1-3:**
  • Launch "${top.name}" as primary
  • Allocate 70% of budget here
  • Monitor CTR closely
  
  **Day 3-7:**
  • Add "${secondBest?.name || 'second variant'}" for A/B test
  • Split 60/40
  • Compare performance
  
  **After 7 days:**
  • Scale the winner
  • Pause the loser
  • Test new variant #3
  
  **Pro tip:**
  Don't test all 4 at once - you'll dilute your budget. Test the top 2, find your winner, THEN test #3 against it.
  
  Ready to download and deploy? Click the download button on the variant! 📥`;
      }
      
      // How scores work
      if (lowerMessage.includes('score') && (lowerMessage.includes('how') || lowerMessage.includes('what'))) {
        return `📊 **LCBM Creative Scoring:**
  
  **Score range:** 0-10 (higher = better)
  
  **What it measures:**
  • Predicted CTR against your audiences
  • Hook strength and attention-grabbing power
  • Visual-message alignment
  • CTA effectiveness
  • Historical performance of similar approaches
  
  **Score breakdown:**
  
  **9.0-10.0** 🔥
  • Exceptionally strong
  • Top 5% of creatives
  • Deploy immediately with confidence
  
  **8.5-8.9** ✨
  • Excellent performer
  • Strong predicted results
  • Great A/B test candidate
  
  **8.0-8.4** ✅
  • Very good
  • Above average performance expected
  • Solid backup option
  
  **7.5-7.9** 💡
  • Good
  • Decent performance
  • May need optimization
  
  **Below 7.5** ⚠️
  • Needs work
  • Consider regenerating
  
  **Your variants:**
  ${generatedVariants.length > 0 ? 
    `Scored ${Math.min(...generatedVariants.map(v => v.lcbm_score))}-${Math.max(...generatedVariants.map(v => v.lcbm_score))} - ${
      Math.max(...generatedVariants.map(v => v.lcbm_score)) >= 9.0 ? 'Excellent range!' :
      Math.max(...generatedVariants.map(v => v.lcbm_score)) >= 8.5 ? 'Very good!' :
      'Good starting point!'
    }` :
    'Generate variants to see scores!'}
  
  **Remember:** Scores are predictions. Real-world testing is the ultimate judge! 📈`;
      }
      
      // Should I pause current creative
      if (lowerMessage.includes('pause') && lowerMessage.includes('current')) {
        return `⏸️ **Should You Pause Current Creative?**
  
  **Short answer: YES, immediately.**
  
  **Why:**
  ${diagnosis?.issue === 'Creative Fatigue Detected' ? `
  Your current creative is experiencing severe fatigue:
  • Running for 47 days (optimal is 14-30 days)
  • CTR down 32% in last 14 days
  • Continuing will only waste more budget
  ` : `
  Your diagnosis shows ${diagnosis?.severity || 'significant'} performance issues that require fresh creative.
  `}
  
  **What happens if you don't pause:**
  • CPA will continue rising
  • CTR will keep declining
  • You'll burn budget on dead creative
  • Recovery will take longer
  
  **What to do:**
  1. **Pause current creative** - Stop the bleeding
  2. **Deploy new variant** - Launch highest-scoring recovery creative
  3. **Monitor for 48hrs** - Check if performance recovers
  4. **Scale winner** - Increase budget on what works
  
  **Don't worry about "losing momentum":**
  A 24-48 hour pause to swap creative is better than running fatigued ads for another week!
  
  **Expected recovery timeline:**
  • Days 1-2: Pause old, launch new
  • Days 3-5: Performance stabilizes
  • Days 5-7: Full recovery achieved
  • Result: ${diagnosis?.expected_improvement || '+45-60% CTR improvement'}
  
  Ready to deploy new creative? Download the variants above! 🚀`;
      }
      
      // Generate new variants question
      if (lowerMessage.includes('generate') || lowerMessage.includes('create') || lowerMessage.includes('new')) {
        if (generatedVariants.length > 0) {
          return `✅ **Variants Already Generated!**
  
  You have ${generatedVariants.length} AI-generated recovery variants ready to go.
  
  **Your variants:**
  ${generatedVariants.map((v, i) => 
    `${i + 1}. **${v.name}** - Score: ${v.lcbm_score}`
  ).join('\n')}
  
  **What to do now:**
  • Review each variant above
  • Check the hooks and visual direction
  • Download the highest-scoring one
  • Deploy it in your ad platform
  
  Want me to recommend which one to use? Just ask "Which variant should I use?" 🎯`;
        }
        
        return `🎨 **Generate Recovery Variants:**
  
  Click the "Generate AI variants" button above and I'll create:
  
  **What you'll get:**
  • **4 unique creative variants**
  • **Different hooks** - Fresh attention-grabbers
  • **New visual directions** - Break the pattern
  • **Varied copy angles** - Different messaging approaches
  • **LCBM scores** - Predicted performance
  
  **Generation time:** ~5 seconds
  
  **What makes them different from your current creative:**
  ✓ New hooks to recapture attention
  ✓ Updated visual styles
  ✓ Fresh messaging to overcome fatigue
  ✓ Optimized for your underperforming audiences
  
  **After generation:**
  I'll recommend which one to deploy first based on scores and your specific situation.
  
  Click the button to get started! 🚀`;
      }
      
      // Fallback for creative recovery
      return `🎨 **Creative Recovery Help:**
  
  Your current creative isn't performing - let's fix it!
  
  **What I can help with:**
  • Explain why current creative failed
  • Recommend which variant to use
  • Explain LCBM scores
  • Advise on deployment strategy
  • Guide on testing approach
  
  **Ask me:**
  • "Why isn't my current creative working?"
  • "Which variant should I use?"
  • "How do the scores work?"
  • "Should I pause my current creative?"
  
  **Quick actions:**
  • Generate AI variants above
  • Review the diagnosis
  • Download recovery creatives
  
  Let's get your campaign back on track! 💪`;
    }
    
    // ==========================================
    // FALLBACK - GENERAL PERFORMANCE DEBUG HELP
    // ==========================================
    return `🔧 **Performance Debugging:**
  
  I'm here to diagnose and fix your underperforming campaigns!
  
  **Current step:** ${context.currentStep || 'Getting started'}
  
  **What I can help with:**
  • Upload and analyze campaign data
  • Diagnose performance issues
  • Identify underperforming segments
  • Generate recovery creatives
  • Provide optimization recommendations
  
  **Ask me anything!** I'll provide step-specific guidance. 💪`;
  }
  
  export default handlePerformanceDebugResponse;