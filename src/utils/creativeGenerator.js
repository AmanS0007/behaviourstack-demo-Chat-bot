// ==========================================
// 🎨 CREATIVE VARIANT GENERATOR
// Enhanced with audience-specific images
// ==========================================

// AUDIENCE-SPECIFIC IMAGE SETS
// Each audience gets unique images for each of the 4 variants
const AUDIENCE_CREATIVE_ASSETS = {
  
  // ☕ COFFEE AUDIENCES
  specialty_coffee_connoisseurs: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'product1', url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&q=80', type: 'Product' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'lifestyle2', url: 'https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=800&h=600&fit=crop&q=80', type: 'Lifestyle' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'roastery3', url: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&h=600&fit=crop&q=80', type: 'Roastery' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'community4', url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop&q=80', type: 'Community' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    }
  },

  morning_ritual_optimizers: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'morning1', url: 'https://images.unsplash.com/photo-1524350876685-274059332603?w=800&h=600&fit=crop&q=80', type: 'Morning' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1501492673258-2ced0e98942f?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'routine2', url: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=800&h=600&fit=crop&q=80', type: 'Routine' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'prep3', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop&q=80', type: 'Preparation' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'home4', url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop&q=80', type: 'Home' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    }
  },

  artisan_food_explorers: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'artisan1', url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&q=80', type: 'Artisan' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'craft2', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop&q=80', type: 'Craft' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'roast3', url: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&h=600&fit=crop&q=80', type: 'Roasting' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'explore4', url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop&q=80', type: 'Explore' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    }
  },

  sustainable_living_advocates: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'eco1', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80', type: 'Eco-Friendly' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'sustainable2', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop&q=80', type: 'Sustainable' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'organic3', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop&q=80', type: 'Organic' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'fairtrade4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80', type: 'Fair Trade' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    }
  },

  // ✨ BEAUTY AUDIENCES
  clean_beauty_advocates: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'clean1', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=600&fit=crop&q=80', type: 'Clean Beauty' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'natural2', url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop&q=80', type: 'Natural' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=600&fit=crop&q=80', duration: '0:15' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'botanical3', url: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&h=600&fit=crop&q=80', type: 'Botanical' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'community4', url: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=800&h=600&fit=crop&q=80', type: 'Community' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    }
  },

  anti_aging_solution_seekers: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'results1', url: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&h=600&fit=crop&q=80', type: 'Results' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'luxury2', url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop&q=80', type: 'Luxury' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=600&fit=crop&q=80', duration: '0:15' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'science3', url: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&h=600&fit=crop&q=80', type: 'Science' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'testimonial4', url: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=800&h=600&fit=crop&q=80', type: 'Testimonial' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    }
  },

  skincare_routine_enthusiasts: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'routine1', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=600&fit=crop&q=80', type: 'Routine' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'steps2', url: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&h=600&fit=crop&q=80', type: 'Steps' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=600&fit=crop&q=80', duration: '0:15' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'layering3', url: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&h=600&fit=crop&q=80', type: 'Layering' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'share4', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop&q=80', type: 'Share' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    }
  },

  dermatologist_recommended_users: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'clinical1', url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop&q=80', type: 'Clinical' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'medical2', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=600&fit=crop&q=80', type: 'Medical' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=600&fit=crop&q=80', duration: '0:15' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'research3', url: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&h=600&fit=crop&q=80', type: 'Research' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'endorsed4', url: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=800&h=600&fit=crop&q=80', type: 'Endorsed' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    }
  },

  // 💪 FITNESS AUDIENCES
  performance_tracking_athletes: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'data1', url: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=800&h=600&fit=crop&q=80', type: 'Data' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'metrics2', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80', type: 'Metrics' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'tech3', url: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&h=600&fit=crop&q=80', type: 'Tech' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'achieve4', url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&q=80', type: 'Achievement' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    }
  },

  home_workout_optimizers: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'home1', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&q=80', type: 'Home Gym' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'space2', url: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=800&h=600&fit=crop&q=80', type: 'Space' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'compact3', url: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&h=600&fit=crop&q=80', type: 'Compact' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'family4', url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&q=80', type: 'Family' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    }
  },

  marathon_endurance_runners: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'run1', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop&q=80', type: 'Running' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'training2', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80', type: 'Training' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'pace3', url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&h=600&fit=crop&q=80', type: 'Pacing' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'finish4', url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&q=80', type: 'Finish Line' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    }
  },

  fitness_tech_early_adopters: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'innovation1', url: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&h=600&fit=crop&q=80', type: 'Innovation' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'ai2', url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&h=600&fit=crop&q=80', type: 'AI Features' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'future3', url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&h=600&fit=crop&q=80', type: 'Future Tech' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'ecosystem4', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80', type: 'Ecosystem' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    }
  },

  // ==========================================
  // EXISTING AUDIENCES - COFFEE
  // ==========================================
  
  local_coffee_shop_regulars: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'local1', url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop&q=80', type: 'Local Shop' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'community2', url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop&q=80', type: 'Community' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'cafe3', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80', type: 'Cafe' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'gather4', url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop&q=80', type: 'Gathering' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    }
  },

  barista_equipment_enthusiasts: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'equipment1', url: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&h=600&fit=crop&q=80', type: 'Equipment' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'barista2', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop&q=80', type: 'Barista' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'brew3', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop&q=80', type: 'Brewing' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'latte4', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop&q=80', type: 'Latte Art' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    }
  },

  subscription_coffee_members: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'delivery1', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop&q=80', type: 'Delivery' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'variety2', url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&q=80', type: 'Variety' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'monthly3', url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=600&fit=crop&q=80', type: 'Monthly' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'box4', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop&q=80', type: 'Subscription Box' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    }
  },

  premium_beverage_buyers: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'luxury1', url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=600&fit=crop&q=80', type: 'Luxury' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'craft2', url: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&h=600&fit=crop&q=80', type: 'Craft' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'premium3', url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop&q=80', type: 'Premium' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'collection4', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop&q=80', type: 'Collection' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    }
  },

  // ==========================================
  // EXISTING AUDIENCES - BEAUTY
  // ==========================================

  beauty_quiz_completers: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'personalized1', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=600&fit=crop&q=80', type: 'Personalized' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'quiz2', url: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&h=600&fit=crop&q=80', type: 'Quiz Results' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=600&fit=crop&q=80', duration: '0:15' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'match3', url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop&q=80', type: 'Perfect Match' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'recommend4', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop&q=80', type: 'Recommendation' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    }
  },

  premium_skincare_shoppers: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'luxury1', url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop&q=80', type: 'Luxury' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'vip2', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=600&fit=crop&q=80', type: 'VIP' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop&q=80', duration: '0:15' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'premium3', url: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&h=600&fit=crop&q=80', type: 'Premium' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'invest4', url: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=800&h=600&fit=crop&q=80', type: 'Investment' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    }
  },

  sephora_ulta_shoppers: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'retail1', url: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&h=600&fit=crop&q=80', type: 'Retail' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'discovery2', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=600&fit=crop&q=80', type: 'Discovery' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop&q=80', duration: '0:15' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'launch3', url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop&q=80', type: 'New Launch' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'rewards4', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop&q=80', type: 'Rewards' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    }
  },

  influencer_driven_beauty_buyers: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'influencer1', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop&q=80', type: 'Influencer' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'ugc2', url: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=800&h=600&fit=crop&q=80', type: 'UGC' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop&q=80', duration: '0:15' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'review3', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=600&fit=crop&q=80', type: 'Review' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'social4', url: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=800&h=600&fit=crop&q=80', type: 'Social Proof' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    }
  },

  // ==========================================
  // EXISTING AUDIENCES - FITNESS
  // ==========================================

  product_page_visitors: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'product1', url: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=800&h=600&fit=crop&q=80', type: 'Product' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'detail2', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80', type: 'Detail' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'feature3', url: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&h=600&fit=crop&q=80', type: 'Features' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'trust4', url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&q=80', type: 'Trust' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    }
  },

  competitive_fitness_community: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'compete1', url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&q=80', type: 'Competition' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'team2', url: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&h=600&fit=crop&q=80', type: 'Team' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'event3', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop&q=80', type: 'Event' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'victory4', url: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&h=600&fit=crop&q=80', type: 'Victory' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    }
  },

  gym_membership_holders: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'gym1', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&q=80', type: 'Gym' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'workout2', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80', type: 'Workout' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'strength3', url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&h=600&fit=crop&q=80', type: 'Strength' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'community4', url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&q=80', type: 'Community' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    }
  },

  wearable_tech_upgraders: {
    variant1: {
      images: [
        { id: 'hero1', url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'upgrade1', url: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&h=600&fit=crop&q=80', type: 'Upgrade' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    },
    variant2: {
      images: [
        { id: 'hero2', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'compare2', url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&h=600&fit=crop&q=80', type: 'Compare' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80', duration: '0:20' }
    },
    variant3: {
      images: [
        { id: 'hero3', url: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'features3', url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&h=600&fit=crop&q=80', type: 'Features' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop&q=80', duration: '0:25' }
    },
    variant4: {
      images: [
        { id: 'hero4', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
        { id: 'switch4', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80', type: 'Switch' }
      ],
      video: { thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&h=600&fit=crop&q=80', duration: '0:30' }
    }
  }
};

// Default fallback if audience not found
const DEFAULT_IMAGES = {
  variant1: {
    images: [
      { id: 'hero1', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
      { id: 'product1', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80', type: 'Product' }
    ],
    video: { thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop&q=80', duration: '0:20' }
  },
  variant2: {
    images: [
      { id: 'hero2', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
      { id: 'team2', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80', type: 'Team' }
    ],
    video: { thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80', duration: '0:25' }
  },
  variant3: {
    images: [
      { id: 'hero3', url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
      { id: 'tech3', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&q=80', type: 'Technology' }
    ],
    video: { thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&q=80', duration: '0:30' }
  },
  variant4: {
    images: [
      { id: 'hero4', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop&q=80', type: 'Hero Image' },
      { id: 'success4', url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80', type: 'Success' }
    ],
    video: { thumbnail: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&h=600&fit=crop&q=80', duration: '0:20' }
  }
};

// Google Ads templates
const GOOGLE_ADS_TEMPLATES = {
  coffee: [
    { headline: "Craft Coffee, Elevated", description: "Single-origin beans. Expert roasting. Coffee the way it should be.", cta: "Order Fresh Roast", displayUrl: "emberroasts.com/craft" },
    { headline: "Your Morning, Perfected", description: "Wake up to exceptional coffee. Delivered fresh. Roasted to order.", cta: "Start Subscription", displayUrl: "emberroasts.com/morning" },
    { headline: "Small Batch Excellence", description: "Micro-roasted weekly. Direct trade beans. Taste the difference.", cta: "Discover Origins", displayUrl: "emberroasts.com/batch" },
    { headline: "Join the Coffee Movement", description: "15K+ coffee lovers. Exclusive blends. Direct from our roastery to you.", cta: "Join Community", displayUrl: "emberroasts.com/community" }
  ],
  beauty: [
    { headline: "Radiant Skin, Naturally", description: "Clean ingredients. Clinical results. Dermatologist-approved beauty.", cta: "Shop Clean Beauty", displayUrl: "velabeauty.com/radiant" },
    { headline: "Luxury Meets Sustainability", description: "Premium formulas. Zero compromise. Certified clean & cruelty-free.", cta: "Explore Collection", displayUrl: "velabeauty.com/luxury" },
    { headline: "Science-Backed Glow", description: "Proven ingredients. Visible results. Backed by dermatologists worldwide.", cta: "See The Science", displayUrl: "velabeauty.com/science" },
    { headline: "Join 100K Glowing Customers", description: "Real results. Real reviews. See why everyone's switching to clean beauty.", cta: "Read Reviews", displayUrl: "velabeauty.com/reviews" }
  ],
  fitness: [
    { headline: "Achieve Peak Performance Today", description: "Track every metric. Crush every goal. Premium fitness tech for serious athletes.", cta: "Start Free Trial", displayUrl: "peakfitness.com/performance" },
    { headline: "Your Everyday Fitness Companion", description: "Simple. Smart. Designed for real life. Join 100K+ active users today.", cta: "Get Started Free", displayUrl: "peakfitness.com/start" },
    { headline: "Where Tech Meets Fitness", description: "AI-powered insights. Pro-level analytics. Results you can measure.", cta: "Try It Now", displayUrl: "peakfitness.com/tech" },
    { headline: "Join the Fitness Community", description: "Train together. Achieve together. 500K+ members crushing goals daily.", cta: "Join Free Today", displayUrl: "peakfitness.com/community" }
  ]
};

// Detect category from product data
function detectCategory(productData) {
  const productName = (productData?.productName || '').toLowerCase();
  const category = (productData?.category || '').toLowerCase();
  const allText = `${productName} ${category}`;
  
  if (allText.includes('fitness') || allText.includes('health') || allText.includes('gym') || allText.includes('workout')) return 'fitness';
  if (allText.includes('beauty') || allText.includes('skincare') || allText.includes('cosmetic')) return 'beauty';
  if (allText.includes('coffee') || allText.includes('beverage') || allText.includes('cafe')) return 'coffee';
  
  return 'generic';
}

// Main generation function - UPDATED FOR AUDIENCE-SPECIFIC IMAGES
export function generateCreativeVariants(selectedAudiences, productData) {
  const audienceId = selectedAudiences[0]; // Get the audience being generated for
  const category = detectCategory(productData);
  
  // Get audience-specific images or fallback to default
  const audienceAssets = AUDIENCE_CREATIVE_ASSETS[audienceId] || DEFAULT_IMAGES;
  const googleAds = GOOGLE_ADS_TEMPLATES[category] || GOOGLE_ADS_TEMPLATES.fitness;
  
  const variants = [
    {
      id: `variant_${audienceId}_1`,
      name: 'Peak Performance',
      type: 'CAROUSEL',
      lcbm_score: 9.2,
      targetAudience: audienceId,
      hook: "Transform your journey in 30 days",
      visual_direction: "Dynamic action shots showcasing achievement and premium quality",
      copy_angle: "Premium positioning with aspirational lifestyle focus",
      cta: "Start Free Trial",
      why_high_performing: "Combines strong social proof with urgency-driven messaging that resonates with high-intent audiences",
      predicted_performance: { ctr: "4.2%", engagement: "High", conversion_lift: "+35%" },
      assets: {
        images: audienceAssets.variant1.images,
        video: audienceAssets.variant1.video
      },
      google_ad: googleAds[0]
    },
    {
      id: `variant_${audienceId}_2`,
      name: 'Everyday Excellence',
      type: 'STATIC',
      lcbm_score: 8.8,
      targetAudience: audienceId,
      hook: "Excellence that fits your life, not the other way around",
      visual_direction: "Approachable lifestyle imagery showing real people in authentic settings",
      copy_angle: "Relatability and accessibility over premium exclusivity",
      cta: "Get Started",
      why_high_performing: "Appeals to broader audience with inclusive messaging and removes barriers to entry",
      predicted_performance: { ctr: "3.9%", engagement: "Medium-High", conversion_lift: "+28%" },
      assets: {
        images: audienceAssets.variant2.images,
        video: audienceAssets.variant2.video
      },
      google_ad: googleAds[1]
    },
    {
      id: `variant_${audienceId}_3`,
      name: 'Innovation Edge',
      type: 'VIDEO',
      lcbm_score: 9.0,
      targetAudience: audienceId,
      hook: "Where cutting-edge innovation meets peak results",
      visual_direction: "Innovation focus with technology highlights and premium aesthetics",
      copy_angle: "Technology and innovation leadership positioning",
      cta: "Learn More",
      why_high_performing: "Differentiates through innovation story while maintaining credibility with proof points",
      predicted_performance: { ctr: "4.5%", engagement: "Very High", conversion_lift: "+42%" },
      assets: {
        images: audienceAssets.variant3.images,
        video: audienceAssets.variant3.video
      },
      google_ad: googleAds[2]
    },
    {
      id: `variant_${audienceId}_4`,
      name: 'Community Champion',
      type: 'UGC',
      lcbm_score: 8.7,
      targetAudience: audienceId,
      hook: "Join thousands already achieving their goals together",
      visual_direction: "Community and social proof with diverse representation",
      copy_angle: "Social proof and community-driven trust building",
      cta: "Join Now",
      why_high_performing: "Leverages bandwagon effect and FOMO while building trust through community validation",
      predicted_performance: { ctr: "3.7%", engagement: "High", conversion_lift: "+31%" },
      assets: {
        images: audienceAssets.variant4.images,
        video: audienceAssets.variant4.video
      },
      google_ad: googleAds[3]
    }
  ];
  
  return variants;
}

export default generateCreativeVariants;

// Score uploaded creatives
export function scoreUploadedCreatives(uploadedFiles) {
  return uploadedFiles.map((file, index) => {
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
          type: 'Uploaded Image'
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