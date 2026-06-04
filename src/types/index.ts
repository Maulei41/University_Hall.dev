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
  features: string[]
}

export interface HallTradition {
  id: string
  title: string
  description: string
  category: string
  frequency: 'Annual' | 'Bi-Annual' | 'Monthly' | 'One-Time'
  established?: string
  imageId: string
  featured?: boolean
}

export interface HallEvent {
  id: string
  title: string
  description: string
  category: string
  location: string
  imageId: string
  rsvpLink?: string
  featured?: boolean
}

export interface Person {
  id: string
  name: string
  title: string
  bio: string
  role: 'warden' | 'Tutoring Group' | 'Hall Officer' | 'student-association' | 'alumni-association'
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
  category: 'Old Ball' | 'New Ball' | 'Culture' | "Seasonal"
  imageId: string
  imageSrc?: string
  /** Multiple images — renders an inline carousel instead of a single image */
  images?: string[]
}

export interface MentorshipProgram {
  id: string
  title: string
  description: string
  details: string[]
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
}
