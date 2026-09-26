import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const LegalDisclaimerBanner: React.FC = () => {
  return (
    <div className="disclaimer-banner" role="region" aria-label="Legal Boundary Disclaimer">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <AlertTriangle size={17} style={{ color: '#FBBF24', flexShrink: 0 }} />
        <span>
          <strong>Legal Assistance & Access Boundary:</strong> LexiGap AI is an educational pre-negotiation gap detector and issue-spotting tool. It does <em>not</em> provide formal legal advice or create an attorney-client relationship. Use the generated dossiers to prepare for consultation with a licensed legal professional.
        </span>
      </div>
    </div>
  );
};
