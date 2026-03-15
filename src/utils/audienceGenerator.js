// Generate audiences based on product category
export const generateAudiences = (productData) => {
  const category = productData.category?.toLowerCase() || '';
  const productName = productData.productName || 'Product';
  const price = parseFloat(productData.price) || 50;
  const targetRegions = productData.targetRegions?.trim() || null;

  let list;
  if (category.includes('fitness') || category.includes('health') || category.includes('sport')) {
    list = getFitnessAudiences(productName, price);
  } else if (category.includes('beauty') || category.includes('skincare') || category.includes('cosmetic')) {
    list = getBeautyAudiences(productName, price);
  } else if (category.includes('food') || category.includes('beverage') || category.includes('drink') || category.includes('coffee')) {
    list = getBeverageAudiences(productName, price);
  } else {
    list = getGenericAudiences(productName, price);
  }

  return list.map((aud) => ({
    ...aud,
    region: targetRegions || 'Not specified'
  }));
};

// ==========================================
// GENERATED AUDIENCES (4 per category)
// ==========================================

const getFitnessAudiences = (productName, price) => [
  {
    id: 'performance_tracking_athletes',
    name: 'Performance Tracking Athletes',
    size: '3.1M',
    fit_score: 94,
    icon: '📊',
    demographics: 'Ages 25-45, Male-skewed (62%), $70K+ income, Data-driven',
    psychographics: 'Metrics-obsessed, track every workout, optimize performance through data, competitive mindset, continuous improvement focus',
    why_fit: `${productName} provides the precise tracking metrics and data insights this audience needs to optimize performance.`,
    content_affinities: [
      { name: 'Fitness Metrics & Analytics', strength: 97, reason: 'Core training philosophy' },
      { name: 'Performance Optimization', strength: 93, reason: 'Goal-oriented mindset' },
      { name: 'Wearable Tech Reviews', strength: 89, reason: 'Research before purchase' }
    ],
    behavioral_signals: [
      'Logs every workout in apps',
      'Tracks heart rate, calories, VO2 max',
      'Analyzes performance trends',
      'Owns multiple fitness tracking devices',
      'Shares workout stats on social media'
    ],
    recommended_messaging: 'Lead with accuracy specs, data features, performance metrics, app integration capabilities'
  },
  {
    id: 'home_workout_optimizers',
    name: 'Home Workout Optimizers',
    size: '5.8M',
    fit_score: 91,
    icon: '🏠',
    demographics: 'Ages 28-50, Balanced gender, $60K+ income, Efficiency-focused',
    psychographics: 'Value convenience, shifted to home workouts post-pandemic, seek space-efficient equipment, quality over quantity',
    why_fit: `${productName} fits perfectly into the efficient home workout setup this audience has carefully optimized.`,
    content_affinities: [
      { name: 'Home Workout Solutions', strength: 95, reason: 'Primary training environment' },
      { name: 'Compact Equipment', strength: 90, reason: 'Space constraints matter' },
      { name: 'Time-Efficient Fitness', strength: 87, reason: 'Maximize limited time' }
    ],
    behavioral_signals: [
      'Invested in home gym equipment',
      'Follows home workout influencers',
      'Uses fitness streaming apps (Peloton, Apple Fitness+)',
      'Purchases compact, versatile equipment',
      'Workouts 5-6 days per week at home'
    ],
    recommended_messaging: 'Emphasize space-saving design, versatility, home workout compatibility, app-guided workouts'
  },
  {
    id: 'marathon_endurance_runners',
    name: 'Marathon & Endurance Runners',
    size: '2.4M',
    fit_score: 90,
    icon: '🏃',
    demographics: 'Ages 28-55, Balanced gender, $65K+ income, Goal-driven',
    psychographics: 'Long-distance focused, dedicated training schedules, need accurate heart rate data, injury-prevention conscious',
    why_fit: `${productName} delivers the accurate heart rate monitoring and endurance metrics marathon training demands.`,
    content_affinities: [
      { name: 'Marathon Training', strength: 96, reason: 'Core athletic goal' },
      { name: 'Heart Rate Zone Training', strength: 92, reason: 'Critical for pacing' },
      { name: 'Running Community', strength: 88, reason: 'Social motivation' }
    ],
    behavioral_signals: [
      'Training for marathon or half-marathon',
      'Runs 30+ miles per week',
      'Monitors heart rate zones during runs',
      'Member of running clubs or groups',
      'Researches running gear extensively'
    ],
    recommended_messaging: 'Highlight heart rate accuracy, GPS tracking, long battery life for extended runs, marathon training features'
  },
  {
    id: 'fitness_tech_early_adopters',
    name: 'Fitness Tech Early Adopters',
    size: '2.9M',
    fit_score: 89,
    icon: '⚡',
    demographics: 'Ages 24-42, Tech-savvy, $70K+ income, Innovation-focused',
    psychographics: 'First to try new gadgets, high engagement with tech features, app ecosystem important, willing to pay for latest tech',
    why_fit: `${productName} offers the cutting-edge features and seamless app integration early adopters expect from fitness tech.`,
    content_affinities: [
      { name: 'Fitness Tech Innovation', strength: 94, reason: 'Seek latest features' },
      { name: 'App Integrations', strength: 91, reason: 'Ecosystem matters' },
      { name: 'Smart Device Reviews', strength: 87, reason: 'Research new releases' }
    ],
    behavioral_signals: [
      'Owns latest fitness gadgets',
      'Early adopter of fitness apps',
      'Syncs data across multiple platforms',
      'Watches tech review videos',
      'Upgrades devices frequently'
    ],
    recommended_messaging: 'Lead with newest features, app compatibility, AI/ML capabilities, firmware updates, innovation angle'
  }
];

