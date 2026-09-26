# LexiGap AI — Legal Gap Detector & Pre-Negotiation Copilot
> **"Know what you're missing before you sign."**  
> An out-of-the-box GenAI solution that empowers consumers, tenants, employees, and freelancers to spot omitted clauses, asymmetrical terms, and predatory traps in legal documents before they sign.

---

## 🏆 Problem Statement & Core Innovation

### The Blindspot of Traditional Legal AI
Most legal AI tools operate as simple document summarizers: you upload a contract, and the AI summarizes *what is written*. 
However, **the real legal accessibility gap is what is absent**:
- First-time tenants do not know that a lease is supposed to have a **statutory security deposit refund timeline** or a **mandatory 24-hour entry notice**.
- Junior software engineers do not know that an offer letter should have **invention assignment carve-outs for off-hours side projects** or **equity vesting acceleration**.
- Freelancers do not know that client contracts frequently sneak in **unlimited indemnification** while omitting **kill fees** and **late interest**.

**You cannot flag the absence of a clause you didn't know to expect.**

### The LexiGap Solution ("Flipping the Script")
LexiGap AI flips the traditional legal workflow:
1. **Pre-Contract Exploration:** The user describes their situation in plain words (or chooses an archetype). LexiGap generates an **Expectation Baseline Matrix** of standard protective safeguards *before* a document is even signed.
2. **Gap Detection & Asymmetry Scanner:** When the document is provided, LexiGap runs a deep gap analysis comparing **Expected vs. Actual** across four distinct classifications:
   - 🟢 **Present & Balanced:** Safeguard is clearly articulated and reciprocal.
   - 🟡 **Present but One-Sided / Weak:** Clause exists but terms are heavily skewed (e.g., landlord entry without prior notice; Net 90 payment cycle).
   - 🔴 **Missing / Omitted:** Essential protective clauses left out entirely.
   - ⚡ **Predatory Traps:** Sneaky clauses designed to exploit the signer (e.g., 7-day personal property forfeiture, individual unlimited liability).
3. **Actionable Pre-Negotiation Outputs:**
   - **Interactive Action Checklist:** Pre-signing to-do items.
   - **Diplomatic Counter-Offer Drafter:** Pre-written, non-adversarial emails proposing balanced replacement wording.
   - **Attorney Consultation Prep Dossier:** A prioritized, structured brief ready to print or hand to a licensed lawyer to maximize consultation efficiency.

---

## 🎯 Alignment with Problem Statement & Evaluation Criteria

| Competition Requirement | LexiGap Implementation | Where to Test in App |
| :--- | :--- | :--- |
| **Simplifying complex legal documents** | Plain-English explanations, jargon-free risk summaries, and interactive clause decoders. | *Gap Detector & Q&A Assistant* |
| **Comparing contracts, agreements, or policies** | Dedicated **Contract Version Battle & Diff Comparator** mode calculating delta scores, protections gained, and regressions between drafts. | *Compare Versions Tab* |
| **Highlighting important clauses, obligations, risks, or inconsistencies** | Color-coded 4-tier severity scanner with Fairness Index Score (0–100), cited verbatim quotes, and exploit risks. | *Fairness Score Hero & Gap Cards* |
| **Answering questions based on provided documents** | Context-aware **Document Navigator & Q&A Chat** with verbatim contract citations and statutory context. | *Doc Navigator & Q&A Tab* |
| **Helping users understand their options & next steps** | Pre-signing interactive checklist and negotiation strategy tips for every flagged clause. | *Action Checklist & Negotiation Tips* |
| **Generating summaries, checklists, or actionable outputs** | 1-Click **Polite Counter-Offer & Redline Email Drafter** ready to send to counterparts. | *Counter-Offer Modal* |
| **Helping users prepare for a legal professional** | 1-Click exportable **Attorney Consultation Prep Dossier** (Markdown/Printable PDF) with prioritized questions. | *Lawyer Dossier Modal* |
| **Legal Boundary & Ethical Compliance** | Prominent legal boundary disclaimers reinforcing that LexiGap provides educational legal information and assistance, not formal legal counsel. | *Global Header Disclaimer Banner* |

---

## 🧠 GenAI Architecture & Explicit Service Mapping

LexiGap AI implements a modular, grounded GenAI pipeline designed to prevent hallucinations and provide explainable results:

```
[ User Situation / Plain Input ]
               │
               ▼
┌───────────────────────────────────────────────┐
│ Stage 1: Dynamic Expectation Synthesis        │  ──> Google Gemini 1.5 Flash (Structured JSON Mode)
│ (Generates custom required clause matrix)     │      Fallback: Grounded Legal Domain Knowledge Base
└───────────────────────────────────────────────┘
               │
               ▼
┌───────────────────────────────────────────────┐
│ Stage 2: Grounded Legal Domain Knowledge Base │  ──> src/data/archetypes.ts
│ (Statutory benchmarks & fair standard terms)  │      Rental, Tech Offer, Freelance MSA, NDA, SaaS
└───────────────────────────────────────────────┘
               │
               ▼
┌───────────────────────────────────────────────┐
│ Stage 3: Semantic Chunking & Citation Locator │  ──> Regex + Semantic Keyword Cluster Locator
│ (Extracts exact quotes or flags absences)     │      Binds each clause to source text
└───────────────────────────────────────────────┘
               │
               ▼
┌───────────────────────────────────────────────┐
│ Stage 4: Multi-Factor Gap & Asymmetry Engine  │  ──> Evaluator Engine (src/services/gapEngine.ts)
│ (Classifies Fair vs Weak vs Missing vs Trap)  │      Computes Fairness Index Score (0–100)
└───────────────────────────────────────────────┘
               │
               ▼
┌───────────────────────────────────────────────┐
│ Stage 5: Counter-Offer & Redline Synthesizer  │  ──> LLM Negotiation Drafter
│ (Generates diplomatic, win-win email drafts)  │      src/services/aiService.ts
└───────────────────────────────────────────────┘
               │
               ▼
┌───────────────────────────────────────────────┐
│ Stage 6: Attorney Briefing Synthesizer        │  ──> Dossier Compiler (src/services/aiService.ts)
│ (Prioritizes legal questions for consultation)│      Exportable Markdown / Printable PDF
└───────────────────────────────────────────────┘
```

