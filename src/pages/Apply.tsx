import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Section } from '@components/common/index'
import { FadeInUp } from '@components/animations/index'
import MapSection from '@components/common/MapSection'
import { OFFICE_INFO } from '@constants/content'
import {
  Send,
  ArrowRight,
  Globe,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  User,
  BookOpen,
} from 'lucide-react'
import { Link } from 'react-router-dom'

// ── Types ─────────────────────────────────────────────────────────────

interface NonLocalFormData {
  fullName: string
  email: string
  phone: string
  nationality: string
  program: string
  yearOfStudy: string
  motivation: string
  hearAbout: string
  comments: string
}

type FormStatus = 'idle' | 'success'

// ── Reusable Input Components ────────────────────────────────────────

interface FieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

const FormField: React.FC<FieldProps> = ({ label, error, required, children }) => (
  <div className="space-y-1.5">
    <label className="block font-serif font-semibold text-brand-text-primary text-sm">
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
        <AlertCircle size={12} />
        {error}
      </p>
    )}
  </div>
)

interface TextInputProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  disabled?: boolean
  icon?: React.ReactNode
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder, type = 'text', disabled, icon }) => (
  <div className="relative">
    {icon && (
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted pointer-events-none">
        {icon}
      </div>
    )}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full bg-brand-bg border border-brand-border rounded-card px-4 py-2.5 text-brand-text-primary
        placeholder:text-brand-text-muted/50 font-serif focus:outline-none focus:border-brand-gold
        focus:ring-1 focus:ring-brand-gold/30 transition-all duration-base disabled:opacity-50
        ${icon ? 'pl-10' : ''}`}
    />
  </div>
)

interface TextAreaProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
  disabled?: boolean
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, placeholder, rows = 4, disabled }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={rows}
    disabled={disabled}
    className="w-full bg-brand-bg border border-brand-border rounded-card px-4 py-2.5 text-brand-text-primary
      placeholder:text-brand-text-muted/50 font-serif focus:outline-none focus:border-brand-gold
      focus:ring-1 focus:ring-brand-gold/30 transition-all duration-base resize-y disabled:opacity-50"
  />
)

interface SelectInputProps {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  disabled?: boolean
}

const SelectInput: React.FC<SelectInputProps> = ({ value, onChange, options, placeholder, disabled }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    className="w-full bg-brand-bg border border-brand-border rounded-card px-4 py-2.5 text-brand-text-primary
      font-serif focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30
      transition-all duration-base disabled:opacity-50 appearance-none cursor-pointer"
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
)

// ── Reusable Info Card ──────────────────────────────────────────────

const InfoCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-brand-surface border border-brand-border rounded-card p-6 lg:p-8 h-full">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
        <div className="text-brand-gold">{icon}</div>
      </div>
      <h3 className="font-display text-2xl font-semibold text-brand-text-primary">{title}</h3>
    </div>
    {children}
  </div>
)

// ── Form Validation Helpers ─────────────────────────────────────────

const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)



// ── Non-local Student Form ──────────────────────────────────────────

const NON_LOCAL_YEARS = [
  { value: 'year-1', label: 'Year 1' },
  { value: 'year-2', label: 'Year 2' },
  { value: 'year-3', label: 'Year 3' },
  { value: 'year-4', label: 'Year 4' },
  { value: 'year-5', label: 'Year 5+' },
  { value: 'postgrad', label: 'Postgraduate' },
]

const HEAR_ABOUT_OPTIONS = [
  { value: 'hku-website', label: 'HKU Website' },
  { value: 'social-media', label: 'Social Media (Instagram, etc.)' },
  { value: 'friend', label: 'Friend / Current Resident' },
  { value: 'alumni', label: 'Alumni' },
  { value: 'orientation', label: 'Orientation / Admissions Talk' },
  { value: 'other', label: 'Other' },
]

const initialNonLocalForm: NonLocalFormData = {
  fullName: '',
  email: '',
  phone: '',
  nationality: '',
  program: '',
  yearOfStudy: '',
  motivation: '',
  hearAbout: '',
  comments: '',
}

const NonLocalForm: React.FC = () => {
  const [form, setForm] = useState<NonLocalFormData>(initialNonLocalForm)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof NonLocalFormData, string>>>({})

  const update = <K extends keyof NonLocalFormData>(field: K, value: NonLocalFormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const errs: Partial<Record<keyof NonLocalFormData, string>> = {}
    if (!form.fullName.trim()) errs.fullName = 'Full name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!validateEmail(form.email)) errs.email = 'Please enter a valid email'
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    if (!form.nationality.trim()) errs.nationality = 'Nationality is required'
    if (!form.program.trim()) errs.program = 'Program of study is required'
    if (!form.yearOfStudy) errs.yearOfStudy = 'Please select your year of study'
    if (!form.motivation.trim()) errs.motivation = 'Please tell us why you want to join'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const yearLabel = NON_LOCAL_YEARS.find((o) => o.value === form.yearOfStudy)?.label || form.yearOfStudy
  const hearLabel = HEAR_ABOUT_OPTIONS.find((o) => o.value === form.hearAbout)?.label || form.hearAbout

  const buildMailTo = () => {
    const subject = encodeURIComponent(
      'Non-local Student Interview Info - University Hall Application'
    )
    const body = encodeURIComponent(
      `Non-local Student Interview Information\n\n` +
      `Full Name: ${form.fullName}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n` +
      `Nationality: ${form.nationality}\n` +
      `Program of Study: ${form.program}\n` +
      `Year of Study: ${yearLabel}\n` +
      `Why University Hall: ${form.motivation}\n` +
      `How did you hear about us: ${hearLabel}\n` +
      `Additional Comments: ${form.comments}\n`
    )
    return `mailto:uhall@connect.hku.hk?subject=${subject}&body=${body}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    // Open default email client with pre-filled form data
    const a = document.createElement('a')
    a.href = buildMailTo()
    a.click()
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand-surface border border-brand-border rounded-card p-8 lg:p-10 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-brand-emerald/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-brand-emerald" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-brand-text-primary mb-3">
          Information Received
        </h3>
        <p className="text-brand-text-muted max-w-md mx-auto mb-6">
          Thank you! We have received your information. The Hall Management Committee will review
          your submission and contact you at{' '}
          <strong className="text-brand-text-primary">{form.email}</strong> regarding interview
          arrangements. Don&apos;t forget to also submit your official application through the{' '}
          <a
            href="https://sweb.hku.hk/hallapp/servlet/hall_app/menu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold hover:text-brand-gold-light underline"
          >
            HKU Hall Application System
          </a>.
        </p>
        <button
          onClick={() => { setForm(initialNonLocalForm); setStatus('idle') }}
          className="btn-primary"
        >
          Submit Another
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Full Name" required error={errors.fullName}>
          <TextInput
            value={form.fullName}
            onChange={(v) => update('fullName', v)}
            placeholder="e.g. CHAN Tai Man"
            icon={<User size={16} />}
          />
        </FormField>

        <FormField label="Email" required error={errors.email}>
          <TextInput
            type="email"
            value={form.email}
            onChange={(v) => update('email', v)}
            placeholder="e.g. tai-man.chan@connect.hku.hk"
            icon={<Mail size={16} />}
          />
        </FormField>

        <FormField label="Phone" required error={errors.phone}>
          <TextInput
            type="tel"
            value={form.phone}
            onChange={(v) => update('phone', v)}
            placeholder="e.g. +852 1234 5678"
            icon={<Phone size={16} />}
          />
        </FormField>

        <FormField label="Nationality" required error={errors.nationality}>
          <TextInput
            value={form.nationality}
            onChange={(v) => update('nationality', v)}
            placeholder="e.g. Chinese, Indian, British"
            icon={<Globe size={16} />}
          />
        </FormField>

        <FormField label="Program of Study" required error={errors.program}>
          <TextInput
            value={form.program}
            onChange={(v) => update('program', v)}
            placeholder="e.g. BEng in Mechanical Engineering"
            icon={<BookOpen size={16} />}
          />
        </FormField>

        <FormField label="Year of Study" required error={errors.yearOfStudy}>
          <SelectInput
            value={form.yearOfStudy}
            onChange={(v) => update('yearOfStudy', v)}
            options={NON_LOCAL_YEARS}
            placeholder="Select your year"
          />
        </FormField>
      </div>

      <FormField label="Why do you want to join University Hall?" required error={errors.motivation}>
        <TextArea
          value={form.motivation}
          onChange={(v) => update('motivation', v)}
          placeholder="Tell us about yourself, your interests, and why you believe University Hall is the right community for you..."
          rows={5}
        />
      </FormField>

      <FormField label="How did you hear about University Hall?">
        <SelectInput
          value={form.hearAbout}
          onChange={(v) => update('hearAbout', v)}
          options={HEAR_ABOUT_OPTIONS}
          placeholder="Select an option"
        />
      </FormField>

      <FormField label="Additional Comments or Questions">
        <TextArea
          value={form.comments}
          onChange={(v) => update('comments', v)}
          placeholder="Any special requirements, preferences, or questions..."
          rows={3}
        />
      </FormField>

      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-brand-text-muted">
          By submitting this form, you agree to the collection and processing of your personal
          information for the purpose of hall admission.
        </p>
        <button
          type="submit"
          className="btn-primary flex items-center gap-2"
        >
          Submit <Send size={16} />
        </button>
      </div>
    </form>
  )
}