const getBeautyAudiences = (productName, price) => [
  { 
    id: 'clean_beauty_advocates',
    name: 'Clean Beauty Advocates',
    size: '4.2M',
    fit_score: 93,
    icon: '🌿',
    demographics: 'Ages 25-42, Female-skewed (78%), $60K+ income, Health-conscious',
    psychographics: 'Ingredient-aware, research-driven, prioritize health and safety, distrust synthetic chemicals, willing to pay more for clean formulas',
    why_fit: `${productName} meets the ingredient transparency and clean formulation standards this audience requires.`,
    content_affinities: [
      { name: 'Clean Beauty Movement', strength: 97, reason: 'Core identity and values' },
      { name: 'Ingredient Education', strength: 93, reason: 'Research before buying' },
      { name: 'Non-Toxic Living', strength: 89, reason: 'Lifestyle alignment' }
    ],
    behavioral_signals: [
      'Reads ingredient lists thoroughly',
      'Follows clean beauty influencers',
      'Uses apps like Think Dirty or EWG',
      'Avoids parabens, sulfates, phthalates',
      'Shares ingredient awareness content'
    ],
    recommended_messaging: 'Lead with ingredient transparency, highlight what\'s NOT in the product, emphasize safety certifications'
  },
  {
    id: 'anti_aging_solution_seekers',
    name: 'Anti-Aging Solution Seekers',
    size: '5.1M',
    fit_score: 91,
    icon: '✨',
    demographics: 'Ages 35-55, Female-skewed (82%), $70K+ income, Results-focused',
    psychographics: 'Goal-oriented, track visible improvements, higher price tolerance for efficacy, trust clinical backing, willing to invest in appearance',
    why_fit: `${productName} delivers the clinically-proven results and visible improvements this audience actively seeks.`,
    content_affinities: [
      { name: 'Anti-Aging Solutions', strength: 96, reason: 'Primary skincare goal' },
      { name: 'Clinical Studies & Proof', strength: 92, reason: 'Require evidence of efficacy' },
      { name: 'Before & After Results', strength: 88, reason: 'Visual proof matters' }
    ],
    behavioral_signals: [
      'Researches anti-aging ingredients (retinol, hyaluronic acid, vitamin C)',
      'Reads clinical study results',
      'Follows dermatologists on social media',
      'Willing to spend $80+ on serums',
      'Tracks skin improvements over time'
    ],
    recommended_messaging: 'Emphasize clinical results, before/after timelines, key anti-aging ingredients, and visible improvements'
  },
  {
    id: 'skincare_routine_enthusiasts',
    name: 'Skincare Routine Enthusiasts',
    size: '3.9M',
    fit_score: 90,
    icon: '💆',
    demographics: 'Ages 22-38, Female-skewed (85%), $55K+ income, Routine-oriented',
    psychographics: 'Multi-step routine followers, influenced by K-beauty, enjoy the ritual, high engagement with beauty content, community-oriented',
    why_fit: `${productName} fits perfectly into the multi-step routines this audience has carefully built.`,
    content_affinities: [
      { name: 'Multi-Step Skincare', strength: 95, reason: '10-step routines common' },
      { name: 'K-Beauty Trends', strength: 91, reason: 'Innovation early adopters' },
      { name: 'Skincare Communities', strength: 87, reason: 'Share routines and tips' }
    ],
    behavioral_signals: [
      'Uses 5+ skincare products daily',
      'Follows skincare Reddit/TikTok',
      'Posts routine photos on social media',
      'Tries new products regularly',
      'Engages with beauty community content'
    ],
    recommended_messaging: 'Show where product fits in routine, compatible with other products, step-by-step usage guide'
  },
  {
    id: 'dermatologist_recommended_users',
    name: 'Dermatologist-Recommended Product Users',
    size: '3.4M',
    fit_score: 89,
    icon: '🔬',
    demographics: 'Ages 28-50, Female-skewed (76%), $65K+ income, Science-oriented',
    psychographics: 'Trust medical expertise, prefer science-backed products, skeptical of marketing claims, willing to pay for proven formulas',
    why_fit: `${productName} offers the clinical validation and dermatologist-backing this audience requires before purchase.`,
    content_affinities: [
      { name: 'Dermatologist Content', strength: 94, reason: 'Trust medical authority' },
      { name: 'Scientific Skincare', strength: 90, reason: 'Evidence-based approach' },
      { name: 'Medical-Grade Products', strength: 86, reason: 'Premium efficacy' }
    ],
    behavioral_signals: [
      'Follows board-certified dermatologists',
      'Researches active ingredients and concentrations',
      'Purchases from medical spas or dermatology offices',
      'Skeptical of influencer recommendations',
      'Values peer-reviewed research'
    ],
    recommended_messaging: 'Lead with dermatologist endorsements, clinical data, active ingredient percentages, medical-grade quality'
  }
];