### Integrated GenAI Services
1. **Google Gemini 1.5 Flash (via Generative Language API):** Used for real-time natural language situation mapping, dynamic expectation checklist synthesis in JSON mode, and contract interrogation Q&A.
2. **Grounded Legal Knowledge Base (RAG Anchor):** Pre-curated statutory standards for residential leases, startup employment agreements, freelance MSAs, and mutual NDAs. Prevents hallucination by grounding clause evaluation in established legal standards.
3. **Built-in Fallback Intelligent Engine:** Ensures the application runs **100% offline with zero setup** for evaluators, while also allowing live Gemini API keys to be configured via the Settings modal.

---

## 🔒 Security, Privacy & Ethical Guardrails

- **Client-Side Privacy:** All contract documents uploaded or pasted are processed in-memory inside the browser. No contract text is retained on remote servers.
- **Safe API Key Handling:** User-provided Gemini API keys are stored strictly in `localStorage` in the user's browser session and never sent to third-party tracking services.
- **XSS Sanitization:** Rendered outputs and quotes are sanitized using `DOMPurify`.
- **Legal Access Boundary:** Every page reinforces that LexiGap AI provides pre-negotiation assistance and educational issue-spotting, empowering users to consult qualified attorneys more effectively.

---

## 🧪 Testing & Verification

LexiGap AI includes a unit and integration test suite using **Vitest**:
- ✅ Detection of omitted deposit return timelines and unannounced landlord entry.
- ✅ Spotting overreaching blanket IP assignments and non-compete clauses.
- ✅ Scoring accuracy and severity penalties.
- ✅ Version battle comparison algorithm and diff calculations.
- ✅ Attorney consultation dossier and counter-offer email generation.

Run the test suite:
```bash
npm test
```

Expected output:
```
 ✓ src/tests/gapEngine.test.ts (6 tests)
 Test Files  1 passed (1)
      Tests  6 passed (6)
```

---

## 🚀 Quickstart & Local Deployment

### Prerequisites
- Node.js v18+ (tested on Node v24)
- npm v9+

### 1. Installation
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Production Build
```bash
npm run build
```
The optimized bundle is generated in `dist/` with a tiny footprint (< 360 KB total, gzip < 115 KB).

### 4. Repository Size Compliance
The entire codebase (excluding `node_modules` and `.git`) is **under 350 KB**, complying with the **< 10 MB competition limit**.

---

## 📁 Project Structure

```
prompt_war_1/
├── index.html                           # App shell, Google typography & SVG favicon
├── package.json                         # Dependencies & test scripts
├── tsconfig.json                        # TypeScript configurations
├── vite.config.ts                       # Vite bundler configuration
├── src/
│   ├── main.tsx                         # Entry point
│   ├── App.tsx                          # Core app coordinator & modal manager
│   ├── index.css                        # Modern dark luxury design system & tokens
│   ├── types/
│   │   └── legal.ts                     # Strict TypeScript schemas for gaps, scores & dossiers
│   ├── data/
│   │   ├── archetypes.ts                # Grounded baseline standards (Leases, Jobs, Freelance, NDA)
│   │   └── samples.ts                   # Realistic test contracts with known vulnerabilities
│   ├── services/
│   │   ├── gapEngine.ts                 # Gap detection, clause scoring & version comparison
│   │   └── aiService.ts                 # Gemini API integration, prompt pipelines & dossiers
│   ├── components/
│   │   ├── Header.tsx                   # Top navigation with tabs and actions
│   │   ├── LegalDisclaimerBanner.tsx    # Prominent ethical boundary banner
│   │   ├── PreNegotiationExpectations.tsx# Situation-first expectation matrix generator
│   │   ├── DocumentUploader.tsx         # 1-click test samples & local file uploader
│   │   ├── AnalysisDashboard.tsx        # Fairness score hero, gap cards & checklist
│   │   ├── ContractComparisonView.tsx   # Side-by-side version battle & diff comparator
│   │   ├── DocumentChatNavigator.tsx    # Plain-English Q&A assistant with citations
│   │   ├── LawyerDossierModal.tsx       # Exportable attorney consultation dossier
│   │   ├── CounterOfferModal.tsx        # Diplomatic counter-offer email drafter
│   │   ├── GenAiArchitectureModal.tsx   # Explicit GenAI pipeline mapping modal
│   │   └── SettingsModal.tsx            # API provider configuration & privacy controls
│   └── tests/
│       └── gapEngine.test.ts            # Vitest unit & integration test suite
```

---

## 👥 Submission Information
- **Project Name:** LexiGap AI — Pre-Negotiation Legal Gap Detector
- **Repository Size:** < 10 MB (Clean source < 350 KB)
- **Problem Statement Alignment:** 100% across all 7 potential directions + ethical legal boundary
- **Live Demo:** Ready for instant deployment on Vercel, Netlify, or GitHub Pages (`npm run build`).
