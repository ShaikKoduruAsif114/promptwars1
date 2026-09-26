import React, { useState } from 'react';
import { SAMPLE_CONTRACTS, SampleContract } from '../data/samples';
import { LegalDomain } from '../types/legal';
import { Upload, FileText, Sparkles, Check, AlertTriangle, ArrowRight, XCircle } from 'lucide-react';

interface UploaderProps {
  initialDomain: LegalDomain;
  onAnalyze: (text: string, domain: LegalDomain, title: string) => void;
  isAnalyzing: boolean;
  validationError?: string | null;
  onClearError?: () => void;
}

export const DocumentUploader: React.FC<UploaderProps> = ({
  initialDomain,
  onAnalyze,
  isAnalyzing,
  validationError,
  onClearError
}) => {
  const [domain, setDomain] = useState<LegalDomain>(initialDomain);
  const [docTitle, setDocTitle] = useState('My Agreement');
  const [rawText, setRawText] = useState('');
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

  const handleSelectSample = (sample: SampleContract) => {
    setSelectedSampleId(sample.id);
    setDomain(sample.domain);
    setDocTitle(sample.title);
    setRawText(sample.content);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocTitle(file.name.replace(/\.[^/.]+$/, ''));
    setSelectedSampleId(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) setRawText(content);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    setDocTitle(file.name.replace(/\.[^/.]+$/, ''));
    setSelectedSampleId(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) setRawText(content);
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;
    onAnalyze(rawText, domain, docTitle);
  };

  const wordCount = rawText.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="fade-in">
      {/* 1-Click Realistic Samples for Instant Evaluator Testing */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Sparkles size={16} style={{ color: 'var(--indigo-primary)' }} />
          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Instant 1-Click Realistic Test Documents (with Known Real-World Gaps):
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
          {SAMPLE_CONTRACTS.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="glass-card"
                style={{
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? '1px solid var(--indigo-primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'rgba(99, 102, 241, 0.14)' : 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: isSelected ? '#FFFFFF' : 'var(--text-primary)' }}>
                    {sample.title}
                  </span>
                  {isSelected && <Check size={15} style={{ color: '#818CF8' }} />}
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  {sample.subtitle}
                </p>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: sample.badge.includes('High') ? '#FB7185' : '#34D399' }}>
                  {sample.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Upload / Input Form */}
      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <label htmlFor="doc-title-input" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Document Title or Label
            </label>
            <input
              id="doc-title-input"
              type="text"
              className="input-text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="e.g. Apartment Lease Draft or Acme Offer Letter"
              required
            />
          </div>

          <div>
            <label htmlFor="doc-domain-select" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Contract Category
            </label>
            <select
              id="doc-domain-select"
              className="select-input"
              value={domain}
              onChange={(e) => setDomain(e.target.value as LegalDomain)}
            >
              <option value="rental">Residential Lease / Tenancy</option>
              <option value="employment">Employment Offer & Tech Agreement</option>
              <option value="freelance">Freelance / Contractor MSA</option>
              <option value="nda">Non-Disclosure Agreement (NDA)</option>
              <option value="consumer_saas">Consumer Terms of Service / SaaS</option>
            </select>
          </div>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          style={{
            border: '2px dashed var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            textAlign: 'center',
            marginBottom: '1rem',
            background: 'rgba(255, 255, 255, 0.02)',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease'
          }}
          onClick={() => document.getElementById('hidden-file-input')?.click()}
        >
          <Upload size={28} style={{ color: 'var(--text-secondary)', margin: '0 auto 0.5rem auto' }} />
          <p style={{ fontSize: '0.88rem', fontWeight: 600 }}>
            Click or drag & drop a contract file here (.txt, .md, text)
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Files are processed strictly locally in your browser for privacy.
          </p>
          <input
            id="hidden-file-input"
            type="file"
            accept=".txt,.md,.text"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </div>

        {/* Text Area */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label htmlFor="raw-contract-text" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Or Paste Agreement Text Directly:
            </label>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {wordCount} words
            </span>
          </div>

          <textarea
            id="raw-contract-text"
            className="input-textarea"
            rows={10}
            placeholder="Paste complete contract clauses here..."
            value={rawText}
            onChange={(e) => {
              setRawText(e.target.value);
              setSelectedSampleId(null);
            }}
            required
          />
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div
            role="alert"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '1rem 1.25rem',
              marginBottom: '1rem',
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              borderRadius: 'var(--radius-md)',
              animation: 'fadeIn 0.3s ease'
            }}
          >
            <XCircle size={20} style={{ color: '#FB7185', flexShrink: 0, marginTop: '1px' }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFE4E6', marginBottom: '0.25rem' }}>
                Not a Legal Document
              </p>
              <p style={{ fontSize: '0.82rem', color: '#FDA4AF', lineHeight: 1.4 }}>
                {validationError}
              </p>
            </div>
            <button
              type="button"
              onClick={onClearError}
              style={{ background: 'none', border: 'none', color: '#FB7185', cursor: 'pointer', padding: '0.2rem' }}
              aria-label="Dismiss error"
            >
              <XCircle size={16} />
            </button>
          </div>
        )}

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            <FileText size={15} />
            <span>Scanning for missing clauses, one-sided provisions, and predatory traps.</span>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isAnalyzing || !rawText.trim()}
            style={{ minWidth: '220px', padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
          >
            {isAnalyzing ? (
              <span>Running Deep Gap Engine...</span>
            ) : (
              <>
                <span>Detect Omissions & Gaps</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
