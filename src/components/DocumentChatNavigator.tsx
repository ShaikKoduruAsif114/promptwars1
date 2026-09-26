import React, { useState } from 'react';
import { AnalysisResult, ChatMessage } from '../types/legal';
import { answerContractQuestion } from '../services/aiService';
import { MessageSquare, Send, Bot, User, Sparkles, Quote, HelpCircle, Loader2 } from 'lucide-react';

interface ChatNavigatorProps {
  analysis: AnalysisResult;
  documentText: string;
}

export const DocumentChatNavigator: React.FC<ChatNavigatorProps> = ({
  analysis,
  documentText
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `Hello! I'm your LexiGap Document Assistant for **${analysis.documentTitle}**.\n\nI can decode complex legalese into plain English, locate hidden risks, tell you what's dangerously missing, and prepare you for negotiations.\n\nTry clicking one of the suggested questions below, or ask anything!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  const suggestedQuestions = [
    'Can they terminate this agreement without giving me notice?',
    'What happens to my security deposit or milestone payment?',
    'Can the other party enter or modify things without my consent?',
    'What is the single most dangerous missing clause in this contract?',
    'Translate the liability and indemnity section to plain English.'
  ];

  const handleSend = async (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      content: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsAsking(true);

    try {
      const response = await answerContractQuestion(documentText, questionText, analysis);
      const assistantMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        sender: 'assistant',
        content: response.answer,
        citations: response.citations,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          Document Navigator & <span style={{ color: 'var(--indigo-primary)' }}>Plain-English Q&A</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Interrogate <strong>{analysis.documentTitle}</strong>. Understand rights, obligations, and omissions without legal jargon.
        </p>
      </div>

      {/* Suggested Questions */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            className="btn btn-secondary btn-sm"
            onClick={() => handleSend(q)}
            disabled={isAsking}
            style={{ fontSize: '0.76rem', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.04)' }}
          >
            <Sparkles size={12} style={{ color: 'var(--indigo-primary)' }} />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div
        className="glass-card"
        style={{
          minHeight: '400px',
          maxHeight: '520px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1.5rem',
          marginBottom: '1rem'
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}
            >
              {!isUser && (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Bot size={18} color="#FFF" />
                </div>
              )}

              <div
                style={{
                  background: isUser ? 'var(--indigo-primary)' : 'rgba(15, 23, 42, 0.85)',
                  border: isUser ? 'none' : '1px solid var(--border-subtle)',
                  borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  padding: '0.85rem 1.1rem',
                  color: isUser ? '#FFFFFF' : 'var(--text-primary)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{ fontSize: '0.86rem', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                  {msg.content}
                </div>

                {msg.citations && msg.citations.length > 0 && (
                  <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                      Cited from Agreement:
                    </span>
                    {msg.citations.map((cite, i) => (
                      <div key={i} className="gap-quote-box" style={{ fontSize: '0.78rem', margin: '0.35rem 0' }}>
                        <Quote size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />
                        "{cite}"
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ fontSize: '0.68rem', color: isUser ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginTop: '0.35rem', textAlign: 'right' }}>
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <User size={18} color="#CBD5E1" />
                </div>
              )}
            </div>
          );
        })}

        {isAsking && (
          <div style={{ display: 'flex', gap: '0.75rem', alignSelf: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot size={18} color="#FFF" />
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '0.75rem 1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <Loader2 size={16} className="spin-animate" />
              <span>Analyzing clause citations & statutory standards...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputQuestion);
        }}
        style={{ display: 'flex', gap: '0.75rem' }}
      >
        <input
          type="text"
          className="input-text"
          placeholder="Ask a question about this contract in plain language..."
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          disabled={isAsking}
          style={{ flex: 1, padding: '0.85rem 1.25rem' }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isAsking || !inputQuestion.trim()}
          style={{ padding: '0.85rem 1.4rem' }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