const getBeverageAudiences = (productName, price) => [
  {
    id: 'specialty_coffee_connoisseurs',
    name: 'Specialty Coffee Connoisseurs',
    size: '2.6M',
    fit_score: 92,
    icon: '☕',
    demographics: 'Ages 28-45, Urban professionals, $75K+ income, College educated',
    psychographics: 'Quality-obsessed, appreciate craftsmanship, willing to pay premium, view coffee as an experience not just a beverage',
    why_fit: `${productName} delivers the origin story and quality standards this audience demands from specialty coffee.`,
    content_affinities: [
      { name: 'Specialty Coffee Culture', strength: 96, reason: 'Core identity and lifestyle' },
      { name: 'Brewing Techniques', strength: 92, reason: 'Deep process appreciation' },
      { name: 'Bean Origin Stories', strength: 89, reason: 'Values transparency and provenance' }
    ],
    behavioral_signals: [
      'Purchases single-origin beans regularly',
      'Owns pour-over, French press, or espresso equipment',
      'Follows specialty coffee roasters on Instagram',
      'Reads coffee tasting notes',
      'Visits local coffee shops 3+ times per week'
    ],
    recommended_messaging: 'Emphasize bean origin, roasting process, tasting notes, and craft approach'
  },
  {
    id: 'morning_ritual_optimizers',
    name: 'Morning Ritual Optimizers',
    size: '4.1M',
    fit_score: 90,
    icon: '🌅',
    demographics: 'Ages 25-40, Working professionals, $60K+ income, Time-conscious',
    psychographics: 'Routine-driven, value consistency and reliability, seek efficiency without sacrificing quality, optimize daily habits',
    why_fit: `${productName} fits seamlessly into the morning routine this audience has carefully optimized.`,
    content_affinities: [
      { name: 'Morning Routines', strength: 94, reason: 'Core daily ritual' },
      { name: 'Productivity Hacks', strength: 88, reason: 'Optimize efficiency' },
      { name: 'Quality Coffee at Home', strength: 86, reason: 'Convenience + quality balance' }
    ],
    behavioral_signals: [
      'Purchases coffee in bulk/subscription',
      'Brews coffee same time every morning',
      'Uses automated coffee makers or timers',
      'Engages with productivity content',
      'Values convenience without compromise'
    ],
    recommended_messaging: 'Highlight consistency, reliable quality, subscription options, and time-saving convenience'
  },
  {
    id: 'artisan_food_explorers',
    name: 'Artisan Food Explorers',
    size: '3.2M',
    fit_score: 89,
    icon: '🎨',
    demographics: 'Ages 26-42, Urban/suburban, $65K+ income, Adventurous palate',
    psychographics: 'Experimental, seek unique flavors, appreciate artisan products, willing to try new things, value discovery',
    why_fit: `${productName} offers the unique flavor profiles and artisan quality this audience actively seeks out.`,
    content_affinities: [
      { name: 'Artisan Food Products', strength: 93, reason: 'Core shopping behavior' },
      { name: 'Flavor Exploration', strength: 90, reason: 'Seek new taste experiences' },
      { name: 'Small-Batch Production', strength: 85, reason: 'Value craftsmanship over mass production' }
    ],
    behavioral_signals: [
      'Shops at farmers markets and specialty stores',
      'Tries new coffee flavors regularly',
      'Follows food bloggers and influencers',
      'Purchases limited-edition products',
      'Cross-shops artisan chocolate, cheese, wine'
    ],
    recommended_messaging: 'Emphasize unique flavor notes, small-batch roasting, limited availability, and artisan craft'
  },
  {
    id: 'sustainable_living_advocates',
    name: 'Sustainable Living Advocates',
    size: '3.8M',
    fit_score: 88,
    icon: '🌱',
    demographics: 'Ages 24-45, Eco-conscious, $55K+ income, Values-driven',
    psychographics: 'Environmentally responsible, prioritize ethical sourcing, willing to pay more for sustainability, align purchases with values',
    why_fit: `${productName} aligns with the environmental and ethical values this audience prioritizes in every purchase.`,
    content_affinities: [
      { name: 'Sustainable Living', strength: 95, reason: 'Core value system' },
      { name: 'Fair Trade & Ethical Sourcing', strength: 91, reason: 'Purchase requirement' },
      { name: 'Environmental Impact', strength: 88, reason: 'Decision-making factor' }
    ],
    behavioral_signals: [
      'Seeks organic and fair-trade certifications',
      'Researches company sustainability practices',
      'Follows eco-conscious brands',
      'Uses reusable cups and containers',
      'Shares content about environmental issues'
    ],
    recommended_messaging: 'Highlight sustainable farming practices, fair-trade partnerships, eco-friendly packaging, and carbon footprint'
  }
];

