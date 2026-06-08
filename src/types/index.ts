export interface TimelineEvent {
  year: number | string
  title: string
  description: string
  imageId?: string
  imageSrc?: string
}

export interface Facility {
  id: string
  category: string
  title: string
  description: string
  imageId: string
  imageSrc?: string
  /** Multiple images — renders an inline carousel instead of a single image */
  images?: string[]
  features: string
}

export interface HallTradition {
  id: string
  title: string
  description: string
  category: string
  frequency: 'Annual' | 'Bi-Annual' | 'Monthly' | 'One-Time'
  established?: string
  imageId: string
  imageSrc?: string
  /** Multiple images — renders an inline carousel instead of a single image */
  images?: string[]
  /** Video source — renders a video player */
  videoSrc?: string
  featured?: boolean
}

export interface HallEvent {
  id: string
  title: string
  description: string
  category: string
  location: string
  imageId: string
  imageSrc?: string
  /** Multiple images — renders an inline carousel instead of a single image */
  images?: string[]
  /** Video source — renders a video player */
  videoSrc?: string
  rsvpLink?: string
  featured?: boolean
}

export interface Person {
  id: string
  name: string
  chineseName?: string
  title: string
  bio: string
  role: 'warden' | 'Tutoring Team' | 'Hall Officer' | 'student-association' | 'alumni-limited'
  imageId?: string
  imageSrc?: string
  description?: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
}

export interface StatItem {
  label: string
  value: string
  description: string
}

export interface NavLink {
  label: string
  href: string
}

export interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface HallTeam {
  id: string
  name: string
  description: string
  category: 'Old Ball Team' | 'New Ball Team' | 'Culture Team' | "Seasonal Team"
  imageId: string
  imageSrc?: string
  /** Multiple images — renders an inline carousel instead of a single image */
  images?: string[]
}

export interface MentorshipProgram {
  id: string
  title: string
  description?: string
  details?: string[]
  imageId?: string
  imageSrc?: string
  images?: string[]
}

export interface CommitteeMember {
  name: string
  title: string
}

export interface Association {
  id: string
  name: string
  description: string
  mission: string
  activities: string[]
  contactEmail?: string
  website?: string
}

export interface FloorPlanPin {
  id: string
  name: string
  description: string
  floor: 'A' | 'B' | 'C'
  /** Percentage-based X coordinate (0–100) from left edge of floor plan image */
  x: number
  /** Percentage-based Y coordinate (0–100) from top edge of floor plan image */
  y: number
  imageId?: string
  imageSrc?: string
  /** Multiple images — renders a carousel in the detail modal */
  images?: string[]
  /** Room type label e.g. "Twin Room (loft bed)" */
  roomType?: string
  /** Room size e.g. "~14.0m²" */
  roomSize?: string
  /** Bed dimensions e.g. "190cm(L) x 84cm(W) x 7.6cm(H)" */
  bedSize?: string
  /** Desk dimensions e.g. "142cm(L) x 80cm(W) x 74cm(H)" */
  deskSize?: string
}
