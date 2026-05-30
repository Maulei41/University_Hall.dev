import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, CheckCircle } from 'lucide-react'
import { Container, Section, Button } from '@components/common/index'
import { FadeInUp, StaggerContainer, StaggerItem } from '@components/animations/index'
import { FAQ_ITEMS } from '@constants/content'

const Apply: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    major: '',
    year: '',
    statement: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const applicationSteps = [
    { step: 1, title: 'Personal Information', description: 'Basic details about you' },
    { step: 2, title: 'Academic Background', description: 'Your academic information' },
    { step: 3, title: 'Personal Statement', description: 'Tell us about yourself' },
    { step: 4, title: 'Review & Submit', description: 'Confirm your application' },
  ]

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
          </FadeInUp>
        </Container>
      </Section>

      {/* Application Requirements */}
      <Section>
        <Container>
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Who Should Apply?
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Current HKU Students',
                  description:
                    'All currently enrolled undergraduate and postgraduate students are welcome to apply.',
                },
                {
                  title: 'Academic Excellence',
                  description:
                    'We seek students committed to scholarly achievement and intellectual engagement.',
                },
                {
                  title: 'Community Contributors',
                  description:
                    'Your participation in residential programming and community life is essential.',
                },
                {
                  title: 'Character & Leadership',
                  description:
                    'We value integrity, respect, and a commitment to making our community stronger.',
                },
              ].map((requirement) => (
                <StaggerItem key={requirement.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="card-base card-hover"
                  >
                    <h4 className="font-display text-xl font-semibold text-brand-gold mb-3">
                      {requirement.title}
                    </h4>
                    <p className="text-brand-text-muted">{requirement.description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Application Timeline */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Application Process
              </h2>
            </div>
          </FadeInUp>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16"
          >
            {applicationSteps.map((item, idx) => (
              <div key={item.step} className="flex flex-col items-center flex-1">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-lg mb-4 ${
                    formStep >= item.step
                      ? 'bg-brand-gold text-brand-bg'
                      : 'bg-brand-surface border border-brand-border text-brand-text-muted'
                  }`}
                >
                  {formStep > item.step ? <CheckCircle size={28} /> : item.step}
                </motion.div>
                <h4 className="font-display font-semibold text-brand-text-primary text-center mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-brand-text-muted text-center">{item.description}</p>
                {idx < applicationSteps.length - 1 && (
                  <div className="hidden md:block absolute w-12 h-1 bg-gradient-to-r from-brand-gold to-transparent ml-20" />
                )}
              </div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Application Form */}
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto card-base"
          >
            <h3 className="font-display text-2xl font-semibold text-brand-gold mb-8">
              {applicationSteps[formStep - 1].title}
            </h3>

            <form className="space-y-6">
              {/* Step 1: Personal Information */}
              {formStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="px-4 py-3 bg-brand-bg border border-brand-border rounded-card text-brand-text-primary placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-all"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="px-4 py-3 bg-brand-bg border border-brand-border rounded-card text-brand-text-primary placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-all"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-card text-brand-text-primary placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-all"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-card text-brand-text-primary placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-all"
                  />
                </motion.div>
              )}

              {/* Step 2: Academic Background */}
              {formStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <input
                    type="text"
                    name="school"
                    placeholder="Faculty/School"
                    value={formData.school}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-card text-brand-text-primary placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-all"
                  />
                  <input
                    type="text"
                    name="major"
                    placeholder="Major/Field of Study"
                    value={formData.major}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-card text-brand-text-primary placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-all"
                  />
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-card text-brand-text-primary focus:outline-none focus:border-brand-gold transition-all"
                  >
                    <option value="">Select Year of Study</option>
                    <option value="year1">Year 1</option>
                    <option value="year2">Year 2</option>
                    <option value="year3">Year 3</option>
                    <option value="year4">Year 4</option>
                    <option value="postgrad">Postgraduate</option>
                  </select>
                </motion.div>
              )}

              {/* Step 3: Personal Statement */}
              {formStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block font-serif font-semibold text-brand-text-primary mb-2">
                      Why do you want to join University Hall?
                    </label>
                    <textarea
                      name="statement"
                      value={formData.statement}
                      onChange={handleChange}
                      rows={8}
                      placeholder="Share your thoughts about residential community, academic goals, and what you hope to contribute..."
                      className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-card text-brand-text-primary placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-all resize-none"
                    />
                    <p className="text-xs text-brand-text-muted mt-2">
                      {formData.statement.length} / 1000 characters
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {formStep === 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-brand-bg border border-brand-border rounded-card p-6">
                    <h4 className="font-display font-semibold text-brand-gold mb-4">
                      Application Summary
                    </h4>
                    <div className="space-y-3 text-sm">
                      <p className="text-brand-text-muted">
                        <strong>Name:</strong> {formData.firstName} {formData.lastName}
                      </p>
                      <p className="text-brand-text-muted">
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p className="text-brand-text-muted">
                        <strong>School:</strong> {formData.school || 'Not specified'}
                      </p>
                      <p className="text-brand-text-muted">
                        <strong>Major:</strong> {formData.major || 'Not specified'}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-brand-text-muted">
                    By clicking submit, you agree to our application terms and conditions.
                  </p>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 justify-between pt-8 border-t border-brand-border">
                <Button
                  variant="secondary"
                  onClick={() => setFormStep(Math.max(1, formStep - 1))}
                  disabled={formStep === 1}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </Button>
                {formStep < 4 ? (
                  <Button
                    variant="primary"
                    onClick={() => setFormStep(Math.min(4, formStep + 1))}
                  >
                    Next
                  </Button>
                ) : (
                  <Button variant="primary">Submit Application</Button>
                )}
              </div>
            </form>
          </motion.div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
            </div>
          </FadeInUp>

          <div className="max-w-2xl mx-auto space-y-4">
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
                  <h4 className="font-serif font-semibold text-brand-text-primary">
                    {item.question}
                  </h4>
                  <motion.div
                    animate={{ rotate: expandedFAQ === item.question ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
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
                      <p className="text-brand-text-muted">{item.answer}</p>
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

export default Apply
