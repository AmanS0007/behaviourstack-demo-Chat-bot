import React, { useState, useEffect } from 'react';
import { useAI } from '../../context/AIContext';
import { Home, Upload, Brain, ArrowRight, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import ChatPanel from '../chat/ChatPanel';
import '../../styles/PresentationFlow.css';
import '../../styles/Steps.css';

function PerformanceDebugFlow({ onExit }) {
  const { updateContext, setIsChatOpen } = useAI();
  const [step, setStep] = useState('upload'); // 'upload', 'analyzing', 'results'
  const [campaignData, setCampaignData] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);

  // FIRST: Initialize context on flow entry
  useEffect(() => {
    console.log('🔧 Performance Debug Flow - ENTRY');
    updateContext({
      currentFlow: 'performance-debug',
      currentStep: 'campaign-upload',
      visibleComponents: {},
      campaignData: null,
      diagnosis: null,
      availableActions: []
    });
    setIsChatOpen(true);
  }, []); // Empty deps - only run on mount

  // SECOND: Update context when step or data changes
  useEffect(() => {
    console.log('🔧 Performance Debug - Step Update:', {
      step,
      stepName: step === 'upload' ? 'campaign-upload' : 
                step === 'analyzing' ? 'analyzing-performance' : 
                'diagnosis-results'
    });

    updateContext({
      currentFlow: 'performance-debug',
      currentStep: step === 'upload' ? 'campaign-upload' : 
                   step === 'analyzing' ? 'analyzing-performance' : 
                   'diagnosis-results',
      campaignData: campaignData,
      diagnosis: diagnosis,
      visibleComponents: step === 'results' ? {
        kpis: campaignData,
        diagnosis: diagnosis
      } : {},
      availableActions: [
        'explain_diagnosis',
        'suggest_recovery',
        'explain_metrics',
        'compare_benchmarks'
      ]
    });
  }, [step, campaignData, diagnosis, updateContext]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStep('analyzing');

    // Simulate analysis
    setTimeout(() => {
      const mockCampaignData = {
        name: file.name,
        spend: '$45,200',
        impressions: '2.3M',
        clicks: '68,400',
        conversions: '3,240',
        ctr: '2.97%',
        cpa: '$13.95',
        conversionRate: '4.74%'
      };

      const mockDiagnosis = {
        issue: 'Creative Fatigue Detected',
        severity: 'High',
        confidence: 0.89,
        root_cause: 'Ad creative has been running for 47 days with declining CTR (-32% in last 14 days). Audience is experiencing banner blindness.',
        recommendation: 'Rotate in 2-3 new creative variants immediately. Test different hooks and visual styles.',
        expected_improvement: '+45-60% CTR recovery within 7 days',
        recovery_actions: [
          'Pause current creative immediately',
          'Deploy new creative variants (upload or generate)',
          'Implement A/B testing framework',
          'Set up automated creative rotation schedule'
        ],
        affected_audiences: [
          { name: 'Coffee Enthusiasts', impact: 'High', ctr_drop: '-38%' },
          { name: 'Busy Commuters', impact: 'Medium', ctr_drop: '-24%' }
        ],
        kpi_deltas: {
          ctr: { previous: '4.3%', current: '2.97%', change: -31 },
          cpa: { previous: '$9.80', current: '$13.95', change: +42 },
          conversionRate: { previous: '6.1%', current: '4.74%', change: -22 }
        }
      };

      setCampaignData(mockCampaignData);
      setDiagnosis(mockDiagnosis);
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
          <h2 className="flow-title">Performance Debugging</h2>
        </div>
      </div>

      {/* Content with chat margin */}
      <div className="presentation-content with-chat">
        <div className="step-container">
          {/* Upload Step */}
          {step === 'upload' && (
            <>
              <div className="step-header">
                <h1 className="step-title">Connect Your Campaign</h1>
                <p className="step-description">
                  Upload campaign data or connect your ad platform for AI-powered diagnosis
                </p>
              </div>

              <div className="upload-zone">
                <Upload className="upload-icon" />
                <h3 className="upload-title">Upload Campaign Data</h3>
                <p className="upload-desc">
                  CSV, Excel, or direct platform export (Google Ads, Meta, TikTok)
                </p>
                <label className="upload-btn">
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  Choose File
                </label>
                
                <div className="or-divider">
                  <span>or connect directly</span>
                </div>

                <div className="platform-buttons">
                  <button className="platform-btn" onClick={() => alert('Google Ads integration coming soon')}>
                    <img src="https://www.google.com/favicon.ico" alt="Google" />
                    Google Ads
                  </button>
                  <button className="platform-btn" onClick={() => alert('Meta Ads integration coming soon')}>
                    <img src="https://www.facebook.com/favicon.ico" alt="Meta" />
                    Meta Ads
                  </button>
                  <button className="platform-btn" onClick={() => alert('TikTok Ads integration coming soon')}>
                    <img src="https://www.tiktok.com/favicon.ico" alt="TikTok" />
                    TikTok Ads
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Analyzing Step */}
          {step === 'analyzing' && (
            <div className="analyzing-state">
              <div className="analyzing-icon">
                <Brain className="icon spinning" />
              </div>
              <h2 className="analyzing-title">LCBM Analyzing Campaign Performance...</h2>
              <p className="analyzing-desc">
                Running AI diagnosis on creative performance, audience behavior, and funnel metrics
              </p>
              <div className="progress-bar-anim">
                <div className="progress-fill" />
              </div>
            </div>
          )}

          {/* Results Step */}
          {step === 'results' && diagnosis && (
            <>
              <div className="step-header">
                <h1 className="step-title">Performance Diagnosis Complete</h1>
                <p className="step-description">
                  Campaign: {campaignData?.name}
                </p>
              </div>

              {/* Campaign Overview */}
              <div className="model-output-box">
                <div className="model-header">
                  <Brain className="model-icon" />
                  <div>
                    <h3 className="model-title">Campaign Overview</h3>
                    <p className="model-subtitle">Current Performance Snapshot</p>
                  </div>
                </div>
                <div className="campaign-stats-grid">
                  <div className="stat-item-debug">
                    <span className="stat-label-debug">Total Spend</span>
                    <span className="stat-value-debug">{campaignData.spend}</span>
                  </div>
                  <div className="stat-item-debug">
                    <span className="stat-label-debug">Impressions</span>
                    <span className="stat-value-debug">{campaignData.impressions}</span>
                  </div>
                  <div className="stat-item-debug">
                    <span className="stat-label-debug">Clicks</span>
                    <span className="stat-value-debug">{campaignData.clicks}</span>
                  </div>
                  <div className="stat-item-debug">
                    <span className="stat-label-debug">Conversions</span>
                    <span className="stat-value-debug">{campaignData.conversions}</span>
                  </div>
                </div>
              </div>

              {/* KPI Delta Cards */}
              <div className="kpi-delta-section">
                <h3 className="section-title-inline">
                  <TrendingUp className="inline-icon" />
                  KPI Performance Changes
                </h3>
                <div className="kpi-delta-grid">
                  {Object.entries(diagnosis.kpi_deltas).map(([key, data]) => (
                    <div key={key} className={`kpi-delta-card ${data.change < 0 ? 'negative' : 'positive'}`}>
                      <div className="kpi-name">{key.toUpperCase()}</div>
                      <div className="kpi-values">
                        <span className="kpi-previous">{data.previous}</span>
                        <span className="kpi-arrow">→</span>
                        <span className="kpi-current">{data.current}</span>
                      </div>
                      <div className={`kpi-change ${data.change < 0 ? 'bad' : 'good'}`}>
                        {data.change > 0 ? '+' : ''}{data.change}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Affected Audiences */}
              <div className="affected-audiences-section">
                <h3 className="section-title-inline">
                  <AlertTriangle className="inline-icon" />
                  Underperforming Audiences
                </h3>
                <div className="affected-audiences-grid">
                  {diagnosis.affected_audiences.map((aud, idx) => (
                    <div key={idx} className="affected-audience-card">
                      <div className="audience-header-perf">
                        <span className="audience-name-perf">{aud.name}</span>
                        <span className={`impact-badge ${aud.impact.toLowerCase()}`}>
                          {aud.impact} Impact
                        </span>
                      </div>
                      <div className="ctr-drop">{aud.ctr_drop} CTR decline</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagnosis */}
              <div className="diagnosis-card-debug">
                <div className="diagnosis-header-debug">
                  <AlertTriangle className="diag-icon-debug" />
                  <div>
                    <h3 className="diag-title-debug">{diagnosis.issue}</h3>
                    <span className={`diag-severity ${diagnosis.severity.toLowerCase()}`}>
                      Severity: {diagnosis.severity} • {Math.round(diagnosis.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>

                <div className="diagnosis-sections-debug">
                  <div className="diag-section-debug">
                    <h4 className="diag-section-title">Root Cause</h4>
                    <p className="diag-section-text">{diagnosis.root_cause}</p>
                  </div>

                  <div className="diag-section-debug">
                    <h4 className="diag-section-title">Recommendation</h4>
                    <p className="diag-section-text">{diagnosis.recommendation}</p>
                  </div>

                  <div className="expected-improvement-debug">
                    <TrendingUp className="improvement-icon" />
                    <span>{diagnosis.expected_improvement}</span>
                  </div>
                </div>
              </div>

              {/* Recovery Actions */}
              <div className="recovery-actions-debug">
                <h3 className="recovery-title-debug">
                  <CheckCircle className="recovery-icon-debug" />
                  Recommended Actions
                </h3>
                <div className="actions-list-debug">
                  {diagnosis.recovery_actions.map((action, idx) => (
                    <div key={idx} className="action-item-debug">
                      <div className="action-number">{idx + 1}</div>
                      <span className="action-text">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button className="btn-primary" onClick={() => alert('Export functionality coming soon')}>
                <ArrowRight className="btn-icon" />
                Export Full Diagnosis Report
              </button>
            </>
          )}
        </div>
      </div>

      <ChatPanel />
    </div>
  );
}

export default PerformanceDebugFlow;