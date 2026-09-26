import { 
  ExpectedClause, 
  AnalysisResult, 
  AIProviderConfig 
} from '../types/legal';
import { DOMAIN_ARCHETYPES } from '../data/archetypes';
import { sanitizePromptForAI, sanitizePlainText, validateApiKey } from '../utils/security';

const STORAGE_KEY_CONFIG = 'lexigap_ai_config';

export function getSavedAIConfig(): AIProviderConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) return JSON.parse(raw);
  } catch {
    // Fail closed with default built-in provider
  }
  return { provider: 'built_in' };
}

export function saveAIConfig(config: AIProviderConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch {
    // Graceful silent fallback
  }
}

/**
 * Generate dynamic custom expectation checklist for unusual/unlisted situations
 * e.g., "Leasing a commercial kitchen for a cloud catering startup in Chicago"
 */
export async function generateExpectationsForCustomSituation(
  situationText: string,
  jurisdiction = 'General'
): Promise<ExpectedClause[]> {
  const config = getSavedAIConfig();
  const safeSituation = sanitizePromptForAI(situationText, 500);
  const safeJurisdiction = sanitizePlainText(jurisdiction, 100);

  // If live Gemini API key is provided and valid, call Gemini Flash with timeout
  if (config.provider === 'gemini' && config.apiKey && validateApiKey(config.apiKey, 'gemini')) {
    try {
      const prompt = `You are an expert legal strategist and contract analyst.
A user is entering into a legal situation: "${safeSituation}" in jurisdiction "${safeJurisdiction}".
Your task is to generate a comprehensive "Expectation Checklist" of 5-7 essential clauses a fair agreement of this type MUST contain to protect the user from exploitation.
For each clause, provide:
1. name: Clause title
2. category: E.g., Financial, Exit Rights, Liability, Operational
3. importance: "essential" or "recommended"
4. plainDescription: Plain-English explanation of what it does
5. exploitIfMissing: What the other party can do if this clause is omitted
6. standardFairPractice: Recommended fair standard wording
7. preNegotiationTip: Question or negotiation script to ask before signing
8. searchKeywords: 3-5 keywords to locate it in a contract

Respond ONLY with valid JSON array of objects conforming to this schema. No markdown formatting, just the raw JSON.`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(config.apiKey)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (jsonText) {
          const parsed = JSON.parse(jsonText);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((item, idx) => ({
              id: `custom_clause_${idx}_${Date.now()}`,
              name: item.name || 'Protective Clause',
              category: item.category || 'General Protection',
              importance: item.importance || 'essential',
              plainDescription: item.plainDescription || '',
              exploitIfMissing: item.exploitIfMissing || '',
              standardFairPractice: item.standardFairPractice || '',
              preNegotiationTip: item.preNegotiationTip || '',
              searchKeywords: item.searchKeywords || [item.name.toLowerCase()]
            }));
          }
        }
      }
    } catch (err) {
      console.warn('Gemini live call failed, falling back to smart dynamic generator', err);
    }
  }

  // Fallback intelligent dynamic generator
  const lower = situationText.toLowerCase();
  let baseArchetype = DOMAIN_ARCHETYPES.rental;
  if (lower.includes('work') || lower.includes('job') || lower.includes('employee') || lower.includes('startup') || lower.includes('salary')) {
    baseArchetype = DOMAIN_ARCHETYPES.employment;
  } else if (lower.includes('freelance') || lower.includes('client') || lower.includes('agency') || lower.includes('contractor') || lower.includes('project')) {
    baseArchetype = DOMAIN_ARCHETYPES.freelance;
  } else if (lower.includes('nda') || lower.includes('confidential') || lower.includes('idea')) {
    baseArchetype = DOMAIN_ARCHETYPES.nda;
  } else if (lower.includes('saas') || lower.includes('software') || lower.includes('terms') || lower.includes('api')) {
    baseArchetype = DOMAIN_ARCHETYPES.consumer_saas;
  }

  return baseArchetype.expectedClauses.map((c, i) => ({
    ...c,
    id: `custom_${i}`,
    preNegotiationTip: `For "${situationText}": ${c.preNegotiationTip}`
  }));
}

/**
 * Generate a professional, diplomatic Counter-Offer Negotiation Email
 */
