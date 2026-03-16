import React, { useState, useEffect } from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { useAI } from '../../context/AIContext';
import { AutoMessages } from '../../context/AIContext'; // NEW: Import AutoMessages
import { ArrowRight, ArrowLeft, Brain, Users, TrendingUp, CheckCircle, ChevronDown, ChevronUp, Database, Info } from 'lucide-react';
import { generateAudiences, generateExistingAudiences } from '../../utils/audienceGenerator';
import '../../styles/Steps.css';

// Brand logos (same as Step1)
const CHANNEL_LOGOS = {
  meta: '/images/channels/meta.svg',
  google: '/images/channels/google.svg',
  tiktok: '/images/channels/tiktok.svg',
  linkedin: '/images/channels/linkedin.svg',
  snapchat: '/images/channels/snapchat.svg',
  pinterest: '/images/channels/pinterest.svg',
  youtube: '/images/channels/youtube.svg'
};

function Step2_AudienceIntelligence({ nextStep: propNextStep, prevStep: propPrevStep }) {
  const {
    productData,
    selectedAudiences,
    setSelectedAudiences,
    nextStep: contextNextStep,
    prevStep: contextPrevStep
  } = usePresentation();

  const { updateContext, sendAutoMessage } = useAI(); // NEW: Added sendAutoMessage

  const nextStep = propNextStep || contextNextStep;
  const prevStep = propPrevStep || contextPrevStep;

  const [discoveredAudiences, setDiscoveredAudiences] = useState([]);
  const [existingAudiences, setExistingAudiences] = useState([]);
  const [expandedAudience, setExpandedAudience] = useState(null);
  const [analyzing, setAnalyzing] = useState(true);
  const [activeTab, setActiveTab] = useState('discovered');

  useEffect(() => {
    // Simulate LCBM analysis
    setAnalyzing(true);
    setTimeout(() => {
      const discovered = generateAudiences(productData);
      const existing = generateExistingAudiences(productData);
      
      setDiscoveredAudiences(discovered);
      setExistingAudiences(existing);
      setAnalyzing(false);
    }, 1500);
  }, [productData]);

  // Update AI context whenever data changes
  useEffect(() => {
    const allAudiences = [...discoveredAudiences, ...existingAudiences];
    
    updateContext({
      currentStep: 'audience-selection',
      visibleComponents: {
        audiences: allAudiences
      },
      selectedItems: {
        audiences: selectedAudiences
      },
      campaignData: {
        product: productData,
        audiences: selectedAudiences
      },
      availableActions: [
        'compare_audiences',
        'explain_fit_score',
        'recommend_best',
        'show_overlap',
        'explain_lcbm'
      ]
    });
  }, [discoveredAudiences, existingAudiences, selectedAudiences, productData, updateContext]);

  // NEW: Send auto-message when audiences are selected/changed
  useEffect(() => {
    if (selectedAudiences.length > 0) {
      // Use setTimeout to ensure context is updated first
      setTimeout(() => {
        // Use a dynamic key that changes with selection to allow updates
        const messageKey = `audiences-selected-${selectedAudiences.length}-${selectedAudiences.join('-')}`;
        sendAutoMessage(messageKey, AutoMessages.audiencesSelected);
      }, 1500);
    }
  }, [selectedAudiences, sendAutoMessage]);

  const handleToggleAudience = (audienceId) => {
    if (selectedAudiences.includes(audienceId)) {
      setSelectedAudiences(selectedAudiences.filter(id => id !== audienceId));
    } else {
      setSelectedAudiences([...selectedAudiences, audienceId]);
    }
  };

  const handleContinue = () => {
    if (selectedAudiences.length > 0) {
      // EXPLICIT UPDATE: Set context to creative-mode-selection BEFORE navigating
      updateContext({
        currentStep: 'creative-mode-selection',
        visibleComponents: {
          showingModeSelection: true
        },
        campaignData: {
          product: productData,
          audiences: selectedAudiences
        },
        availableActions: [
          'explain_upload_vs_generate',
          'explain_ai_generation',
          'explain_file_formats',
          'recommend_mode'
        ]
      });
      
      console.log('✅ Context updated to creative-mode-selection, navigating to Step 3');
      
      // Then navigate
      nextStep();
    }
  };

  if (analyzing) {
    return (
      <div className="step-container">
        <div className="analyzing-state">
          <div className="analyzing-icon">
            <Brain className="icon spinning" />
          </div>
          <h2 className="analyzing-title">LCBM Analyzing Your Product...</h2>
          <p className="analyzing-desc">
            Discovering new audiences + segmenting existing customer data
          </p>
          <div className="progress-bar-anim">
            <div className="progress-fill" />
          </div>
        </div>
      </div>
    );
  }

  const currentAudiences = activeTab === 'discovered' ? discoveredAudiences : existingAudiences;

  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-badge">Step 2 of 3</div>
        <h1 className="step-title">Audience Intelligence & Discovery</h1>
        <p className="step-description">
          LCBM discovered {discoveredAudiences.length} new audiences and segmented
          your {parseInt(productData.existingCustomers || 0).toLocaleString()} existing
          customers into {existingAudiences.length} behavioral groups
        </p>
      </div>

      {/* Model Output Box */}
      <div className="model-output-box">
        <div className="model-header">
          <Brain className="model-icon" />
          <div>
            <h3 className="model-title">🤖 LCBM Model Analysis</h3>
            <p className="model-subtitle">Latent Consumer Behaviour Model</p>
          </div>
        </div>
        <div className="model-body">
          <div className="model-stat">
            <span className="stat-label">Input:</span>
            <span className="stat-value">{productData.productName}</span>
          </div>
          <div className="model-stat">
            <span className="stat-label">Data Sources:</span>
            <span className="stat-value">
              {productData.selectedChannels?.length
                ? productData.selectedChannels
                    .map((ch) =>
                      ch === 'meta' ? 'Meta' :
                      ch === 'google' ? 'Google' :
                      ch === 'tiktok' ? 'TikTok' :
                      ch === 'linkedin' ? 'LinkedIn' :
                      ch === 'snapchat' ? 'Snapchat' :
                      ch === 'pinterest' ? 'Pinterest' :
                      ch === 'youtube' ? 'YouTube' : ch
                    )
                    .join(', ')
                : 'All Channels'}
            </span>
          </div>
          <div className="model-stat">
            <span className="stat-label">Existing Customers Analyzed:</span>
            <span className="stat-value">
              {parseInt(productData.existingCustomers || 0).toLocaleString()}
            </span>
          </div>
          <div className="model-stat">
            <span className="stat-label">New Audiences Discovered:</span>
            <span className="stat-value highlight">{discoveredAudiences.length} segments</span>
          </div>
          <div className="model-stat">
            <span className="stat-label">Existing Data Segments:</span>
            <span className="stat-value highlight">{existingAudiences.length} groups</span>
          </div>
        </div>
      </div>

      {/* Audience Type Tabs */}
      <div className="audience-tabs">
        <button
          className={`audience-tab ${activeTab === 'discovered' ? 'active' : ''}`}
          onClick={() => setActiveTab('discovered')}
        >
          <Users className="tab-icon" />
          <div className="tab-content">
            <span className="tab-title">Discovered Audiences</span>
            <span className="tab-desc">New audiences found by LCBM</span>
          </div>
          <div className="tab-badge">{discoveredAudiences.length}</div>
        </button>
        <button
          className={`audience-tab ${activeTab === 'existing' ? 'active' : ''}`}
          onClick={() => setActiveTab('existing')}
        >
          <Database className="tab-icon" />
          <div className="tab-content">
            <span className="tab-title">Existing Customer Segments</span>
            <span className="tab-desc">From your customer data</span>
          </div>
          <div className="tab-badge">{existingAudiences.length}</div>
        </button>
      </div>

      {/* Audience Cards */}
      <div className="audiences-section">
        <div className="section-header-inline">
          <h3 className="section-title-inline">
            {activeTab === 'discovered' ? (
              <>
                <Users className="inline-icon" />
                Discovered Audience Segments
              </>
            ) : (
              <>
                <Database className="inline-icon" />
                Existing Customer Segments
              </>
            )}
          </h3>
          <span className="selection-count">
            {selectedAudiences.length} selected
          </span>
        </div>

        <div className="audiences-grid-step2">
          {currentAudiences.map((audience) => {
            const isSelected = selectedAudiences.includes(audience.id);
            const isExpanded = expandedAudience === audience.id;

            return (
              <div
                key={audience.id}
                className={`audience-card-step2 ${isSelected ? 'selected' : ''}`}
              >
                {/* Data Source Badge */}
                {audience.data_source && (
                  <div className="data-source-badge">
                    <Database className="badge-icon-small" />
                    {audience.data_source}
                  </div>
                )}

                {/* Card Header */}
                <div className="audience-card-header-step2">
                  <div className="audience-icon-step2">{audience.icon}</div>
                  <div className="audience-info-step2">
                    <h4 className="audience-name-step2">{audience.name}</h4>
                    <p className="audience-demo-step2">{audience.demographics}</p>
                    {audience.region && audience.region !== 'Not specified' && (
                      <p className="audience-region-step2">
                        <span className="audience-region-label">Target:</span> {audience.region}
                      </p>
                    )}
                  </div>
                  <div className="fit-score-wrap-step2">
                    <div className="fit-score-step2">{audience.fit_score}</div>
                    <span className="fit-label-step2">Fit</span>
                  </div>
                </div>

                {/* Size */}
                <div className="audience-size-step2">
                  <Users className="size-icon" />
                  <span>{audience.size} {activeTab === 'existing' ? 'customers' : 'potential reach'}</span>
                  {activeTab === 'discovered' && (
                    <span
                      className="size-tooltip-wrap"
                      title="LCBM estimates addressable audience size using platform and third-party signals and category benchmarks within your target geography. Use for planning; validate with your ad platform."
                      aria-label="How we estimate potential reach"
                    >
                      <Info className="size-info-icon" />
                      <span className="size-tooltip">
                        LCBM estimates addressable audience size using platform and third-party signals and category benchmarks within your target geography. Use for planning; validate with your ad platform.
                      </span>
                    </span>
                  )}
                  {productData.selectedChannels?.length > 0 && (
                    <div className="audience-channels">
                      {productData.selectedChannels.slice(0, 3).map((ch) => (
                        <span key={ch} className="channel-badge channel-badge-logo">
                          {CHANNEL_LOGOS[ch] ? (
                            <img src={CHANNEL_LOGOS[ch]} alt="" aria-hidden />
                          ) : (
                            <img src={CHANNEL_LOGOS.meta} alt="" aria-hidden />
                          )}
                        </span>
                      ))}
                      {productData.selectedChannels.length > 3 && (
                        <span className="channel-badge">+{productData.selectedChannels.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Why Fit */}
                <div className="why-fit-step2">
                  <p className="why-fit-text">{audience.why_fit}</p>
                </div>

                {/* Top Affinities Preview */}
                <div className="affinities-preview">
                  <p className="affinities-label">Top Content Affinities:</p>
                  {audience.content_affinities.slice(0, 2).map((aff, idx) => (
                    <div key={idx} className="affinity-row">
                      <span className="affinity-name">{aff.name}</span>
                      <div className="affinity-bar">
                        <div
                          className="affinity-fill"
                          style={{ width: `${aff.strength}%` }}
                        />
                      </div>
                      <span className="affinity-score">{aff.strength}</span>
                    </div>
                  ))}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="audience-expanded-step2 fade-in">
                    <div className="expanded-section-step2 demographics-psychographics">
                      <h5 className="expanded-title-step2">Demographics</h5>
                      <p className="expanded-text">{audience.demographics}</p>
                    </div>
                    <div className="expanded-section-step2 demographics-psychographics">
                      <h5 className="expanded-title-step2">Psychographics</h5>
                      <p className="expanded-text">{audience.psychographics}</p>
                    </div>

                    <div className="expanded-section-step2">
                      <h5 className="expanded-title-step2">All Content Affinities</h5>
                      {audience.content_affinities.map((aff, idx) => (
                        <div key={idx} className="affinity-detail">
                          <div className="affinity-row">
                            <span className="affinity-name">{aff.name}</span>
                            <div className="affinity-bar">
                              <div
                                className="affinity-fill"
                                style={{ width: `${aff.strength}%` }}
                              />
                            </div>
                            <span className="affinity-score">{aff.strength}</span>
                          </div>
                          <p className="affinity-reason">{aff.reason}</p>
                        </div>
                      ))}
                    </div>

                    <div className="expanded-section-step2">
                      <h5 className="expanded-title-step2">Behavioral Signals</h5>
                      <ul className="behavioral-list">
                        {audience.behavioral_signals.map((signal, idx) => (
                          <li key={idx}>{signal}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="recommended-messaging-box">
                      <TrendingUp className="messaging-icon" />
                      <div>
                        <p className="messaging-label">Recommended Messaging:</p>
                        <p className="messaging-text">{audience.recommended_messaging}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Actions */}
                <div className="audience-actions-step2">
                  <button
                    className="expand-btn-step2"
                    onClick={() => setExpandedAudience(isExpanded ? null : audience.id)}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="btn-icon" /> Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="btn-icon" /> Full Details
                      </>
                    )}
                  </button>
                  <button
                    className={`select-btn-step2 ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggleAudience(audience.id)}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle className="btn-icon" /> Selected
                      </>
                    ) : (
                      '+ Select'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Impact Preview */}
      {selectedAudiences.length > 0 && (
        <div className="impact-preview fade-in">
          <div className="impact-header">
            <TrendingUp className="impact-icon" />
            <h3 className="impact-title">What Happens Next</h3>
          </div>
          <p className="impact-text">
            In Step 3, you'll either upload existing ads for LCBM to score, or create
            new ads where AI will generate 4 high-performing variants based on your
            {' '}{selectedAudiences.length} selected audience{selectedAudiences.length > 1 ? 's' : ''}.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="form-actions">
        <button className="btn-secondary" onClick={prevStep}>
          <ArrowLeft className="btn-icon" />
          Back to Product
        </button>
        <button
          className="btn-primary"
          onClick={handleContinue}
          disabled={selectedAudiences.length === 0}
        >
          Continue to Creative Intelligence
          <ArrowRight className="btn-icon" />
        </button>
      </div>
    </div>
  );
}

export default Step2_AudienceIntelligence;