const getGenericAudiences = (productName, price) => [
  {
    id: 'early_adopters',
    name: 'Early Adopters',
    size: '2.1M',
    fit_score: 90,
    icon: '🚀',
    demographics: 'Adults 25-42, tech-forward',
    psychographics: 'Innovation-seeking, willing to try new, influence others',
    why_fit: `${productName} appeals to this audience's desire for new and innovative products.`,
    content_affinities: [
      { name: 'Product Launches', strength: 94, reason: 'First to know' },
      { name: 'Innovation Content', strength: 91, reason: 'Novelty-driven' },
      { name: 'Review Content', strength: 88, reason: 'Research but adopt early' }
    ],
    behavioral_signals: ['Early product adopter', 'Shares discoveries', 'Influences peer purchases'],
    recommended_messaging: 'New innovation, first access, cutting-edge'
  },
  {
    id: 'quality_seekers',
    name: 'Quality-Focused Buyers',
    size: '2.8M',
    fit_score: 88,
    icon: '⭐',
    demographics: 'Adults 30-55, established professionals',
    psychographics: 'Value quality over price, research-heavy, brand loyal',
    why_fit: `${productName} meets the quality standards this audience demands.`,
    content_affinities: [
      { name: 'Product Reviews', strength: 93, reason: 'Thorough research' },
      { name: 'Quality Comparisons', strength: 90, reason: 'Evaluates options' },
      { name: 'Expert Opinions', strength: 87, reason: 'Authority validation' }
    ],
    behavioral_signals: ['Reads multiple reviews', 'Premium buyer', 'Brand loyalty'],
    recommended_messaging: 'Superior quality, proven performance, worth the investment'
  },
  {
    id: 'value_conscious',
    name: 'Value-Conscious Shoppers',
    size: '3.5M',
    fit_score: 84,
    icon: '💰',
    demographics: 'Adults 25-50, budget-aware',
    psychographics: 'Seeks value, compares options, practical mindset',
    why_fit: `${productName} offers strong value proposition for price point.`,
    content_affinities: [
      { name: 'Price Comparisons', strength: 92, reason: 'Budget-driven' },
      { name: 'Value Content', strength: 89, reason: 'ROI focused' },
      { name: 'Deals & Discounts', strength: 86, reason: 'Savings-oriented' }
    ],
    behavioral_signals: ['Compares prices', 'Uses coupon codes', 'Waits for sales'],
    recommended_messaging: 'Best value, competitive pricing, smart investment'
  },
  {
    id: 'brand_loyalists',
    name: 'Brand Loyalists',
    size: '1.9M',
    fit_score: 86,
    icon: '💙',
    demographics: 'Adults 28-55, established preferences',
    psychographics: 'Loyal to trusted brands, repeat purchase, advocates',
    why_fit: `${productName} can build long-term loyalty with this audience.`,
    content_affinities: [
      { name: 'Brand Content', strength: 94, reason: 'Following favorites' },
      { name: 'Community Content', strength: 88, reason: 'Brand community member' },
      { name: 'Behind-the-Scenes', strength: 85, reason: 'Connection to brand' }
    ],
    behavioral_signals: ['Repeat purchaser', 'Recommends to others', 'Engages with brand'],
    recommended_messaging: 'Join our community, trusted quality, built to last'
  }
];

// ==========================================
// EXISTING AUDIENCES (4 per category)
// ==========================================

