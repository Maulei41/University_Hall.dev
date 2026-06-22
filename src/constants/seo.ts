export interface SeoConfig {
  title: string
  description: string
  path: string
  ogImage?: string
  ogType?: string
}

export const SEO_DATA: Record<string, SeoConfig> = {
  '/': {
    title: 'University Hall - The University of Hong Kong',
    description:
      "University Hall (U-Hall) is a historic male residential hall at HKU. Discover brotherhood, tradition, and castle life at one of Hong Kong's most iconic student residences.",
    path: '/',
  },
  '/about': {
    title: 'Our Story',
    description:
      "From Douglas Castle to University Hall — explore the 160-year history of HKU's most historic residential hall. Heritage, milestones, and our philosophy.",
    path: '/about',
  },
  '/facilities': {
    title: 'Facilities',
    description:
      'Explore the facilities at University Hall: Dining Hall, Library, Gym, Common Room, Music Room, and more. Castle living at HKU.',
    path: '/facilities',
  },
  '/events': {
    title: 'Events & Traditions',
    description:
      'Discover the vibrant events and traditions of University Hall: High Table Dinner, Halloween Haunted House, Fire Dragon Dance, and more.',
    path: '/events',
  },
  '/life': {
    title: 'Life at University Hall',
    description:
      'Learn about hall life at U-Hall: sports teams, cultural teams, and brotherhood at HKU.',
    path: '/life',
  },
  '/people': {
    title: 'Hall Management',
    description:
      "Meet the Warden, Resident Tutors, Fellows, and Students' Association of University Hall, HKU.",
    path: '/people',
  },
  '/alumni': {
    title: 'Alumni',
    description:
      'University Hall Alumni Limited — mentorship programs, alumni network, and staying connected with U-Hall.',
    path: '/alumni',
  },
  '/apply': {
    title: 'Apply to University Hall',
    description:
      'Apply to live at University Hall. Learn about the application process, eligibility, and affiliated membership.',
    path: '/apply',
  },
  '/tour-the-hall': {
    title: 'Tour the Hall',
    description:
      'Take a virtual tour of University Hall. Explore room types, floor plans, and the historic castle building.',
    path: '/tour-the-hall',
  },
  '/faq': {
    title: 'FAQ',
    description:
      'Frequently asked questions about living at University Hall: rooms, food, application, YingSun, and more.',
    path: '/faq',
  },
}
