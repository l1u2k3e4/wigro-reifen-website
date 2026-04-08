// src/sections/FAQSection.tsx
// FAQ Accordion mit 10 Fragen — Schema.org FAQPage Markup vorbereitet (wird in PROMPT_07 aktiviert)

import { motion } from 'framer-motion'
import { COPY } from '@/data/content'
import { useModuleOverrides } from '@/hooks/useContentOverrides'
import { mergeOverrides } from '@/lib/mergeOverrides'
import SectionHeading from '@/components/ui/SectionHeading'
import FAQItem from '@/components/ui/FAQItem'
import { staggerContainer, fadeInUp } from '@/lib/animations'

export default function FAQSection() {
  const overrides = useModuleOverrides<typeof COPY.faq>('faq')
  const faq = mergeOverrides(COPY.faq, overrides)
  return (
    <section id="faq" className="section-surface" aria-labelledby="faq-heading">
      <div className="container-content">
        <SectionHeading
          title={faq.headline}
          subtitle={faq.subline}
          tag="h2"
          alignment="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
          variants={staggerContainer}
          className="mt-12 max-w-3xl mx-auto flex flex-col gap-3"
          // Schema.org FAQPage — wird in PROMPT_07 als JSON-LD implementiert
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {faq.items.map((item, _index) => (
            <motion.div
              key={item.frage}
              variants={fadeInUp}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <FAQItem
                question={item.frage}
                answer={item.antwort}
                defaultOpen={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
