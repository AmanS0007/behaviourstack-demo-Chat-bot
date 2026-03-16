// ==========================================
// 🎨 CREATIVE INTELLIGENCE RESPONSES
// Tab-aware responses for creative variant selection
// ==========================================

// AUDIENCE-SPECIFIC INSIGHTS - One for each of 24 audiences
const AUDIENCE_INSIGHTS = {
  // Coffee audiences
  specialty_coffee_connoisseurs: "These variants emphasize artisan craft and premium quality - key drivers for specialty coffee enthusiasts. Notice the focus on origin stories and roasting expertise.",
  morning_ritual_optimizers: "Morning ritual optimizers respond well to convenience and reliability messaging. Notice the warm, inviting morning scenes that make coffee feel essential to their day.",
  artisan_food_explorers: "For this audience, I've focused on the journey of discovery - from bean origin to roasting technique. They appreciate knowing the 'why' behind what they're tasting.",
  sustainable_living_advocates: "Sustainability advocates need to see the impact of their choices. These creatives emphasize eco-friendly packaging, direct trade, and planet-first practices.",
  local_coffee_shop_regulars: "Local coffee shop regulars value community and connection. These variants focus on the social experience and neighborhood gathering aspects.",
  barista_equipment_enthusiasts: "For equipment enthusiasts, the focus is on precision, craft, and the tools that make great coffee possible.",
  subscription_coffee_members: "Subscription members love convenience and variety. These creatives highlight monthly discovery and the joy of fresh deliveries.",
  premium_beverage_buyers: "Premium buyers expect excellence. These variants emphasize luxury, exclusivity, and top-tier quality.",
  
  // Beauty audiences
  clean_beauty_advocates: "Clean beauty advocates prioritize ingredient transparency and natural formulations. These variants emphasize botanical ingredients, clean certifications, and toxin-free promises.",
  anti_aging_solution_seekers: "Anti-aging solution seekers want proof. These variants lead with clinical results, dermatologist endorsements, and before/after storytelling.",
  skincare_routine_enthusiasts: "For skincare routine enthusiasts, I've focused on how this product fits into their multi-step routine. They appreciate education and integration guidance.",
  dermatologist_recommended_users: "Dermatologist-recommended users need clinical credibility. These variants emphasize medical-grade formulations and professional endorsements.",
  beauty_quiz_completers: "Quiz completers expect personalization. These variants highlight how the product matches their specific skin concerns and preferences.",
  premium_skincare_shoppers: "Premium shoppers invest in quality. These variants emphasize luxurious formulations, visible results, and worth-the-investment positioning.",
  sephora_ulta_shoppers: "Retail shoppers love discovery and new launches. These variants focus on what's trending, what's new, and exclusive offerings.",
  influencer_driven_beauty_buyers: "Influencer-driven buyers trust social proof. These variants leverage testimonials, reviews, and community validation.",
  
  // Fitness audiences
  performance_tracking_athletes: "Performance tracking athletes are data-driven decision makers. These creatives highlight advanced metrics, tracking capabilities, and competitive edge.",
  home_workout_optimizers: "For this audience, I've focused on making fitness work within their space constraints. They value efficiency and smart design over gym-style equipment.",
  marathon_endurance_runners: "Endurance runners think in miles and minutes. These creatives speak to their specific needs around long-distance training and performance optimization.",
  fitness_tech_early_adopters: "Tech early adopters want the latest innovations. These variants showcase cutting-edge features, AI capabilities, and future-forward design.",
  product_page_visitors: "Product page visitors are already interested - these variants reinforce their decision with feature highlights and trust signals.",
  competitive_fitness_community: "Community-focused athletes value team spirit and social motivation. These variants emphasize group achievement and shared goals.",
  gym_membership_holders: "Gym members want equipment that integrates with their existing routine. These variants show how the product enhances their gym experience.",
  wearable_tech_upgraders: "Upgraders want to know what's better about the latest version. These variants compare features and highlight improvements."
};

