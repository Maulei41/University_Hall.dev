import React from 'react'
import { motion } from 'framer-motion'
import { Container, Section } from '@components/common/index'
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  ScaleOnHover,
  TimelineNode,
} from '@components/animations/index'
import { TIMELINE_EVENTS, PHILOSOPHY_PILLARS } from '@constants/content'

const About: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <div className="max-w-3xl">
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
                Our Story
              </h1>
              <p className="text-xl text-brand-text-muted font-serif leading-relaxed">
                Over the years, UHall has become known for its brotherhood, traditions, and strong sense of belonging. Generations of residents, known as Castlers, have passed through its doors, each contributing to the culture and spirit that define the Hall today. The experience of living in UHall has long been shaped by shared meals, hall events, daily routines, and the bonds formed between hallmates.
              </p>
              <p>Life at University Hall has always involved more than accommodation. It has offered students an environment in which to develop independence, responsibility, and leadership, while also learning the value of fellowship and mutual support. Many alumni recall their years in the Hall as some of the most memorable of their university lives.</p>
            </div>
          </FadeInUp>
        </Container>
      </Section>
      {/* Hall Values */}
      <Section>
        <Container>
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Our Hall Values
              </h2>
              <p className="text-lg text-brand-text-muted max-w-2xl mx-auto">
                Grounded in timeless principles of Brotherhood, community, and character
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PHILOSOPHY_PILLARS.map((pillar) => (
                  <StaggerItem key={pillar.title}>
                    <ScaleOnHover>
                      <div className="card-base card-hover">
                        <h3 className="font-display text-2xl font-semibold text-brand-gold mb-4">
                          {pillar.title}
                        </h3>
                        <p className="text-brand-text-muted leading-relaxed">{pillar.description}</p>
                      </div>
                    </ScaleOnHover>
                  </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Timeline */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Milestones in Our History
              </h2>
            </div>
          </FadeInUp>

          <div className="space-y-12">
            {TIMELINE_EVENTS.map((event, idx) => (
              <TimelineNode
                key={event.year}
                year={event.year}
                title={event.title}
                description={event.description}
                isRight={idx % 2 === 1}
              />
            ))}
          </div>
        </Container>
      </Section>



      {/* Values Quote */}
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto py-12"
          >
            <p className="text-3xl lg:text-4xl font-display font-semibold text-brand-gold italic mb-6">
              "Welcome to University Hall! We are the smallest and most intimate halls at HKU, where you really can know everyone by name. We live in one of the oldest, coolest buildings in Hong Kong, and we eat meals together in a refurbished religious chapel. The jungle is at our back door (with wild boars and porcupines), for hiking and running. We are also committed to lead at HKU by giving equal opportunity for everyone - it doesn't matter if you are local or non-local. We are all brothers. Come join and become part of a long tradition of respected and prestigious Castlers!"
            </p>
            <p className="text-brand-text-muted">— Warden Message</p>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}

export default About
