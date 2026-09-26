export type LegalDomain = 
  | 'rental' 
  | 'employment' 
  | 'freelance' 
  | 'nda' 
  | 'consumer_saas' 
  | 'custom';

export type ClauseStatus = 'fair' | 'weak' | 'missing' | 'predatory';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ExpectedClause {
  id: string;
  name: string;
  category: string;
  importance: 'essential' | 'recommended' | 'optional';
  plainDescription: string;
  exploitIfMissing: string;
  standardFairPractice: string;
  preNegotiationTip: string;
  searchKeywords: string[];
}

export interface DomainArchetype {
  id: LegalDomain;
  title: string;
  tagline: string;
  iconName: string;
  typicalJurisdictions: string[];
  commonTrapSummary: string;
  expectedClauses: ExpectedClause[];
}

export interface DetectedGapItem {
  id: string;
  clauseId: string;
  clauseName: string;
  category: string;
  status: ClauseStatus;
  risk: RiskLevel;
  foundQuote?: string;
  analysisNotes: string;
  remedyDraft?: string;
  questionForCounterpart: string;
  questionForLawyer: string;
}

export interface SneakyClause {
  id: string;
  title: string;
  exactQuote: string;
  hiddenRisk: string;
  severity: RiskLevel;
  suggestedAction: string;
}

export interface ActionChecklistItem {
  id: string;
  text: string;
  category: 'must_ask' | 'counter_offer' | 'lawyer_review';
  completed: boolean;
}

export interface AnalysisResult {
  domain: LegalDomain;
  documentTitle: string;
  jurisdiction: string;
  wordCount: number;
  protectionScore: number; // 0 to 100
  fairCount: number;
  weakCount: number;
  missingCount: number;
  predatoryCount: number;
  overallVerdict: string;
  executiveSummary: string;
  gaps: DetectedGapItem[];
  sneakyClauses: SneakyClause[];
  actionChecklist: ActionChecklistItem[];
  timestamp: string;
}

export interface ComparisonResult {
  docAName: string;
  docBName: string;
  scoreA: number;
  scoreB: number;
  winner: 'docA' | 'docB' | 'tie';
  clausesAddedInB: string[];
  clausesWeakenedInB: string[];
  criticalDiffSummary: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: string[];
}

export interface AIProviderConfig {
  apiKey?: string;
  provider: 'gemini' | 'claude' | 'openai' | 'built_in';
  modelName?: string;
}