export function generateCounterOfferEmail(
  analysis: AnalysisResult,
  counterpartTitle = 'Landlord / Hiring Manager / Client'
): string {
  const missingOrWeak = analysis.gaps.filter(g => g.status === 'missing' || g.status === 'weak');
  const itemsText = missingOrWeak.slice(0, 4).map((g, idx) => {
    return `${idx + 1}. **${g.clauseName}** (${g.status === 'missing' ? 'Currently Missing' : 'Needs Adjustment'}):
   - *Proposed Addition:* ${g.remedyDraft || 'Standard mutual balanced language.'}
   - *Rationale:* To ensure mutual clarity and predictability for both parties.`;
  }).join('\n\n');

  return `Subject: Review & Proposed Minor Adjustments - ${analysis.documentTitle}

Dear ${counterpartTitle},

Thank you very much for sending over the agreement for ${analysis.documentTitle}. I am very excited about moving forward together and truly appreciate your partnership.

In reviewing the agreement, I noticed a few standard protective provisions that appear to have been omitted or could benefit from balanced alignment with common standard practice. To make sure both of our interests are well-protected and avoid any ambiguities later on, I would love to propose the following minor adjustments:

${itemsText}

${analysis.sneakyClauses.length > 0 ? `Additionally, regarding the clause on "${analysis.sneakyClauses[0].title}", I would request that we adjust or strike this to reflect standard mutual limits.\n` : ''}
I have attached the suggested redline language for your convenience. Please let me know if these work for you, or if we can have a quick 5-minute call to finalize.

Looking forward to working together!

Warm regards,
[Your Name]
[Your Contact Information]`;
}

/**
 * Generate a comprehensive "Lawyer Consultation Prep Dossier"
 */
export function generateLawyerPrepDossier(analysis: AnalysisResult): string {
  const highRiskGaps = analysis.gaps.filter(g => g.risk === 'high' || g.risk === 'critical');

  const questionsList = analysis.gaps
    .filter(g => g.status === 'missing' || g.status === 'weak')
    .map((g, idx) => `  ${idx + 1}. [${g.clauseName}] ${g.questionForLawyer}`)
    .join('\n');

  return `================================================================================
           LEXIGAP AI - ATTORNEY CONSULTATION PREPARATION DOSSIER
================================================================================
Generated: ${new Date(analysis.timestamp).toLocaleString()}
Document Reviewed: "${analysis.documentTitle}" (${analysis.wordCount} words)
Document Category: ${analysis.domain.toUpperCase()} | Jurisdiction: ${analysis.jurisdiction}
Fairness & Protection Score: ${analysis.protectionScore}/100 [${analysis.overallVerdict}]

================================================================================
1. EXECUTIVE SUMMARY & RISK PROFILE
================================================================================
Total Expected Protective Clauses Evaluated: ${analysis.gaps.length}
- Standard & Fair Clauses Present: ${analysis.fairCount}
- Present But Significantly One-Sided / Weak: ${analysis.weakCount}
- Critical Protective Safeguards Missing: ${analysis.missingCount}
- Predatory / High-Risk Clauses Detected: ${analysis.predatoryCount}

Client Situation Overview:
${analysis.executiveSummary}

================================================================================
2. PRIORITIZED QUESTIONS FOR YOUR LEGAL CONSULTATION
(Present these directly to your attorney to maximize consultation efficiency)
================================================================================
${questionsList || '  No critical omissions detected.'}

================================================================================
3. FLAGGED HIGH-RISK CLAUSES & OMISSIONS
================================================================================
${highRiskGaps.map(g => `
[${g.status.toUpperCase()}] ${g.clauseName} (Category: ${g.category})
- Identified Risk: ${g.analysisNotes}
${g.foundQuote ? `- Existing Document Text: "${g.foundQuote}"\n` : ''}- Recommended Remedy: ${g.remedyDraft || 'Insert standard clause.'}
`).join('\n')}

${analysis.sneakyClauses.length > 0 ? `
================================================================================
4. PREDATORY / SURPRISE CLAUSES FLAGGED FOR REVIEW
================================================================================
${analysis.sneakyClauses.map(s => `
* ${s.title.toUpperCase()} (Severity: ${s.severity.toUpperCase()})
  Document Quote: "${s.exactQuote}"
  Vulnerability: ${s.hiddenRisk}
  Counsel Recommendation: ${s.suggestedAction}
`).join('\n')}
` : ''}

================================================================================
5. STATUTORY & LOCAL JURISDICTION CONSIDERATIONS
================================================================================
- Applicable Jurisdiction: ${analysis.jurisdiction}
- Attorney Note: Please verify whether local tenancy acts, labor codes, or commercial statutes override any of the one-sided provisions flagged above as a matter of public policy.

================================================================================
LEGAL INFORMATION DISCLAIMER
This dossier is generated by LexiGap AI for educational preparation and issue-spotting prior to professional legal consultation. It does NOT constitute legal advice or create an attorney-client relationship.
================================================================================`;
}

