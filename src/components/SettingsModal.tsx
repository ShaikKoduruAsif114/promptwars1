import React, { useState } from 'react';
import { getSavedAIConfig, saveAIConfig } from '../services/aiService';
import { AIProviderConfig } from '../types/legal';
import { X, Key, Shield, Check } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [config, setConfig] = useState<AIProviderConfig>(getSavedAIConfig());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAIConfig(config);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="settings-modal-title">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'var(--indigo-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Key size={18} color="#FFF" />
            </div>
            <div>
              <h2 id="settings-modal-title" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                AI Engine & Privacy Settings
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Configure live Gemini API key or use the built-in grounded engine.
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

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="ai-provider-select" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              AI Generation Provider
            </label>
            <select
              id="ai-provider-select"
              className="select-input"
              value={config.provider}
              onChange={(e) => setConfig({ ...config, provider: e.target.value as any })}
            >
              <option value="built_in">Built-in Grounded Engine (Default: Fast, Offline, Free, Zero Setup)</option>
              <option value="gemini">Google Gemini 1.5 Flash (Live LLM via Google AI API)</option>
            </select>
          </div>

          {config.provider === 'gemini' && (
            <div style={{ marginBottom: '1.25rem' }} className="fade-in">
              <label htmlFor="gemini-key-input" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Google Gemini API Key
              </label>
              <input
                id="gemini-key-input"
                type="password"
                className="input-text"
                placeholder="AIzaSy..."
                value={config.apiKey || ''}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
              />
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Your key is stored strictly in your browser's LocalStorage and is never transmitted to any third-party server.
              </p>
            </div>
          )}

          <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '1.5rem', display: 'flex', gap: '0.65rem' }}>
            <Shield size={18} style={{ color: '#818CF8', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.78rem', color: '#E0E7FF', lineHeight: 1.4 }}>
              <strong>Zero-Data Retention Guarantee:</strong> Contract text submitted in LexiGap AI is processed strictly client-side. No user contract text is saved on external servers.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {savedSuccess ? (
                <>
                  <Check size={16} />
                  <span>Settings Saved!</span>
                </>
              ) : (
                <span>Save Settings</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