// ✅ FIXED: Now checks category and returns appropriate existing audiences
export const generateExistingAudiences = (productData) => {
  const category = productData.category?.toLowerCase() || '';
  const existingCustomers = parseInt(productData.existingCustomers) || 0;
  
  // ✅ Route to category-specific existing audiences
  if (category.includes('fitness') || category.includes('health') || category.includes('sport')) {
    return getFitnessExistingAudiences();
  } else if (category.includes('beauty') || category.includes('skincare') || category.includes('cosmetic')) {
    return getBeautyExistingAudiences();
  } else if (category.includes('food') || category.includes('beverage') || category.includes('drink') || category.includes('coffee')) {
    return getCoffeeExistingAudiences();
  } else {
    return getGenericExistingAudiences();
  }
};

// COFFEE EXISTING AUDIENCES
const getCoffeeExistingAudiences = () => [
  {
    id: 'local_coffee_shop_regulars',
    name: 'Local Coffee Shop Regulars',
    size: '1.2M',
    type: 'retargeting',
    icon: '🏪',
    demographics: 'Ages 25-50, Urban dwellers, Previous site visitors, Coffee enthusiasts',
    psychographics: 'Community-oriented, appreciate local businesses, seek authentic experiences, brand curious',
    why_fit: 'Already expressed interest in your coffee by visiting your website and engaging with product pages.',
    content_affinities: [
      { name: 'Local Coffee Culture', strength: 89, reason: 'Support local businesses' },
      { name: 'Community Gathering Spaces', strength: 84, reason: 'Social coffee experience' },
      { name: 'Coffee Shop Ambiance', strength: 82, reason: 'Environment matters' }
    ],
    behavioral_signals: [
      'Visited product pages 2+ times',
      'Spent 3+ minutes on site',
      'Engaged with coffee content',
      'Added items to cart (may not have purchased)',
      'Follows local coffee shops on social media'
    ],
    recommended_messaging: 'Remind of products they viewed, offer first-time buyer discount, emphasize local/small-batch quality'
  },
  {
    id: 'barista_equipment_enthusiasts',
    name: 'Barista Equipment Enthusiasts',
    size: '2.8M',
    type: 'lookalike',
    icon: '⚙️',
    demographics: 'Ages 28-50, Home barista hobbyists, $70K+ income, Equipment investors',
    psychographics: 'Perfectionist, technical knowledge of brewing, view coffee as craft, invest in quality equipment, continuous improvement mindset',
    why_fit: 'Behaviorally similar to your best customers who appreciate quality beans to match their quality equipment.',
    content_affinities: [
      { name: 'Espresso Techniques', strength: 94, reason: 'Master their craft' },
      { name: 'Coffee Equipment Reviews', strength: 91, reason: 'Research before buying' },
      { name: 'Latte Art & Presentation', strength: 86, reason: 'Aesthetic appreciation' }
    ],
    behavioral_signals: [
      'Owns espresso machine, grinder, or pour-over setup',
      'Watches coffee tutorial videos',
      'Engages with barista content and forums',
      'Purchases premium coffee accessories',
      'Experiments with different brewing methods'
    ],
    recommended_messaging: 'Technical details about beans, brewing recommendations, pair with their equipment, highlight flavor complexity'
  },
  {
    id: 'subscription_coffee_members',
    name: 'Subscription Coffee Members',
    size: '3.5M',
    type: 'interest',
    icon: '📦',
    demographics: 'Ages 26-45, Convenience-seekers, $65K+ income, Monthly recurring buyers',
    psychographics: 'Value convenience, open to discovery, prefer autopilot for necessities, high retention once satisfied, quality-conscious',
    why_fit: 'Already subscribe to coffee services, showing they value convenience and are open to switching for better quality.',
    content_affinities: [
      { name: 'Coffee Subscriptions', strength: 92, reason: 'Current behavior pattern' },
      { name: 'Curated Discoveries', strength: 87, reason: 'Enjoy trying new varieties' },
      { name: 'Hassle-Free Shopping', strength: 85, reason: 'Value convenience' }
    ],
    behavioral_signals: [
      'Active coffee subscription member',
      'Monthly recurring purchases',
      'Opens emails from coffee brands',
      'Tries different varieties regularly',
      'Values automated deliveries'
    ],
    recommended_messaging: 'Emphasize subscription benefits, variety options, hassle-free delivery, and easy cancellation'
  },
  {
    id: 'premium_beverage_buyers',
    name: 'Premium Beverage Buyers',
    size: '2.9M',
    type: 'custom',
    icon: '🥃',
    demographics: 'Ages 30-55, High AOV customers, $80K+ income, Quality-over-price mindset',
    psychographics: 'Appreciate craftsmanship across categories, willing to pay premium for quality, view beverages as lifestyle choices, collector mentality',
    why_fit: 'Cross-shop premium beverages like craft beer and wine, showing appreciation for quality that extends to coffee.',
    content_affinities: [
      { name: 'Craft Beverages', strength: 90, reason: 'Appreciate artisan production' },
      { name: 'Tasting & Pairing', strength: 88, reason: 'Sophisticated palate' },
      { name: 'Premium Lifestyle', strength: 84, reason: 'Quality is status signal' }
    ],
    behavioral_signals: [
      'Purchases craft beer, wine, or spirits',
      'High average order value ($50+)',
      'Reads tasting notes and reviews',
      'Collects or trades premium products',
      'Attends tasting events or classes'
    ],
    recommended_messaging: 'Position as premium product, compare to wine/spirits quality, emphasize rarity and limited batches'
  }
];