// Helper to format audience name
function formatAudienceName(audienceId) {
  if (!audienceId) return 'this audience';
  return audienceId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Main response handler for creative intelligence step
export function handleCreativeIntelligenceResponse(userMessage, context) {
  const lowerMessage = userMessage.toLowerCase();
  const creatives = context.visibleComponents?.creatives || [];
  const selectedAudienceCount = context.campaignData?.audiences?.length || 0;
  const activeAudienceTab = context.visibleComponents?.activeAudience; // FIXED: Changed from selectedItems.activeAudienceTab
  const selectedVariantsByAudience = context.selectedItems?.selectedVariantsByAudience || {};
  const completedCount = Object.keys(selectedVariantsByAudience).length;
  
  // ==========================================
  // AUDIENCE-SPECIFIC INSIGHT REQUEST
  // ==========================================
  if ((lowerMessage.includes('audience') || lowerMessage.includes('why')) && activeAudienceTab) {
    const insight = AUDIENCE_INSIGHTS[activeAudienceTab];
    if (insight) {
      const audienceName = formatAudienceName(activeAudienceTab);
      return `**${audienceName} - Creative Strategy:**\n\n${insight}\n\n**Progress:** You've selected variants for ${completedCount} of ${selectedAudienceCount} audiences. ${completedCount < selectedAudienceCount ? `Don't forget to review the remaining ${selectedAudienceCount - completedCount} audience tabs!` : 'Great work! All audiences have their optimized variants.'}`;
    }
  }
  
  // ==========================================
  // PROGRESS TRACKING
  // ==========================================
  if (lowerMessage.includes('progress') || lowerMessage.includes('complete') || lowerMessage.includes('done')) {
    let response = `**Creative Selection Progress:**\n\n`;
    response += `✅ Completed: ${completedCount} of ${selectedAudienceCount} audiences\n`;
    if (completedCount < selectedAudienceCount) {
      response += `⏳ Remaining: ${selectedAudienceCount - completedCount} audiences\n\n`;
      response += `**Tip:** Each audience gets 4 unique variants optimized for their preferences. Review each tab and select the best-performing option!`;
    } else {
      response += `\n🎉 Excellent! You've selected optimized variants for all audiences. Ready to move to the campaign summary?`;
    }
    return response;
  }
  
  // ==========================================
  // WHY DID THIS VARIANT SCORE HIGHER? (TAB-AWARE - BUG FIX)
  // ==========================================
  if (lowerMessage.includes('why') && (lowerMessage.includes('score') || lowerMessage.includes('higher') || lowerMessage.includes('better'))) {
    if (creatives.length === 0) {
      return "I don't see any variants generated yet. Once you generate or upload creatives, I can explain why certain variants score higher!";
    }
    
    // 🐛 DEBUG: Log what we're working with
    console.log('🔍 DEBUG - Why did this score higher:');
    console.log('activeAudienceTab:', activeAudienceTab);
    console.log('Total creatives:', creatives.length);
    console.log('Creatives targetAudiences:', creatives.map(c => c.targetAudience));
    
    // CRITICAL BUG FIX: Only compare variants for the CURRENT AUDIENCE TAB
    // Filter creatives by current audience tab
    const currentAudienceCreatives = activeAudienceTab 
      ? creatives.filter(c => c.targetAudience === activeAudienceTab)
      : creatives;
    
    console.log('Filtered creatives for current tab:', currentAudienceCreatives.length);
    console.log('Filtered creative names:', currentAudienceCreatives.map(c => c.name));
    
    // If no creatives found for this audience, inform user
    if (currentAudienceCreatives.length === 0) {
      const audienceName = formatAudienceName(activeAudienceTab);
      return `I don't see any variants for **${audienceName}** yet. Switch to a different audience tab or generate variants first!`;
    }
    
    // Sort ONLY the current audience's variants
    const sorted = [...currentAudienceCreatives].sort((a, b) => b.lcbm_score - a.lcbm_score);
    const top = sorted[0];
    const topScore = top?.lcbm_score || 0;
    
    console.log('Top variant for this audience:', top?.name, 'Score:', topScore);
    
    const audienceName = formatAudienceName(activeAudienceTab);
    
    let response = `**For ${audienceName}:**\n\n`;
    response += `The highest-scoring variant is **"${top?.name}"** with a score of **${topScore}**.\n\n`;
    
    response += `**Why it scores higher for THIS audience:**\n\n`;
    
    response += `1. **Audience Alignment (${Math.round(topScore * 10)}%)**\n`;
    if (top?.hook) {
      response += `The hook "${top.hook}" resonates strongly with ${audienceName}'s content preferences.\n\n`;
    } else {
      response += `Strong alignment with this audience's preferences and behavioral signals.\n\n`;
    }
    
    response += `2. **Visual Direction**\n`;
    response += `${top?.visual_direction || 'The visual approach matches what performs well with this audience segment.'}\n\n`;
    
    response += `3. **Copy Strategy**\n`;
    response += `${top?.copy_angle || 'The messaging angle addresses key decision triggers and pain points.'}\n\n`;
    
    response += `**Performance Edge:**\n`;
    response += `• Expected CTR: ${top?.predicted_performance?.ctr || 'N/A'}\n`;
    response += `• Engagement: ${top?.predicted_performance?.engagement || 'High'}\n`;
    response += `• Conversion lift: ${top?.predicted_performance?.conversion_lift || 'N/A'}\n\n`;
    
    if (sorted.length > 1) {
      response += `**Compared to "${sorted[1]?.name}" (${sorted[1]?.lcbm_score}):**\n`;
      response += topScore > sorted[1]?.lcbm_score + 0.3 
        ? `The difference comes down to stronger hook resonance and better audience-message fit for ${audienceName}.` 
        : `The difference is slight - both are strong performers with different angles for this audience.`;
    }
    
    return response;
  }
  
  // ==========================================
  // WHICH CREATIVE SHOULD I USE? (TAB-AWARE)
  // ==========================================
  if ((lowerMessage.includes('which') || lowerMessage.includes('what')) && 
      (lowerMessage.includes('use') || lowerMessage.includes('choose') || lowerMessage.includes('best') || lowerMessage.includes('recommend'))) {
    
    if (creatives.length === 0) {
      return "Generate or upload some creatives first, and I'll help you choose the best one!";
    }
    
    // CRITICAL: Only recommend from CURRENT AUDIENCE TAB
    const currentAudienceCreatives = activeAudienceTab 
      ? creatives.filter(c => c.targetAudience === activeAudienceTab)
      : creatives;
    
    // If no creatives found for this audience, inform user
    if (currentAudienceCreatives.length === 0) {
      const audienceName = formatAudienceName(activeAudienceTab);
      return `I don't see any variants for **${audienceName}** yet. Switch to a different audience tab or generate variants first!`;
    }
    
    const sorted = [...currentAudienceCreatives].sort((a, b) => b.lcbm_score - a.lcbm_score);
    const top = sorted[0];
    const secondBest = sorted[1];
    
    const audienceName = formatAudienceName(activeAudienceTab);
    
    let response = `**My recommendation for ${audienceName}: "${top?.name}"** 🏆\n\n`;
    
    response += `**Why this one?**\n`;
    response += `• Highest LCBM score for this audience: **${top?.lcbm_score}**\n`;
    response += `• ${top?.why_high_performing || 'Best audience fit and performance prediction'}\n\n`;
    
    response += `**What to look for:**\n`;
    response += `• Does the hook grab attention? ✓\n`;
    response += `• Does the visual match audience preferences? ✓\n`;
    response += `• Does the CTA match their decision stage? ✓\n\n`;
    
    response += `**Expected results:**\n`;
    response += `• CTR: ${top?.predicted_performance?.ctr || 'N/A'}\n`;
    response += `• Engagement: ${top?.predicted_performance?.engagement || 'High'}\n`;
    response += `• Conversion lift: ${top?.predicted_performance?.conversion_lift || 'N/A'}\n\n`;
    
    if (secondBest && Math.abs(top.lcbm_score - secondBest.lcbm_score) < 0.3) {
      response += `**Note:** "${secondBest.name}" (${secondBest.lcbm_score}) is very close in score. Both are strong options for this audience!`;
    }
    
    return response;
  }
  
  // ==========================================
  // WHY DO SCORES DIFFER BY AUDIENCE?
  // ==========================================
  if (lowerMessage.includes('different') || (lowerMessage.includes('why') && lowerMessage.includes('each audience'))) {
    return `**Why Scores Differ by Audience:**\n\nEach audience has unique preferences and behaviors, so the same creative approach scores differently:\n\n• **Performance Tracking Athletes** respond best to data-driven messaging and tech-forward visuals\n• **Morning Ritual Optimizers** prefer cozy, routine-focused imagery and convenience messaging\n• **Clean Beauty Advocates** look for transparency, natural ingredients, and botanical imagery\n\nA variant scoring 9.2 for one audience might score 8.4 for another based on what resonates with them!\n\n**Current tab:** ${formatAudienceName(activeAudienceTab)}\n**Completed:** ${completedCount}/${selectedAudienceCount} audiences`;
  }
  
  // ==========================================
  // HOW ARE SCORES CALCULATED? (TAB-AWARE)
  // ==========================================
  if (lowerMessage.includes('how') && (lowerMessage.includes('calculat') || lowerMessage.includes('score') || lowerMessage.includes('work'))) {
    const currentAudienceCreatives = activeAudienceTab 
      ? creatives.filter(c => c.targetAudience === activeAudienceTab)
      : creatives;
    
    const avgScore = currentAudienceCreatives.length > 0 
      ? (currentAudienceCreatives.reduce((sum, c) => sum + (c.lcbm_score || 0), 0) / currentAudienceCreatives.length).toFixed(1)
      : 0;
    
    let response = `LCBM (Likelihood to Change Belief or Mindset) scores range from **0-10**`;
    
    if (currentAudienceCreatives.length > 0) {
      response += `, with variants for **${formatAudienceName(activeAudienceTab)}** scoring **${avgScore} average**`;
    }
    
    response += `.\n\n**How it's calculated:**\n\n`;
    
    response += `**1. Audience Preference Matching (40%)**\n`;
    response += `• Analyzes **${formatAudienceName(activeAudienceTab)}'s** content affinities\n`;
    response += `• Matches creative hooks to what resonates with THEM specifically\n`;
    response += `• Considers their format preferences\n\n`;
    
    response += `**2. Persuasion Architecture (30%)**\n`;
    response += `• Hook strength for THIS audience\n`;
    response += `• Message-market fit\n`;
    response += `• CTA alignment with their decision stage\n\n`;
    
    response += `**3. Visual-Message Coherence (20%)**\n`;
    response += `• How well visuals support the message for THIS audience\n`;
    response += `• Brand consistency\n`;
    response += `• Attention-grabbing potential\n\n`;
    
    response += `**4. Predicted Performance Signals (10%)**\n`;
    response += `• Historical data from similar approaches with THIS audience type\n`;
    response += `• Cross-referenced with behavioral patterns\n\n`;
    
    response += `**What the scores mean:**\n`;
    response += `• **9.0-10:** Exceptional - Top 5%\n`;
    response += `• **8.5-8.9:** Excellent - Strong performer\n`;
    response += `• **8.0-8.4:** Very Good - Above average\n`;
    response += `• **7.5-7.9:** Good - Solid performance\n\n`;
    
    response += `**Remember:** Scores vary by audience! A 9.2 for one audience might be 8.6 for another.`;
    
    return response;
  }
  
  // ==========================================
  // HOOK STRATEGY EXPLANATION (TAB-AWARE)
  // ==========================================
  if (lowerMessage.includes('hook') || lowerMessage.includes('strategy') || lowerMessage.includes('explain')) {
    if (creatives.length === 0) {
      return "Generate some variants first and I'll break down the hook strategy for each one!";
    }
    
    const currentAudienceCreatives = activeAudienceTab 
      ? creatives.filter(c => c.targetAudience === activeAudienceTab)
      : creatives;
    
    const hooksExist = currentAudienceCreatives.some(c => c.hook);
    
    if (!hooksExist) {
      return "The current creatives don't have hooks defined. Generate AI variants to see strategic hook examples!";
    }
    
    let response = `**Hook Strategy for ${formatAudienceName(activeAudienceTab)}:**\n\n`;
    
    currentAudienceCreatives.slice(0, 4).forEach((creative, index) => {
      response += `**${creative.name}** (Score: ${creative.lcbm_score})\n`;
      response += `Hook: "${creative.hook}"\n\n`;
      
      response += `Strategy: `;
      const hookLower = creative.hook?.toLowerCase() || '';
      
      if (hookLower.includes('peak') || hookLower.includes('achieve') || hookLower.includes('data') || hookLower.includes('performance')) {
        response += 'Achievement-oriented hook targeting aspiration and results-driven mindset';
      } else if (hookLower.includes('everyday') || hookLower.includes('fits') || hookLower.includes('home') || hookLower.includes('space')) {
        response += 'Accessibility hook removing barriers and emphasizing ease of integration';
      } else if (hookLower.includes('tech') || hookLower.includes('science') || hookLower.includes('innovation') || hookLower.includes('future')) {
        response += 'Innovation hook positioning product as cutting-edge solution';
      } else if (hookLower.includes('join') || hookLower.includes('community') || hookLower.includes('team') || hookLower.includes('together')) {
        response += 'Social proof hook leveraging FOMO and community validation';
      } else {
        response += 'Value-driven hook emphasizing key product benefit';
      }
      
      response += `\n\nWhy it works for THIS audience: ${creative.why_high_performing || 'Aligns with their decision triggers'}\n\n`;
      
      if (index < currentAudienceCreatives.length - 1) {
        response += `---\n\n`;
      }
    });
    
    response += `\n**Remember:** Each audience responds to different hooks. That's why we create unique variants per audience!`;
    
    return response;
  }
  
  // ==========================================
  // FALLBACK - GENERAL CREATIVE INTELLIGENCE HELP
  // ==========================================
  return `🎨 **Creative Scoring - Per Audience:**\n\nYou're currently viewing variants for **${formatAudienceName(activeAudienceTab)}**.\n\n**Each audience gets:**\n• 4 unique variants optimized for their preferences\n• Scores based on THEIR behavioral patterns\n• Imagery matching THEIR content affinities\n\n**Your progress:**\n✅ ${completedCount} of ${selectedAudienceCount} audiences complete\n\n**Ask me:**\n• "Why does this variant score higher?"\n• "Which creative should I choose?"\n• "How do scores work?"\n• "What's the hook strategy?"`;
}

export default handleCreativeIntelligenceResponse;