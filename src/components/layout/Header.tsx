import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { useMobileMenu } from '@hooks/index'
import { NAV_LINKS } from '@constants/content'
import { useI18n } from '@/i18n'

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isOpen, toggle, close } = useMobileMenu()
  const location = useLocation()
  const { t, lang, toggleLang } = useI18n()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-bg border-b border-brand-border shadow-lg'
            : 'bg-brand-bg bg-opacity-80 backdrop-blur-md'
        }`}
      >
        <nav className="container-wide flex items-center justify-between py-4 lg:py-5">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 font-display text-3xl font-bold text-brand-gold hover:text-brand-gold-light transition-colors"
          >
            <img
              src="/University_Hall_Logo.svg"
              alt="University Hall"
              className="h-12 sm:h-12 lg:h-16 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span className="text-xl md:text-3xl">UNIVERSITY HALL</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={close}
                  className={`px-4 py-2 rounded-card font-serif text-lg transition-colors ${
                    isActive
                      ? 'text-brand-gold bg-brand-surface'
                      : 'text-brand-text-muted hover:text-brand-text-primary'
                  }`}
                >
                  {t(link.tKey)}
                </Link>
              )
            })}
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              aria-label={t('nav.language_label')}
              className="ml-2 px-3 py-2 rounded-card font-mono text-sm text-brand-text-muted hover:text-brand-gold transition-colors flex items-center gap-1.5"
            >
              <Globe size={14} />
              <span>{lang === 'en' ? 'EN' : '中文'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-brand-text-primary hover:text-brand-gold transition-colors"
            onClick={toggle}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 top-16 z-30 md:hidden bg-brand-bg bg-opacity-95 backdrop-blur-md"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <nav className="flex flex-col gap-2 p-6">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={close}
                className={`block px-4 py-3 rounded-card font-serif transition-colors ${
                  isActive
                    ? 'text-brand-gold bg-brand-surface'
                    : 'text-brand-text-muted hover:text-brand-text-primary'
                }`}
              >
                {t(link.tKey)}
              </Link>
            )
          })}
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLang}
              className="block w-full text-left px-4 py-3 rounded-card font-mono text-sm text-brand-text-muted hover:text-brand-gold transition-colors mt-2 border-t border-brand-border pt-4"
            >
              {lang === 'en' ? 'EN | 中文' : '中文 | EN'}
            </button>
        </nav>
      </motion.div>
    </>
  )
}
