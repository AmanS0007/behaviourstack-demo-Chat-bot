// ==========================================
// 🎨 CREATIVE VARIANT GENERATOR
// Enhanced with real images per template
// ==========================================

// Template-specific image sets
const CREATIVE_ASSETS = {
  // 💪 FITNESS TEMPLATE
  fitness: {
    variant1: {
      images: [
        {
          id: 'hero1',
          url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Premium smartwatch on athletic wrist, running at sunrise'
        },
        {
          id: 'lifestyle1',
          url: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=800&h=600&fit=crop&q=80',
          type: 'Lifestyle',
          description: 'Person running outdoors, dynamic motion'
        }
      ],
      video: {
        id: 'video1',
        url: 'https://videos.pexels.com/video-files/3044127/3044127-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80',
        duration: '0:30'
      }
    },
    variant2: {
      images: [
        {
          id: 'hero2',
          url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Person checking fitness watch in urban setting'
        },
        {
          id: 'lifestyle2',
          url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80',
          type: 'Lifestyle',
          description: 'Casual gym workout, approachable vibe'
        }
      ],
      video: {
        id: 'video2',
        url: 'https://videos.pexels.com/video-files/4662346/4662346-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&h=600&fit=crop&q=80',
        duration: '0:20'
      }
    },
    variant3: {
      images: [
        {
          id: 'hero3',
          url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Futuristic fitness tech, LED display'
        },
        {
          id: 'tech3',
          url: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&h=600&fit=crop&q=80',
          type: 'Tech Detail',
          description: 'Close-up of fitness data on screen'
        }
      ],
      video: {
        id: 'video3',
        url: 'https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop&q=80',
        duration: '0:25'
      }
    },
    variant4: {
      images: [
        {
          id: 'hero4',
          url: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Diverse group working out together'
        },
        {
          id: 'community4',
          url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&q=80',
          type: 'Community',
          description: 'Team high-fiving after workout'
        }
      ],
      video: {
        id: 'video4',
        url: 'https://videos.pexels.com/video-files/3044923/3044923-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=800&h=600&fit=crop&q=80',
        duration: '0:30'
      }
    }
  },

  // ✨ BEAUTY TEMPLATE
  beauty: {
    variant1: {
      images: [
        {
          id: 'hero1',
          url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Elegant beauty product with natural elements'
        },
        {
          id: 'lifestyle1',
          url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=600&fit=crop&q=80',
          type: 'Lifestyle',
          description: 'Woman applying skincare, natural light'
        }
      ],
      video: {
        id: 'video1',
        url: 'https://videos.pexels.com/video-files/3997908/3997908-uhd_2560_1440_24fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop&q=80',
        duration: '0:20'
      }
    },
    variant2: {
      images: [
        {
          id: 'hero2',
          url: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Premium beauty product, luxe setting'
        },
        {
          id: 'lifestyle2',
          url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop&q=80',
          type: 'Lifestyle',
          description: 'Elegant skincare display'
        }
      ],
      video: {
        id: 'video2',
        url: 'https://videos.pexels.com/video-files/5750017/5750017-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=600&fit=crop&q=80',
        duration: '0:15'
      }
    },
    variant3: {
      images: [
        {
          id: 'hero3',
          url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Clinical skincare product with botanical elements'
        },
        {
          id: 'science3',
          url: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&h=600&fit=crop&q=80',
          type: 'Science',
          description: 'Lab setting, clean beauty research'
        }
      ],
      video: {
        id: 'video3',
        url: 'https://videos.pexels.com/video-files/5750039/5750039-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=600&fit=crop&q=80',
        duration: '0:20'
      }
    },
    variant4: {
      images: [
        {
          id: 'hero4',
          url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Diverse women with beautiful skin'
        },
        {
          id: 'community4',
          url: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=800&h=600&fit=crop&q=80',
          type: 'Community',
          description: 'Happy customer with product'
        }
      ],
      video: {
        id: 'video4',
        url: 'https://videos.pexels.com/video-files/5750075/5750075-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop&q=80',
        duration: '0:25'
      }
    }
  },

  // ☕ COFFEE TEMPLATE
  coffee: {
    variant1: {
      images: [
        {
          id: 'hero1',
          url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Premium coffee cup, artisan roast'
        },
        {
          id: 'product1',
          url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&q=80',
          type: 'Product',
          description: 'Fresh coffee beans, close-up'
        }
      ],
      video: {
        id: 'video1',
        url: 'https://videos.pexels.com/video-files/2133375/2133375-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80',
        duration: '0:20'
      }
    },
    variant2: {
      images: [
        {
          id: 'hero2',
          url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Coffee in cozy morning setting'
        },
        {
          id: 'lifestyle2',
          url: 'https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=800&h=600&fit=crop&q=80',
          type: 'Lifestyle',
          description: 'Person enjoying coffee at home'
        }
      ],
      video: {
        id: 'video2',
        url: 'https://videos.pexels.com/video-files/3152257/3152257-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop&q=80',
        duration: '0:25'
      }
    },
    variant3: {
      images: [
        {
          id: 'hero3',
          url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Coffee roasting process, artisan'
        },
        {
          id: 'roastery3',
          url: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&h=600&fit=crop&q=80',
          type: 'Roastery',
          description: 'Small batch roasting equipment'
        }
      ],
      video: {
        id: 'video3',
        url: 'https://videos.pexels.com/video-files/2909388/2909388-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=600&fit=crop&q=80',
        duration: '0:30'
      }
    },
    variant4: {
      images: [
        {
          id: 'hero4',
          url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Coffee shop community scene'
        },
        {
          id: 'community4',
          url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop&q=80',
          type: 'Community',
          description: 'Friends sharing coffee'
        }
      ],
      video: {
        id: 'video4',
        url: 'https://videos.pexels.com/video-files/2909357/2909357-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop&q=80',
        duration: '0:20'
      }
    }
  },

  // 🌐 GENERIC FALLBACK
  generic: {
    variant1: {
      images: [
        {
          id: 'hero1',
          url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Modern business analytics'
        },
        {
          id: 'data1',
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
          type: 'Data',
          description: 'Business growth chart'
        }
      ],
      video: {
        id: 'video1',
        url: 'https://videos.pexels.com/video-files/3141211/3141211-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop&q=80',
        duration: '0:20'
      }
    },
    variant2: {
      images: [
        {
          id: 'hero2',
          url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Team collaboration'
        },
        {
          id: 'team2',
          url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80',
          type: 'Team',
          description: 'Business meeting'
        }
      ],
      video: {
        id: 'video2',
        url: 'https://videos.pexels.com/video-files/3141206/3141206-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
        duration: '0:25'
      }
    },
    variant3: {
      images: [
        {
          id: 'hero3',
          url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Modern workspace'
        },
        {
          id: 'tech3',
          url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&q=80',
          type: 'Technology',
          description: 'Digital transformation'
        }
      ],
      video: {
        id: 'video3',
        url: 'https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&q=80',
        duration: '0:30'
      }
    },
    variant4: {
      images: [
        {
          id: 'hero4',
          url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop&q=80',
          type: 'Hero Image',
          description: 'Success celebration'
        },
        {
          id: 'success4',
          url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80',
          type: 'Success',
          description: 'Achievement moment'
        }
      ],
      video: {
        id: 'video4',
        url: 'https://videos.pexels.com/video-files/3195285/3195285-uhd_2560_1440_25fps.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&h=600&fit=crop&q=80',
        duration: '0:20'
      }
    }
  }
};

