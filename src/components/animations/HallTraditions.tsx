import React, { useState, useMemo, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { useReducedMotion } from '@hooks/index'
import { ImagePlaceholder, Container, Section } from '@components/common/index'
import { EVENTS, TRADITIONS } from '@constants/content'

/* ── Types ─────────────────────────────────────────────────── */

interface TraditionItem {
  key: string
  imageId: string
  imageSrc: string
  title: string
  description: string
  badgeLabel: string
  metaIcon: React.ReactNode
  metaText: string
  category: string
}

const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  'high-table-dinner':
    'placeholder',
  'founders-nite':
    'placeholder',
  'castlers-nite':
    'placeholder',
  'nazarene-nite':
    'placeholder',
  'baisun':
    'placeholder',
  'reunion-dinner':
    'placeholder',
}

/* ── Build items from EVENTS + TRADITIONS ──────────────────── */

const buildItems = (): TraditionItem[] => {
  const items: TraditionItem[] = []

  for (const event of EVENTS) {
    if (!event.featured) continue
    if (event.id === 'BigRun') continue
    items.push({
      key: `event-${event.id}`,
      imageId: event.imageId,
      imageSrc: event.imageSrc || '',
      title: event.title,
      description:
        event.description ||
        `Join the University Hall community for ${event.title.toLowerCase()} — a highlight of the Hall calendar held at ${event.location}.`,
      badgeLabel: event.category,
      metaIcon: <MapPin size={13} />,
      metaText: event.location,
      category: event.category,
    })
  }

  const baisun = TRADITIONS.find((t) => t.id === 'baisun')
  if (baisun) {
    items.push({
      key: `tradition-${baisun.id}`,
      imageId: baisun.imageId,
      imageSrc: baisun.imageSrc || '',
      title: baisun.title,
      description:
        baisun.description ||
        FALLBACK_DESCRIPTIONS[baisun.id] ||
        `A time-honoured ${baisun.category.toLowerCase()} tradition at University Hall, held ${baisun.frequency.toLowerCase()}.`,
      badgeLabel: baisun.frequency,
      metaIcon: <Clock size={13} />,
      metaText: baisun.established
        ? `${baisun.frequency} · Est. ${baisun.established}`
        : baisun.frequency,
      category: baisun.category,
    })
  }

  let count = 0
  for (const tradition of TRADITIONS) {
    if (!tradition.featured || count >= 3) continue
    if (tradition.id === 'baisun') continue
    if (tradition.id === 'castlers-nite') continue
    count++
    items.push({
      key: `tradition-${tradition.id}`,
      imageId: tradition.imageId,
      imageSrc: tradition.imageSrc || '',
      title: tradition.title,
      description:
        tradition.description ||
        FALLBACK_DESCRIPTIONS[tradition.id] ||
        `A time-honoured ${tradition.category.toLowerCase()} tradition at University Hall, held ${tradition.frequency.toLowerCase()}.`,
      badgeLabel: tradition.frequency,
      metaIcon: <Clock size={13} />,
      metaText: tradition.established
        ? `${tradition.frequency} · Est. ${tradition.established}`
        : tradition.frequency,
      category: tradition.category,
    })
  }

  return items
}

/* ── List Row ──────────────────────────────────────────────── */

interface RowProps {
  item: TraditionItem
  isActive: boolean
  onHover: () => void
  index: number
  prefersReducedMotion: boolean
}

