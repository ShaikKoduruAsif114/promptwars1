import DOMPurify from 'dompurify';

/**
 * Maximum permissible input length to prevent ReDoS / memory exhaustion attacks.
 * (500,000 characters is ~100,000 words, enough for any standard multi-page contract).
 */
export const MAX_DOCUMENT_LENGTH = 500_000;
export const MAX_QUESTION_LENGTH = 1_000;

/**
 * Sanitizes HTML content using DOMPurify with strict allowlist rules,
 * with universal compatibility for both browser and Node/Vitest test environments.
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return '';

  try {
    const purifier = (DOMPurify as any)?.sanitize 
      ? (DOMPurify as any) 
      : (DOMPurify as any)?.default?.sanitize 
        ? (DOMPurify as any).default 
        : typeof DOMPurify === 'function' 
          ? (DOMPurify as any)() 
          : null;

    if (purifier && typeof purifier.sanitize === 'function') {
      return purifier.sanitize(dirty, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'span', 'p', 'br', 'ul', 'ol', 'li', 'code', 'pre'],
        ALLOWED_ATTR: ['class', 'style'],
        ALLOW_DATA_ATTR: false
      });
    }
  } catch {
    // Fall back to server/test-safe sanitizer below
  }

  // Robust fallback for Node/headless test environments
  return dirty
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/\son\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '')
    .replace(/javascript:[^\s"'>]*/gi, '');
}

/**
 * Sanitizes and bounds plain text inputs, stripping control characters and null bytes.
 */
export function sanitizePlainText(raw: string, maxLength = MAX_DOCUMENT_LENGTH): string {
  if (!raw) return '';
  // Remove null bytes and non-printable control characters (except newline, carriage return, tab)
  // eslint-disable-next-line no-control-regex
  const cleaned = raw.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  return cleaned.slice(0, maxLength);
}

/**
 * Defends against prompt injection attempts before sending text to LLM endpoints.
 * Neutralizes system prompt overrides, role manipulation, and jailbreak patterns.
 */
export function sanitizePromptForAI(userInput: string, maxLen = MAX_QUESTION_LENGTH): string {
  if (!userInput) return '';
  
  let cleaned = sanitizePlainText(userInput, maxLen);

  // Neutralize common prompt injection / jailbreak injection vectors
  const injectionPatterns = [
    /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/gi,
    /disregard\s+(all\s+)?(previous|prior|system)\s+prompts/gi,
    /<\|im_start\|>/gi,
    /<\|im_end\|>/gi,
    /system\s*:\s*you\s+are/gi,
    /you\s+are\s+now\s+in\s+developer\s+mode/gi,
    /act\s+as\s+an\s+unrestricted\s+ai/gi,
    /reveal\s+your\s+(system\s+)?prompt/gi
  ];

  for (const pattern of injectionPatterns) {
    cleaned = cleaned.replace(pattern, '[filtered]');
  }

  return cleaned.trim();
}

/**
 * Masks an API key for safe UI display (e.g., "AIza...9xQ2").
 */
export function maskApiKey(key?: string): string {
  if (!key) return '';
  const trimmed = key.trim();
  if (trimmed.length <= 8) return '••••••••';
  return `${trimmed.slice(0, 4)}••••••••${trimmed.slice(-4)}`;
}

/**
 * Validates whether an API key matches expected provider formats.
 */
export function validateApiKey(key: string, provider: 'gemini' | 'openai' | 'built_in'): boolean {
  if (provider === 'built_in') return true;
  if (!key || typeof key !== 'string') return false;
  const trimmed = key.trim();
  
  if (provider === 'gemini') {
    // Google API keys typically start with AIza and are 39 chars long
    return trimmed.startsWith('AIza') && trimmed.length >= 30;
  }
  
  return trimmed.length >= 20;
}