// Google Ads variations per template
const GOOGLE_ADS = {
  fitness: [
    {
      headline: "Achieve Peak Performance Today",
      description: "Track every metric. Crush every goal. Premium fitness tech for serious athletes.",
      cta: "Start Free Trial",
      displayUrl: "peakfitness.com/performance"
    },
    {
      headline: "Your Everyday Fitness Companion",
      description: "Simple. Smart. Designed for real life. Join 100K+ active users today.",
      cta: "Get Started Free",
      displayUrl: "peakfitness.com/start"
    },
    {
      headline: "Where Tech Meets Fitness",
      description: "AI-powered insights. Pro-level analytics. Results you can measure.",
      cta: "Try It Now",
      displayUrl: "peakfitness.com/tech"
    },
    {
      headline: "Join the Fitness Community",
      description: "Train together. Achieve together. 500K+ members crushing goals daily.",
      cta: "Join Free Today",
      displayUrl: "peakfitness.com/community"
    }
  ],
  beauty: [
    {
      headline: "Radiant Skin, Naturally",
      description: "Clean ingredients. Clinical results. Dermatologist-approved beauty.",
      cta: "Shop Clean Beauty",
      displayUrl: "velabeauty.com/radiant"
    },
    {
      headline: "Luxury Meets Sustainability",
      description: "Premium formulas. Zero compromise. Certified clean & cruelty-free.",
      cta: "Explore Collection",
      displayUrl: "velabeauty.com/luxury"
    },
    {
      headline: "Science-Backed Glow",
      description: "Proven ingredients. Visible results. Backed by dermatologists worldwide.",
      cta: "See The Science",
      displayUrl: "velabeauty.com/science"
    },
    {
      headline: "Join 100K Glowing Customers",
      description: "Real results. Real reviews. See why everyone's switching to clean beauty.",
      cta: "Read Reviews",
      displayUrl: "velabeauty.com/reviews"
    }
  ],
  coffee: [
    {
      headline: "Craft Coffee, Elevated",
      description: "Single-origin beans. Expert roasting. Coffee the way it should be.",
      cta: "Order Fresh Roast",
      displayUrl: "emberroasts.com/craft"
    },
    {
      headline: "Your Morning, Perfected",
      description: "Wake up to exceptional coffee. Delivered fresh. Roasted to order.",
      cta: "Start Subscription",
      displayUrl: "emberroasts.com/morning"
    },
    {
      headline: "Small Batch Excellence",
      description: "Micro-roasted weekly. Direct trade beans. Taste the difference.",
      cta: "Discover Origins",
      displayUrl: "emberroasts.com/batch"
    },
    {
      headline: "Join the Coffee Movement",
      description: "15K+ coffee lovers. Exclusive blends. Direct from our roastery to you.",
      cta: "Join Community",
      displayUrl: "emberroasts.com/community"
    }
  ],
  generic: [
    {
      headline: "Transform Your Business Today",
      description: "Data-driven insights. Proven results. Join 10K+ successful companies.",
      cta: "Get Started Free",
      displayUrl: "yourbrand.com/start"
    },
    {
      headline: "Your Success Partner",
      description: "Expert guidance. Powerful tools. Results that matter.",
      cta: "Learn More",
      displayUrl: "yourbrand.com/solutions"
    },
    {
      headline: "Innovation That Works",
      description: "Cutting-edge technology. Simple implementation. Measurable ROI.",
      cta: "See Demo",
      displayUrl: "yourbrand.com/demo"
    },
    {
      headline: "Join Industry Leaders",
      description: "Trusted by Fortune 500. Proven track record. Your growth starts here.",
      cta: "Start Today",
      displayUrl: "yourbrand.com/enterprise"
    }
  ]
};

