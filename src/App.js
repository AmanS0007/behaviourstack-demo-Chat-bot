import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import NewCampaignFlow from './components/flows/NewCampaignFlow';
import PerformanceDebugFlow from './components/flows/PerformanceDebugFlow';
import RegionalExpansionFlow from './components/flows/RegionalExpansionFlow';
import { PresentationProvider } from './context/PresentationContext';
import { AIProvider } from './context/AIContext'; // ADD THIS
import './styles/global.css';

function App() {
  const [activeFlow, setActiveFlow] = useState(null);

  const handleStartFlow = (flow) => {
    setActiveFlow(flow);
  };

  const handleExitFlow = () => {
    setActiveFlow(null);
  };

  return (
    <PresentationProvider>
      <AIProvider> {/* ADD THIS WRAPPER */}
        {!activeFlow ? (
          <LandingPage onStart={handleStartFlow} />
        ) : activeFlow === 'new-campaign' ? (
          <NewCampaignFlow onExit={handleExitFlow} />
        ) : activeFlow === 'performance-debug' ? (
          <PerformanceDebugFlow onExit={handleExitFlow} />
        ) : activeFlow === 'regional-expansion' ? (
          <RegionalExpansionFlow onExit={handleExitFlow} />
        ) : null}
      </AIProvider>
    </PresentationProvider>
  );
}

export default App;