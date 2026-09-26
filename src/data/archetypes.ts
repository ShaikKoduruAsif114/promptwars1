import { DomainArchetype } from '../types/legal';

export const DOMAIN_ARCHETYPES: Record<string, DomainArchetype> = {
  rental: {
    id: 'rental',
    title: 'Residential Lease / Tenancy Agreement',
    tagline: 'Protect against unfair security deposit withholding, sudden evictions, and hidden repair costs.',
    iconName: 'Home',
    typicalJurisdictions: ['US (State-specific)', 'UK (Assured Shorthold)', 'India (Rent Control/Model Act)', 'Canada', 'General'],
    commonTrapSummary: 'Landlords commonly omit deposit return deadlines, emergency entry limits, and normal wear-and-tear protections while inserting unilateral forfeiture penalties.',
    expectedClauses: [
      {
        id: 'rent_deposit_return',
        name: 'Security Deposit Refund Timeline & Itemization',
        category: 'Financial Protection',
        importance: 'essential',
        plainDescription: 'A strict statutory or contractual deadline (typically 14–30 days) by which the landlord must return your deposit with an itemized receipt for any deductions.',
        exploitIfMissing: 'Without this, landlords can hold your money indefinitely, stall without explanation, or make vague lump-sum deductions without itemized repair quotes.',
        standardFairPractice: 'Landlord shall return deposit within 21 days of handover, accompanied by written receipts and invoices for any valid damage repair.',
        preNegotiationTip: 'Ask: "Can we specify that deposit return occurs within 21 days with itemized receipts, excluding ordinary wear and tear?"',
        searchKeywords: ['security deposit', 'refund', 'itemized', 'deduction', 'deposit return', 'days after surrender', 'handover']
      },
      {
        id: 'rent_landlord_entry',
        name: 'Landlord Notice for Entry / Right to Privacy',
        category: 'Privacy & Quiet Enjoyment',
        importance: 'essential',
        plainDescription: 'Requires the landlord to give at least 24 to 48 hours advance written notice before entering the property, restricted to reasonable daytime hours.',
        exploitIfMissing: 'Landlords or property managers can enter without warning, showing up unannounced under the pretext of inspection or prospective buyer viewings.',
        standardFairPractice: 'Landlord must provide a minimum 24-hour written notice prior to non-emergency inspections during standard business hours.',
        preNegotiationTip: 'Confirm: "Please ensure entry requires 24 hours advance written notice except in verified genuine emergencies like water leaks."',
        searchKeywords: ['notice of entry', '24 hours', '48 hours', 'inspection', 'access to premises', 'quiet enjoyment', 'unannounced']
      },
      {
        id: 'rent_repair_obligations',
        name: 'Structural Repairs & Habitability Standards',
        category: 'Maintenance & Health',
        importance: 'essential',
        plainDescription: 'Explicitly assigns major plumbing, electrical, roof, heating/cooling, and foundation repairs to the landlord at their sole expense.',
        exploitIfMissing: 'Leases often quietly shift all repair burdens under a certain threshold ($200+) or all HVAC/plumbing breakdowns to the tenant.',
        standardFairPractice: 'Landlord is liable for all structural, electrical, plumbing, sanitation, and exterior maintenance not caused by tenant negligence.',
        preNegotiationTip: 'State: "Let us clarify that tenant is only responsible for minor day-to-day consumables (bulbs, fuses), while structural and appliance wear is landlord duty."',
        searchKeywords: ['repairs', 'maintenance', 'structural', 'habitability', 'plumbing', 'heating', 'air conditioning', 'major repair']
      },
      {
        id: 'rent_break_clause',
        name: 'Early Termination / Break Clause',
        category: 'Exit Rights',
        importance: 'essential',
        plainDescription: 'Permits the tenant to terminate the lease early (e.g. for job relocation, family emergency, or with 1-2 months notice) with a reasonable capped penalty.',
        exploitIfMissing: 'You could be held legally liable for the entire remaining rent balance of the full 12+ month term if forced to move early.',
        standardFairPractice: 'Tenant may terminate with 30–60 days written notice upon payment of an early lease break fee not exceeding 1 month rent.',
        preNegotiationTip: 'Ask: "Can we include a mutual 60-day notice break clause so either party has predictable flexibility if employment relocates?"',
        searchKeywords: ['early termination', 'break clause', 'notice period', 'surrender', 'relocation', 'lease break fee', 'remaining rent']
      },
      {
        id: 'rent_wear_and_tear',
        name: 'Normal Wear and Tear Exclusion',
        category: 'Move-out Rights',
        importance: 'essential',
        plainDescription: 'Protects the tenant from being charged for faded paint, carpet aging, minor scuffs, or natural building settlement.',
        exploitIfMissing: 'Landlords frequently use the security deposit to fund full apartment renovations under the guise of repairing standard living marks.',
        standardFairPractice: 'Tenant shall surrender premises in good condition, reasonable wear and tear and damage by unavoidable casualty excepted.',
        preNegotiationTip: 'Ensure the phrase "reasonable wear and tear excepted" is explicitly attached to the move-out condition clause.',
        searchKeywords: ['wear and tear', 'reasonable wear', 'ordinary wear', 'condition of premises', 'repainting', 'carpet cleaning']
      },
      {
        id: 'rent_uninhabitability',
        name: 'Rent Abatement for Casualty / Uninhabitability',
        category: 'Disaster & Safety',
        importance: 'recommended',
        plainDescription: 'Rent stops or is prorated if the property becomes partially or wholly uninhabitable due to flood, fire, pipe burst, or mold not caused by the tenant.',
        exploitIfMissing: 'You may be forced to pay full rent while displaced into an expensive hotel during weeks of remediation.',
        standardFairPractice: 'If premises are rendered unusable without tenant fault, rent shall abate proportionately until fully restored or lease may be voided.',
        preNegotiationTip: 'Check: "Does rent pause if the unit suffers a major pipe burst or flood rendering it unlivable?"',
        searchKeywords: ['uninhabitable', 'rent abatement', 'casualty', 'fire or flood', 'prorated rent', 'damage to premises']
      },
      {
        id: 'rent_lockin_penalty',
        name: 'Forfeiture & Default Cure Period',
        category: 'Dispute & Penalty',
        importance: 'essential',
        plainDescription: 'Requires landlord to give tenant written notice and at least 7–14 days to cure any inadvertent late payment before eviction or legal penalties begin.',
        exploitIfMissing: 'Landlords can declare immediate default, terminate the lease, or assess compounding daily exorbitant fines on day 2.',
        standardFairPractice: 'No eviction or default action may commence without minimum 7 days written notice specifying breach and opportunity to cure.',
        preNegotiationTip: 'Request: "Please include a standard 7-day written notice cure period for any accidental billing or rent payment delays."',
        searchKeywords: ['cure period', 'default', 'written notice to cure', 'grace period', 'eviction notice', 'forfeiture']
      }
    ]
  },
  employment: {
    id: 'employment',
    title: 'Employment Offer Letter & Tech Agreement',
    tagline: 'Uncover trap non-competes, IP land grabs, unvested equity clawbacks, and missing severance.',
    iconName: 'Briefcase',
    typicalJurisdictions: ['US (At-Will)', 'UK / Europe', 'India (Labour Laws)', 'Canada', 'General'],
    commonTrapSummary: 'Tech contracts frequently claim ownership of everything you invent on weekends, impose unenforceable non-competes, and leave severance completely undefined.',
    expectedClauses: [
      {
        id: 'emp_ip_carveout',
        name: 'Invention Assignment Carve-Out (Moonlighting / Prior Inventions)',
        category: 'Intellectual Property',
        importance: 'essential',
        plainDescription: 'Expressly reserves your ownership of personal side projects, open-source work, and prior inventions created on your own time without company resources.',
        exploitIfMissing: 'Companies often use blanket language ("all inventions conceived during employment") to claim ownership of side apps, books, or startup ideas you build on weekends.',
        standardFairPractice: 'Employee retains sole ownership of prior inventions listed in Exhibit A and any future inventions developed entirely on personal time without employer equipment.',
        preNegotiationTip: 'Add: "I want an Exhibit A attached listing my existing open source repositories and side projects excluded from IP assignment."',
        searchKeywords: ['invention assignment', 'proprietary rights', 'prior inventions', 'carve out', 'moonlighting', 'personal time', 'intellectual property']
      },
      {
        id: 'emp_severance_notice',
        name: 'Notice Period & Severance Protection',
        category: 'Compensation & Security',
        importance: 'essential',
        plainDescription: 'Specifies guaranteed notice (30–90 days) or salary in lieu of notice in the event of termination without cause or company restructuring.',
        exploitIfMissing: 'Employer can terminate same-day with zero compensation or buffer, leaving you with sudden loss of income and healthcare.',
        standardFairPractice: 'In the event of termination without Cause, employer shall provide 60 days advance notice or equivalent severance payment plus accrued benefits.',
        preNegotiationTip: 'Ask: "Can we clarify the notice period or severance package in the event of team restructuring or layoff?"',
        searchKeywords: ['severance', 'notice period', 'termination without cause', 'salary in lieu', 'garden leave', 'separation pay']
      },
      {
        id: 'emp_cause_definition',
        name: 'Strict Definition of "Cause" for Termination',
        category: 'Job Security',
        importance: 'essential',
        plainDescription: 'Narrowly restricts "Cause" to gross misconduct, felony conviction, or material fraud, rather than subjective disagreement or minor performance metrics.',
        exploitIfMissing: 'Unscrupulous employers define "Cause" so broadly that any disagreement allows them to fire you and claw back unvested options or earned bonuses.',
        standardFairPractice: 'Cause shall strictly mean willful felony conviction, proven embezzlement, or intentional material damage after 30-day notice and opportunity to remedy.',
        preNegotiationTip: 'Review: "Make sure Cause requires formal written warning and willful bad faith rather than simple commercial differences."',
        searchKeywords: ['definition of cause', 'for cause', 'gross negligence', 'misconduct', 'cure period', 'willful breach']
      },
      {
        id: 'emp_equity_acceleration',
        name: 'Equity Vesting Schedule & Acceleration on Acquisition',
        category: 'Equity & Upside',
        importance: 'recommended',
        plainDescription: 'Clearly spells out the vesting terms (e.g. 1-year cliff, 4-year monthly) and single/double-trigger acceleration if the company is acquired.',
        exploitIfMissing: 'If the startup is bought out or management shifts, unvested options can be cancelled or forfeited without acceleration, leaving early employees with zero.',
        standardFairPractice: 'Standard 4-year vesting with 1-year cliff, accompanied by double-trigger acceleration (50–100%) if terminated within 12 months of a Change in Control.',
        preNegotiationTip: 'Inquire: "Does the stock option agreement include double-trigger acceleration in the event of an acquisition and subsequent team transition?"',
        searchKeywords: ['equity', 'vesting', 'stock options', 'acceleration', 'change of control', 'double trigger', 'cliff']
      },
      {
        id: 'emp_noncompete_scope',
        name: 'Reasonable Non-Compete / Restrictive Covenants',
        category: 'Future Career Mobility',
        importance: 'essential',
        plainDescription: 'Limits post-employment job restrictions to reasonable geographic bounds, specific named competitors, and reasonable timeframes (not exceeding 6–12 months, or void where unlawful).',
        exploitIfMissing: 'Overly aggressive clauses ban you from working anywhere in your industry worldwide for 2 years, effectively locking you out of your career.',
        standardFairPractice: 'Non-compete restricted strictly to direct competitors within immediate operational geography for a period not exceeding 6 months, compliant with local laws.',
        preNegotiationTip: 'Clarify: "Let us narrow the non-compete scope to direct competitors only and confirm it aligns with regional employment guidelines."',
        searchKeywords: ['non-compete', 'non-competition', 'noncompete', 'restrictive covenant', 'restraint of trade', 'solicitation', 'competing business', 'geographic scope']
      },
      {
        id: 'emp_expense_reimbursement',
        name: 'Remote Work & Business Expense Reimbursement',
        category: 'Perks & Operations',
        importance: 'recommended',
        plainDescription: 'Guarantees monthly or one-off reimbursement for work equipment, internet, travel, and necessary software tools.',
        exploitIfMissing: 'You absorb hundreds of dollars monthly in phone bills, high-speed fiber, and home office gear without tax or company reimbursement.',
        standardFairPractice: 'Company reimburses all reasonable, pre-approved travel and monthly remote communications expenses within 30 days of submission.',
        preNegotiationTip: 'Confirm: "Is there a stipulated monthly stipend or reimbursement schedule for remote office internet and hardware?"',
        searchKeywords: ['reimbursement', 'expenses', 'remote work stipend', 'travel expense', 'business expenses']
      }
    ]
  },
  freelance: {
    id: 'freelance',
    title: 'Freelance & Independent Contractor Agreement',
    tagline: 'Avoid infinite unpaid revisions, scope creep, delayed payments, and uncapped liability.',
    iconName: 'Code',
    typicalJurisdictions: ['US', 'UK', 'Global / Cross-border'],
    commonTrapSummary: 'Clients frequently omit scope change procedures and kill fees while transferring copyright before invoices are paid.',
    expectedClauses: [
      {
        id: 'free_ip_transfer_upon_payment',
        name: 'IP Transfer Contingent Upon Full & Final Payment',
        category: 'Copyright & Ownership',
        importance: 'essential',
        plainDescription: 'Intellectual property and copyright in deliverables only transfers to the client once the invoice has been paid in full.',
        exploitIfMissing: 'If the contract says "Contractor assigns all IP upon creation," the client owns your work immediately and can refuse to pay your invoice while keeping your code/design.',
        standardFairPractice: 'Assignment of copyright and intellectual property rights in final deliverables shall occur solely upon contractor receipt of full and final payment.',
        preNegotiationTip: 'State: "I always include the clause that copyright assigns upon receipt of cleared funds, protecting both sides."',
        searchKeywords: ['assignment of rights', 'intellectual property', 'upon full payment', 'copyright transfer', 'condition precedent', 'retains ownership']
      },
      {
        id: 'free_payment_terms_late_fee',
        name: 'Payment Terms, Milestones & Late Fee Interest',
        category: 'Cash Flow',
        importance: 'essential',
        plainDescription: 'Clear invoicing terms (e.g. Net 15 or Net 30) with an automatic statutory or contractual late interest charge (e.g. 1.5% per month) on overdue amounts.',
        exploitIfMissing: 'Client pays 90 to 120 days late without consequence, while you act as their interest-free bank loan.',
        standardFairPractice: 'Invoices due within 15 calendar days. Overdue balances accrue interest at 1.5% per month or maximum legal rate, plus collection costs.',
        preNegotiationTip: 'Ask: "Can we set Net 15 or Net 30 with standard late payment interest to keep accounting predictable?"',
        searchKeywords: ['net 15', 'net 30', 'late fee', 'interest on overdue', 'payment schedule', 'milestone payment', 'invoice due date']
      },
      {
        id: 'free_scope_change_orders',
        name: 'Scope Definition & Change Order Mechanism',
        category: 'Scope Control',
        importance: 'essential',
        plainDescription: 'Defines deliverables explicitly and sets a written procedure and hourly rate for any requests exceeding the initial statement of work.',
        exploitIfMissing: 'Clients demand endless extra features, meetings, and redesigns, arguing they are "part of the original project scope."',
        standardFairPractice: 'Any revisions beyond the 2 included review rounds or alterations to SOW specifications require a signed Change Order at $X/hour.',
        preNegotiationTip: 'Include: "Let us define 2 rounds of revisions within scope; additional requests will be handled via simple email change order."',
        searchKeywords: ['scope creep', 'change order', 'revision rounds', 'statement of work', 'additional work', 'specifications']
      },
      {
        id: 'free_kill_fee',
        name: 'Kill Fee / Project Cancellation Fee',
        category: 'Risk Mitigation',
        importance: 'essential',
        plainDescription: 'Ensures that if the client cancels the project midway for internal reasons, you are paid for all hours worked plus a cancellation percentage.',
        exploitIfMissing: 'Client can halt the project on week 6 and demand their deposit back or refuse to pay for work already completed.',
        standardFairPractice: 'Upon early termination by Client, Contractor shall be paid for all work completed to date plus a 25% cancellation kill fee of remaining value.',
        preNegotiationTip: 'Ensure: "In case the client pivots or cancels the campaign, completed milestones remain payable plus a reasonable prorated fee."',
        searchKeywords: ['kill fee', 'cancellation fee', 'early termination', 'work performed to date', 'prorated payment']
      },
      {
        id: 'free_liability_cap',
        name: 'Mutual Limitation of Liability (Capped at Fees Paid)',
        category: 'Legal Shield',
        importance: 'essential',
        plainDescription: 'Limits the freelancer’s potential legal liability to the total amount paid under the contract, excluding consequential or indirect damages.',
        exploitIfMissing: 'Without a liability cap, a single bug in your code or missed deadline could expose you to lawsuits for millions of dollars in lost client business.',
        standardFairPractice: 'Neither party shall be liable for indirect or consequential damages; Contractor total aggregate liability is capped at total fees paid under this agreement.',
        preNegotiationTip: 'Crucial: "We must ensure liability is capped at the total contract fee value and excludes consequential damages."',
        searchKeywords: ['limitation of liability', 'indirect damages', 'consequential damages', 'aggregate liability', 'capped at fees paid', 'indemnity']
      },
      {
        id: 'free_portfolio_rights',
        name: 'Portfolio & Case Study Showcase Rights',
        category: 'Marketing',
        importance: 'recommended',
        plainDescription: 'Permits the contractor to showcase non-confidential screenshots and describe the project in their design/dev portfolio.',
        exploitIfMissing: 'Client may threaten NDA breach when you link to the publicly accessible website you created in your portfolio.',
        standardFairPractice: 'Contractor retains the right to display final publicly released deliverables in their professional portfolio and marketing materials.',
        preNegotiationTip: 'Confirm: "May I include screenshots of the live launch in my online case studies once published?"',
        searchKeywords: ['portfolio rights', 'case study', 'marketing credit', 'public attribution', 'showcase']
      }
    ]
  },
  nda: {
    id: 'nda',
    title: 'Non-Disclosure Agreement (NDA)',
    tagline: 'Avoid one-way data traps, perpetual trade secret lock-ins, and vague confidentiality terms.',
    iconName: 'Shield',
    typicalJurisdictions: ['US', 'UK', 'International'],
    commonTrapSummary: 'Companies often push one-way NDAs where only you have confidentiality duties, combined with indefinite durations and lack of subpoena exceptions.',
    expectedClauses: [
      {
        id: 'nda_mutual_bilateral',
        name: 'Mutual / Bilateral Confidentiality Protection',
        category: 'Fairness & Symmetry',
        importance: 'essential',
        plainDescription: 'Protects both parties equally so that trade secrets, proprietary discussions, and code shared by either side are safeguarded.',
        exploitIfMissing: 'A unilateral NDA forces you to keep their secrets while they are legally free to take and commercialize your ideas without restriction.',
        standardFairPractice: 'Both parties agree to hold each other’s proprietary information in strict confidence with the same degree of care as their own confidential assets.',
        preNegotiationTip: 'Insist: "This must be structured as a mutual NDA so proprietary disclosures from both parties receive equal protection."',
        searchKeywords: ['mutual', 'bilateral', 'both parties', 'disclosing party', 'receiving party', 'reciprocal']
      },
      {
        id: 'nda_sunset_term',
        name: 'Definite Expiration / Sunset Period (1–3 Years)',
        category: 'Duration & Freedom',
        importance: 'essential',
        plainDescription: 'Sets a realistic time horizon (typically 1 to 2 years, max 3 years) after which confidentiality obligations naturally expire.',
        exploitIfMissing: 'Perpetual confidentiality agreements create lifelong legal liabilities, preventing you from ever working freely on similar technologies.',
        standardFairPractice: 'Confidentiality obligations shall expire two (2) years from the effective date or date of disclosure, except for bona fide trade secrets.',
        preNegotiationTip: 'Ask: "Can we establish a standard 2-year sunset clause rather than perpetual indefinite duration?"',
        searchKeywords: ['term of agreement', 'expiration', 'sunset', '2 years', 'duration of confidentiality', 'perpetual']
      },
      {
        id: 'nda_standard_exclusions',
        name: 'Standard Exclusions from Confidential Information',
        category: 'Clarity & Safety',
        importance: 'essential',
        plainDescription: 'Excludes info already public, independently developed, already known, or received legitimately from a third party.',
        exploitIfMissing: 'You can be accused of leaking info that was already published on TechCrunch or developed by you months prior.',
        standardFairPractice: 'Confidential Information excludes information publicly known, previously known without breach, independently created, or rightfully obtained from third parties.',
        preNegotiationTip: 'Verify standard 4 exclusions (public knowledge, prior possession, independent development, third party disclosure) are present.',
        searchKeywords: ['exclusions', 'publicly known', 'independently developed', 'rightfully received', 'prior knowledge']
      },
      {
        id: 'nda_court_compelled',
        name: 'Compelled Disclosure / Court Order Carve-Out',
        category: 'Legal Compliance',
        importance: 'essential',
        plainDescription: 'Allows disclosure if legally ordered by a court or subpoena, provided prompt notice is given to allow a protective order.',
        exploitIfMissing: 'You could be placed in contempt of court or sued for breach if a regulatory subpoena requires disclosure.',
        standardFairPractice: 'Receiving Party may disclose Confidential Information to the extent required by law or judicial order, provided reasonable advance notice is given.',
        preNegotiationTip: 'Check: "Ensure there is a standard provision for disclosures required by court order or legal subpoena."',
        searchKeywords: ['compelled disclosure', 'court order', 'subpoena', 'required by law', 'protective order']
      },
      {
        id: 'nda_residuals',
        name: 'Residuals / General Knowledge Clause',
        category: 'Future Knowledge',
        importance: 'recommended',
        plainDescription: 'Confirms that general ideas, concepts, and skills retained in the unaided memory of engineers can be used in future projects.',
        exploitIfMissing: 'A company could claim your brain is contaminated and sue you for applying general concepts to your next employer.',
        standardFairPractice: 'Nothing shall restrict the use of ideas, concepts, or know-how retained in unaided human memory by personnel who had access to disclosures.',
        preNegotiationTip: 'Recommend: "Add a standard residual knowledge clause so general engineering techniques retained in memory are not restricted."',
        searchKeywords: ['residuals', 'unaided memory', 'general knowledge', 'know-how', 'retained memory']
      }
    ]
  },
  consumer_saas: {
    id: 'consumer_saas',
    title: 'Consumer SaaS / Terms of Service & Privacy',
    tagline: 'Spot unilateral price hikes, auto-renewal traps, data hostage taking, and forced arbitration.',
    iconName: 'Server',
    typicalJurisdictions: ['US', 'EU (GDPR)', 'Global'],
    commonTrapSummary: 'SaaS vendors sneak in forced arbitration clauses, zero-day cancellation windows, and ownership of user-uploaded data.',
    expectedClauses: [
      {
        id: 'saas_data_export',
        name: 'Data Portability & Export Guarantee',
        category: 'Data Rights',
        importance: 'essential',
        plainDescription: 'Guarantees the user can export their complete data in standard machine-readable formats (JSON/CSV) at any time upon cancellation.',
        exploitIfMissing: 'Vendor locks your data hostage and charges thousands of dollars or deletes it immediately upon subscription end.',
        standardFairPractice: 'User may export all customer data in industry standard format at any time and within 30 days post-termination at no charge.',
        preNegotiationTip: 'Verify: "Does the platform provide immediate self-serve data export in CSV or JSON upon account closure?"',
        searchKeywords: ['data export', 'portability', 'retrieve data', 'machine readable', 'customer content', 'termination of account']
      },
      {
        id: 'saas_unilateral_changes',
        name: 'Advance Notice for Material Changes & Price Increases',
        category: 'Billing & Terms',
        importance: 'essential',
        plainDescription: 'Requires at least 30 days advance email notice before fee increases or terms alterations take effect, allowing cancellation.',
        exploitIfMissing: 'Service can double prices silently or rewrite privacy rights by simply updating a web link.',
        standardFairPractice: 'Vendor shall give 30 days advance email notice for any price increase or material term update; continued use constitutes acceptance only thereafter.',
        preNegotiationTip: 'Check: "Does the service guarantee 30 days email notice before any subscription fee increase?"',
        searchKeywords: ['modification of terms', 'price increase', 'advance notice', '30 days notice', 'unilateral changes']
      },
      {
        id: 'saas_autorenewal_cancellation',
        name: 'Frictionless Auto-Renewal Cancellation',
        category: 'Billing Freedom',
        importance: 'essential',
        plainDescription: 'Allows online one-click cancellation of auto-renewing subscriptions anytime prior to the renewal date.',
        exploitIfMissing: 'Forces you to call phone numbers during restrictive hours or mail certified physical letters to prevent renewal charges.',
        standardFairPractice: 'Customer may cancel recurring billing online with immediate effect at any time through account settings.',
        preNegotiationTip: 'Confirm: "Can the subscription be canceled online via the user dashboard without calling customer support?"',
        searchKeywords: ['cancellation', 'auto-renewal', 'recurring billing', 'cancel subscription', 'click to cancel']
      }
    ]
  }
};