// Detect product category from context
function detectCategory(productData) {
  const productName = (productData?.productName || '').toLowerCase();
  const category = (productData?.category || '').toLowerCase();
  const industry = (productData?.industry || '').toLowerCase();
  
  const allText = `${productName} ${category} ${industry}`;
  
  if (allText.includes('fitness') || allText.includes('health') || allText.includes('wellness') || allText.includes('gym') || allText.includes('workout')) {
    return 'fitness';
  }
  
  if (allText.includes('beauty') || allText.includes('skincare') || allText.includes('cosmetic') || allText.includes('skin')) {
    return 'beauty';
  }
  
  if (allText.includes('coffee') || allText.includes('beverage') || allText.includes('cafe') || allText.includes('roast')) {
    return 'coffee';
  }
  
  return 'generic';
}

// Main generation function
export function generateCreativeVariants(selectedAudiences, productData) {
  const category = detectCategory(productData);
  const assets = CREATIVE_ASSETS[category];
  const ads = GOOGLE_ADS[category];
  
  const variants = [
    {
      id: 'variant_1',
      name: 'Peak Performance',
      type: 'CAROUSEL',
      lcbm_score: 9.2,
      hook: category === 'fitness' ? "Transform your fitness journey in 30 days" :
            category === 'beauty' ? "Unlock your skin's natural radiance" :
            category === 'coffee' ? "Discover coffee that changes mornings" :
            "Elevate your results with data-driven insights",
      visual_direction: category === 'fitness' ? "Dynamic action shots showcasing athletic achievement and premium tech" :
                        category === 'beauty' ? "Elegant minimalism with natural elements and glowing skin focus" :
                        category === 'coffee' ? "Artisan craft aesthetic with rich warm tones and steam details" :
                        "Professional modern design with clean data visualization",
      copy_angle: "Premium positioning with aspirational lifestyle focus",
      cta: "Start Free Trial",
      why_high_performing: "Combines strong social proof with urgency-driven messaging that resonates with high-intent audiences",
      predicted_performance: {
        ctr: "4.2%",
        engagement: "High",
        conversion_lift: "+35%"
      },
      assets: {
        images: assets.variant1.images,
        video: assets.variant1.video
      },
      google_ad: ads[0]
    },
    {
      id: 'variant_2',
      name: 'Everyday Excellence',
      type: 'STATIC',
      lcbm_score: 8.8,
      hook: category === 'fitness' ? "Fitness that fits your life, not the other way around" :
            category === 'beauty' ? "Clean beauty for the conscious consumer" :
            category === 'coffee' ? "Your daily ritual, perfected" :
            "Solutions designed for real business challenges",
      visual_direction: category === 'fitness' ? "Approachable lifestyle imagery showing real people in authentic settings" :
                        category === 'beauty' ? "Luxurious product shots with sustainable lifestyle elements" :
                        category === 'coffee' ? "Cozy morning scenes with warm, inviting atmosphere" :
                        "Collaborative team environments with accessible technology",
      copy_angle: "Relatability and accessibility over premium exclusivity",
      cta: "Get Started",
      why_high_performing: "Appeals to broader audience with inclusive messaging and removes barriers to entry",
      predicted_performance: {
        ctr: "3.9%",
        engagement: "Medium-High",
        conversion_lift: "+28%"
      },
      assets: {
        images: assets.variant2.images,
        video: assets.variant2.video
      },
      google_ad: ads[1]
    },
    {
      id: 'variant_3',
      name: 'Innovation Edge',
      type: 'VIDEO',
      lcbm_score: 9.0,
      hook: category === 'fitness' ? "Where cutting-edge tech meets peak performance" :
            category === 'beauty' ? "Science-backed formulas, visible results" :
            category === 'coffee' ? "Small batch precision, big flavor impact" :
            "Next-generation solutions for forward-thinking teams",
      visual_direction: category === 'fitness' ? "Futuristic tech focus with data visualization and premium aesthetics" :
                        category === 'beauty' ? "Clinical meets natural with research lab and botanical elements" :
                        category === 'coffee' ? "Craft process showcase with artisan equipment and technique details" :
                        "Innovation-focused with cutting-edge technology highlights",
      copy_angle: "Technology and innovation leadership positioning",
      cta: "Learn More",
      why_high_performing: "Differentiates through innovation story while maintaining credibility with proof points",
      predicted_performance: {
        ctr: "4.5%",
        engagement: "Very High",
        conversion_lift: "+42%"
      },
      assets: {
        images: assets.variant3.images,
        video: assets.variant3.video
      },
      google_ad: ads[2]
    },
    {
      id: 'variant_4',
      name: 'Community Champion',
      type: 'UGC',
      lcbm_score: 8.7,
      hook: category === 'fitness' ? "Join 500K athletes crushing their goals together" :
            category === 'beauty' ? "Loved by 100K+ beauty enthusiasts worldwide" :
            category === 'coffee' ? "15K coffee lovers can't be wrong" :
            "Trusted by industry leaders across 50+ countries",
      visual_direction: category === 'fitness' ? "Community and social proof with diverse user representation" :
                        category === 'beauty' ? "Real customer testimonials with authentic before/after storytelling" :
                        category === 'coffee' ? "Coffee culture community with gathering and sharing moments" :
                        "Collaborative success stories with diverse industry representation",
      copy_angle: "Social proof and community-driven trust building",
      cta: "Join Now",
      why_high_performing: "Leverages bandwagon effect and FOMO while building trust through community validation",
      predicted_performance: {
        ctr: "3.7%",
        engagement: "High",
        conversion_lift: "+31%"
      },
      assets: {
        images: assets.variant4.images,
        video: assets.variant4.video
      },
      google_ad: ads[3]
    }
  ];
  
  return variants;
}

