import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Container, Section } from '@components/common/index'
import { FadeInUp } from '@components/animations/index'
import MapSection from '@components/common/MapSection'
import { OFFICE_INFO, SOCIAL_LINKS } from '@constants/content'

const Contact: React.FC = () => {

  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl">
              Have questions about University Hall? We'd love to hear from you.
            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* Contact Info */}
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-brand-gold mb-4 text-center">
                Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Address */}
              <div className="flex gap-4">
                <MapPin className="text-brand-gold flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-display font-semibold text-brand-text-primary mb-2">
                    Address
                  </h4>
                  <p className="text-brand-text-muted">{OFFICE_INFO.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <Phone className="text-brand-gold flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-display font-semibold text-brand-text-primary mb-2">
                    Phone
                  </h4>
                  <a
                    href={`tel:${OFFICE_INFO.phone}`}
                    className="text-brand-text-muted hover:text-brand-gold transition-colors"
                  >
                    {OFFICE_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <Mail className="text-brand-gold flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-display font-semibold text-brand-text-primary mb-2">
                    Email
                  </h4>
                  <a
                    href={`mailto:${OFFICE_INFO.email}`}
                    className="text-brand-text-muted hover:text-brand-gold transition-colors"
                  >
                    {OFFICE_INFO.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <Clock className="text-brand-gold flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-display font-semibold text-brand-text-primary mb-2">
                    Office Hours
                  </h4>
                  <p className="text-brand-text-muted">
                    <strong>Weekdays:</strong> {OFFICE_INFO.hours.weekday}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-brand-border text-center">
              <h4 className="font-display font-semibold text-brand-text-primary mb-4">
                Follow Us
              </h4>
              <div className="flex gap-3 justify-center">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-brand-surface border border-brand-border rounded-card text-brand-text-primary hover:text-brand-gold hover:border-brand-gold transition-all"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Visit Us — Map + Travel Info */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h2 className="font-display text-3xl font-semibold text-brand-text-primary mb-4 text-center">
              Visit Us
            </h2>
            <p className="text-brand-text-muted text-center text-sm mb-10 max-w-xl mx-auto">
              {OFFICE_INFO.address}
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Travel Table */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 overflow-x-auto"
            >
              <div className="card-base h-full">
                <h3 className="font-display text-xl font-semibold text-brand-gold mb-6">
                  Getting Here
                </h3>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-brand-border">
                      <th className="pb-3 font-display font-semibold text-brand-text-primary">
                        Modes of Travel
                      </th>
                      <th className="pb-3 font-display font-semibold text-brand-text-primary">
                        Routes
                      </th>
                      <th className="pb-3 font-display font-semibold text-brand-text-primary text-right whitespace-nowrap">
                        From
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border">
                    <tr className="group hover:bg-brand-bg/40 transition-colors">
                      <td className="py-3 pr-3 font-serif font-semibold text-brand-text-primary">
                        Bus
                      </td>
                      <td className="py-3 pr-3">
                        <div className="flex flex-wrap gap-1.5">
                          {['4','4X','7','37A','40','40M','90B','91','30X','970','970X','973'].map((r) => (
                            <span
                              key={r}
                              className="inline-block px-2 py-0.5 bg-brand-bg border border-brand-border rounded text-xs font-mono text-brand-text-muted"
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
                    <tr className="group hover:bg-brand-bg/40 transition-colors">
                      <td className="py-3 pr-3 font-serif font-semibold text-brand-text-primary">
                        Bus
                      </td>
                      <td className="py-3 pr-3">
                        <div className="flex flex-wrap gap-1.5">
                          {['A10'].map((r) => (
                              <span
                                  key={r}
                                  className="inline-block px-2 py-0.5 bg-brand-bg border border-brand-border rounded text-xs font-mono text-brand-text-muted"
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
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2"
            >
              <MapSection />
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Contact