// BEAUTY EXISTING AUDIENCES
const getBeautyExistingAudiences = () => [
  {
    id: 'beauty_quiz_completers',
    name: 'Beauty Quiz Completers',
    size: '1.8M',
    type: 'retargeting',
    icon: '📝',
    demographics: 'Ages 24-45, Engaged site visitors, Personalization-seekers',
    psychographics: 'Want personalized recommendations, high purchase intent, invested time in discovery, open to guidance',
    why_fit: 'Completed your skin type quiz, showing high interest and readiness for personalized product recommendations.',
    content_affinities: [
      { name: 'Personalized Beauty', strength: 92, reason: 'Took time for quiz' },
      { name: 'Skin Type Solutions', strength: 88, reason: 'Seeking targeted products' },
      { name: 'Product Discovery', strength: 84, reason: 'Open to recommendations' }
    ],
    behavioral_signals: [
      'Completed full skin type quiz',
      'Spent 5+ minutes on site',
      'Viewed recommended products',
      'May have saved quiz results',
      'High purchase intent signals'
    ],
    recommended_messaging: 'Reference their quiz results, personalized product recommendations, limited-time offer for quiz completers'
  },
  {
    id: 'premium_skincare_shoppers',
    name: 'Premium Skincare Shoppers',
    size: '3.2M',
    type: 'lookalike',
    icon: '💎',
    demographics: 'Ages 30-55, VIP customer lookalikes, $80K+ income, Quality-focused',
    psychographics: 'Invest heavily in skincare, brand loyal when satisfied, view skincare as self-care investment, quality over price',
    why_fit: 'Similar to your highest-value customers who appreciate premium quality and are willing to invest in results.',
    content_affinities: [
      { name: 'Luxury Skincare', strength: 93, reason: 'Premium positioning' },
      { name: 'Self-Care Rituals', strength: 89, reason: 'Skincare as indulgence' },
      { name: 'High-End Beauty Brands', strength: 87, reason: 'Brand conscious' }
    ],
    behavioral_signals: [
      'Purchases $80+ skincare products regularly',
      'High lifetime value potential',
      'Brand loyal to premium brands',
      'Follows luxury beauty content',
      'Values packaging and experience'
    ],
    recommended_messaging: 'Emphasize premium quality, luxury experience, exclusive formulations, VIP benefits'
  },
  {
    id: 'sephora_ulta_shoppers',
    name: 'Sephora & Ulta Shoppers',
    size: '6.2M',
    type: 'interest',
    icon: '🛍️',
    demographics: 'Ages 22-50, Female-skewed (88%), Beauty retail shoppers, Variety-seekers',
    psychographics: 'Enjoy in-store discovery, try before buying, influenced by staff recommendations, frequent beauty purchasers',
    why_fit: 'Active beauty shoppers at premium retailers, showing they invest in quality products and are open to new brands.',
    content_affinities: [
      { name: 'Beauty Retail Shopping', strength: 91, reason: 'Regular shopping behavior' },
      { name: 'New Product Launches', strength: 88, reason: 'Early adopters' },
      { name: 'Beauty Rewards Programs', strength: 85, reason: 'Loyalty members' }
    ],
    behavioral_signals: [
      'Shops at Sephora or Ulta monthly',
      'Member of beauty rewards programs',
      'Tries samples before purchasing',
      'Follows new product launches',
      'Engages with in-store events'
    ],
    recommended_messaging: 'Highlight availability at premium retailers, compare to bestsellers, mention tester/sample availability'
  },
  {
    id: 'influencer_driven_beauty_buyers',
    name: 'Influencer-Driven Beauty Buyers',
    size: '4.7M',
    type: 'custom',
    icon: '📱',
    demographics: 'Ages 20-35, Social media active, $45K+ income, Trend-conscious',
    psychographics: 'Trust social proof over ads, follow beauty influencers, make purchases based on recommendations, FOMO-driven',
    why_fit: 'Purchase decisions influenced by trusted creators who can authentically showcase your product benefits.',
    content_affinities: [
      { name: 'Beauty Influencer Content', strength: 94, reason: 'Primary discovery channel' },
      { name: 'Product Reviews & Demos', strength: 90, reason: 'Need to see it work' },
      { name: 'Get Ready With Me', strength: 86, reason: 'Real-world application' }
    ],
    behavioral_signals: [
      'Follows 10+ beauty influencers',
      'Engages with sponsored beauty content',
      'Uses discount codes from creators',
      'Purchases products seen on social media',
      'Watches beauty tutorial videos regularly'
    ],
    recommended_messaging: 'Feature influencer testimonials, user-generated content, social proof, limited creator codes'
  }
];

