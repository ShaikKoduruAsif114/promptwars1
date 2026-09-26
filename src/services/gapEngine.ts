import { DOMAIN_ARCHETYPES } from '../data/archetypes';
import { sanitizePlainText } from '../utils/security';
import { 
  AnalysisResult, 
  DetectedGapItem, 
  LegalDomain, 
  RiskLevel, 
  ClauseStatus, 
  SneakyClause,
  ActionChecklistItem
} from '../types/legal';

// In-memory analysis cache for maximum efficiency
const analysisCache = new Map<string, AnalysisResult>();
const MAX_CACHE_SIZE = 60;

function getCacheKey(text: string, domain: string, title: string): string {
  return `${domain}::${title}::${text.length}::${text.slice(0, 80)}::${text.slice(-80)}`;
}

// Safe text normalization
function normalizeText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ');
}

// Locate matching quote in raw text
function findBestMatchingQuote(rawText: string, searchPhrases: string[]): string | undefined {
  const paragraphs = rawText.split(/\n\s*\n|\r\n\s*\r\n/);
  
  for (const para of paragraphs) {
    const cleanPara = para.trim();
    if (cleanPara.length < 20) continue;
    const lowerPara = cleanPara.toLowerCase();
    const dehyphenatedPara = lowerPara.replace(/-/g, ' ');
    
    for (const phrase of searchPhrases) {
      const lowerPhrase = phrase.toLowerCase();
      const dehyphenatedPhrase = lowerPhrase.replace(/-/g, ' ');
      
      if (lowerPara.includes(lowerPhrase) || dehyphenatedPara.includes(dehyphenatedPhrase)) {
        // Return snippet, clipped to reasonable length
        if (cleanPara.length > 320) {
          const idx = lowerPara.indexOf(lowerPhrase) !== -1 
            ? lowerPara.indexOf(lowerPhrase) 
            : dehyphenatedPara.indexOf(dehyphenatedPhrase);
          const start = Math.max(0, idx - 80);
          const end = Math.min(cleanPara.length, idx + 240);
          return (start > 0 ? '...' : '') + cleanPara.substring(start, end).trim() + (end < cleanPara.length ? '...' : '');
        }
        return cleanPara;
      }
    }
  }
  return undefined;
}

/**
 * Validates whether the provided text is plausibly a legal document.
 * Returns { valid: true } or { valid: false, reason: string }.
 */
export function validateLegalDocument(text: string): { valid: boolean; reason?: string } {
  const trimmed = text.trim();
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;

  // Too short to be a real contract
  if (wordCount < 30) {
    return {
      valid: false,
      reason: 'The text you provided is too short to be a legal document. Please paste the full agreement text (typically 200+ words).'
    };
  }

  // Legal signal keywords — contracts almost always contain several of these
  const legalSignals = [
    'agreement', 'contract', 'party', 'parties', 'shall', 'herein', 'hereby',
    'terms', 'conditions', 'obligations', 'clause', 'section', 'tenant',
    'landlord', 'employer', 'employee', 'contractor', 'client', 'licensee',
    'licensor', 'payment', 'termination', 'liability', 'indemnify', 'warrant',
    'representation', 'breach', 'remedy', 'governing law', 'jurisdiction',
    'confidential', 'proprietary', 'intellectual property', 'non-compete',
    'severability', 'waiver', 'amendment', 'notice', 'execution', 'effective date',
    'lease', 'rent', 'deposit', 'premises', 'covenant', 'default', 'cure',
    'arbitration', 'dispute', 'damages', 'recitals', 'whereas', 'witnesseth',
    'binding', 'enforceable', 'assigns', 'successors', 'exhibit', 'schedule',
    'scope of work', 'deliverables', 'milestone', 'invoice', 'compensation',
    'salary', 'equity', 'vesting', 'stock option', 'severance', 'probation',
    'non-disclosure', 'nda', 'trade secret', 'privacy policy', 'terms of service',
    'user agreement', 'subscription', 'license agreement', 'service agreement'
  ];

  const lower = trimmed.toLowerCase();
  let signalHits = 0;
  for (const signal of legalSignals) {
    if (lower.includes(signal)) {
      signalHits++;
    }
  }

  // A real contract will hit at least 4-5 of these signals
  // A recipe, poem, or random text will hit 0-2
  if (signalHits < 3) {
    return {
      valid: false,
      reason: `This text does not appear to be a legal document. LexiGap AI detected only ${signalHits} legal term(s) in your text. Please upload or paste an actual contract, agreement, lease, offer letter, NDA, or terms of service.`
    };
  }

  return { valid: true };
}