// Export for use in components
export default generateCreativeVariants;

// Score uploaded creatives function
export function scoreUploadedCreatives(uploadedFiles) {
  const category = 'generic'; // We don't have product context for uploaded files
  
  return uploadedFiles.map((file, index) => {
    // Generate base score between 7.5 - 9.0
    const baseScore = 7.5 + (Math.random() * 1.5);
    
    return {
      id: `uploaded_${index}`,
      name: file.name.split('.')[0] || `Uploaded Creative ${index + 1}`,
      type: file.type.includes('video') ? 'VIDEO' : 'STATIC',
      lcbm_score: parseFloat(baseScore.toFixed(1)),
      file: file,
      preview: URL.createObjectURL(file),
      hook: "Your uploaded creative",
      visual_direction: "User-provided creative asset",
      copy_angle: "Original creative approach",
      cta: "Learn More",
      why_high_performing: `This creative scores ${parseFloat(baseScore.toFixed(1))} based on visual composition, brand alignment, and predicted audience engagement patterns.`,
      predicted_performance: {
        ctr: `${(2.5 + Math.random() * 2).toFixed(1)}%`,
        engagement: baseScore >= 8.5 ? 'High' : baseScore >= 8.0 ? 'Medium-High' : 'Medium',
        conversion_lift: `+${Math.round(20 + Math.random() * 25)}%`
      },
      assets: {
        images: file.type.includes('image') ? [{
          id: `img_${index}`,
          url: URL.createObjectURL(file),
          type: 'Uploaded Image',
          description: file.name
        }] : [],
        video: file.type.includes('video') ? {
          id: `vid_${index}`,
          url: URL.createObjectURL(file),
          thumbnail: URL.createObjectURL(file),
          duration: '0:00'
        } : null
      },
      google_ad: {
        headline: "Promote Your Product Today",
        description: "Connect with your ideal customers. Drive results that matter.",
        cta: "Learn More",
        displayUrl: "yourbrand.com/ads"
      }
    };
  });
}