import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How do I enquire about a car or schedule a test drive?',
      answer: 'You can click the "WhatsApp Enquiry" or "Book Test Drive" buttons on any vehicle card, or call us directly at +91 96115 44699. Our team will verify the car\'s live availability on the showroom floor and schedule a convenient slot for your visit on Outer Ring Road, Bengaluru.',
    },
    {
      question: 'Can I bring my own independent mechanic to inspect the car?',
      answer: 'Absolutely. We encourage customers to bring their trusted mechanic or automotive specialist. You can inspect the engine bay, chassis, computer diagnostics (OBD-II), and test drive the vehicle thoroughly.',
    },
    {
      question: 'How does the Karnataka RC transfer process work?',
      answer: 'CAR LINES assists with the complete transfer documentation through the Parivahan portal and Bengaluru RTOs. We ensure that existing hypothecations are cleared with bank NOCs and assist with Form 29 & 30 submission until the updated RC is issued.',
    },
    {
      question: 'What is covered under the 140-Point Inspection?',
      answer: 'Our multi-point inspection covers 5 core modules: Engine & Transmission (38 checks), Non-Accidental Chassis & Frame (32 checks), Exterior Panels & Tyres (30 checks), OBD-II Diagnostic Electricals (22 checks), and RTO / Legal Documentation (18 checks).',
    },
    {
      question: 'How accurate is the EMI calculator, and can you assist with auto loans?',
      answer: 'The EMI calculator on our website uses the exact reducing-balance formula based on the price, down payment, and tenure you choose. We partner with leading banks and NBFCs in Bengaluru to facilitate financing. Actual rates and approvals depend on the individual lender\'s credit assessment.',
    },
    {
      question: 'What payment modes do you accept for booking and purchase?',
      answer: 'We accept RTGS, NEFT, IMPS, and official bank drafts. For transparency and audit compliance, all vehicle transactions are documented through formal invoicing and receipts.',
    },
    {
      question: 'Where is your dealership located and what are your opening hours?',
      answer: 'Our showroom is located at Outer Ring Road, Opposite Kempegowda Institute, Kottigepalya, Bengaluru, Karnataka 560091. We are open all 7 days a week from 10:00 AM to 8:00 PM IST.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-left">
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold text-xs uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Clear Answers</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Everything you need to know about our inspection, test drives, RC transfer, and financing.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-obsidian-800/80 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left font-bold text-sm text-white flex items-center justify-between gap-4 hover:text-gold-400 transition-colors"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gold-500 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