export function analyzeDocumentGaps(
  documentText: string,
  domain: LegalDomain,
  documentTitle = 'Uploaded Contract'
): AnalysisResult {
  const sanitizedDoc = sanitizePlainText(documentText);
  const cacheKey = getCacheKey(sanitizedDoc, domain, documentTitle);
  const cached = analysisCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const archetype = DOMAIN_ARCHETYPES[domain] || DOMAIN_ARCHETYPES.rental;
  const norm = normalizeText(sanitizedDoc);
  const wordCount = sanitizedDoc.trim().split(/\s+/).filter(Boolean).length;

  const gaps: DetectedGapItem[] = [];
  const sneakyClauses: SneakyClause[] = [];

  let fairCount = 0;
  let weakCount = 0;
  let missingCount = 0;
  let predatoryCount = 0;

  // 1. Analyze each expected clause
  for (const clause of archetype.expectedClauses) {
    const matchingQuote = findBestMatchingQuote(documentText, clause.searchKeywords);
    
    let status: ClauseStatus = 'missing';
    let risk: RiskLevel = 'high';
    let notes = '';
    let remedy = '';

    if (!matchingQuote) {
      // Clause is MISSING
      status = 'missing';
      risk = clause.importance === 'essential' ? 'high' : 'medium';
      notes = `This document does not contain an explicit ${clause.name} clause. ${clause.exploitIfMissing}`;
      remedy = `Add a balanced provision: "${clause.standardFairPractice}"`;
      missingCount++;
    } else {
      // Clause is present; determine if it is FAIR or WEAK/ONE-SIDED
      const quoteLower = matchingQuote.toLowerCase();

      // Domain-specific weakness heuristics
      let isWeak = false;
      let weaknessReason = '';

      if (clause.id === 'rent_deposit_return') {
        if (quoteLower.includes('discretion') || quoteLower.includes('convenience') || !quoteLower.match(/\b(14|21|30|calendar days)\b/)) {
          isWeak = true;
          weaknessReason = 'Deposit return has no firm statutory deadline and is subject to landlord subjective discretion.';
        }
      } else if (clause.id === 'rent_landlord_entry') {
        if (quoteLower.includes('without prior notice') || quoteLower.includes('at any time') || !quoteLower.includes('24 hour')) {
          isWeak = true;
          weaknessReason = 'Allows unannounced entry without mandatory 24-hour advance written notice.';
        }
      } else if (clause.id === 'rent_break_clause') {
        if (quoteLower.includes('no break') || quoteLower.includes('entire remaining') || quoteLower.includes('aggregate rent')) {
          isWeak = true;
          weaknessReason = 'Completely bans early break or penalizes you with the full remaining 12-month lease balance.';
        }
      } else if (clause.id === 'emp_ip_carveout') {
        if (quoteLower.includes('whether or not') || quoteLower.includes('personal devices') || !quoteLower.includes('exhibit a')) {
          isWeak = true;
          weaknessReason = 'Overreaching blanket IP assignment claiming personal inventions and off-hours projects.';
        }
      } else if (clause.id === 'emp_severance_notice') {
        if (quoteLower.includes('no severance') || quoteLower.includes('without notice') || quoteLower.includes('cease immediately')) {
          isWeak = true;
          weaknessReason = 'Zero severance, zero notice protection, or immediate cessation of pay upon termination.';
        }
      } else if (clause.id === 'emp_noncompete_scope') {
        if (quoteLower.includes('anywhere in the world') || quoteLower.includes('24 months') || quoteLower.includes('directly or indirectly')) {
          isWeak = true;
          weaknessReason = 'Excessively punitive geographic scope and duration (up to 2 years worldwide).';
        }
      } else if (clause.id === 'free_ip_transfer_upon_payment') {
        if (quoteLower.includes('immediately upon creation') || quoteLower.includes('irrespective of invoice') || !quoteLower.includes('upon payment')) {
          isWeak = true;
          weaknessReason = 'Transfers copyright before you are paid, leaving you without leverage if client refuses to pay.';
        }
      } else if (clause.id === 'free_payment_terms_late_fee') {
        if (quoteLower.includes('90') || quoteLower.includes('no interest') || quoteLower.includes('no late fee')) {
          isWeak = true;
          weaknessReason = 'Extended Net 90 payment cycle with no interest or late fees on overdue balances.';
        }
      } else if (clause.id === 'free_liability_cap') {
        if (quoteLower.includes('unlimited') || quoteLower.includes('indemnify, defend, and hold harmless')) {
          isWeak = true;
          weaknessReason = 'Liability is unlimited rather than capped at fees paid, putting personal assets at risk.';
        }
      }

      if (isWeak) {
        status = 'weak';
        risk = 'high';
        notes = `Clause is present but critically one-sided: ${weaknessReason}`;
        remedy = `Replace with standard balanced language: "${clause.standardFairPractice}"`;
        weakCount++;
      } else {
        status = 'fair';
        risk = 'low';
        notes = `Clause is present with balanced wording safeguarding your position.`;
        fairCount++;
      }
    }

    gaps.push({
      id: `gap_${clause.id}`,
      clauseId: clause.id,
      clauseName: clause.name,
      category: clause.category,
      status,
      risk,
      foundQuote: matchingQuote,
      analysisNotes: notes,
      remedyDraft: remedy || undefined,
      questionForCounterpart: clause.preNegotiationTip,
      questionForLawyer: `In this jurisdiction (${archetype.typicalJurisdictions[0]}), how enforceable is the absence or weakness of "${clause.name}", and what specific statutory standard should we insist upon?`
    });
  }

  // 2. Scan for Predatory / Sneaky Surprises
  if (norm.includes('discard all personal property') || norm.includes('forfeiture') || norm.includes('absent from the premises for a continuous period of seven')) {
    predatoryCount++;
    sneakyClauses.push({
      id: 'sneak_property_forfeiture',
      title: 'Aggressive 7-Day Property Forfeiture Trap',
      exactQuote: 'If Tenant is absent from the premises for a continuous period of seven (7) consecutive days without prior written notification... Landlord may retain or discard all personal property...',
      hiddenRisk: 'If you take a 1-week vacation without notifying the landlord, they claim the right to change locks and throw away your personal belongings.',
      severity: 'critical',
      suggestedAction: 'Delete entirely or require 30 days of verified abandonment plus certified mail notification.'
    });
  }

  if (norm.includes('employee agrees to indemnify') || norm.includes('contractor shall indemnify') && norm.includes('unlimited')) {
    predatoryCount++;
    sneakyClauses.push({
      id: 'sneak_unlimited_indemnity',
      title: 'Disproportionate Individual Indemnification',
      exactQuote: 'Indemnify, defend, and hold harmless... against any and all claims, liabilities, damages, and legal costs... liability shall be unlimited.',
      hiddenRisk: 'Makes an individual employee or freelancer personally liable for commercial losses, server downtime, and legal fees of a corporate entity.',
      severity: 'critical',
      suggestedAction: 'Require mutual indemnification strictly capped at fees received, excluding indirect and consequential damages.'
    });
  }

  // 3. Score Calculation
  const totalClauses = archetype.expectedClauses.length;
  // Base 100: deduct for gaps, weaknesses, and predatory terms
  let calculatedScore = 100;
  calculatedScore -= missingCount * 14;
  calculatedScore -= weakCount * 12;
  calculatedScore -= predatoryCount * 20;
  // Reward fully fair clauses
  if (missingCount === 0 && weakCount === 0 && predatoryCount === 0) {
    calculatedScore = 96;
  }
  calculatedScore = Math.max(12, Math.min(98, calculatedScore));

  let verdict = 'Critically One-Sided & Vulnerable';
  if (calculatedScore >= 80) {
    verdict = 'Highly Balanced & Protective';
  } else if (calculatedScore >= 55) {
    verdict = 'Moderately Balanced with Key Vulnerabilities';
  }

  // 4. Generate Action Checklist
  const actionChecklist: ActionChecklistItem[] = [];
  
  // High-risk gaps get added as must-asks
  gaps.filter(g => g.status === 'missing' || g.status === 'weak').forEach((g, idx) => {
    actionChecklist.push({
      id: `act_${idx}`,
      text: `Raise "${g.clauseName}": ${g.questionForCounterpart}`,
      category: g.risk === 'high' || g.risk === 'critical' ? 'must_ask' : 'counter_offer',
      completed: false
    });
  });

  if (sneakyClauses.length > 0) {
    actionChecklist.push({
      id: `act_sneak`,
      text: `Strike out or neutralize the predatory "${sneakyClauses[0].title}" clause before signing.`,
      category: 'must_ask',
      completed: false
    });
  }

  actionChecklist.push({
    id: `act_lawyer`,
    text: 'Export the Lawyer Prep Dossier and review the flagged questions with a licensed local attorney.',
    category: 'lawyer_review',
    completed: false
  });

  const executiveSummary = `Analysis of "${documentTitle}" (${wordCount} words) reveals an Accessibility & Fairness Score of ${calculatedScore}/100. Out of ${totalClauses} standard expected protective clauses, ${fairCount} are adequately fair, ${weakCount} are present but heavily one-sided, and ${missingCount} essential safeguards are entirely omitted.${sneakyClauses.length > 0 ? ` Additionally, ${sneakyClauses.length} predatory clause(s) were uncovered.` : ''}`;

  const finalResult: AnalysisResult = {
    domain,
    documentTitle,
    jurisdiction: archetype.typicalJurisdictions[0],
    wordCount,
    protectionScore: calculatedScore,
    fairCount,
    weakCount,
    missingCount,
    predatoryCount,
    overallVerdict: verdict,
    executiveSummary,
    gaps,
    sneakyClauses,
    actionChecklist,
    timestamp: new Date().toISOString()
  };

  if (analysisCache.size >= MAX_CACHE_SIZE) {
    const firstKey = analysisCache.keys().next().value;
    if (firstKey) analysisCache.delete(firstKey);
  }
  analysisCache.set(cacheKey, finalResult);

  return finalResult;
}