// FITNESS EXISTING AUDIENCES
const getFitnessExistingAudiences = () => [
  {
    id: 'product_page_visitors',
    name: 'Product Page Visitors',
    size: '1.5M',
    type: 'retargeting',
    icon: '👁️',
    demographics: 'Ages 25-50, High-intent visitors, Research phase',
    psychographics: 'Comparison shoppers, evaluating options, high purchase intent, need final push to convert',
    why_fit: 'Viewed your fitness tracker multiple times, showing strong interest and active consideration.',
    content_affinities: [
      { name: 'Fitness Tracker Comparisons', strength: 90, reason: 'Research mode' },
      { name: 'Product Reviews', strength: 87, reason: 'Seeking validation' },
      { name: 'Unboxing & First Impressions', strength: 83, reason: 'Want to see it in action' }
    ],
    behavioral_signals: [
      'Viewed product page 3+ times',
      'Spent 5+ minutes reviewing specs',
      'Compared features with competitors',
      'May have abandoned cart',
      'Reads customer reviews'
    ],
    recommended_messaging: 'Reminder of features they viewed, limited-time discount, customer testimonials, comparison advantages'
  },
  {
    id: 'competitive_fitness_community',
    name: 'Competitive Fitness Community',
    size: '2.2M',
    type: 'lookalike',
    icon: '🏆',
    demographics: 'Ages 26-48, Active competitors, $65K+ income, Performance-driven',
    psychographics: 'Competitive mindset, participate in fitness events, community-oriented, high brand advocacy potential when satisfied',
    why_fit: 'Similar to your most engaged customers who compete in fitness events and advocate for quality gear.',
    content_affinities: [
      { name: 'Fitness Competitions', strength: 93, reason: 'Active participants' },
      { name: 'Training Programs', strength: 89, reason: 'Structured approach' },
      { name: 'Athlete Communities', strength: 86, reason: 'Social training' }
    ],
    behavioral_signals: [
      'Participates in CrossFit, Spartan races, or triathlons',
      'High workout frequency (6-7 days/week)',
      'Member of fitness communities',
      'Posts workout achievements',
      'Brand loyal when product performs'
    ],
    recommended_messaging: 'Highlight competition-ready features, durability under stress, community features, athlete endorsements'
  },
  {
    id: 'gym_membership_holders',
    name: 'Gym Membership Holders',
    size: '7.3M',
    type: 'interest',
    icon: '🏋️',
    demographics: 'Ages 22-55, Active gym-goers, $55K+ income, Routine exercisers',
    psychographics: 'Committed to fitness routine, invest in gym memberships, gear-conscious, value performance tracking during workouts',
    why_fit: 'Active gym members who need reliable tracking for varied workout types from cardio to strength training.',
    content_affinities: [
      { name: 'Gym Workouts', strength: 92, reason: 'Primary training location' },
      { name: 'Workout Programs', strength: 88, reason: 'Follow structured plans' },
      { name: 'Fitness Gear', strength: 85, reason: 'Invest in equipment' }
    ],
    behavioral_signals: [
      'Active gym membership (CrossFit, F45, Equinox, 24 Hour Fitness)',
      'Workout 4-6 times per week',
      'Uses fitness tracking apps',
      'Follows gym-based influencers',
      'Purchases workout gear regularly'
    ],
    recommended_messaging: 'Gym-compatible features, sweat/water resistance, workout variety tracking, strength + cardio modes'
  },
  {
    id: 'wearable_tech_upgraders',
    name: 'Wearable Tech Upgraders',
    size: '4.1M',
    type: 'custom',
    icon: '⌚',
    demographics: 'Ages 28-52, Current device owners, $70K+ income, Upgrade-ready',
    psychographics: 'Own older fitness trackers, ready for next generation, comparison shoppers, feature-driven decision makers',
    why_fit: 'Currently own Fitbit, Apple Watch, or Garmin but ready to upgrade to better features and performance.',
    content_affinities: [
      { name: 'Fitness Tracker Upgrades', strength: 94, reason: 'Actively shopping' },
      { name: 'Device Comparisons', strength: 91, reason: 'Evaluating options' },
      { name: 'New Features & Tech', strength: 87, reason: 'Want improvements' }
    ],
    behavioral_signals: [
      'Owns Fitbit, Apple Watch, Garmin, or similar',
      'Device is 2+ years old',
      'Researching new models',
      'Reads "vs" comparison articles',
      'Looking for feature improvements'
    ],
    recommended_messaging: 'Compare to their current device, highlight new features, trade-in/upgrade incentives, migration ease'
  }
];

