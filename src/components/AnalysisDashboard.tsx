import React, { useState } from 'react';
import { AnalysisResult } from '../types/legal';
import { 
  ShieldAlert, 
  AlertTriangle, 
  HelpCircle, 
  FileText, 
  Mail, 
  CheckSquare, 
  Square, 
  ArrowLeft,
  Quote
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DashboardProps {
  analysis: AnalysisResult;
  onReset: () => void;
  onOpenLawyerDossier: () => void;
  onOpenCounterOffer: () => void;
}

export const AnalysisDashboard: React.FC<DashboardProps> = ({
  analysis,
  onReset,
  onOpenLawyerDossier,
  onOpenCounterOffer
}) => {
  const [filter, setFilter] = useState<'all' | 'missing' | 'weak' | 'predatory' | 'fair'>('all');
  const [checklist, setChecklist] = useState(analysis.actionChecklist);

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
      const allDone = updated.every(item => item.completed);
      if (allDone) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      }
      return updated;
    });
  };

  const filteredGaps = analysis.gaps.filter(gap => {
    if (filter === 'all') return true;
    return gap.status === filter;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 55) return '#F59E0B';
    return '#F43F5E';
  };

  return (
    <div className="fade-in">
      {/* Top Navigation & Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={onReset}
        >
          <ArrowLeft size={16} />
          <span>Upload Another Document</span>
        </button>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-emerald btn-sm"
            onClick={onOpenCounterOffer}
          >
            <Mail size={15} />
            <span>Draft Polite Counter-Offer</span>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={onOpenLawyerDossier}
          >
            <FileText size={15} />
            <span>Export Lawyer Prep Dossier</span>
          </button>
        </div>
      </div>

      {/* Hero Score Box */}
      <div className="score-hero-box">
        <div className="score-circle-wrap">
          <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="3.2"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={getScoreColor(analysis.protectionScore)}
              strokeWidth="3.2"
              strokeDasharray={`${analysis.protectionScore}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <span className="score-number" style={{ color: getScoreColor(analysis.protectionScore) }}>
              {analysis.protectionScore}
            </span>
            <div className="score-label">Fairness Index</div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              {analysis.documentTitle}
            </h2>
            <span
              className="badge-status"
              style={{
                background: analysis.protectionScore >= 80 ? 'var(--status-fair-bg)' : analysis.protectionScore >= 55 ? 'var(--status-weak-bg)' : 'var(--status-missing-bg)',
                color: getScoreColor(analysis.protectionScore),
                border: `1px solid ${getScoreColor(analysis.protectionScore)}`
              }}
            >
              {analysis.overallVerdict}
            </span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.75rem' }}>
            {analysis.executiveSummary}
          </p>

          <div className="metrics-breakdown">
            <div className="metric-pill">
              <div className="metric-val" style={{ color: '#34D399' }}>{analysis.fairCount}</div>
              <div className="metric-name">Balanced Clauses</div>
            </div>
            <div className="metric-pill">
              <div className="metric-val" style={{ color: '#FBBF24' }}>{analysis.weakCount}</div>
              <div className="metric-name">One-Sided / Weak</div>
            </div>
            <div className="metric-pill">
              <div className="metric-val" style={{ color: '#FB7185' }}>{analysis.missingCount}</div>
              <div className="metric-name">Omitted Safeguards</div>
            </div>
            <div className="metric-pill">
              <div className="metric-val" style={{ color: '#C084FC' }}>{analysis.sneakyClauses.length}</div>
              <div className="metric-name">Predatory Traps</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sneaky Predatory Traps Warning (if any) */}
      {analysis.sneakyClauses.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F43F5E', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <AlertTriangle size={18} />
            <span>High-Severity Surprise Clauses Detected</span>
          </h3>
          {analysis.sneakyClauses.map((sneak) => (
            <div
              key={sneak.id}
              className="glass-card"
              style={{
                borderLeft: '4px solid #F43F5E',
                background: 'rgba(244, 63, 94, 0.06)',
                marginBottom: '0.75rem',
                padding: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFE4E6' }}>
                  ⚡ {sneak.title}
                </span>
                <span className="badge-status badge-missing">
                  Critical Vulnerability
                </span>
              </div>
              <div className="gap-quote-box">
                <Quote size={13} style={{ display: 'inline', marginRight: '0.35rem', opacity: 0.7 }} />
                "{sneak.exactQuote}"
              </div>
              <p style={{ fontSize: '0.84rem', color: '#CBD5E1', marginBottom: '0.5rem' }}>
                <strong>The Hidden Risk:</strong> {sneak.hiddenRisk}
              </p>
              <p style={{ fontSize: '0.84rem', color: '#6EE7B7' }}>
                <strong>Recommended Action:</strong> {sneak.suggestedAction}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Main Analysis Panes */}
      <div className="grid-2col">
        {/* Left Column: Clause-by-Clause Gap Detector */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={18} style={{ color: 'var(--indigo-primary)' }} />
              <span>Clause Gap & Asymmetry Analysis</span>
            </h3>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.3rem', background: 'rgba(255,255,255,0.03)', padding: '0.2rem', borderRadius: '6px' }}>
              <button
                className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('all')}
                style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
              >
                All ({analysis.gaps.length})
              </button>
              <button
                className={`btn btn-sm ${filter === 'missing' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('missing')}
                style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
              >
                Missing ({analysis.missingCount})
              </button>
              <button
                className={`btn btn-sm ${filter === 'weak' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('weak')}
                style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
              >
                One-Sided ({analysis.weakCount})
              </button>
              <button
                className={`btn btn-sm ${filter === 'fair' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('fair')}
                style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
              >
                Fair ({analysis.fairCount})
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredGaps.map((gap) => (
              <div key={gap.id} className={`gap-card status-${gap.status}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.98rem', fontWeight: 700, color: '#FFFFFF' }}>
                      {gap.clauseName}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>
                      Category: {gap.category}
                    </span>
                  </div>

                  <span className={`badge-status badge-${gap.status}`}>
                    {gap.status === 'missing' ? '❌ Omitted' : gap.status === 'weak' ? '⚠️ Asymmetric' : '✅ Balanced'}
                  </span>
                </div>

                {/* Document Citation if present */}
                {gap.foundQuote ? (
                  <div className="gap-quote-box">
                    <Quote size={13} style={{ display: 'inline', marginRight: '0.35rem', opacity: 0.7 }} />
                    "{gap.foundQuote}"
                  </div>
                ) : (
                  <div style={{ fontStyle: 'italic', fontSize: '0.8rem', color: '#FB7185', margin: '0.4rem 0' }}>
                    [Clause entirely absent from document]
                  </div>
                )}

                {/* Analysis Notes */}
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.65rem' }}>
                  {gap.analysisNotes}
                </p>

                {/* Remedy Draft */}
                {gap.remedyDraft && (
                  <div className="remedy-box" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.73rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.15rem' }}>
                      Proposed Fair Redline:
                    </span>
                    {gap.remedyDraft}
                  </div>
                )}

                {/* Negotiation Question */}
                <div className="question-pill-box">
                  <span style={{ fontSize: '0.73rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.15rem' }}>
                    Pre-Negotiation Question to Ask Counterpart:
                  </span>
                  "{gap.questionForCounterpart}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pre-Signing Action Checklist & Lawyer Questions */}
        <div>
          {/* Action Checklist */}
          <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckSquare size={17} style={{ color: 'var(--indigo-primary)' }} />
                <span>Pre-Signing Action Checklist</span>
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {checklist.filter(c => c.completed).length}/{checklist.length} Completed
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.65rem',
                    cursor: 'pointer',
                    padding: '0.6rem 0.75rem',
                    background: item.completed ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ marginTop: '0.15rem', color: item.completed ? '#10B981' : 'var(--text-muted)' }}>
                    {item.completed ? <CheckSquare size={16} /> : <Square size={16} />}
                  </div>
                  <span
                    style={{
                      fontSize: '0.84rem',
                      lineHeight: 1.4,
                      textDecoration: item.completed ? 'line-through' : 'none',
                      color: item.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lawyer Prep Questions Box */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <HelpCircle size={18} style={{ color: '#818CF8' }} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                Questions Ready for Legal Counsel
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Take these exact, prioritized legal inquiries to your initial attorney consultation:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {analysis.gaps.filter(g => g.status === 'missing' || g.status === 'weak').slice(0, 4).map((gap, i) => (
                <div key={i} style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.06)', borderRadius: '6px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#A5B4FC', display: 'block', marginBottom: '0.2rem' }}>
                    About {gap.clauseName}:
                  </span>
                  <p style={{ fontSize: '0.82rem', color: '#E2E8F0', lineHeight: 1.35 }}>
                    "{gap.questionForLawyer}"
                  </p>
                </div>
              ))}
            </div>

            <button
              className="btn btn-secondary"
              onClick={onOpenLawyerDossier}
              style={{ width: '100%', marginTop: '1.25rem', fontSize: '0.85rem' }}
            >
              <FileText size={15} />
              <span>Generate Full Printable Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
