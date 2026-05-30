import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Globe, Camera, MessageCircle, Send, Play } from 'lucide-react'
import { Container } from '@components/common/index'
import MapSection from '@components/common/MapSection'
import { NAV_LINKS, SOCIAL_LINKS, OFFICE_INFO } from '@constants/content'

export const Footer: React.FC = () => {
  const iconMap: Record<string, React.FC<{size?: number; className?: string}>> = {
    linkedin: Globe,
    instagram: Camera,
    facebook: MessageCircle,
    twitter: Send,
    youtube: Play,
  }

  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-auto">
      <Container className="py-16">
        {/* Top Grid: Brand, Links, Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl font-bold text-brand-gold mb-4">
              University Hall
            </h3>
            <p className="text-brand-text-muted text-sm leading-relaxed">
              Premier residential college fostering scholarly excellence, community, and character
              development since 1912.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-display text-lg font-semibold text-brand-text-primary mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-brand-text-muted hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-display text-lg font-semibold text-brand-text-primary mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="text-brand-text-muted">{OFFICE_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-gold flex-shrink-0" />
                <a
                  href={`tel:${OFFICE_INFO.phone}`}
                  className="text-brand-text-muted hover:text-brand-gold transition-colors"
                >
                  {OFFICE_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-gold flex-shrink-0" />
                <a
                  href={`mailto:${OFFICE_INFO.email}`}
                  className="text-brand-text-muted hover:text-brand-gold transition-colors"
                >
                  {OFFICE_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-brand-gold flex-shrink-0 mt-0.5" />
                <div className="text-brand-text-muted">
                  <p><strong className="text-brand-text-primary">Weekdays:</strong> {OFFICE_INFO.hours.weekday}</p>
                  <p><strong className="text-brand-text-primary">Weekends:</strong> {OFFICE_INFO.hours.weekend}</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-brand-border"
        >
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap]
              if (!Icon) return null
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-bg rounded-card text-brand-text-muted hover:text-brand-gold hover:bg-brand-surface transition-all text-sm"
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{link.platform}</span>
                </a>
              )
            })}
          </div>
          <p className="text-xs text-brand-text-muted">
            &copy; {new Date().getFullYear()} University Hall, The University of Hong Kong. All
            rights reserved.
          </p>
        </motion.div>

        {/* Visit Us — Map + Travel Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-brand-border"
        >
          <h3 className="font-display text-2xl font-semibold text-brand-gold mb-2 text-center">
            Visit Us
          </h3>
          <p className="text-brand-text-muted text-center text-sm mb-8">
            {OFFICE_INFO.address}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
            {/* Travel Info Table */}
            <div className="lg:col-span-3 overflow-x-auto">
              <div className="bg-brand-bg rounded-card p-6 h-full border border-brand-border">
                <h4 className="font-display font-semibold text-brand-text-primary mb-4">
                  Getting Here
                </h4>
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
    </footer>
  )
}
