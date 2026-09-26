import React, { useState } from 'react';
import { DOMAIN_ARCHETYPES } from '../data/archetypes';
import { ExpectedClause, LegalDomain } from '../types/legal';
import { generateExpectationsForCustomSituation } from '../services/aiService';
import { 
  Home, 
  Briefcase, 
  Code, 
  Shield, 
  Server, 
  Sparkles, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Loader2
} from 'lucide-react';

interface PreNegotiationProps {
  onSelectArchetypeToAnalyze: (domain: LegalDomain) => void;
}

export const PreNegotiationExpectations: React.FC<PreNegotiationProps> = ({
  onSelectArchetypeToAnalyze
}) => {
  const [selectedDomain, setSelectedDomain] = useState<LegalDomain>('rental');
  const [customInput, setCustomInput] = useState('');
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [customClauses, setCustomClauses] = useState<ExpectedClause[] | null>(null);

  const archetype = DOMAIN_ARCHETYPES[selectedDomain] || DOMAIN_ARCHETYPES.rental;
  const clausesToDisplay = customClauses || archetype.expectedClauses;

  const handleCustomGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setIsLoadingCustom(true);
    try {
      const generated = await generateExpectationsForCustomSituation(customInput);
      setCustomClauses(generated);
    } finally {
      setIsLoadingCustom(false);
    }
  };

  const handleSelectDomain = (dom: LegalDomain) => {
    setSelectedDomain(dom);
    setCustomClauses(null);
  };

  const getDomainIcon = (dom: LegalDomain) => {
    switch (dom) {
      case 'rental': return <Home size={18} />;
      case 'employment': return <Briefcase size={18} />;
      case 'freelance': return <Code size={18} />;
      case 'nda': return <Shield size={18} />;
      case 'consumer_saas': return <Server size={18} />;
      default: return <Sparkles size={18} />;
    }
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Know What You're Missing <span style={{ color: 'var(--indigo-primary)' }}>Before</span> You Sign
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto', fontSize: '0.98rem' }}>
          Most people get trapped in bad contracts not by what is written, but by <strong>what was quietly omitted</strong>.
          Explore the standard protective baseline for your situation before receiving or signing an agreement.
        </p>
      </div>

      {/* Preset Domain Pickers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        {(['rental', 'employment', 'freelance', 'nda', 'consumer_saas'] as LegalDomain[]).map(dom => {
          const arch = DOMAIN_ARCHETYPES[dom];
          const isSelected = selectedDomain === dom && !customClauses;
          return (
            <button
              key={dom}
              onClick={() => handleSelectDomain(dom)}
              className={`glass-card ${isSelected ? 'active-archetype' : ''}`}
              style={{
                cursor: 'pointer',
                textAlign: 'left',
                border: isSelected ? '1px solid var(--indigo-primary)' : '1px solid var(--border-subtle)',
                background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-card)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isSelected ? '#A5B4FC' : 'var(--text-secondary)' }}>
                {getDomainIcon(dom)}
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? '#FFFFFF' : 'var(--text-primary)' }}>
                  {arch.title.split('/')[0]}
                </span>
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                {arch.tagline.slice(0, 75)}...
              </p>
            </button>
          );
        })}
      </div>

      {/* Custom Situation Generator */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.25rem 1.5rem' }}>
        <form onSubmit={handleCustomGenerate} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Sparkles size={20} style={{ color: 'var(--indigo-primary)', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: '260px' }}>
            <label htmlFor="custom-situation-input" style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
              Have an unlisted or niche situation? Describe it in plain words:
            </label>
            <input
              id="custom-situation-input"
              type="text"
              className="input-text"
              placeholder="e.g. Leasing a food truck stall in Austin, or joining a seed startup with profit share"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoadingCustom || !customInput.trim()}
            style={{ marginTop: '1.2rem' }}
          >
            {isLoadingCustom ? (
              <>
                <Loader2 size={16} className="spin-animate" />
                <span>Generating Matrix...</span>
              </>
            ) : (
              <>
                <span>Generate Custom Expectations</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Expectation Matrix Header & CTA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              {customClauses ? `Custom Expectations: "${customInput}"` : archetype.title}
            </span>
            <span className="logo-tag">
              {clausesToDisplay.length} Standard Safeguards
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {customClauses ? 'AI-grounded expectation checklist' : archetype.commonTrapSummary}
          </p>
        </div>

        <button
          className="btn btn-emerald"
          onClick={() => onSelectArchetypeToAnalyze(selectedDomain)}
        >
          <span>Have a Document? Scan It Now</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Clause Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '1.25rem' }}>
        {clausesToDisplay.map((clause, idx) => (
          <div key={clause.id || idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {idx + 1}. {clause.name}
                </span>
                <span className={`badge-status ${clause.importance === 'essential' ? 'badge-missing' : 'badge-weak'}`}>
                  {clause.importance}
                </span>
              </div>

              <div style={{ marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                  What it means:
                </span>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {clause.plainDescription}
                </p>
              </div>

              <div style={{ background: 'rgba(244, 63, 94, 0.08)', borderLeft: '3px solid #F43F5E', padding: '0.65rem 0.85rem', borderRadius: '4px', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FDA4AF', fontSize: '0.74rem', fontWeight: 700 }}>
                  <AlertCircle size={14} />
                  <span>EXPLOITATION RISK IF OMITTED:</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#FFE4E6', marginTop: '0.25rem', lineHeight: 1.4 }}>
                  {clause.exploitIfMissing}
                </p>
              </div>
            </div>

            <div>
              <div className="remedy-box" style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.74rem', color: '#6EE7B7' }}>
                  <CheckCircle2 size={14} />
                  <span>RECOMMENDED FAIR STANDARD:</span>
                </div>
                <p style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: '#D1FAE5' }}>
                  "{clause.standardFairPractice}"
                </p>
              </div>

              <div className="question-pill-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.74rem', color: '#C7D2FE' }}>
                  <HelpCircle size={14} />
                  <span>PRE-NEGOTIATION QUESTION TO ASK:</span>
                </div>
                <p style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: '#E0E7FF' }}>
                  "{clause.preNegotiationTip}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
