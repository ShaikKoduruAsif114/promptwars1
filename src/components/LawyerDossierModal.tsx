import React, { useState } from 'react';
import { AnalysisResult } from '../types/legal';
import { generateLawyerPrepDossier } from '../services/aiService';
import { X, Copy, Check, Printer, Download, FileText } from 'lucide-react';

interface DossierModalProps {
  analysis: AnalysisResult;
  onClose: () => void;
}

export const LawyerDossierModal: React.FC<DossierModalProps> = ({
  analysis,
  onClose
}) => {
  const dossierText = generateLawyerPrepDossier(analysis);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(dossierText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    const blob = new Blob([dossierText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Lawyer_Prep_Dossier_${analysis.documentTitle.replace(/\s+/g, '_')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Lawyer Consultation Dossier - ${analysis.documentTitle}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; padding: 40px; line-height: 1.5; color: #111; }
            pre { white-space: pre-wrap; font-family: "Courier New", Courier, monospace; font-size: 13px; }
          </style>
        </head>
        <body>
          <pre>${dossierText}</pre>
          <script>window.onload = function() { window.print(); window.close(); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="dossier-modal-title">
      <div className="modal-content" style={{ maxWidth: '850px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'var(--indigo-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={18} color="#FFF" />
            </div>
            <div>
              <h2 id="dossier-modal-title" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Lawyer Consultation Prep Dossier
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Hand this structured brief to your attorney to save consultation time and focus on key risks.
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

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleCopy}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Dossier Markdown'}</span>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={handlePrint}
          >
            <Printer size={14} />
            <span>Print / Save as PDF</span>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={handleDownload}
          >
            <Download size={14} />
            <span>Download .md File</span>
          </button>
        </div>

        {/* Preformatted Dossier Text */}
        <div style={{ background: '#050811', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1.25rem', maxHeight: '500px', overflowY: 'auto' }}>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#E2E8F0', whiteSpace: 'pre-wrap', lineHeight: 1.45 }}>
            {dossierText}
          </pre>
        </div>
      </div>
    </div>
  );
};