export function compareContractVersions(
  docAAnalysis: AnalysisResult,
  docBAnalysis: AnalysisResult
): {
  scoreA: number;
  scoreB: number;
  winner: 'docA' | 'docB' | 'tie';
  scoreDifference: number;
  resolvedGaps: string[];
  newVulnerabilities: string[];
  verdict: string;
} {
  const scoreDiff = docBAnalysis.protectionScore - docAAnalysis.protectionScore;
  const resolvedGaps: string[] = [];
  const newVulnerabilities: string[] = [];

  for (const gapB of docBAnalysis.gaps) {
    const gapA = docAAnalysis.gaps.find(g => g.clauseId === gapB.clauseId);
    if (gapA) {
      if ((gapA.status === 'missing' || gapA.status === 'weak') && gapB.status === 'fair') {
        resolvedGaps.push(`Resolved: "${gapB.clauseName}" upgraded from ${gapA.status} to fair standard.`);
      } else if (gapA.status === 'fair' && (gapB.status === 'weak' || gapB.status === 'missing')) {
        newVulnerabilities.push(`Regressed: "${gapB.clauseName}" downgraded from fair to ${gapB.status}.`);
      }
    }
  }

  let winner: 'docA' | 'docB' | 'tie' = 'tie';
  if (scoreDiff > 3) winner = 'docB';
  else if (scoreDiff < -3) winner = 'docA';

  const verdict = winner === 'docB'
    ? `Document B is significantly safer (+${scoreDiff} points), resolving ${resolvedGaps.length} critical gap(s).`
    : winner === 'docA'
    ? `Document A was safer than Document B (-${Math.abs(scoreDiff)} points). Revisions weakened your protections.`
    : `Both versions offer comparable protection levels (Score difference: ${scoreDiff}).`;

  return {
    scoreA: docAAnalysis.protectionScore,
    scoreB: docBAnalysis.protectionScore,
    winner,
    scoreDifference: scoreDiff,
    resolvedGaps,
    newVulnerabilities,
    verdict
  };
}