// GENERIC EXISTING AUDIENCES (fallback)
const getGenericExistingAudiences = () => [
  {
    id: 'website_retargeting',
    name: 'Website Visitors',
    size: '2.0M',
    type: 'retargeting',
    icon: '🌐',
    demographics: 'Previous site visitors, varied demographics',
    psychographics: 'Showed interest, researching options, consideration phase',
    why_fit: 'Already familiar with your brand from previous website visits.',
    content_affinities: [
      { name: 'Product Research', strength: 88, reason: 'Active consideration' },
      { name: 'Brand Content', strength: 84, reason: 'Learning about you' },
      { name: 'Customer Reviews', strength: 82, reason: 'Social proof seeking' }
    ],
    behavioral_signals: [
      'Visited site 2+ times',
      'Viewed product pages',
      'May have engaged with content',
      'Brand aware',
      'Consideration phase'
    ],
    recommended_messaging: 'Reminder of what they viewed, limited-time offer, customer testimonials'
  },
  {
    id: 'customer_lookalike',
    name: 'Customer Lookalikes',
    size: '3.5M',
    type: 'lookalike',
    icon: '👥',
    demographics: 'Similar to your best customers',
    psychographics: 'Similar behaviors and interests to your current customers',
    why_fit: 'Behavioral patterns match your existing customer base.',
    content_affinities: [
      { name: 'Similar Interests', strength: 89, reason: 'Matched behaviors' },
      { name: 'Related Products', strength: 86, reason: 'Cross-shopping patterns' },
      { name: 'Lifestyle Alignment', strength: 83, reason: 'Demographic match' }
    ],
    behavioral_signals: [
      'Similar purchase history',
      'Comparable demographics',
      'Matched interest signals',
      'Similar content consumption',
      'High conversion potential'
    ],
    recommended_messaging: 'Products similar customers love, new customer offer, testimonials from similar buyers'
  },
  {
    id: 'interest_based',
    name: 'Interest-Based Audience',
    size: '4.2M',
    type: 'interest',
    icon: '🎯',
    demographics: 'Interested in related products/categories',
    psychographics: 'Actively seeking solutions in your category',
    why_fit: 'Showing active interest in products like yours.',
    content_affinities: [
      { name: 'Category Content', strength: 90, reason: 'Active interest' },
      { name: 'Solution Seeking', strength: 87, reason: 'Problem awareness' },
      { name: 'Product Discovery', strength: 84, reason: 'Research mode' }
    ],
    behavioral_signals: [
      'Engages with category content',
      'Searches for solutions',
      'Compares options',
      'Active discovery phase',
      'Open to new brands'
    ],
    recommended_messaging: 'How you solve their problem, competitive advantages, risk-free trial'
  },
  {
    id: 'custom_segment',
    name: 'High-Value Prospects',
    size: '2.8M',
    type: 'custom',
    icon: '💎',
    demographics: 'Premium buyer profile',
    psychographics: 'Higher income, quality-focused, willing to invest',
    why_fit: 'Matches profile of high-value customers.',
    content_affinities: [
      { name: 'Premium Products', strength: 91, reason: 'Quality preference' },
      { name: 'Value Justification', strength: 88, reason: 'ROI focused' },
      { name: 'Brand Reputation', strength: 85, reason: 'Trust matters' }
    ],
    behavioral_signals: [
      'Premium price tolerance',
      'Quality-over-price mindset',
      'Research before buying',
      'Brand conscious',
      'High lifetime value potential'
    ],
    recommended_messaging: 'Premium positioning, quality differentiation, value justification, brand credentials'
  }
];

// Calculate crossover metrics
export const calculateCrossover = (productData) => {
  const existingCustomers = parseInt(productData.existingCustomers) || 0;
  const price = parseFloat(productData.price) || 50;
  
  // Higher price = lower crossover rate
  let crossoverRate = 0.35;
  if (price > 100) crossoverRate = 0.15;
  else if (price > 50) crossoverRate = 0.25;
  
  const crossoverCount = Math.round(existingCustomers * crossoverRate);
  
  return {
    rate: crossoverRate,
    count: crossoverCount,
    fitScore: 87 + Math.floor(Math.random() * 6)
  };
};