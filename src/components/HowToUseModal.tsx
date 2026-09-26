import React, { useEffect } from 'react';
import { X, BookOpen, Sparkles, Shield, GitCompare, MessageSquare, ArrowRight, FileCheck, CheckCircle2 } from 'lucide-react';

interface HowToUseModalProps {
  onClose: () => void;
  onNavigateTab?: (tab: 'gap_detector' | 'expectations' | 'compare' | 'chat') => void;
}

export const HowToUseModal: React.FC<HowToUseModalProps> = ({ onClose, onNavigateTab }) => {
  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const steps = [
    {
      step: '01',
      title: 'Synthesize Pre-Contract Expectations',
      icon: Sparkles,
      color: '#6366F1',
      tab: 'expectations' as const,
      description: 'Before even reading an agreement, explore what a standard fair agreement in your category MUST contain. Choose from pre-configured archetypes (Rental Leases, Startup Employment, Freelance MSAs, NDAs) or enter a custom prompt like "Renting a commercial kitchen in Berlin" to generate a tailored expectation checklist.',
      highlight: 'Prevents you from anchored bias by defining what fair looks like first.'
    },
    {
      step: '02',
      title: 'Upload Contract & Detect Gaps',
      icon: Shield,
      color: '#06B6D4',
      tab: 'gap_detector' as const,
      description: 'Paste your contract text or load one of our realistic sample contracts. LexiGap scans for what is MISSING, what is present but one-sided (e.g. entry without notice, unilateral termination), and predatory traps (e.g. forfeiture of property, uncapped indemnity).',
      highlight: 'Generates a 0–100 Protection Score and transparent clause-by-clause breakdown.'
    },
    {
      step: '03',
      title: 'Compare Contract Versions (Diff Battle)',
      icon: GitCompare,
      color: '#F59E0B',
      tab: 'compare' as const,
      description: 'Upload your original draft alongside a revised or redlined version. LexiGap runs side-by-side gap scoring to immediately show resolved issues (+ points) and newly introduced vulnerabilities (- points).',
      highlight: 'Instantly answers: "Did this revised revision actually fix my concerns?"'
    },
    {
      step: '04',
      title: 'Ask Questions in Plain English',
      icon: MessageSquare,
      color: '#10B981',
      tab: 'chat' as const,
      description: 'Use the Document Navigator Q&A to ask plain-English questions like "Can they kick me out without notice?" or "What happens to my security deposit?". The engine quotes verbatim contract sentences and highlights omitted rights.',
      highlight: 'No legal jargon—just clear answers with exact document citations.'
    },
    {
      step: '05',
      title: 'Export Counter-Offer & Attorney Dossier',
      icon: FileCheck,
      color: '#A855F7',
      tab: 'gap_detector' as const,
      description: 'Once analyzed, click "Draft Counter-Offer" to get a diplomatic, professional negotiation email with balanced substitute wording, or click "Lawyer Prep Dossier" to export a prioritized briefing to bring to legal counsel.',
      highlight: 'Turns issue-spotting into immediate negotiation leverage.'
    }
  ];

  return (
    <div 
      className="modal-overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="how-to-use-title"
      onClick={onClose}
    >
      <div 
        className="modal-content" 
        style={{ maxWidth: '840px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} color="#FFF" />
            </div>
            <div>
              <h2 id="how-to-use-title" style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                How to Use LexiGap AI
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Step-by-step guide to uncovering omitted clauses and negotiating fair agreements.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            aria-label="Close how to use guide"
          >
            <X size={18} />
          </button>
        </div>

        {/* Workflow Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div 
                key={st.step}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1.1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  borderLeft: `4px solid ${st.color}`
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${st.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: st.color }}>
                    <Icon size={18} />
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                    {st.step}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '0.96rem', fontWeight: 700, margin: 0 }}>
                      {st.title}
                    </h3>
                    {onNavigateTab && (
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}
                        onClick={() => {
                          onNavigateTab(st.tab);
                          onClose();
                        }}
                      >
                        <span>Open View</span>
                        <ArrowRight size={12} />
                      </button>
                    )}
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.45rem' }}>
                    {st.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.76rem', color: st.color }}>
                    <CheckCircle2 size={13} />
                    <strong>Key Benefit:</strong> {st.highlight}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Three Golden Rules of Contract Review */}
        <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#A5B4FC', marginBottom: '0.45rem' }}>
            💡 Three Golden Rules for Negotiating
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#E0E7FF', lineHeight: 1.6 }}>
            <li><strong>Silence Favors the Drafter:</strong> If an agreement doesn't specify when a deposit must be returned or how notice must be served, statutory limits or landlord discretion govern. Always insert explicit deadlines.</li>
            <li><strong>Never Accept Unilateral Terms:</strong> Every right given to the counterparty (e.g., termination without cause, IP assignment, inspection) should have an equivalent, fair mutual safeguard for you.</li>
            <li><strong>Use Diplomatic Redlines:</strong> Frame requested additions not as hostile pushback, but as standard clarifications ensuring mutual peace of mind.</li>
          </ul>
        </div>

        {/* Footer actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            className="btn btn-primary"
            onClick={onClose}
          >
            Got it, Let's Begin!
          </button>
        </div>
      </div>
    </div>
  );
};
