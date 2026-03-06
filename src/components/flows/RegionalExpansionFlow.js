import React, { useState, useEffect } from 'react';
import { useAI } from '../../context/AIContext';
import { Home, ArrowRight, MapPin, TrendingUp, DollarSign, Clock, Target } from 'lucide-react';
import ChatPanel from '../chat/ChatPanel';
import '../../styles/PresentationFlow.css';
import '../../styles/Steps.css';

function RegionalExpansionFlow({ onExit }) {
  const { updateContext, setIsChatOpen } = useAI();
  const [step, setStep] = useState('input');
  const [companyData, setCompanyData] = useState({
    name: '',
    industry: '',
    revenue: '',
    currentMarkets: '',
    targetGeography: '',
    expansionGoals: ''
  });
  const [recommendations, setRecommendations] = useState([]);

  // FIRST: Initialize context on flow entry
  useEffect(() => {
    console.log('🗺️ Regional Expansion Flow - ENTRY');
    updateContext({
      currentFlow: 'regional-expansion',
      currentStep: 'company-input',
      visibleComponents: {},
      campaignData: {},
      availableActions: []
    });
    setIsChatOpen(true);
  }, []); // Empty deps - only run on mount

  // SECOND: Update context when step or data changes
  useEffect(() => {
    console.log('🗺️ Regional Expansion - Step Update:', {
      step,
      stepName: step === 'input' ? 'company-input' : 
                step === 'analyzing' ? 'analyzing-markets' : 
                'market-recommendations'
    });

    updateContext({
      currentFlow: 'regional-expansion',
      currentStep: step === 'input' ? 'company-input' : 
                   step === 'analyzing' ? 'analyzing-markets' : 
                   'market-recommendations',
      campaignData: {
        company: {
          name: companyData.name,
          industry: companyData.industry,
          revenue: companyData.revenue,
          currentMarkets: companyData.currentMarkets,
          targetGeography: companyData.targetGeography,
          expansionGoals: companyData.expansionGoals
        }
      },
      visibleComponents: step === 'results' ? {
        markets: recommendations
      } : {},
      availableActions: [
        'compare_markets',
        'explain_fit',
        'suggest_alternatives',
        'explain_roi'
      ]
    });
  }, [step, companyData, recommendations, updateContext]);

  const templates = [
    {
      name: 'Peak Fitness Co.',
      industry: 'Fitness',
      revenue: '$2.5M',
      currentMarkets: 'San Francisco, Seattle',
      targetGeography: '',
      expansionGoals: 'Target health-conscious, active lifestyle markets'
    },
    {
      name: 'Vela Beauty Labs',
      industry: 'Beauty',
      revenue: '$4.2M',
      currentMarkets: 'New York, Boston',
      targetGeography: '',
      expansionGoals: 'Premium beauty market expansion'
    },
    {
      name: 'Ember Roasts Coffee',
      industry: 'Coffee',
      revenue: '$1.8M',
      currentMarkets: 'Portland, Austin',
      targetGeography: '',
      expansionGoals: 'Specialty coffee culture cities'
    }
  ];

  const handleTemplateClick = (template) => {
    setCompanyData(template);
  };

  const handleAnalyze = () => {
    if (!companyData.name || !companyData.industry) return;

    setStep('analyzing');

    setTimeout(() => {
      const industryRecommendations = {
        'Fitness': [
          {
            city: 'Austin, TX',
            emoji: '🏋️',
            fitScore: 94,
            population: '2.3M metro',
            roi: '3.8x',
            entryCost: '$180K',
            timeline: '6-9 months',
            advantages: [
              'Highest fitness participation rate in US (68%)',
              'Strong outdoor activity culture',
              'Growing tech/professional demographic',
              'Low market saturation vs demand'
            ]
          },
          {
            city: 'Denver, CO',
            emoji: '🏔️',
            fitScore: 91,
            population: '3.0M metro',
            roi: '3.5x',
            entryCost: '$220K',
            timeline: '6-12 months',
            advantages: [
              'Active lifestyle cultural fit',
              'High disposable income',
              'Year-round outdoor activity hub',
              'Premium pricing acceptance'
            ]
          },
          {
            city: 'Nashville, TN',
            emoji: '🎸',
            fitScore: 88,
            population: '2.0M metro',
            roi: '3.2x',
            entryCost: '$160K',
            timeline: '5-8 months',
            advantages: [
              'Fast-growing young professional market',
              'Lower competition than Denver/Austin',
              'Strong community fitness culture',
              'Favorable real estate costs'
            ]
          }
        ],
        'Beauty': [
          {
            city: 'Los Angeles, CA',
            emoji: '✨',
            fitScore: 96,
            population: '13.2M metro',
            roi: '4.2x',
            entryCost: '$380K',
            timeline: '9-12 months',
            advantages: [
              'Premium beauty market leader',
              'Influencer & celebrity culture',
              'High beauty spending per capita ($2,400/yr)',
              'Trend-setting market for nationwide'
            ]
          },
          {
            city: 'Miami, FL',
            emoji: '🌴',
            fitScore: 92,
            population: '6.2M metro',
            roi: '3.9x',
            entryCost: '$290K',
            timeline: '7-10 months',
            advantages: [
              'Luxury beauty market strength',
              'Year-round beauty focus culture',
              'Latin American market gateway',
              'High tourism drives discovery'
            ]
          },
          {
            city: 'Scottsdale, AZ',
            emoji: '🌵',
            fitScore: 89,
            population: '4.9M metro',
            roi: '3.6x',
            entryCost: '$210K',
            timeline: '6-9 months',
            advantages: [
              'Affluent demographic concentration',
              'Premium beauty services acceptance',
              'Lower competition vs LA/Miami',
              'Strong spa & wellness culture'
            ]
          }
        ],
        'Coffee': [
          {
            city: 'Austin, TX',
            emoji: '☕',
            fitScore: 93,
            population: '2.3M metro',
            roi: '3.7x',
            entryCost: '$140K',
            timeline: '4-7 months',
            advantages: [
              'Strong specialty coffee culture',
              'Tech/creative professional demographic',
              'High coffeehouse density acceptance',
              'Community-focused consumption'
            ]
          },
          {
            city: 'Denver, CO',
            emoji: '⛰️',
            fitScore: 90,
            population: '3.0M metro',
            roi: '3.4x',
            entryCost: '$165K',
            timeline: '5-8 months',
            advantages: [
              'Artisanal coffee appreciation',
              'Active lifestyle pairs with coffee culture',
              'Premium pricing acceptance',
              'Strong local business support'
            ]
          },
          {
            city: 'Nashville, TN',
            emoji: '🎶',
            fitScore: 87,
            population: '2.0M metro',
            roi: '3.1x',
            entryCost: '$125K',
            timeline: '4-6 months',
            advantages: [
              'Growing creative class',
              'Music industry coffee consumption',
              'Lower entry costs than Denver/Austin',
              'Emerging specialty coffee scene'
            ]
          }
        ]
      };

      const defaultRecommendations = [
        {
          city: 'Austin, TX',
          emoji: '🌟',
          fitScore: 90,
          population: '2.3M metro',
          roi: '3.5x',
          entryCost: '$150K',
          timeline: '6-9 months',
          advantages: [
            'Fast-growing market with young demographics',
            'Strong tech and startup culture',
            'High disposable income',
            'Low market saturation'
          ]
        },
        {
          city: 'Denver, CO',
          emoji: '🏔️',
          fitScore: 88,
          population: '3.0M metro',
          roi: '3.3x',
          entryCost: '$185K',
          timeline: '7-10 months',
          advantages: [
            'Active, health-conscious population',
            'Premium brand acceptance',
            'Growing professional class',
            'Strong community engagement'
          ]
        },
        {
          city: 'Miami, FL',
          emoji: '🌴',
          fitScore: 85,
          population: '6.2M metro',
          roi: '3.0x',
          entryCost: '$220K',
          timeline: '8-12 months',
          advantages: [
            'Large market size',
            'Tourism-driven discovery',
            'Latin American market gateway',
            'Year-round business activity'
          ]
        }
      ];

      const recs = industryRecommendations[companyData.industry] || defaultRecommendations;
      setRecommendations(recs);
      setStep('results');
    }, 2500);
  };

  return (
    <div className="presentation-flow">
      {/* Header */}
      <div className="presentation-header">
        <button className="home-button" onClick={onExit}>
          <Home className="icon" />
          <span>Exit</span>
        </button>
        <div className="flow-title-wrapper">
          <h2 className="flow-title">Regional Expansion Intelligence</h2>
        </div>
      </div>

      {/* Content with chat margin */}
      <div className="presentation-content with-chat">
        <div className="step-container">
          {/* Input Step */}
          {step === 'input' && (
            <>
              <div className="step-header">
                <h1 className="step-title">Tell Us About Your Business</h1>
                <p className="step-description">
                  Get AI-powered market recommendations based on your business profile
                </p>
              </div>

              {/* Templates */}
              <div className="templates-section">
                <h3 className="section-title-inline">Quick Start Templates</h3>
                <div className="templates-grid">
                  {templates.map((template, idx) => (
                    <button
                      key={idx}
                      className="template-card"
                      onClick={() => handleTemplateClick(template)}
                    >
                      <div className="template-name">{template.name}</div>
                      <div className="template-industry">{template.industry}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="company-form">
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Peak Fitness Co."
                    value={companyData.name}
                    onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Industry</label>
                  <select
                    className="form-input"
                    value={companyData.industry}
                    onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
                  >
                    <option value="">Select industry...</option>
                    <option value="Fitness">Fitness & Wellness</option>
                    <option value="Beauty">Beauty & Cosmetics</option>
                    <option value="Coffee">Coffee & Beverage</option>
                    <option value="Tech">Technology</option>
                    <option value="Retail">Retail</option>
                    <option value="Food">Food & Restaurant</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Annual Revenue</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., $2.5M"
                    value={companyData.revenue}
                    onChange={(e) => setCompanyData({...companyData, revenue: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Current Markets</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., San Francisco, Seattle"
                    value={companyData.currentMarkets}
                    onChange={(e) => setCompanyData({...companyData, currentMarkets: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Target Geography (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Western states, Warm climates, or leave blank for all US"
                    value={companyData.targetGeography}
                    onChange={(e) => setCompanyData({...companyData, targetGeography: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Expansion Goals</label>
                  <textarea
                    className="form-input"
                    rows="3"
                    placeholder="e.g., Target health-conscious, active lifestyle markets"
                    value={companyData.expansionGoals}
                    onChange={(e) => setCompanyData({...companyData, expansionGoals: e.target.value})}
                  />
                </div>
              </div>

              <button 
                className="btn-primary"
                onClick={handleAnalyze}
                disabled={!companyData.name || !companyData.industry}
              >
                Analyze Market Opportunities
                <ArrowRight className="btn-icon" />
              </button>
            </>
          )}

          {/* Analyzing Step */}
          {step === 'analyzing' && (
            <div className="analyzing-state">
              <div className="analyzing-icon">
                <MapPin className="icon spinning" />
              </div>
              <h2 className="analyzing-title">Analyzing Market Opportunities...</h2>
              <p className="analyzing-desc">
                LCBM is evaluating demographics, competition, and market fit across {companyData.targetGeography ? `markets in ${companyData.targetGeography}` : '50+ US markets'}
              </p>
              <div className="progress-bar-anim">
                <div className="progress-fill" />
              </div>
            </div>
          )}

          {/* Results Step */}
          {step === 'results' && (
            <>
              <div className="step-header">
                <h1 className="step-title">Market Recommendations</h1>
                <p className="step-description">
                  Top 3 expansion opportunities for {companyData.name}
                </p>
              </div>

              <div className="markets-grid-expansion">
                {recommendations.map((market, idx) => (
                  <div key={idx} className="expansion-market-card">
                    <div className="market-header-expansion">
                      <div className="market-emoji">{market.emoji}</div>
                      <div className="market-info-expansion">
                        <h3 className="market-city">{market.city}</h3>
                        <div className="fit-score-expansion">
                          <div className="score-value-expansion">{market.fitScore}</div>
                          <span className="score-label-expansion">Fit Score</span>
                        </div>
                      </div>
                    </div>

                    <div className="market-stats-expansion">
                      <div className="stat-row-expansion">
                        <MapPin className="stat-icon-expansion" />
                        <span className="stat-text-expansion">{market.population}</span>
                      </div>
                      <div className="stat-row-expansion">
                        <TrendingUp className="stat-icon-expansion" />
                        <span className="stat-text-expansion">{market.roi} predicted ROI</span>
                      </div>
                      <div className="stat-row-expansion">
                        <DollarSign className="stat-icon-expansion" />
                        <span className="stat-text-expansion">{market.entryCost} entry cost</span>
                      </div>
                      <div className="stat-row-expansion">
                        <Clock className="stat-icon-expansion" />
                        <span className="stat-text-expansion">{market.timeline} timeline</span>
                      </div>
                    </div>

                    <div className="expansion-advantages">
                      <h4 className="advantages-title">Key Advantages:</h4>
                      <ul className="advantages-list">
                        {market.advantages.map((adv, i) => (
                          <li key={i}>{adv}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-primary" onClick={() => alert('Export functionality coming soon')}>
                <ArrowRight className="btn-icon" />
                Export Full Market Analysis
              </button>
            </>
          )}
        </div>
      </div>

      <ChatPanel />
    </div>
  );
}

export default RegionalExpansionFlow;