/**
 * Answer interactive question against the contract
 */
export async function answerContractQuestion(
  documentText: string,
  question: string,
  analysis: AnalysisResult
): Promise<{ answer: string; citations: string[] }> {
  const config = getSavedAIConfig();
  const safeQuestion = sanitizePromptForAI(question, 500);
  const safeDocExcerpt = sanitizePlainText(documentText, 10000);

  // If live Gemini is configured and valid, use live LLM with timeout
  if (config.provider === 'gemini' && config.apiKey && validateApiKey(config.apiKey, 'gemini')) {
    try {
      const prompt = `You are LexiGap AI, an objective legal information assistant helping a consumer navigate their document.
Document Text:
${safeDocExcerpt}

Current Analysis Summary:
Protection Score: ${analysis.protectionScore}/100.
Missing Clauses: ${analysis.gaps.filter(g => g.status === 'missing').map(g => g.clauseName).join(', ')}.
Weak Clauses: ${analysis.gaps.filter(g => g.status === 'weak').map(g => g.clauseName).join(', ')}.

User Question: "${safeQuestion}"

Provide a clear, helpful, plain-English answer that:
1. Explains what the document actually says (or what it dangerously omits regarding this topic).
2. Quotes exact text if found.
3. Gives the user clear, actionable next steps or questions to ask.
4. Includes a short reminder that this is legal information, not formal attorney advice.`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(config.apiKey)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return { answer: text, citations: [] };
        }
      }
    } catch {
      // Graceful fallback to built-in semantic engine
    }
  }

  // Built-in intelligent semantic answering
  const qLower = question.toLowerCase();
  const citations: string[] = [];

  // Match question against detected gaps and document contents
  for (const gap of analysis.gaps) {
    if (qLower.includes(gap.clauseName.toLowerCase()) || 
        gap.clauseName.toLowerCase().split(' ').some(w => w.length > 4 && qLower.includes(w))) {
      if (gap.foundQuote) {
        citations.push(gap.foundQuote);
      }
      if (gap.status === 'missing') {
        return {
          answer: `Regarding **${gap.clauseName}**: This contract **omits this clause entirely**. ${gap.analysisNotes}\n\n**Next Steps:** You should ask the other party to add: "${gap.remedyDraft}".\n\n*Question to ask:* "${gap.questionForCounterpart}"`,
          citations
        };
      } else if (gap.status === 'weak') {
        return {
          answer: `Regarding **${gap.clauseName}**: This clause is present in your contract, but is **substantially one-sided**: ${gap.analysisNotes}\n\n**Next Steps:** Request standard balanced wording: "${gap.remedyDraft}".`,
          citations
        };
      } else {
        return {
          answer: `Regarding **${gap.clauseName}**: Good news! This clause is **present and balanced** in your document. ${gap.analysisNotes}`,
          citations
        };
      }
    }
  }

  if (qLower.includes('break') || qLower.includes('leave') || qLower.includes('terminate') || qLower.includes('exit')) {
    const breakGap = analysis.gaps.find(g => g.clauseId.includes('break') || g.clauseId.includes('termination'));
    return {
      answer: `Based on your contract: ${breakGap ? breakGap.analysisNotes : 'Early termination rights are limited.'}\n\n**Actionable Advice:** Always ensure you have a defined notice period (30–60 days) and a capped break fee rather than remaining liable for the full term.`,
      citations: breakGap?.foundQuote ? [breakGap.foundQuote] : []
    };
  }

  if (qLower.includes('deposit') || qLower.includes('money') || qLower.includes('refund')) {
    const depGap = analysis.gaps.find(g => g.clauseId.includes('deposit'));
    return {
      answer: `Regarding your money and deposit: ${depGap ? depGap.analysisNotes : 'Check the deposit return clauses closely.'}\n\n**Recommendation:** Require that refund occurs within 21 days with itemized receipts, excluding reasonable wear and tear.`,
      citations: depGap?.foundQuote ? [depGap.foundQuote] : []
    };
  }

  return {
    answer: `In analyzing your document for "${question}":\n\n- The overall protection score is **${analysis.protectionScore}/100** (${analysis.overallVerdict}).\n- There are **${analysis.missingCount} missing protections** and **${analysis.weakCount} one-sided clauses** in this agreement.\n- For any specific topic, check our **Expectation Checklist** on the left to see what typical agreements in this category should include.\n\n*Reminder: This analysis provides educational issue-spotting and does not substitute for a consultation with a licensed attorney.*`,
    citations
  };
}
