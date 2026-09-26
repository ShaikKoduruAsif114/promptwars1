import React, { useState, useCallback, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { LegalDisclaimerBanner } from './components/LegalDisclaimerBanner';
import { DocumentUploader } from './components/DocumentUploader';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { PreNegotiationExpectations } from './components/PreNegotiationExpectations';
import { ContractComparisonView } from './components/ContractComparisonView';
import { DocumentChatNavigator } from './components/DocumentChatNavigator';
import { analyzeDocumentGaps, validateLegalDocument } from './services/gapEngine';
import { AnalysisResult, LegalDomain } from './types/legal';
import { SAMPLE_CONTRACTS } from './data/samples';
import confetti from 'canvas-confetti';

const LawyerDossierModal = lazy(() => import('./components/LawyerDossierModal').then(module => ({ default: module.LawyerDossierModal })));
const CounterOfferModal = lazy(() => import('./components/CounterOfferModal').then(module => ({ default: module.CounterOfferModal })));
const GenAiArchitectureModal = lazy(() => import('./components/GenAiArchitectureModal').then(module => ({ default: module.GenAiArchitectureModal })));
const SettingsModal = lazy(() => import('./components/SettingsModal').then(module => ({ default: module.SettingsModal })));
const HowToUseModal = lazy(() => import('./components/HowToUseModal').then(module => ({ default: module.HowToUseModal })));
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gap_detector' | 'expectations' | 'compare' | 'chat'>('gap_detector');
  
  // Default to the first sample document so user can immediately experience results or upload their own
  const defaultSample = SAMPLE_CONTRACTS[0];
  const [documentText, setDocumentText] = useState(defaultSample.content);
  const [currentDomain, setCurrentDomain] = useState<LegalDomain>('rental');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(() => {
    return analyzeDocumentGaps(defaultSample.content, 'rental', defaultSample.title);
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Modal triggers
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLawyerDossier, setShowLawyerDossier] = useState(false);
  const [showCounterOffer, setShowCounterOffer] = useState(false);

  const handleRunAnalysis = useCallback((text: string, domain: LegalDomain, title: string) => {
    setValidationError(null);

    // Validate that input is actually a legal document
    const validation = validateLegalDocument(text);
    if (!validation.valid) {
      setValidationError(validation.reason || 'This does not appear to be a legal document.');
      return;
    }

    setIsAnalyzing(true);
    setDocumentText(text);
    setCurrentDomain(domain);

    setTimeout(() => {
      const result = analyzeDocumentGaps(text, domain, title);
      setAnalysis(result);
      setIsAnalyzing(false);
      setActiveTab('gap_detector');

      if (result.protectionScore >= 75) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    }, 450);
  }, []);

  const handleSelectArchetypeToAnalyze = useCallback((domain: LegalDomain) => {
    setCurrentDomain(domain);
    const matchingSample = SAMPLE_CONTRACTS.find(s => s.domain === domain) || defaultSample;
    setDocumentText(matchingSample.content);
    const result = analyzeDocumentGaps(matchingSample.content, domain, matchingSample.title);
    setAnalysis(result);
    setActiveTab('gap_detector');
  }, [defaultSample]);

  return (
    <div className="app-container">
      {/* Skip to Main Content Link for Screen Readers & Keyboard Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenHowToUse={() => setShowHowToUse(true)}
        onOpenArchitecture={() => setShowArchitecture(true)}
        onOpenSettings={() => setShowSettings(true)}
      />

      <main id="main-content" className="main-content" role="main">
        <LegalDisclaimerBanner />

        {activeTab === 'gap_detector' && (
          <section
            role="tabpanel"
            id="panel-gap-detector"
            aria-labelledby="tab-gap-detector"
            tabIndex={0}
          >
            {analysis ? (
              <AnalysisDashboard
                analysis={analysis}
                onReset={() => setAnalysis(null)}
                onOpenLawyerDossier={() => setShowLawyerDossier(true)}
                onOpenCounterOffer={() => setShowCounterOffer(true)}
              />
            ) : (
              <DocumentUploader
                initialDomain={currentDomain}
                onAnalyze={handleRunAnalysis}
                isAnalyzing={isAnalyzing}
                validationError={validationError}
                onClearError={() => setValidationError(null)}
              />
            )}
          </section>
        )}

        {activeTab === 'expectations' && (
          <section
            role="tabpanel"
            id="panel-expectations"
            aria-labelledby="tab-expectations"
            tabIndex={0}
          >
            <PreNegotiationExpectations
              onSelectArchetypeToAnalyze={handleSelectArchetypeToAnalyze}
            />
          </section>
        )}

        {activeTab === 'compare' && (
          <section
            role="tabpanel"
            id="panel-compare"
            aria-labelledby="tab-compare"
            tabIndex={0}
          >
            <ContractComparisonView />
          </section>
        )}

        {activeTab === 'chat' && (
          <section
            role="tabpanel"
            id="panel-chat"
            aria-labelledby="tab-chat"
            tabIndex={0}
          >
            {analysis ? (
              <DocumentChatNavigator
                analysis={analysis}
                documentText={documentText}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Please upload a document or select an archetype in the Gap Detector first to chat with it.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveTab('gap_detector')}
                >
                  Go to Gap Detector
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Modals */}
      <Suspense fallback={null}>
        {showHowToUse && (
          <HowToUseModal
            onClose={() => setShowHowToUse(false)}
            onNavigateTab={(t) => setActiveTab(t)}
          />
        )}

        {showArchitecture && (
          <GenAiArchitectureModal onClose={() => setShowArchitecture(false)} />
        )}

        {showSettings && (
          <SettingsModal onClose={() => setShowSettings(false)} />
        )}

        {showLawyerDossier && analysis && (
          <LawyerDossierModal
            analysis={analysis}
            onClose={() => setShowLawyerDossier(false)}
          />
        )}

        {showCounterOffer && analysis && (
          <CounterOfferModal
            analysis={analysis}
            onClose={() => setShowCounterOffer(false)}
          />
        )}
      </Suspense>

      <footer className="app-footer" role="contentinfo">
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <strong>LexiGap AI</strong> — Pre-Negotiation Legal Gap Detector & Accessible Copilot.
          </div>
          <div>
            Designed for GenAI Hackathon Competition · Clean Repo &lt; 10 MB · Client-Side Privacy Guaranteed.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
