"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Même courbe d’animation que FAQSection pour une expérience cohérente.
const accordionContentVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.32, ease: [0.33, 1, 0.68, 1] as const },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.36, ease: [0.33, 1, 0.68, 1] as const },
      opacity: { duration: 0.22, delay: 0.06 },
    },
  },
};

export type SupportFaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: SupportFaqItem[];
  headingId: string;
};

/**
 * Accordéon FAQ pour la page Support (contenu fourni par la page selon la locale).
 */
export function SupportFaqAccordion({ items, headingId }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mx-auto w-full" aria-labelledby={headingId}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `support-faq-panel-${index}`;
        const buttonId = `support-faq-button-${index}`;

        return (
          <div
            key={buttonId}
            className="mb-3 rounded-[12px] border border-[#E5E5EA] bg-white"
          >
            <button
              id={buttonId}
              type="button"
              className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-[#EEF1F7]"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
            >
              <span className="text-base font-bold text-navy">{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-navy transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key={`support-panel-${index}`}
                  variants={accordionContentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-[15px] leading-relaxed text-gray-600">
                    {item.answer}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
