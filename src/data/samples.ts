export interface SampleContract {
  id: string;
  domain: 'rental' | 'employment' | 'freelance' | 'nda';
  title: string;
  subtitle: string;
  badge: string;
  content: string;
}

export const SAMPLE_CONTRACTS: SampleContract[] = [
  {
    id: 'sample_rental_trap',
    domain: 'rental',
    title: 'The "One-Sided" Residential Lease',
    subtitle: 'Contains major omissions in deposit return, privacy, and early termination.',
    badge: 'High Risk (Score: ~34/100)',
    content: `RESIDENTIAL APARTMENT LEASE AGREEMENT

This Lease Agreement ("Agreement") is made this 1st day of October, by and between Apex Property Holdings LLC ("Landlord") and John Doe ("Tenant").

1. PREMISES AND TERM
Landlord hereby leases to Tenant Apartment 4B located at 742 Evergreen Terrace for a fixed term of twelve (12) months commencing October 1st and ending September 30th of the following calendar year.

2. RENT AND PAYMENTS
Tenant agrees to pay monthly rent in the amount of $2,400.00, payable on or before the first calendar day of each month. In the event rent is not received by the 2nd day, a daily penalty of $50.00 shall be assessed.

3. SECURITY DEPOSIT
Tenant shall deposit with Landlord the sum of $4,800.00 as a security deposit. The security deposit shall be held to guarantee full compliance with lease obligations. Following surrender of the premises, Landlord shall inspect the property and return any balance deemed appropriate in Landlord's sole judgment and convenience. Deductions may be made for painting, general cleaning, re-letting administration, and any damages noted.

4. ENTRY AND INSPECTION
Landlord, its leasing agents, and maintenance contractors reserve the full right to enter the leased premises at any time, with or without prior notice, for purposes of inspection, showing to prospective buyers or future tenants, or general property oversight.

5. REPAIRS AND MAINTENANCE
Tenant agrees to keep premises in clean condition. Any and all repairs, plumbing clogs, appliance malfunctions, HVAC servicing, or electrical issues costing two hundred dollars ($200.00) or less per incident shall be the sole responsibility and expense of Tenant. Tenant shall also be responsible for repainting the entire apartment upon vacation to restore brand-new appearance.

6. TERMINATION AND DEFAULT
This is a fixed 12-month lease. In the event Tenant vacates, abandons, or seeks to terminate before the expiration of the full term, Tenant shall remain strictly liable for the entire remaining aggregate rent due through the end of the term, regardless of whether Landlord re-leases the apartment. No break clause or early surrender is permitted.

7. SURRENDER AND PROPERTY FORFEITURE
If Tenant is absent from the premises for a continuous period of seven (7) consecutive days without prior written notification to Landlord, Landlord may declare the premises abandoned, terminate this Lease immediately, change all locks, and retain or discard all personal property remaining inside without legal liability.`
  },
  {
    id: 'sample_rental_fair',
    domain: 'rental',
    title: 'Balanced & Fair Residential Lease (Negotiated)',
    subtitle: 'Includes clear 21-day deposit return, 24-hour entry notice, habitability & break clause.',
    badge: 'Protected (Score: ~94/100)',
    content: `STANDARD BALANCED RESIDENTIAL LEASE AGREEMENT

This Lease Agreement is entered into by and between Oakwood Living LLC ("Landlord") and Jane Smith ("Tenant").

1. PREMISES AND TERM
Landlord leases to Tenant the premises at 104 Maple Court for a period of 12 months.

2. RENT AND LATE FEES
Monthly rent is $2,200.00 payable by the 5th of each month. A standard 5-day grace period applies before a reasonable one-time late fee of $50 is assessed.

3. SECURITY DEPOSIT & STATUTORY RETURN
Tenant deposits $2,200.00 as security. Landlord shall hold deposit in a designated escrow account. Within twenty-one (21) calendar days after surrender of the premises, Landlord shall return the full deposit to Tenant, accompanied by an itemized written statement detailing any legitimate deductions supported by actual receipts. Deductions shall not be made for normal wear and tear resulting from ordinary habitation.

4. RIGHT OF ENTRY & PRIVACY
Landlord or authorized representatives may enter the premises only upon providing a minimum of twenty-four (24) hours advance written notice to Tenant, during reasonable business hours (9:00 AM to 6:00 PM), except in cases of extreme emergencies threatening life or structural integrity.

5. REPAIRS AND HABITABILITY
Landlord shall be strictly responsible for maintaining and repairing all structural elements, exterior roofs, plumbing, electrical circuits, heating, and provided appliances in good working order at Landlord sole expense. If the premises are rendered uninhabitable or damaged by fire, flood, or casualty not caused by Tenant fault, rent shall abate proportionately until fully restored, or Tenant may terminate without penalty.

6. EARLY TERMINATION / BREAK CLAUSE
Tenant shall have the right to terminate this lease prior to the expiration of the term by providing sixty (60) days advance written notice and paying an early termination fee equal to one (1) month's rent. Tenant shall have no further liability for rent accruing after the effective surrender date.

7. NOTICE OF DEFAULT AND CURE
Before either party may initiate legal action or declare default, the non-breaching party must deliver written notice detailing the breach, providing a minimum of ten (10) days to cure monetary defaults and thirty (30) days for non-monetary obligations.`
  },
  {
    id: 'sample_employment_startup',
    domain: 'employment',
    title: 'The "Overreaching" Tech Startup Offer & Proprietary Agreement',
    subtitle: 'Broad IP ownership of off-hours personal inventions, no severance, 2-yr global non-compete.',
    badge: 'High Risk (Score: ~38/100)',
    content: `NEXUSTECH INC. - OFFER OF EMPLOYMENT & PROPRIETARY RIGHTS AGREEMENT

Dear Alex,
NexusTech Inc. ("Company") is pleased to offer you the position of Senior Full-Stack Engineer.

1. POSITION AND AT-WILL EMPLOYMENT
Your employment with the Company is strictly "at-will," meaning that either you or the Company may terminate your employment relationship at any time, for any reason or no reason, with or without notice. In the event of termination by the Company, your compensation and benefits shall cease immediately on your final day of work. No severance pay, transition package, or salary in lieu of notice shall be provided under any circumstances.

2. COMPENSATION AND STOCK OPTIONS
You will receive an annual base salary of $145,000. Subject to board approval, you will be granted an option to purchase 25,000 shares of Common Stock, vesting over 48 months with a 12-month cliff. In the event of a merger, acquisition, or change in control of the Company, any unvested stock options shall be subject to discretion of the acquiring entity and may be forfeited or cancelled without acceleration or payout.

3. COMPREHENSIVE INTELLECTUAL PROPERTY ASSIGNMENT
Employee agrees to assign and hereby irrevocably assigns to Company all right, title, and interest worldwide in and to any and all inventions, software code, algorithms, architectures, designs, writings, and improvements conceived, developed, or reduced to practice by Employee, whether alone or with others, during the entire term of employment, whether or not conceived during normal working hours, whether on Company equipment or personal devices, and whether or not related to Company actual or anticipated business.

4. POST-EMPLOYMENT NON-COMPETITION
During your employment and for a period of twenty-four (24) months following the termination of your employment for any reason, you shall not, directly or indirectly, engage in, advise, invest in, work for, or consult with any business, enterprise, or individual anywhere in the world that develops, sells, or offers web software, SaaS tools, or technology solutions.

5. EMPLOYEE INDEMNIFICATION
Employee agrees to indemnify, defend, and hold harmless the Company, its directors, and officers from and against any and all claims, liabilities, damages, and legal costs arising out of any errors, bugs, system outages, or code written or contributed by Employee.`
  },
  {
    id: 'sample_freelance_msa',
    domain: 'freelance',
    title: 'The "Unlimited Liability" Freelancer Contract',
    subtitle: 'IP transferred before payment, Net 90 invoicing, unlimited revisions, zero liability cap.',
    badge: 'High Risk (Score: ~31/100)',
    content: `INDEPENDENT CONTRACTOR SERVICES AGREEMENT

This Master Services Agreement ("Agreement") is between GlobalBrands Agency ("Client") and CreativeDev Studio ("Contractor").

1. SERVICES AND DELIVERABLES
Contractor agrees to design and develop the e-commerce web platform and marketing collateral as described in Statement of Work #1. Contractor shall provide unlimited revisions, redesigns, and alterations until Client reaches complete and sole subjective satisfaction.

2. COMPENSATION AND INVOICING
Client agrees to pay Contractor a fixed project fee of $12,000. Contractor may submit an invoice upon final launch. Client standard payment terms are Net Ninety (90) calendar days from invoice receipt. No interest, penalty, or late fees shall accrue on delayed or overdue payments under any circumstance.

3. IMMEDIATE ASSIGNMENT OF ALL WORK PRODUCT
Contractor agrees that all deliverables, code, graphics, documentation, and work product shall constitute "works made for hire." Contractor irrevocably transfers and assigns all copyright, patents, and intellectual property rights in and to the Deliverables to Client immediately upon creation, irrespective of invoice payment status.

4. TERMINATION AND CANCELLATION
Client may cancel or terminate this Agreement or any project milestone at any time for convenience upon written email notification. Upon termination, Client shall have no obligation to pay for incomplete milestones or ongoing contractor hours, and Contractor shall promptly deliver all existing work product and files. No cancellation fee or kill fee shall apply.

    Contractor shall indemnify, defend, and hold harmless Client, its affiliates, and clients against any and all damages, commercial losses, lost profits, system downtimes, and legal fees arising from or related to deliverables provided by Contractor. Contractor's liability under this Agreement shall be unlimited.`
  },
  {
    id: 'sample_nda_unilateral',
    domain: 'nda',
    title: 'The "Perpetual One-Sided" Non-Disclosure Agreement',
    subtitle: 'Unilateral obligation, perpetual duration, no standard carveouts or legal process defense.',
    badge: 'High Risk (Score: ~35/100)',
    content: `UNILATERAL NON-DISCLOSURE AND PROPRIETARY INFORMATION AGREEMENT

This Agreement is made by and between Disclosing Party Inc. ("Discloser") and Recipient ("Recipient").

1. CONFIDENTIAL INFORMATION
"Confidential Information" means all information, ideas, concepts, business plans, financial projections, software, customer lists, and conversations disclosed by Discloser to Recipient, whether marked confidential or not.

2. UNILATERAL OBLIGATION OF CONFIDENTIALITY
Recipient agrees to hold all Confidential Information in strictest confidence and shall not disclose, reproduce, or use any Confidential Information for any purpose other than evaluating a potential business transaction with Discloser. Recipient shall be solely bound by this obligation; Discloser undertakes no reciprocal confidentiality obligation regarding any materials provided by Recipient.

3. PERPETUAL DURATION
The obligations of confidentiality under this Agreement shall survive indefinitely and continue in perpetuity from the date of disclosure, without expiration or sunset.

4. EXCLUSIONS AND CARVEOUTS
No exceptions shall apply. Recipient shall not disclose information even if such information is independently developed by Recipient or already known in the public domain without Discloser's prior written release.

5. REMEDIES AND INJUNCTIVE RELIEF
Recipient acknowledges that any breach will cause irreparable harm for which damages are inadequate. Discloser shall be entitled to immediate injunctive relief and liquidated damages of $100,000 per violation, plus all attorney fees.`
  }
];
