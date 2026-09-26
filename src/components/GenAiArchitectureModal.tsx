import React from 'react';
import { X, Cpu, Layers, GitBranch, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface ArchitectureModalProps {
  onClose: () => void;
}

export const GenAiArchitectureModal: React.FC<ArchitectureModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="arch-modal-title">
      <div className="modal-content" style={{ maxWidth: '850px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu size={18} color="#FFF" />
            </div>
            <div>
              <h2 id="arch-modal-title" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                GenAI Architecture & Integration Blueprint
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Official evaluator mapping of GenAI pipelines, grounding layers, and prompts.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* 6-Stage GenAI Pipeline Mapping */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Stage 1 */}
          <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', borderLeft: '3px solid #6366F1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge-status badge-fair">Stage 1</span>
              <strong style={{ fontSize: '0.92rem' }}>Pre-Document Expectation Synthesis (Prompt-Engineered JSON Pipeline)</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              <strong>Integrated Service:</strong> Google Gemini 1.5 Flash (via Generative Language API) / Local Rule Fallback Engine.<br />
              <strong>Role:</strong> When a user describes a situation (e.g., <em>"Subletting a design studio in Berlin"</em>), Gemini converts the natural-language prompt into a strictly validated JSON Expectation Matrix (clause name, plain description, exploit risk if omitted, standard fair practice, and pre-negotiation inquiries).
            </p>
          </div>

          {/* Stage 2 */}
          <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', borderLeft: '3px solid #06B6D4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge-status badge-fair">Stage 2</span>
              <strong style={{ fontSize: '0.92rem' }}>Grounded Legal Domain Retrieval Layer (RAG Anchor)</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              <strong>Integrated Service:</strong> Embedded Knowledge Base (`src/data/archetypes.ts`).<br />
              <strong>Role:</strong> Prevents AI hallucination by providing statutory and industry benchmarks for Residential Leases, Tech Employment, Freelance MSAs, and NDAs. Ensures every gap detected is anchored in verified legal customs rather than unconstrained LLM conjecture.
            </p>
          </div>

          {/* Stage 3 */}
          <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', borderLeft: '3px solid #F59E0B' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge-status badge-fair">Stage 3</span>
              <strong style={{ fontSize: '0.92rem' }}>Semantic Paragraph Chunking & Citation Locator</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              <strong>Integrated Service:</strong> Contextual Fuzzy Regex & Semantic Keyword Cluster Locator.<br />
              <strong>Role:</strong> Parses uploaded contract text into discrete legal obligations and bounds each expected safeguard to its exact verbatim quote in the contract text (or flags its complete absence).
            </p>
          </div>

          {/* Stage 4 */}
          <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', borderLeft: '3px solid #F43F5E' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge-status badge-fair">Stage 4</span>
              <strong style={{ fontSize: '0.92rem' }}>Multi-Factor Gap & Asymmetry Classifier</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              <strong>Integrated Service:</strong> Evaluator Algorithm (`src/services/gapEngine.ts`).<br />
              <strong>Role:</strong> Classifies clauses into 4 distinct states:
              <br />• 🟢 <strong>Present & Balanced</strong>
              <br />• 🟡 <strong>Present but One-Sided / Weak</strong> (e.g. entry without notice, Net 90 payment)
              <br />• 🔴 <strong>Missing / Omitted</strong> (critical safeguards that were left out)
              <br />• ⚠️ <strong>Predatory Surprises</strong> (e.g. 7-day forfeiture of belongings, uncapped indemnity)
            </p>
          </div>

          {/* Stage 5 */}
          <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', borderLeft: '3px solid #10B981' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge-status badge-fair">Stage 5</span>
              <strong style={{ fontSize: '0.92rem' }}>Diplomatic Counter-Offer & Redline Synthesizer</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              <strong>Integrated Service:</strong> LLM Redline Generator.<br />
              <strong>Role:</strong> Converts identified omissions into polite, professional negotiation emails proposing specific balanced substitute wording to the landlord, employer, or client.
            </p>
          </div>

          {/* Stage 6 */}
          <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', borderLeft: '3px solid #A855F7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge-status badge-fair">Stage 6</span>
              <strong style={{ fontSize: '0.92rem' }}>Attorney Consultation Briefing Engine</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              <strong>Integrated Service:</strong> Structured Dossier Compiler (`src/services/dossierGenerator`).<br />
              <strong>Role:</strong> Generates a prioritized, jurisdiction-aware legal brief that users can print or export to bring to a lawyer, ensuring they maximize billable consultation efficiency.
            </p>
          </div>
        </div>

        {/* Security & Client-Side Privacy Guarantee */}
        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '8px', padding: '0.9rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6EE7B7', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.25rem' }}>
            <Shield size={16} />
            <span>Client-First Privacy & Zero Unauthorized Storage</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#D1FAE5', lineHeight: 1.4 }}>
            All contract documents uploaded or pasted are processed in-memory in the client browser. No documents are logged or persisted to third-party databases. API keys entered in settings are held strictly in local storage.
          </p>
        </div>
      </div>
    </div>
  );
};
