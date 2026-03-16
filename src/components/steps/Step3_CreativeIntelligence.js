import React, { useState, useEffect } from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { useAI } from '../../context/AIContext';
import { AutoMessages } from '../../context/AIContext';
import {
  ArrowRight, ArrowLeft, Brain, Upload, Sparkles,
  CheckCircle, Image, Play, Layout, Zap, Star, Download, AlertCircle
} from 'lucide-react';
import { generateCreativeVariants, scoreUploadedCreatives } from '../../utils/creativeGenerator';
import '../../styles/Steps.css';
import './Step3_CreativeIntelligence.css';

const typeIcons = {
  VIDEO: Play,
  CAROUSEL: Layout,
  STATIC: Image,
  UGC: Zap
};

function Step3_CreativeIntelligence({ nextStep: propNextStep, prevStep: propPrevStep, totalSteps = 5, stepNumber = 3 }) {
  const {
    productData,
    selectedAudiences,
    creativeMode,
    setCreativeMode,
    uploadedCreatives,
    setUploadedCreatives,
    generatedCreatives,
    setGeneratedCreatives,
    selectedCreative,
    setSelectedCreative,
    nextStep: contextNextStep,
    prevStep: contextPrevStep
  } = usePresentation();

  const { updateContext, sendAutoMessage } = useAI();

  const nextStep = propNextStep || contextNextStep;
  const prevStep = propPrevStep || contextPrevStep;

  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showAudiencePreview, setShowAudiencePreview] = useState(false);

  // NEW: Tab-related states
  const [activeAudienceTab, setActiveAudienceTab] = useState(null);
  const [selectedVariantsByAudience, setSelectedVariantsByAudience] = useState({});
  // Format: { audience_id: variant_id }

  // Set active tab when creatives are generated
  useEffect(() => {
    if (generatedCreatives.length > 0 && selectedAudiences.length > 0 && !activeAudienceTab) {
      setActiveAudienceTab(selectedAudiences[0]);
    }
  }, [generatedCreatives, selectedAudiences, activeAudienceTab]);

  // Update AI context when component mounts or data changes
  useEffect(() => {
    // Only update to 'creative-intelligence' when variants actually exist
    if (generatedCreatives.length > 0 || uploadedCreatives.length > 0) {
      updateContext({
        currentStep: 'creative-intelligence',
        visibleComponents: {
          creatives: generatedCreatives.length > 0 ? generatedCreatives : uploadedCreatives,
          mode: creativeMode,
          activeAudience: activeAudienceTab,
          selectedVariants: selectedVariantsByAudience
        },
        selectedItems: {
          creative: selectedCreative,
          audiences: selectedAudiences,
          variantsByAudience: selectedVariantsByAudience
        },
        campaignData: {
          product: productData,
          audiences: selectedAudiences,
          creatives: generatedCreatives.length > 0 ? generatedCreatives : uploadedCreatives
        },
        availableActions: [
          'explain_scores',
          'compare_variants',
          'recommend_best',
          'explain_hooks',
          'improve_creative'
        ]
      });
    }
  }, [generatedCreatives, uploadedCreatives, selectedCreative, selectedAudiences, productData, creativeMode, updateContext, activeAudienceTab, selectedVariantsByAudience]);

  // Set context for mode selection screen (before variants exist)
  useEffect(() => {
    if (!creativeMode) {
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
    }
  }, [creativeMode, productData, selectedAudiences, updateContext]);

  // Send auto-message when creatives are generated (Create mode)
  useEffect(() => {
    if (generatedCreatives.length > 0 && creativeMode === 'create') {
      setTimeout(() => {
        sendAutoMessage('creatives-generated', AutoMessages.creativesGenerated);
      }, 500);
    }
  }, [generatedCreatives, creativeMode, sendAutoMessage]);

  // Send auto-message when uploaded creatives are scored
  useEffect(() => {
    if (uploadedCreatives.length > 0 && creativeMode === 'upload') {
      setTimeout(() => {
        sendAutoMessage('creatives-uploaded', AutoMessages.creativesUploaded);
      }, 500);
    }
  }, [uploadedCreatives, creativeMode, sendAutoMessage]);

  // Send auto-message when comparison variants are generated (upload mode switching to tabbed)
  useEffect(() => {
    if (generatedCreatives.length > 0 && creativeMode === 'upload' && uploadedCreatives.length > 0) {
      setTimeout(() => {
        sendAutoMessage('comparison-variants-generated', AutoMessages.comparisonVariantsGenerated);
      }, 500);
    }
  }, [generatedCreatives, creativeMode, uploadedCreatives, sendAutoMessage]);

  // Handle mode selection
  const handleSelectMode = (mode) => {
    setCreativeMode(mode);
    
    if (mode === 'create') {
      setShowAudiencePreview(true);
    }
  };

  // Handle going back to Step 2 (Audience Selection)
  const handleBackToAudiences = () => {
    // EXPLICIT UPDATE: Set context back to audience-selection BEFORE navigating
    updateContext({
      currentStep: 'audience-selection',
      visibleComponents: {
        audiences: [] // Will be populated by Step 2
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
    
    console.log('✅ Context updated to audience-selection, navigating back to Step 2');
    
    // Then navigate back
    prevStep();
  };

  // Handle changing mode (back to mode selection screen)
  const handleChangeMode = () => {
    // EXPLICIT UPDATE: Set context back to mode selection
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
    
    console.log('✅ Context updated back to creative-mode-selection');
    
    // Reset mode and selections
    setCreativeMode(null);
    setGeneratedCreatives([]);
    setUploadedCreatives([]);
    setSelectedVariantsByAudience({});
    setActiveAudienceTab(null);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    setTimeout(() => {
      // Score uploaded files PER AUDIENCE (creates variants like AI generation)
      const scoredVariants = scoreUploadedCreatives(files, selectedAudiences);
      
      // Store uploaded files separately for reference
      setUploadedCreatives(files);
      
      // Store scored variants in generatedCreatives (same as AI variants!)
      setGeneratedCreatives(scoredVariants);
      
      setUploading(false);
      
      // Set first audience as active tab
      if (selectedAudiences.length > 0) {
        setActiveAudienceTab(selectedAudiences[0]);
      }
    }, 1500);
  };

  // Generate AI variants - NOW GENERATES PER AUDIENCE
  const handleGenerateVariants = () => {
    setGenerating(true);
    setShowAudiencePreview(false);

    setTimeout(() => {
      // Generate 4 variants for EACH audience
      const allVariants = selectedAudiences.flatMap(audienceId => {
        const variants = generateCreativeVariants([audienceId], productData);
        // Tag each variant with its target audience
        return variants.map(v => ({ ...v, targetAudience: audienceId }));
      });
      
      setGeneratedCreatives(allVariants);
      setGenerating(false);
      
      // Set first audience as active tab
      if (selectedAudiences.length > 0) {
        setActiveAudienceTab(selectedAudiences[0]);
      }
    }, 2000);
  };

  // Generate AI variants for comparison (from Upload flow)
  // NOW ADDS AI VARIANTS to existing uploaded variants!
  const handleGenerateForComparison = () => {
    setGenerating(true);
    
    setTimeout(() => {
      // Generate 4 AI variants for EACH audience
      const aiVariants = selectedAudiences.flatMap(audienceId => {
        const variants = generateCreativeVariants([audienceId], productData);
        // Tag each variant with its target audience and source
        return variants.map(v => ({ ...v, targetAudience: audienceId, source: 'ai' }));
      });
      
      // ADD AI variants to existing uploaded variants (don't replace!)
      setGeneratedCreatives(prev => [...prev, ...aiVariants]);
      setGenerating(false);
    }, 2000);
  };

  // OLD selection handler (for upload mode - before generating variants)
  const handleSelectCreative = (creativeId) => {
    setSelectedCreative(creativeId);
  };

  // NEW: Handle variant selection per audience
  const handleSelectVariantForAudience = (audienceId, variantId) => {
    setSelectedVariantsByAudience(prev => ({
      ...prev,
      [audienceId]: variantId
    }));
  };

  // NEW: Check if all audiences have selected variants
  const areAllAudiencesComplete = () => {
    return selectedAudiences.every(audId => selectedVariantsByAudience[audId]);
  };

  // NEW: Get variants for specific audience
  const getVariantsForAudience = (audienceId) => {
    return generatedCreatives.filter(v => v.targetAudience === audienceId);
  };

  const handleContinue = () => {
    // For tabbed mode, check if all audiences complete
    if (generatedCreatives.length > 0 && !areAllAudiencesComplete()) {
      alert('Please select a variant for each audience before continuing.');
      return;
    }

    if (selectedCreative || areAllAudiencesComplete()) {
      // EXPLICIT UPDATE: Set context to campaign-complete with full summary
      updateContext({
        currentStep: 'campaign-complete',
        visibleComponents: {
          summary: true
        },
        selectedItems: {
          creative: selectedCreative,
          audiences: selectedAudiences,
          variantsByAudience: selectedVariantsByAudience
        },
        campaignData: {
          product: productData,
          audiences: selectedAudiences,
          creatives: generatedCreatives.length > 0 ? generatedCreatives : uploadedCreatives
        },
        availableActions: [
          'review_summary',
          'implementation_guide',
          'expected_results',
          'budget_recommendations'
        ]
      });
      
      // Send campaign summary auto-message
      setTimeout(() => {
        sendAutoMessage('campaign-complete', AutoMessages.campaignSummaryReady);
      }, 500);
      
      console.log('✅ Campaign complete! Summary sent to chat');
      
      // Then navigate to next step (summary/review page if it exists)
      nextStep();
    }
  };

  // Download all assets
  const handleDownloadAll = (variant = null) => {
    if (variant) {
      alert(`Download functionality: Would download assets for "${variant.name}".\n\nIn production, this would download this variant's images, video, and ad copy.`);
    } else {
      alert('Download functionality: Would download all images, videos, and Google Ads copy as a ZIP file.\n\nIn production, this would:\n1. Collect all asset URLs\n2. Create a ZIP file with all images, videos, and ad copy\n3. Trigger download');
    }
  };

  // Mode selection screen
  if (!creativeMode) {
    return (
      <div className="step-container step3-creative">
        <div className="step-header">
          <div className="step-badge">Step {stepNumber} of {totalSteps}</div>
          <h1 className="step-title">Creative Intelligence</h1>
          <p className="step-description">
            Upload existing ads for LCBM scoring, or let AI generate high-performing variants
          </p>
        </div>

        {/* Selected Audiences Context */}
        <div className="step3-context-box">
          <div className="step3-context-header">
            <Brain className="step3-context-icon" />
            <div>
              <h3 className="step3-context-title">Context from Step 2</h3>
              <p className="step3-context-subtitle">Selected Audiences</p>
            </div>
          </div>
          <div className="step3-audiences-preview">
            <p className="step3-preview-label">{selectedAudiences.length} audiences selected:</p>
            <div className="step3-audience-chips">
              {(selectedAudiences || []).slice(0, 4).map((audId, idx) => (
                <div key={idx} className="step3-audience-chip">
                  {audId.replace(/_/g, ' ')}
                </div>
              ))}
              {selectedAudiences.length > 4 && (
                <div className="step3-audience-chip">+{selectedAudiences.length - 4} more</div>
              )}
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="step3-mode-grid">
          <button
            className="step3-mode-card"
            onClick={() => handleSelectMode('upload')}
          >
            <div className="step3-mode-icon-wrap upload">
              <Upload className="step3-mode-icon" />
            </div>
            <h3 className="step3-mode-title">Upload Existing Ads</h3>
            <p className="step3-mode-desc">
              Upload your creative assets and LCBM will score them against your
              selected audiences
            </p>
            <ul className="step3-mode-benefits">
              <li>✓ Score existing creatives</li>
              <li>✓ Prioritize based on fit</li>
              <li>✓ Get improvement recommendations</li>
            </ul>
            <div className="step3-mode-cta">
              Upload & Score
              <ArrowRight className="step3-cta-icon" />
            </div>
          </button>

          <button
            className="step3-mode-card"
            onClick={() => handleSelectMode('create')}
          >
            <div className="step3-mode-icon-wrap create">
              <Sparkles className="step3-mode-icon" />
            </div>
            <h3 className="step3-mode-title">Generate AI Variants</h3>
            <p className="step3-mode-desc">
              AI will create 4 variants per audience optimized for their specific preferences
            </p>
            <ul className="step3-mode-benefits">
              <li>✓ 4 variants per audience ({selectedAudiences.length * 4} total)</li>
              <li>✓ Audience-specific optimization</li>
              <li>✓ Complete creative briefs</li>
            </ul>
            <div className="step3-mode-cta">
              Generate Variants
              <Sparkles className="step3-cta-icon" />
            </div>
          </button>
        </div>

        {/* Back Button */}
        <div className="form-actions">
          <button className="btn-secondary" onClick={handleBackToAudiences}>
            <ArrowLeft className="btn-icon" />
            Back to Audiences
          </button>
        </div>
      </div>
    );
  }

  // Upload Mode - Initial upload zone
  if (creativeMode === 'upload' && generatedCreatives.length === 0 && !uploading) {
    return (
      <div className="step-container step3-creative">
        <div className="step-header">
          <div className="step-badge">Step {stepNumber} of {totalSteps}</div>
          <h1 className="step-title">Upload & Score Creatives</h1>
          <p className="step-description">
            LCBM will score your creatives against selected audiences
          </p>
        </div>

        <div className="step3-upload-zone">
          <Upload className="step3-upload-icon" />
          <h3 className="step3-upload-title">Upload Your Creative Assets</h3>
          <p className="step3-upload-desc">
            Images, videos, or ad mockups (PNG, JPG, MP4)
          </p>
          <label className="step3-upload-btn">
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            Choose Files
          </label>
          <button
            className="step3-change-mode-btn"
            onClick={handleChangeMode}
          >
            ← Or generate AI variants instead
          </button>
        </div>

        <div className="form-actions">
          <button className="btn-secondary" onClick={handleBackToAudiences}>
            <ArrowLeft className="btn-icon" />
            Back to Audiences
          </button>
        </div>
      </div>
    );
  }

  // Uploading State
  if (uploading) {
    return (
      <div className="step-container step3-creative">
        <div className="analyzing-state">
          <div className="analyzing-icon">
            <Brain className="icon spinning" />
          </div>
          <h2 className="analyzing-title">LCBM Scoring Your Creatives...</h2>
          <p className="analyzing-desc">Analyzing fit against selected audiences</p>
          <div className="progress-bar-anim">
            <div className="progress-fill" />
          </div>
        </div>
      </div>
    );
  }

  // Create Mode - Show audience preview first
  if (creativeMode === 'create' && showAudiencePreview) {
    return (
      <div className="step-container step3-creative">
        <div className="step-header">
          <div className="step-badge">Step {stepNumber} of {totalSteps}</div>
          <h1 className="step-title">Generating Variants for Your Audiences</h1>
          <p className="step-description">
            AI will create 4 unique creative variants optimized for each of your {selectedAudiences.length} selected audiences
          </p>
        </div>

        {/* Audience Preview Cards */}
        <div className="step3-audience-preview-grid">
          {selectedAudiences.map((audId, idx) => (
            <div key={audId} className="step3-audience-preview-card">
              <div className="step3-audience-number">{idx + 1}</div>
              <h3>{audId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
              <p>4 variants will be generated</p>
            </div>
          ))}
        </div>

        {/* Generation Summary */}
        <div className="step3-generation-summary">
          <h3>What You'll Get:</h3>
          <ul>
            <li>{selectedAudiences.length * 4} total creative variants</li>
            <li>4 variants per audience, each with unique hooks and messaging</li>
            <li>Complete asset packages (images, video, Google Ads copy, Meta Ads copy, and more)</li>
            <li>LCBM scores for predicted performance</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button className="btn-secondary" onClick={handleChangeMode}>
            <ArrowLeft className="btn-icon" />
            Cancel
          </button>
          <button 
            className="btn-primary"
            onClick={handleGenerateVariants}
            disabled={generating}
          >
            {generating ? (
              <>
                <div className="spinner-small"></div>
                Generating {selectedAudiences.length * 4} Variants...
              </>
            ) : (
              <>
                <Sparkles className="btn-icon" />
                Generate Variants
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Generating State (for both Create and Upload modes)
  if (generating) {
    return (
      <div className="step-container step3-creative">
        <div className="analyzing-state">
          <div className="analyzing-icon">
            <Sparkles className="icon spinning" />
          </div>
          <h2 className="analyzing-title">Transsuasion AI Generating Variants...</h2>
          <p className="analyzing-desc">
            Creating {selectedAudiences.length * 4} high-performing creative concepts with visual assets
          </p>
          <div className="progress-bar-anim">
            <div className="progress-fill" />
          </div>
        </div>
      </div>
    );
  }

  // TABBED INTERFACE - Used for BOTH Create mode AND Upload mode (after generating)
  if (generatedCreatives.length > 0) {
    const currentAudienceVariants = getVariantsForAudience(activeAudienceTab);
    const selectedVariantForCurrentAudience = selectedVariantsByAudience[activeAudienceTab];

    return (
      <div className="step-container step3-creative">
        <div className="step-header">
          <div className="step-badge">Step {stepNumber} of {totalSteps}</div>
          <h1 className="step-title">
            {creativeMode === 'upload' ? 'Select Best Upload Per Audience' : 'Select Creative Variants'}
          </h1>
          <p className="step-description">
            {creativeMode === 'upload' 
              ? `Your ${uploadedCreatives.length} uploaded creative${uploadedCreatives.length > 1 ? 's' : ''} scored differently across audiences. Select the best performer for each audience.`
              : 'Choose one variant for each audience. Each tab shows 4 variants optimized for that specific audience.'
            }
          </p>
        </div>

        {/* AUDIENCE TABS */}
        <div className="step3-audience-tabs">
          {selectedAudiences.map((audId) => {
            const isSelected = selectedVariantsByAudience[audId];
            const isActive = activeAudienceTab === audId;
            
            return (
              <button
                key={audId}
                className={`step3-audience-tab ${isActive ? 'active' : ''} ${isSelected ? 'completed' : ''}`}
                onClick={() => setActiveAudienceTab(audId)}
              >
                <span className="step3-tab-name">
                  {audId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                {isSelected ? (
                  <CheckCircle size={18} className="step3-tab-icon check" />
                ) : (
                  <AlertCircle size={18} className="step3-tab-icon alert" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT */}
        <div className="step3-tab-content">
          <div className="step3-tab-header">
            <h2>{activeAudienceTab?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
            {!selectedVariantForCurrentAudience && (
              <div className="step3-selection-reminder">
                <AlertCircle size={16} />
                <span>Please select a variant for this audience</span>
              </div>
            )}
          </div>

          {/* VARIANTS GRID */}
          <div className="step3-variants-grid">
            {currentAudienceVariants.map((variant, index) => {
              const isSelected = selectedVariantForCurrentAudience === variant.id;
              const TypeIcon = typeIcons[variant.type] || Image;
              const isUpload = variant.source === 'upload'; // Check if it's an upload
              
              // Check if we need to show divider (first AI variant after uploads)
              const previousVariant = index > 0 ? currentAudienceVariants[index - 1] : null;
              const showDivider = !isUpload && previousVariant?.source === 'upload';

              return (
                <React.Fragment key={variant.id}>
                  {/* DIVIDER between uploads and AI variants */}
                  {showDivider && (
                    <div className="step3-variants-divider">
                      <div className="step3-divider-line" />
                      <div className="step3-divider-content">
                        <Sparkles className="step3-divider-icon" />
                        <span className="step3-divider-text">AI-Generated Variants</span>
                      </div>
                      <div className="step3-divider-line" />
                    </div>
                  )}

                  <div
                    className={`step3-variant-card ${isSelected ? 'selected' : ''} ${isUpload ? 'upload-card' : ''}`}
                    onClick={() => handleSelectVariantForAudience(activeAudienceTab, variant.id)}
                  >
                  {isSelected && (
                    <div className="step3-selected-badge">
                      <CheckCircle size={20} />
                      Selected
                    </div>
                  )}

                  {/* UPLOAD CARD - Simple version */}
                  {isUpload ? (
                    <>
                      {/* Header */}
                      <div className="step3-variant-header">
                        <TypeIcon className="step3-variant-type-icon" />
                        <h4 className="step3-variant-name">{variant.name}</h4>
                        <div className="step3-variant-score">{variant.lcbm_score}</div>
                      </div>

                      {/* Upload Badge */}
                      <div className="step3-upload-badge">
                        <Upload size={14} />
                        <span>Your Upload</span>
                      </div>

                      {/* Preview Image */}
                      {variant.preview && (
                        <div className="step3-upload-preview">
                          <img src={variant.preview} alt={variant.name} className="step3-upload-img" />
                        </div>
                      )}

                      {/* Predicted Performance */}
                      <div className="step3-performance-metrics">
                        <div className="step3-perf-metric">
                          <span className="step3-perf-label">CTR</span>
                          <span className="step3-perf-value">{variant.predicted_performance.ctr}</span>
                        </div>
                        <div className="step3-perf-metric">
                          <span className="step3-perf-label">Engagement</span>
                          <span className="step3-perf-value">{variant.predicted_performance.engagement}</span>
                        </div>
                        <div className="step3-perf-metric">
                          <span className="step3-perf-label">Conv. Lift</span>
                          <span className="step3-perf-value green">{variant.predicted_performance.conversion_lift}</span>
                        </div>
                      </div>

                      {/* Score Explanation */}
                      <div className="step3-upload-score-explanation">
                        <p>Scored {variant.lcbm_score} for this audience based on visual composition and predicted engagement.</p>
                      </div>

                      {/* Actions */}
                      <div className="step3-variant-actions-row">
                        <button
                          className={`step3-select-variant-btn ${isSelected ? 'selected' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectVariantForAudience(activeAudienceTab, variant.id);
                          }}
                        >
                          {isSelected ? (
                            <>
                              <CheckCircle className="btn-icon" /> Selected
                            </>
                          ) : (
                            'Select This Upload'
                          )}
                        </button>
                        <button
                          type="button"
                          className="step3-download-variant-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadAll(variant);
                          }}
                          title={`Download ${variant.name}`}
                        >
                          <Download className="btn-icon" />
                          Download
                        </button>
                      </div>
                    </>
                  ) : (
                    /* AI VARIANT CARD - Full version with all details */
                    <>
                      {/* Header */}
                      <div className="step3-variant-header">
                        <TypeIcon className="step3-variant-type-icon" />
                        <h4 className="step3-variant-name">{variant.name}</h4>
                        <div className="step3-variant-score">{variant.lcbm_score}</div>
                      </div>

                      {/* AI Badge */}
                      <div className="step3-ai-badge">
                        <Sparkles size={14} />
                        <span>AI Generated</span>
                      </div>

                      {/* Visual Assets Section */}
                      {variant.assets && (
                        <div className="step3-variant-assets">
                          <h5 className="step3-assets-title">
                            <Image className="step3-assets-title-icon" />
                            Generated Visual Assets
                          </h5>
                          
                          {/* Images */}
                          <div className="step3-assets-images">
                            {(variant.assets.images || []).map((img) => (
                              <div key={img.id} className="step3-asset-img-wrap">
                                <img src={img.url} alt={img.type} className="step3-asset-img" />
                                <span className="step3-asset-label">{img.type}</span>
                              </div>
                            ))}
                          </div>

                          {/* Video */}
                          {variant.assets.video && (
                            <div className="step3-asset-video-wrap">
                              <div className="step3-video-thumbnail">
                                <img src={variant.assets.video.thumbnail} alt="video" className="step3-asset-img" />
                                <div className="step3-play-overlay">
                                  <Play className="step3-play-icon" />
                                </div>
                                <span className="step3-video-duration">{variant.assets.video.duration}</span>
                              </div>
                              <span className="step3-asset-label">Video Ad</span>
                            </div>
                          )}

                          {/* Google Ads */}
                          <div className="step3-google-ads-section">
                            <h6 className="step3-google-ads-title">
                              <Layout className="step3-google-ads-icon" />
                              Google Ads Copy
                            </h6>
                            {variant.google_ad && (
                              <div className="step3-google-ad-preview">
                                <div className="step3-ad-headline">{variant.google_ad.headline}</div>
                                <div className="step3-ad-url">{variant.google_ad.displayUrl}</div>
                                <div className="step3-ad-description">{variant.google_ad.description}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Hook */}
                      <div className="step3-variant-hook">
                        <span className="step3-hook-label">Hook:</span>
                        <p className="step3-hook-text">"{variant.hook}"</p>
                      </div>

                      {/* Visual Direction */}
                      <div className="step3-variant-section">
                        <h5 className="step3-section-title-small">Visual Direction</h5>
                        <p className="step3-section-text">{variant.visual_direction}</p>
                      </div>

                      {/* Copy Angle */}
                      <div className="step3-variant-section">
                        <h5 className="step3-section-title-small">Copy Angle</h5>
                        <p className="step3-section-text">{variant.copy_angle}</p>
                      </div>

                      {/* CTA */}
                      <div className="step3-variant-cta-display">
                        <span className="step3-cta-label">CTA:</span>
                        <span className="step3-cta-text">{variant.cta}</span>
                      </div>

                      {/* Why High Performing */}
                      <div className="step3-why-high-performing">
                        <Star className="step3-why-icon" />
                        <p className="step3-why-text">{variant.why_high_performing}</p>
                      </div>

                      {/* Predicted Performance */}
                      <div className="step3-performance-metrics">
                        <div className="step3-perf-metric">
                          <span className="step3-perf-label">CTR</span>
                          <span className="step3-perf-value">{variant.predicted_performance.ctr}</span>
                        </div>
                        <div className="step3-perf-metric">
                          <span className="step3-perf-label">Engagement</span>
                          <span className="step3-perf-value">{variant.predicted_performance.engagement}</span>
                        </div>
                        <div className="step3-perf-metric">
                          <span className="step3-perf-label">Conv. Lift</span>
                          <span className="step3-perf-value green">{variant.predicted_performance.conversion_lift}</span>
                        </div>
                      </div>

                      {/* Actions: Select + Download side by side */}
                      <div className="step3-variant-actions-row">
                        <button
                          className={`step3-select-variant-btn ${isSelected ? 'selected' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectVariantForAudience(activeAudienceTab, variant.id);
                          }}
                        >
                          {isSelected ? (
                            <>
                              <CheckCircle className="btn-icon" /> Selected
                            </>
                          ) : (
                            'Select This Variant'
                          )}
                        </button>
                        <button
                          type="button"
                          className="step3-download-variant-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadAll(variant);
                          }}
                          title={`Download ${variant.name} assets`}
                        >
                          <Download className="btn-icon" />
                          Download
                        </button>
                      </div>
                    </>
                  )}
                </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* SELECTION PROGRESS */}
        <div className="step3-selection-progress">
          <div className="step3-progress-header">
            <h3>Selection Progress</h3>
            <span>{Object.keys(selectedVariantsByAudience).length} of {selectedAudiences.length} audiences complete</span>
          </div>
          <div className="step3-progress-bar">
            <div 
              className="step3-progress-fill"
              style={{ width: `${(Object.keys(selectedVariantsByAudience).length / selectedAudiences.length) * 100}%` }}
            />
          </div>
          {!areAllAudiencesComplete() && (
            <p className="step3-progress-hint">
              Select a variant from each audience tab to continue
            </p>
          )}
        </div>

        {/* GENERATE AI VARIANTS OPTION (Upload mode only) */}
        {creativeMode === 'upload' && !generating && (
          <div className="step3-compare-card">
            <Sparkles className="step3-compare-icon" />
            <div className="step3-compare-content">
              <h3 className="step3-compare-title">Want to see AI-optimized variants too?</h3>
              <p className="step3-compare-desc">
                Add AI-generated variants to each audience tab for comparison. 
                We'll create 4 additional variants per audience optimized by Transsuasion AI.
              </p>
              <button
                type="button"
                className="step3-compare-cta"
                onClick={handleGenerateForComparison}
              >
                <Sparkles className="btn-icon" />
                Add AI Variants ({selectedAudiences.length * 4} total)
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="form-actions">
          <button className="btn-secondary" onClick={() => {
            if (creativeMode === 'upload') {
              // Go back to upload view
              setGeneratedCreatives([]);
              setSelectedVariantsByAudience({});
              setActiveAudienceTab(null);
            } else {
              // Regenerate for create mode
              setGeneratedCreatives([]);
              setSelectedVariantsByAudience({});
              setActiveAudienceTab(null);
              setShowAudiencePreview(true);
            }
          }}>
            <ArrowLeft className="btn-icon" />
            {creativeMode === 'upload' ? 'Back to Uploads' : 'Regenerate'}
          </button>
          <button
            className="btn-primary"
            onClick={handleContinue}
            disabled={!areAllAudiencesComplete()}
          >
            Complete Campaign Strategy
            <ArrowRight className="btn-icon" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default Step3_CreativeIntelligence;