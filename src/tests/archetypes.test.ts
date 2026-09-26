import { describe, it, expect } from 'vitest';
import { DOMAIN_ARCHETYPES } from '../data/archetypes';
import { LegalDomain } from '../types/legal';

describe('Domain Legal Archetypes Knowledge Base', () => {
  const domains: LegalDomain[] = ['rental', 'employment', 'freelance', 'nda', 'consumer_saas'];

  it('contains valid configurations for all supported contract categories', () => {
    for (const domain of domains) {
      const archetype = DOMAIN_ARCHETYPES[domain];
      expect(archetype).toBeDefined();
      expect(archetype.title).toBeTruthy();
      expect(archetype.tagline).toBeTruthy();
      expect(archetype.expectedClauses.length).toBeGreaterThanOrEqual(3);
      expect(archetype.typicalJurisdictions.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('ensures every expected clause has non-empty keywords and actionable advice', () => {
    for (const domain of domains) {
      const archetype = DOMAIN_ARCHETYPES[domain];
      for (const clause of archetype.expectedClauses) {
        expect(clause.id).toBeTruthy();
        expect(clause.name).toBeTruthy();
        expect(clause.category).toBeTruthy();
        expect(['essential', 'recommended']).toContain(clause.importance);
        expect(clause.searchKeywords.length).toBeGreaterThanOrEqual(2);
        expect(clause.plainDescription).toBeTruthy();
        expect(clause.exploitIfMissing).toBeTruthy();
        expect(clause.standardFairPractice).toBeTruthy();
        expect(clause.preNegotiationTip).toBeTruthy();
      }
    }
  });

  it('ensures search keywords are trimmed and lowercase for resilient matching', () => {
    for (const domain of domains) {
      const archetype = DOMAIN_ARCHETYPES[domain];
      for (const clause of archetype.expectedClauses) {
        for (const kw of clause.searchKeywords) {
          expect(kw).toBe(kw.toLowerCase().trim());
        }
      }
    }
  });
});