const ListRow: React.FC<RowProps> = ({ item, isActive, onHover, index, prefersReducedMotion }) => (
  <motion.button
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-30px' }}
    transition={{
      duration: 0.5,
      delay: prefersReducedMotion ? 0 : index * 0.08,
      ease: [0.23, 1, 0.32, 1],
    }}
    onMouseEnter={onHover}
    onClick={onHover}
    className="w-full text-left group focus:outline-none"
  >
    <div
      className={`relative flex items-center justify-between py-4 md:py-5 border-b transition-colors duration-300 ${
        isActive
          ? 'border-brand-gold'
          : 'border-brand-border group-hover:border-brand-text-muted/40'
      }`}
    >
      {/* Gold active indicator */}
      <motion.div
        initial={false}
        animate={
          isActive
            ? { opacity: 1, scaleY: 1 }
            : { opacity: 0, scaleY: 0 }
        }
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="absolute -left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold to-brand-emerald origin-top"
      />

      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className={`font-display text-lg md:text-xl font-semibold transition-colors duration-300 ${
              isActive ? 'text-brand-gold' : 'text-brand-text-primary'
            }`}
          >
            {item.title}
          </span>

        </div>
        <p className="text-xs md:text-sm text-brand-text-muted/70 font-mono flex items-center gap-1">
          {item.metaIcon}
          {item.metaText}
        </p>
      </div>

      {/* Arrow hint */}
      <motion.div
        animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
        className="shrink-0 text-brand-gold"
      >
        <ArrowRight size={16} />
      </motion.div>
    </div>
  </motion.button>
)

/* ── Reveal Panel ──────────────────────────────────────────── */

interface PanelProps {
  item: TraditionItem
}

const RevealPanel: React.FC<PanelProps> = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
    className="w-full"
  >
    {/* Image */}
    <div className="relative overflow-hidden rounded-card mb-5" style={{ aspectRatio: '16 / 10' }}>
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="w-full h-full object-cover rounded-card"
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder
            width={500}
            height={312}
            imageId={item.imageId}
            alt={item.title}
            className="w-full h-full rounded-card"
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/40 to-transparent pointer-events-none" />
    </div>

    {/* Details */}
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">
          {item.badgeLabel}
        </span>
        <span className="text-xs text-brand-text-muted/60 font-mono flex items-center gap-1">
          {item.metaIcon}
          {item.metaText}
        </span>
      </div>

      <h3 className="font-display text-2xl md:text-3xl font-semibold text-brand-text-primary leading-tight">
        {item.title}
      </h3>

      <p className="text-sm md:text-base text-brand-text-muted leading-relaxed font-serif">
        {item.description}
      </p>

      <Link
        to="/events"
        className="inline-flex items-center gap-1.5 text-brand-gold hover:text-brand-gold-light text-xs font-mono font-semibold uppercase tracking-wider transition-colors duration-200 pt-1"
      >
        <span>Discover More</span>
        <ArrowRight size={14} />
      </Link>
    </div>
  </motion.div>
)

/* ── Section ───────────────────────────────────────────────── */

const HallTraditions: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()
  const items = useMemo(() => buildItems(), [])
  const [activeKey, setActiveKey] = useState(items[0]?.key ?? '')
  const activeItem = items.find((i) => i.key === activeKey) ?? items[0]
  const panelRef = useRef<HTMLDivElement>(null)

  const handleHover = useCallback((key: string) => {
    setActiveKey(key)
    if (panelRef.current && window.innerWidth < 1024) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [])

  return (
    <Section>
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-3">
            Events & Traditions
          </h2>
          <p className="text-sm md:text-base text-brand-text-muted max-w-xl mx-auto">
            Time-honoured events and gatherings that define the University Hall experience
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="w-16 h-0.5 bg-gradient-to-r from-brand-gold to-brand-emerald mx-auto mt-5 origin-center"
          />
        </motion.div>

        {/* Content: list + reveal panel */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* ── List ── */}
          <div className="w-full lg:w-2/5 lg:pt-2">
            <div className="relative pl-5">
              {items.map((item, idx) => (
                <ListRow
                  key={item.key}
                  item={item}
                  isActive={item.key === activeKey}
                  onHover={() => handleHover(item.key)}
                  index={idx}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </div>

          {/* ── Reveal Panel ── */}
          <div ref={panelRef} className="w-full lg:w-3/5 lg:sticky lg:top-24 lg:self-start">
            <AnimatePresence mode="wait">
              <RevealPanel key={activeItem.key} item={activeItem} />
            </AnimatePresence>
          </div>
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-center mt-14 lg:mt-20"
        >
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-7 py-2.5 border-2 border-brand-gold text-brand-gold font-display font-semibold text-sm rounded-card hover:bg-brand-gold hover:text-brand-bg transition-all duration-base"
          >
            View All Events & Traditions
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </Container>
    </Section>
  )
}

export default HallTraditions
