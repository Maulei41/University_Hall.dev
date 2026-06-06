import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Container, Section } from '@components/common/index'
import { FadeInUp } from '@components/animations/index'
import { FAQ_ITEMS } from '@constants/content'

const FAQ: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl">
              Everything you need to know about living at University Hall — from rooms and food
              to applications and daily life.
            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* FAQ Accordion */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="card-base border border-brand-border hover:border-brand-gold transition-colors"
              >
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === item.question ? null : item.question)
                  }
                  className="w-full text-left flex items-center justify-between py-2"
                >
                  <h2 className="font-serif font-semibold text-brand-text-primary text-xl">
                    {item.question}
                  </h2>
                  <motion.div
                    animate={{ rotate: expandedFAQ === item.question ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 flex-shrink-0"
                  >
                    <ChevronDown className="text-brand-gold" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedFAQ === item.question && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-brand-border"
                    >
                      <p className="text-brand-text-muted text-lg leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}

export default FAQ
