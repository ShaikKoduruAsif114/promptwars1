import React from 'react';
import { Shield, Sparkles, Scale, GitCompare, MessageSquare, Info, Settings, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: 'gap_detector' | 'expectations' | 'compare' | 'chat';
  onSelectTab: (tab: 'gap_detector' | 'expectations' | 'compare' | 'chat') => void;
  onOpenArchitecture: () => void;
  onOpenHowToUse: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenArchitecture,
  onOpenHowToUse,
  onOpenSettings
}) => {
  return (
    <header className="header-bar" role="banner">
      <div className="logo-group">
        <div className="logo-badge" aria-hidden="true">
          <Scale size={22} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="logo-title">LexiGap AI</span>
            <span className="logo-tag">Pre-Negotiation Compass</span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Know What You're Missing Before You Sign
          </p>
        </div>
      </div>

      <nav className="nav-tabs" role="tablist" aria-label="Main Navigation">
        <button
          className={`nav-tab-btn ${activeTab === 'gap_detector' ? 'active' : ''}`}
          onClick={() => onSelectTab('gap_detector')}
          aria-selected={activeTab === 'gap_detector'}
          aria-controls="panel-gap-detector"
          role="tab"
          id="tab-gap-detector"
        >
          <Shield size={16} />
          <span>Gap Detector</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'expectations' ? 'active' : ''}`}
          onClick={() => onSelectTab('expectations')}
          aria-selected={activeTab === 'expectations'}
          aria-controls="panel-expectations"
          role="tab"
          id="tab-expectations"
        >
          <Sparkles size={16} />
          <span>Pre-Contract Expectations</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'compare' ? 'active' : ''}`}
          onClick={() => onSelectTab('compare')}
          aria-selected={activeTab === 'compare'}
          aria-controls="panel-compare"
          role="tab"
          id="tab-compare"
        >
          <GitCompare size={16} />
          <span>Compare Versions</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => onSelectTab('chat')}
          aria-selected={activeTab === 'chat'}
          aria-controls="panel-chat"
          role="tab"
          id="tab-chat"
        >
          <MessageSquare size={16} />
          <span>Doc Navigator & Q&A</span>
        </button>
      </nav>

      <div className="nav-controls">
        <button
          className="btn btn-secondary btn-sm"
          onClick={onOpenHowToUse}
          title="How to Use LexiGap AI Guide"
          aria-label="How to Use Guide"
        >
          <BookOpen size={15} />
          <span>How to Use</span>
        </button>

        <button
          className="btn btn-secondary btn-sm"
          onClick={onOpenArchitecture}
          title="View GenAI Architecture & Evaluator Blueprint"
          aria-label="GenAI Architecture"
        >
          <Info size={15} />
          <span>GenAI Architecture</span>
        </button>

        <button
          className="btn btn-secondary btn-sm"
          onClick={onOpenSettings}
          title="API Key & Privacy Settings"
          aria-label="Settings"
        >
          <Settings size={15} />
        </button>
      </div>
    </header>
  );
};
