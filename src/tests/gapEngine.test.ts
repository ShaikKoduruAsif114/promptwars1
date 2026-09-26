import { describe, it, expect } from 'vitest';
import { analyzeDocumentGaps, compareContractVersions, validateLegalDocument } from '../services/gapEngine';
import { SAMPLE_CONTRACTS } from '../data/samples';
import { generateCounterOfferEmail, generateLawyerPrepDossier } from '../services/aiService';

describe('LexiGap AI - Gap Detection & Evaluation Engine', () => {
  const trapLease = SAMPLE_CONTRACTS.find(s => s.id === 'sample_rental_trap')!;
  const fairLease = SAMPLE_CONTRACTS.find(s => s.id === 'sample_rental_fair')!;
  const techOffer = SAMPLE_CONTRACTS.find(s => s.id === 'sample_employment_startup')!;
  const freelanceMsa = SAMPLE_CONTRACTS.find(s => s.id === 'sample_freelance_msa')!;

  it('correctly spots vulnerabilities and generates low score on Trap Lease', () => {
    const result = analyzeDocumentGaps(trapLease.content, 'rental', trapLease.title);
    
    expect(result.protectionScore).toBeLessThan(50);
    expect(result.weakCount + result.missingCount).toBeGreaterThanOrEqual(3);
    
    // Deposit return should be identified as weak/missing firm deadline
    const depositGap = result.gaps.find(g => g.clauseId === 'rent_deposit_return');
    expect(depositGap).toBeDefined();
    expect(depositGap?.status).toBe('weak');
    expect(depositGap?.foundQuote).toBeDefined();

    // Landlord entry should be identified as weak (no prior notice)
    const entryGap = result.gaps.find(g => g.clauseId === 'rent_landlord_entry');
    expect(entryGap).toBeDefined();
    expect(entryGap?.status).toBe('weak');

    // Sneaky clause for 7-day forfeiture should be detected
    expect(result.sneakyClauses.length).toBeGreaterThan(0);
    expect(result.sneakyClauses[0].severity).toBe('critical');
  });

  it('evaluates Fair Lease with high protection score', () => {
    const result = analyzeDocumentGaps(fairLease.content, 'rental', fairLease.title);
    
    expect(result.protectionScore).toBeGreaterThanOrEqual(80);
    expect(result.fairCount).toBeGreaterThan(4);
    expect(result.overallVerdict).toContain('Protective');
  });

  it('detects overreaching IP assignment and non-compete in Startup Offer', () => {
    const result = analyzeDocumentGaps(techOffer.content, 'employment', techOffer.title);
    
    const ipGap = result.gaps.find(g => g.clauseId === 'emp_ip_carveout');
    expect(ipGap?.status).toBe('weak');
    expect(ipGap?.analysisNotes).toContain('blanket IP assignment');

    const noncompeteGap = result.gaps.find(g => g.clauseId === 'emp_noncompete_scope');
    expect(noncompeteGap?.status).toBe('weak');
  });

  it('accurately compares two versions in Version Comparison Mode', () => {
    const analysisA = analyzeDocumentGaps(trapLease.content, 'rental', 'Trap Lease');
    const analysisB = analyzeDocumentGaps(fairLease.content, 'rental', 'Fair Lease');

    const comparison = compareContractVersions(analysisA, analysisB);
    expect(comparison.winner).toBe('docB');
    expect(comparison.scoreDifference).toBeGreaterThan(20);
    expect(comparison.resolvedGaps.length).toBeGreaterThan(0);
  });

  it('generates a comprehensive Lawyer Consultation Prep Dossier', () => {
    const result = analyzeDocumentGaps(trapLease.content, 'rental', 'Trap Lease');
    const dossier = generateLawyerPrepDossier(result);

    expect(dossier).toContain('ATTORNEY CONSULTATION PREPARATION DOSSIER');
    expect(dossier).toContain('PRIORITIZED QUESTIONS FOR YOUR LEGAL CONSULTATION');
    expect(dossier).toContain('LEGAL INFORMATION DISCLAIMER');
    expect(dossier).toContain('Trap Lease');
  });

  it('generates a polite, diplomatic counter-offer email', () => {
    const result = analyzeDocumentGaps(trapLease.content, 'rental', 'Apartment 4B Lease');
    const email = generateCounterOfferEmail(result, 'Apex Property Holdings');

    expect(email).toContain('Subject: Review & Proposed Minor Adjustments');
    expect(email).toContain('Apex Property Holdings');
    expect(email).toContain('Proposed Addition:');
  });

  it('rejects irrelevant non-legal documents (recipes, poems, random text)', () => {
    const recipe = 'Take 2 cups of flour and mix with butter. Add sugar and bake at 350 degrees for 25 minutes. Serve with whipped cream and sprinkles on top for a delicious treat.';
    const result = validateLegalDocument(recipe);
    expect(result.valid).toBe(false);
    expect(result.reason).toContain('does not appear to be a legal document');
  });

  it('rejects text that is too short to be a real contract', () => {
    const tooShort = 'This is a contract between two parties.';
    const result = validateLegalDocument(tooShort);
    expect(result.valid).toBe(false);
    expect(result.reason).toContain('too short');
  });

  it('accepts valid legal contract text', () => {
    const result = validateLegalDocument(trapLease.content);
    expect(result.valid).toBe(true);
  });
});
