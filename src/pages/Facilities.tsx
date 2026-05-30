import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Section, ImagePlaceholder, Badge, Modal } from '@components/common/index'
import { FadeInUp, ScaleOnHover } from '@components/animations/index'
import { FACILITIES, HALL_TREASURES } from '@constants/content'
import type { HallTreasure } from '@constants/content'

const Facilities: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Dining')
  const [selectedTreasure, setSelectedTreasure] = useState<HallTreasure | null>(null)
  const categories = Array.from(new Set(FACILITIES.map((f) => f.category)))
  const selectedFacilities = FACILITIES.filter((f) => f.category === selectedCategory)

  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Our Facilities
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl">

            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* ===== MAIN FAÇADE ===== */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-brand-gold/10 rounded-card blur-2xl" />
              <img
                src="/Facilities/Main_Façade.jpg"
                alt="Main Façade of University Hall — Tudor and Neo-Gothic architecture"
                className="w-full object-cover rounded-card shadow-xl relative"
                style={{ aspectRatio: '16 / 10' }}
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-gold mb-6">
                Main Façade
              </h2>
              <p className="text-brand-text-muted text-lg leading-relaxed">
                University Hall, as a declared monument, is one of the few castles in Hong Kong. The hall features a splendid architectural style that combines Tudor and Neo-Gothic elements.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Category Tabs */}
      <Section className="bg-brand-surface">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-12 justify-center lg:justify-start"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-card font-serif font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-brand-gold text-brand-bg shadow-lg'
                    : 'bg-brand-surface border border-brand-border text-brand-text-primary hover:border-brand-gold'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Facility Details */}
          <div className="space-y-12">
            {selectedFacilities.map((facility, idx) => (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <ScaleOnHover className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <ImagePlaceholder
                    width={500}
                    height={400}
                    imageId={facility.imageId}
                    alt={facility.title}
                    className="rounded-card"
                  />
                </ScaleOnHover>

                <FadeInUp delay={0.2}>
                  <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                    <Badge variant="gold" className="mb-4">
                      {facility.category}
                    </Badge>
                    <h3 className="font-display text-3xl font-semibold text-brand-text-primary mb-4">
                      {facility.title}
                    </h3>
                    <p className="text-brand-text-muted text-lg mb-6 leading-relaxed">
                      {facility.description}
                    </p>
                    <div>
                      <h4 className="font-display font-semibold text-brand-gold mb-4">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {facility.features.map((feature, featureIdx) => (
                          <motion.li
                            key={featureIdx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: featureIdx * 0.1 }}
                            className="flex items-start gap-3 text-brand-text-muted"
                          >
                            <span className="text-brand-emerald font-bold mt-1">✓</span>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeInUp>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== THREE TREASURES ===== */}
      <Section>
        <Container>
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Three Treasures of University Hall
              </h2>
              <p className="text-lg text-brand-text-muted max-w-3xl mx-auto">
                Within the hallowed halls of University Hall lie three cherished treasures — 
                architectural marvels, whimsical traditions, and the enduring spirit of those 
                who shaped this community.
              </p>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HALL_TREASURES.map((treasure, idx) => (
              <motion.div
                key={treasure.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="card-base card-hover flex flex-col h-full cursor-pointer"
                onClick={() => setSelectedTreasure(treasure)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedTreasure(treasure) }}
                aria-label={`View details for ${treasure.name}`}
              >
                <div className="overflow-hidden rounded-card mb-6">
                  {treasure.imageSrc ? (
                    <img
                      src={treasure.imageSrc}
                      alt={treasure.name}
                      className="w-full object-cover"
                      style={{ aspectRatio: '16 / 10' }}
                      loading="lazy"
                    />
                  ) : (
                    <ImagePlaceholder
                      width={16}
                      height={10}
                      imageId={treasure.imageId}
                      alt={treasure.name}
                      className="rounded-card"
                    />
                  )}
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-gold mb-4">
                  {treasure.name}
                </h3>
                <p className="text-brand-text-muted text-sm leading-relaxed flex-1 line-clamp-3">
                  {treasure.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Treasure Detail Modal */}
      <Modal
        isOpen={!!selectedTreasure}
        onClose={() => setSelectedTreasure(null)}
      >
        {selectedTreasure && (
          <>
            {/* Photo */}
            <div className="w-full">
              {selectedTreasure.imageSrc ? (
                <img
                  src={selectedTreasure.imageSrc}
                  alt={selectedTreasure.name}
                  className="w-full rounded-t-card"
                />
              ) : (
                <ImagePlaceholder
                  width={16}
                  height={9}
                  imageId={selectedTreasure.imageId}
                  alt={selectedTreasure.name}
                  className="rounded-t-card"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-gold mb-6">
                {selectedTreasure.name}
              </h2>
              <p className="text-brand-text-muted text-base leading-relaxed">
                {selectedTreasure.description}
              </p>
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

export default Facilities
