import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type Language = 'en' | 'zh'

type Translations = Record<string, Record<Language, string>>

const TRANSLATIONS: Translations = {
  'nav.home': { en: 'Home', zh: '主頁' },
  'nav.about': { en: 'About', zh: '關於' },
  'nav.facilities': { en: 'Facilities', zh: '設施' },
  'nav.events': { en: 'Events & Traditions', zh: '活動與傳統' },
  'nav.life': { en: 'Life', zh: '生活' },
  'nav.people': { en: 'People', zh: '人物' },
  'nav.faq': { en: 'FAQ', zh: '常見問題' },
  'nav.alumni': { en: 'Alumni', zh: '校友' },
  'nav.apply': { en: 'Apply', zh: '申請' },
  'nav.language_toggle': { en: 'EN | 中文', zh: 'EN | 中文' },
  'nav.language_label': { en: 'Switch language', zh: '切換語言' },
}

interface I18nContextValue {
  lang: Language
  t: (key: string) => string
  toggleLang: () => void
  setLang: (lang: Language) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en')

  const t = useCallback(
    (key: string): string => {
      return TRANSLATIONS[key]?.[lang] ?? key
    },
    [lang],
  )

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'zh' : 'en'))
  }, [])

  return (
    <I18nContext.Provider value={{ lang, t, toggleLang, setLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = (): I18nContextValue => {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return ctx
}
