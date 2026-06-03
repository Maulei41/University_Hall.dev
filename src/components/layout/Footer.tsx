import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Globe, Camera, MessageCircle, Send, Play } from 'lucide-react'
import { Container } from '@components/common/index'
import { useFooterContrast } from '@hooks/index'
import { NAV_LINKS, SOCIAL_LINKS, OFFICE_INFO } from '@constants/content'

export const Footer: React.FC = () => {
  const { ref, bgClass } = useFooterContrast()
  const iconMap: Record<string, React.FC<{size?: number; className?: string}>> = {
    linkedin: Globe,
    instagram: Camera,
    facebook: MessageCircle,
    twitter: Send,
    youtube: Play,
  }

  return (
    <footer ref={ref} className={`${bgClass} border-t border-brand-border mt-auto`}>
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


      </Container>
    </footer>
  )
}
