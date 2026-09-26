import React, { useState } from 'react';
import { AnalysisResult } from '../types/legal';
import { generateCounterOfferEmail } from '../services/aiService';
import { X, Copy, Check, Mail } from 'lucide-react';

interface CounterOfferModalProps {
  analysis: AnalysisResult;
  onClose: () => void;
}

export const CounterOfferModal: React.FC<CounterOfferModalProps> = ({
  analysis,
  onClose
}) => {
  const [recipientTitle, setRecipientTitle] = useState('Landlord / Hiring Team / Client');
  const [copied, setCopied] = useState(false);

  const emailText = generateCounterOfferEmail(analysis, recipientTitle);

  const handleCopy = () => {
    navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="counter-modal-title">
      <div className="modal-content" style={{ maxWidth: '750px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={18} color="#FFF" />
            </div>
            <div>
              <h2 id="counter-modal-title" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Polite Counter-Offer & Redline Drafter
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Diplomatic, non-adversarial proposal to add standard protections before signing.
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

        {/* Recipient Customizer */}
        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label htmlFor="counter-recipient-input" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Recipient Name or Role:
          </label>
          <input
            id="counter-recipient-input"
            type="text"
            className="input-text"
            value={recipientTitle}
            onChange={(e) => setRecipientTitle(e.target.value)}
            style={{ maxWidth: '300px', padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
          />
        </div>

        {/* Action button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
          <button
            className="btn btn-emerald btn-sm"
            onClick={handleCopy}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied Email Draft!' : 'Copy Email to Clipboard'}</span>
          </button>
        </div>

        {/* Email Preview */}
        <div style={{ background: '#050811', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1.25rem', maxHeight: '440px', overflowY: 'auto' }}>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#E2E8F0', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
            {emailText}
          </pre>
        </div>
      </div>
    </div>
  );
};
