import { describe, it, expect } from 'vitest';
import { 
  generateExpectationsForCustomSituation, 
  generateCounterOfferEmail, 
  generateLawyerPrepDossier, 
  answerContractQuestion 
} from '../services/aiService';
import { analyzeDocumentGaps } from '../services/gapEngine';
import { SAMPLE_CONTRACTS } from '../data/samples';

describe('AI Service & Negotiation Generator', () => {
  const trapLease = SAMPLE_CONTRACTS.find(s => s.id === 'sample_rental_trap')!;
  const trapAnalysis = analyzeDocumentGaps(trapLease.content, 'rental', trapLease.title);

  it('generates fallback expectations for novel rental situations', async () => {
    const expectations = await generateExpectationsForCustomSituation('Leasing an artist loft studio in Brooklyn', 'New York');
    expect(expectations.length).toBeGreaterThanOrEqual(4);
    expect(expectations.some(e => e.name.toLowerCase().includes('deposit') || e.name.toLowerCase().includes('entry'))).toBe(true);
  });

  it('generates fallback expectations for employment prompts', async () => {
    const expectations = await generateExpectationsForCustomSituation('Joining an AI startup as founding engineer with equity', 'California');
    expect(expectations.length).toBeGreaterThanOrEqual(4);
    expect(expectations.some(e => e.name.toLowerCase().includes('ip') || e.name.toLowerCase().includes('severance') || e.name.toLowerCase().includes('compete'))).toBe(true);
  });

  it('generates fallback expectations for freelance / contractor prompts', async () => {
    const expectations = await generateExpectationsForCustomSituation('Freelance brand designer building identity for fintech client', 'General');
    expect(expectations.length).toBeGreaterThanOrEqual(4);
    expect(expectations.some(e => e.name.toLowerCase().includes('scope') || e.name.toLowerCase().includes('payment'))).toBe(true);
  });

  it('generates a polite, structured counter-offer negotiation email', () => {
    const email = generateCounterOfferEmail(trapAnalysis, 'Landlord Realty Corp');
    expect(email).toContain('Dear Landlord Realty Corp,');
    expect(email).toContain('Proposed Minor Adjustments');
    expect(email).toContain('Warm regards');
  });

  it('generates an attorney consultation prep dossier with clear sections', () => {
    const dossier = generateLawyerPrepDossier(trapAnalysis);
    expect(dossier).toContain('ATTORNEY CONSULTATION PREPARATION DOSSIER');
    expect(dossier).toContain('EXECUTIVE SUMMARY & RISK PROFILE');
    expect(dossier).toContain('PRIORITIZED QUESTIONS FOR YOUR LEGAL CONSULTATION');
    expect(dossier).toContain('FLAGGED HIGH-RISK CLAUSES & OMISSIONS');
  });

  it('answers specific contextual questions using built-in semantic matching', async () => {
    const result = await answerContractQuestion(trapLease.content, 'Can the landlord enter without notice?', trapAnalysis);
    expect(result.answer).toBeTruthy();
    expect(result.answer.toLowerCase()).toContain('entry');
  });

  it('answers questions regarding early lease break and termination', async () => {
    const result = await answerContractQuestion(trapLease.content, 'Can I break this lease early if I need to move?', trapAnalysis);
    expect(result.answer).toBeTruthy();
    expect(result.answer.toLowerCase()).toContain('termination');
  });

  it('answers questions regarding security deposit return', async () => {
    const result = await answerContractQuestion(trapLease.content, 'When do I get my deposit back?', trapAnalysis);
    expect(result.answer).toBeTruthy();
    expect(result.answer.toLowerCase()).toContain('deposit');
  });
});
