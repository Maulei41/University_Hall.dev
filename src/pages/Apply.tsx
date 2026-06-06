import React from 'react'
import { motion } from 'framer-motion'
import { Container, Section } from '@components/common/index'
import { FadeInUp } from '@components/animations/index'
import MapSection from '@components/common/MapSection'
import { OFFICE_INFO } from '@constants/content'

const Apply: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Apply to University Hall
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl">
              Join our residential community dedicated to academic excellence, character development,
              and lifelong friendships.
            </p>
            <a
              href="https://sweb.hku.hk/hallapp/servlet/hall_app/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 px-8 py-4 bg-brand-gold text-brand-bg font-serif font-semibold rounded-card hover:bg-brand-gold-light transition-colors shadow-lg text-lg"
            >
              Apply Now
            </a>
            <a
              href="/affiliated-membership"
              className="inline-block mt-4 ml-0 lg:ml-4 px-8 py-4 border-2 border-brand-gold text-brand-gold font-serif font-semibold rounded-card hover:bg-brand-gold hover:text-brand-bg transition-colors shadow-lg text-lg"
            >
              Affiliated Membership →
            </a>
          </FadeInUp>
        </Container>
      </Section>

      {/* Visit Us */}
      <Section className="bg-brand-surface">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-gold mb-2 text-center">
              Visit Us
            </h2>
            <p className="text-brand-text-muted text-center text-sm mb-8">
              {OFFICE_INFO.address}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
              {/* Travel Info Table */}
              <div className="lg:col-span-3 overflow-x-auto">
                <div className="bg-brand-bg rounded-card p-6 h-full border border-brand-border">
                  <h3 className="font-display font-semibold text-brand-text-primary mb-4">
                    Getting Here
                  </h3>
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-brand-border">
                        <th className="pb-3 font-display font-semibold text-brand-text-primary pr-3">
                          Modes of Travel
                        </th>
                        <th className="pb-3 font-display font-semibold text-brand-text-primary pr-3">
                          Routes
                        </th>
                        <th className="pb-3 font-display font-semibold text-brand-text-primary text-right whitespace-nowrap">
                          From
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border">
                      <tr className="hover:bg-brand-surface/30 transition-colors">
                        <td className="py-3 pr-3 font-serif font-semibold text-brand-text-primary">
                          Bus
                        </td>
                        <td className="py-3 pr-3">
                          <div className="flex flex-wrap gap-1.5">
                            {['4','4X','7','37A','40','40M','90B','91','30X','970','970X','973'].map((r) => (
                              <span
                                key={r}
                                className="inline-block px-2 py-0.5 bg-brand-surface border border-brand-border rounded text-xs font-mono text-brand-text-muted"
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 text-right whitespace-nowrap">
                          <span className="font-mono text-brand-gold font-semibold">Main Campus</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-brand-surface/30 transition-colors">
                        <td className="py-3 pr-3 font-serif font-semibold text-brand-text-primary">
                          Bus
                        </td>
                        <td className="py-3 pr-3">
                          <div className="flex flex-wrap gap-1.5">
                            {['A10'].map((r) => (
                              <span
                                key={r}
                                className="inline-block px-2 py-0.5 bg-brand-surface border border-brand-border rounded text-xs font-mono text-brand-text-muted"
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 text-right whitespace-nowrap">
                          <span className="font-mono text-brand-gold font-semibold">Hong Kong Airport</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Map */}
              <div className="lg:col-span-2">
                <div className="h-72 lg:h-full min-h-[250px] rounded-card overflow-hidden border border-brand-border">
                  <MapSection />
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}

export default Apply
