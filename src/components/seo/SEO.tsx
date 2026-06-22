import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  path: string
  ogImage?: string
  ogType?: string
}

const SITE_NAME = 'University Hall - HKU'
const DEFAULT_OG_IMAGE = '/assets/logo.png'
const SITE_URL = 'https://uhall.hku.hk'

export default function SEO({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE_URL}${ogImage}`} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${ogImage}`} />
    </Helmet>
  )
}