// ── Main Apply Page Component ───────────────────────────────────────

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
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#how-to-apply"
                className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
              >
                Apply Now <ArrowRight size={20} />
              </a>
              <Link
                to="/affiliated-membership"
                className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4"
              >
                Affiliated Membership →
              </Link>
            </div>
          </FadeInUp>
        </Container>
      </Section>

      {/* How to Apply */}
      <Section id="how-to-apply">
        <Container>
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                How to Apply
              </h2>
              <p className="text-xl text-brand-text-muted max-w-2xl mx-auto">
                Select your applicant type below to see the application steps and submit your information.
              </p>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Local */}
            <InfoCard title="Local" icon={<MapPin size={22} />}>
              <ol className="space-y-4">
                <li className="flex items-start gap-3 text-brand-text-muted">
                  <span className="w-7 h-7 rounded-full bg-brand-gold/10 text-brand-gold font-display font-semibold text-lg flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>Go to Reg Day and we will arrange a hall tour for you.</span>
                </li>
                <li className="flex items-start gap-3 text-brand-text-muted">
                  <span className="w-7 h-7 rounded-full bg-brand-gold/10 text-brand-gold font-display font-semibold text-lg flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>Submit your application via the <a href="https://sweb.hku.hk/hallapp/servlet/hall_app/menu" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-gold-light underline">HKU Hall Application System</a> and select University hall as your preference Hall.</span>
                </li>
              </ol>
            </InfoCard>

            {/* Non-local */}
            <InfoCard title="Non-local" icon={<Globe size={22} />}>
              <ol className="space-y-4 mb-6">
                <li className="flex items-start gap-3 text-brand-text-muted">
                  <span className="w-7 h-7 rounded-full bg-brand-gold/10 text-brand-gold font-display font-semibold text-lg flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>Submit your application via the <a href="https://sweb.hku.hk/hallapp/servlet/hall_app/menu" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-gold-light underline">HKU Hall Application System</a> and select University hall as your preference Hall.</span>
                </li>
                <li className="flex items-start gap-3 text-brand-text-muted">
                  <span className="w-7 h-7 rounded-full bg-brand-gold/10 text-brand-gold font-display font-semibold text-lg flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>Fill and submit the form below to us for further process.</span>
                </li>
              </ol>

              <div className="border-t border-brand-border pt-6">
                <h4 className="font-display text-xl font-semibold text-brand-text-primary mb-4">
                  Interview Information Collection
                </h4>
                <NonLocalForm />
              </div>
            </InfoCard>
          </div>
        </Container>
      </Section>

      {/* Visit Us */}
      <Section className="">
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
