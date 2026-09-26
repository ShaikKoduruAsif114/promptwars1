import React, { useState } from 'react';
import { SAMPLE_CONTRACTS } from '../data/samples';
import { analyzeDocumentGaps, compareContractVersions } from '../services/gapEngine';
import { LegalDomain } from '../types/legal';
import { GitCompare, AlertTriangle, CheckCircle, Scale } from 'lucide-react';

export const ContractComparisonView: React.FC = () => {
  const domain: LegalDomain = 'rental';
  
  const trapLease = SAMPLE_CONTRACTS.find(s => s.id === 'sample_rental_trap')?.content || '';
  const fairLease = SAMPLE_CONTRACTS.find(s => s.id === 'sample_rental_fair')?.content || '';

  const docAName = 'Version A: Initial Landlord Draft';
  const [docAText, setDocAText] = useState(trapLease);

  const docBName = 'Version B: Proposed Balanced Revision';
  const [docBText, setDocBText] = useState(fairLease);

  const analysisA = analyzeDocumentGaps(docAText, domain, docAName);
  const analysisB = analyzeDocumentGaps(docBText, domain, docBName);
  const comparison = compareContractVersions(analysisA, analysisB);

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Contract Version Battle & <span style={{ color: 'var(--indigo-primary)' }}>Diff Comparator</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto', fontSize: '0.95rem' }}>
          Compare two versions of an agreement (e.g., initial landlord draft vs. redline, or competing job offers)
          to see which version better protects your rights and which gaps were resolved.
        </p>
      </div>

      {/* Comparison Scoreboard */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.75rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center' }}>
          {/* Doc A Summary */}
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Version 1 (Initial Draft)
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.35rem 0' }}>{docAName}</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: analysisA.protectionScore >= 70 ? '#10B981' : analysisA.protectionScore >= 50 ? '#F59E0B' : '#F43F5E' }}>
              {analysisA.protectionScore}
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/100</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {analysisA.fairCount} fair · {analysisA.weakCount} weak · {analysisA.missingCount} omitted
            </p>
          </div>

          {/* Versus Pill */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--indigo-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem auto', boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)' }}>
              <GitCompare size={22} color="#FFF" />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              {comparison.scoreDifference > 0 ? `+${comparison.scoreDifference} PTS` : `${comparison.scoreDifference} PTS`}
            </span>
          </div>

          {/* Doc B Summary */}
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Version 2 (Revised Draft)
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.35rem 0' }}>{docBName}</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: analysisB.protectionScore >= 70 ? '#10B981' : analysisB.protectionScore >= 50 ? '#F59E0B' : '#F43F5E' }}>
              {analysisB.protectionScore}
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/100</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {analysisB.fairCount} fair · {analysisB.weakCount} weak · {analysisB.missingCount} omitted
            </p>
          </div>
        </div>

        {/* Comparison Verdict */}
        <div style={{ marginTop: '1.5rem', padding: '0.9rem 1.25rem', background: 'rgba(99, 102, 241, 0.09)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99, 102, 241, 0.25)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Scale size={20} style={{ color: '#818CF8', flexShrink: 0 }} />
          <span style={{ fontSize: '0.88rem', color: '#E0E7FF' }}>
            <strong>Comparative Verdict:</strong> {comparison.verdict}
          </span>
        </div>
      </div>

      {/* Resolved vs Regressed Diff List */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#34D399', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <CheckCircle size={18} />
            <span>Protections Gained / Gaps Resolved ({comparison.resolvedGaps.length})</span>
          </h3>
          {comparison.resolvedGaps.length === 0 ? (
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>No gaps were upgraded between these two versions.</p>
          ) : (
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.84rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {comparison.resolvedGaps.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#F43F5E', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <AlertTriangle size={18} />
            <span>Vulnerabilities Introduced / Regressed ({comparison.newVulnerabilities.length})</span>
          </h3>
          {comparison.newVulnerabilities.length === 0 ? (
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>No new vulnerabilities or regressions detected.</p>
          ) : (
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.84rem', color: '#FDA4AF', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {comparison.newVulnerabilities.map((reg, i) => (
                <li key={i}>{reg}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Side-by-Side Clause Matrix */}
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>
        Side-by-Side Protection Matrix
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
        {analysisA.gaps.map((gapA) => {
          const gapB = analysisB.gaps.find(g => g.clauseId === gapA.clauseId);
          return (
            <div key={gapA.id} className="glass-card" style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                  {gapA.clauseName}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Category: {gapA.category}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Doc A status */}
                <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(0,0,0,0.25)', borderRadius: '6px', borderLeft: `3px solid ${gapA.status === 'fair' ? '#10B981' : gapA.status === 'weak' ? '#F59E0B' : '#F43F5E'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Version A</span>
                    <span className={`badge-status badge-${gapA.status}`}>
                      {gapA.status.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {gapA.foundQuote ? `"${gapA.foundQuote.slice(0, 110)}..."` : 'Clause omitted'}
                  </p>
                </div>

                {/* Doc B status */}
                <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(0,0,0,0.25)', borderRadius: '6px', borderLeft: `3px solid ${gapB?.status === 'fair' ? '#10B981' : gapB?.status === 'weak' ? '#F59E0B' : '#F43F5E'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Version B</span>
                    <span className={`badge-status badge-${gapB?.status || 'missing'}`}>
                      {(gapB?.status || 'missing').toUpperCase()}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {gapB?.foundQuote ? `"${gapB.foundQuote.slice(0, 110)}..."` : 'Clause omitted'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editable Inputs for Custom Version Compare */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Customize Contract Versions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="comp-doc-a" style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
              Draft A Text:
            </label>
            <textarea
              id="comp-doc-a"
              className="input-textarea"
              style={{ minHeight: '140px' }}
              value={docAText}
              onChange={(e) => setDocAText(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="comp-doc-b" style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
              Draft B Text:
            </label>
            <textarea
              id="comp-doc-b"
              className="input-textarea"
              style={{ minHeight: '140px' }}
              value={docBText}
              onChange={(e) => setDocBText(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
