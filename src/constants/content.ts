import { TimelineEvent, Facility, HallTradition, HallEvent, HallTeam, Person, Testimonial, StatItem, MentorshipProgram, Association } from '../types/index'

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1861–1867',
    title: 'The Beginning of Douglas Castle',
    description: 'The story of UHall began in the nineteenth century with Douglas Lapraik, a Scottish merchant who arrived in Hong Kong during the city\'s early years of development. Through his work in shipping, property, and dock operations, Lapraik became one of the most successful businessmen of his time. In the early 1860s, he acquired the hillside site overlooking Pokfulam and built Douglas Castle as his private residence.\n' +
        '\n' +
        'Completed around 1864, the house was designed to command sweeping views of the sea and surrounding landscape. Although Lapraik spent little time there before retiring to Britain, the castle became the foundation of what would later become University Hall.',
    imageId: 'dining_hall',
  },
  {
    year: 1894,
    title: 'From Castle to Nazareth House',
    description: 'After Lapraik\'s death, the property eventually passed into new hands during a period of significant social and historical change. In 1894, amid the bubonic plague outbreak in Hong Kong, the French Mission purchased Douglas Castle and transformed it into Nazareth House. The building was expanded to include a chapel and a printing house, while parts of the original castle were retained within the new complex.\n' +
        '\n' +
        'For decades, Nazareth served as a retreat and working centre for missionaries across Asia. Its printing press became one of the busiest of its kind in the region, producing religious publications in many languages.',
    imageId: 'common_rooms',
  },
  {
    year: "early 1950s",
    title: 'Wartime Disruption and Change',
    description: 'The Second World War brought a period of disruption. During the Japanese occupation of Hong Kong, Nazareth was requisitioned and its operations were suspended. After the war, the French Mission resumed its work briefly, but the changing political climate in mainland China made missionary activity increasingly difficult.\n' +
        '\n' +
        'By the early 1950s, the mission could no longer sustain its original purpose, and the property was eventually put up for sale. This opened the door to a new chapter in the life of the building.',
    imageId: 'library',
  },
  {
    year: '1954-1956',
    title: 'The Birth of University Hall',
    description: 'In 1954, the University of Hong Kong acquired the site and gave it a new life as a student residence. This transition marked the beginning of University hall as it is known today. Rather than replacing the old building entirely, the University chose to adapt it. The chapel was converted into a dining hall, the crypt became a common room, and the existing structure was furnished for student accommodation.\n' +
        '\n' +
        'When the first group of students moved in in 1956, University Hall began its journey as a residential community rooted in heritage. From the outset, the Hall developed a strong identity of its own. It was not simply a dormitory, but a close-knit community where students lived, learned, and grew together.',
    imageId: 'dining_hall',
  },
  {
    year: 1995,
    title: 'Heritage Recognition',
    description: 'In recognition of its architectural and historical importance, University Hall was declared a historical monument in 1995. This designation affirmed its significance not only as a former colonial and missionary building, but also as a living residence that continues to serve students today.\n' +
        '\n' +
        'The Hall stands as a rare example of a heritage site that remains active and meaningful in modern university life. Its legacy is reflected not only in its preserved architecture, but also in the spirit of its community.',
    imageId: 'library',
  },
  {
    year: "Today",
    title: 'University Hall Today',
    description: 'Today, UHall continues to house more than 100 male students and remains one of the most distinctive residential halls at HKU. Our Hall continues to embody a balance of tradition and transformation, offering students a place where the past is not forgotten, but lived alongside the present.\n' +
        '\n' +
        'From Douglas Castle to Nazareth House to University Hall, the building has changed names and functions, but its story has always been one of endurance. For those who call it home, University Hall remains a place where history is not only remembered, but carried forward.',
    imageId: 'common_rooms',
  },
]

export const FACILITIES: Facility[] = [
  {
    id: 'dining-hall',
    category: 'Dining',
    title: 'Dining Hall (Chapel)',
    description:
      '',
    imageId: 'dining_hall',
    features: [
      'Seating for 100+ residents',
      'Historic architecture and heritage design',
      'Daily breakfast, lunch, and dinner service',
      'Formal dinner events and celebrations',
      'Vegetarian and dietary accommodation',
      'State-of-the-art kitchen facilities',
    ],
  },
  {
    id: 'library',
    category: 'Common Area',
    title: 'Hall Library',
    description:
      '',
    imageId: 'library',
    features: [
      '15,000+ volumes collection',
      'Silent and collaborative study zones',
      'Digital resources and databases',
      '24-hour study facilities',
      'Research consultation services',
      'Group study rooms',
    ],
  },
  {
    id: 'gym-room',
    category: 'Common Area',
    title: 'Gym Room',
    description:
      '',
    imageId: 'recreation',
    features: [
      'Multi-purpose Gym room',
    ],
  },
  {
    id: 'common-room',
    category: 'Common Area',
    title: 'Common Room',
    description:
      '',
    imageId: 'accommodation',
    features: [

    ],
  },
  {
    id: 'newspaper-rooms',
    category: 'Common Area',
    title: 'Newspaper Room',
    description:
      '',
    imageId: 'common_rooms',
    features: [
    ],
  },
  {
    id: 'vending-machine',
    category: 'Community',
    title: 'Vending Machines',
    description:
      'Modern facility hosting student clubs, interest groups, and community events that enrich the residential experience and foster lifelong friendships.',
    imageId: 'community_center',
    features: [
      'Event space for 200+ guests',
      'Meeting rooms for student organizations',
      'Audio-visual equipment',
      'Kitchen and catering facilities',
      'Outdoor courtyard',
      'Flexible furniture configuration',
    ],
  },
]

export const EVENTS: HallEvent[] = [
  {
    id: 'Halloween',
    title: 'Halloween Haunted House',
    description:
      '',
    category: 'Cultural',
    location: 'University Hall',
    imageId: 'dining_hall',
    featured: true,
  },
  {
    id: 'mid-autumn-festival',
    title: 'Pok Fu Lam Village Fire Dragon Dance',
    description:
      '',
    category: 'Cultural',
    location: 'Pok Fu Lam Village',
    imageId: 'fire_dragon',
    featured: true,
  },
  {
    id: 'BigRun',
    title: 'BigRun',
    description:
      'BigRun is held twice a month and brings Castlers together for a short run under the night sky. More than a regular workout, it is a shared experience that challenges endurance, clears the mind, and creates a strong sense of unity among hallmates. \n \n As students run side by side, BigRun becomes a space for encouragement, conversation, and camaraderie. Whether for fitness, friendship, or the simple joy of running together, BigRun is a tradition that continues to bring the Hall closer together.',
    category: 'Recreation',
    location: 'Hong Kong Island',
    imageId: 'big_run',
    featured: true,
  },
  {
    id: 'superpass',
    title: 'Superpass party',
    description:
      '',
    category: 'Social',
    location: 'University Hall',
    imageId: 'dining_hall',
  },
  {
    id: 'inter-hall',
    title: 'Inter-Hall Competition / Performance',
    description:
      '',
    category: 'Recreation',
    location: 'HKU Campus',
    imageId: 'recreation',
  },
  {
    id: 'island-bike',
    title: 'Island Bike Ride',
    description:
      'Island Bike Ride is held on a late January night, where brothers come together for a memorable ride around Hong Kong Island. Along the way, they pass scenic landmarks such as Repulse Bay and Tai Tam Reservoir, and ride beside the historic tram tracks, making the journey as special as the destination. \n \n More than just a cycling event, Island Bike Ride is a night of shared adventure, endurance, and brotherhood. After hours on the road, the ride ends in Kennedy Town with a well-earned “jocha", yumcha in the morning , bringing the night to a perfect close with good food, laughter, and lasting memories.',
    category: 'Recreation',
    location: 'Hong Kong Island',
    imageId: 'common_rooms',
  }
]

export const TRADITIONS: HallTradition[] = [
  {
    id: 'high-table-dinner',
    title: 'High Table Dinner',
    description:
      '',
    category: 'Social',
    frequency: 'Monthly',
    imageId: 'dining_hall',
    featured: true,
  },
  {
    id: 'founders-nite',
    title: 'Founders\' Nite',
    description:
      '',
    category: 'Social',
    frequency: 'Annual',
    imageId: 'dining_hall',
    featured: true,
  },
  {
    id: 'castlers-nite',
    title: 'Castlers\' Nite',
    description:
      '',
    category: 'Social',
    frequency: 'Annual',
    imageId: 'dining_hall',
    featured: true,
  },
  {
    id: 'nazarene-nite',
    title: 'Nazarene Nite',
    category: 'Social',
    description:
      '',
    frequency: 'Annual',
    imageId: 'dining_hall',
    featured: true,
  },
  {
    id: 'baisun',
    title: 'Bai Sun',
    description:
      '',
    category: 'Community',
    frequency: 'Annual',
    imageId: 'dining_hall',
  },
  {
    id: 'reunion-dinner',
    title: 'Reunion Dinner',
    description:
      '',
    category: 'Community',
    frequency: 'Annual',
    imageId: 'dining_hall',
  }
]

export const PEOPLE: Person[] = [
  {
    id: 'warden',
    name: 'Mr. Beau Linton Lefler',
    title: 'Warden',
    bio: 'Principal Lecturer, HKU Business School',
    role: 'warden',
    imageId: 'person_warden',
    imageSrc: '/People/Warden.jpeg',
    description:"\"Welcome to University Hall! We are the smallest and most intimate halls at HKU, where you really can know everyone by name. We live in one of the oldest, coolest buildings in Hong Kong, and we eat meals together in a refurbished religious chapel. The jungle is at our back door (with wild boars and porcupines), for hiking and running. We are also committed to lead at HKU by giving equal opportunity for everyone - it doesn't matter if you are local or non-local. We are all brothers. Come join and become part of a long tradition of respected and prestigious Castlers!\""
  },
  {
    id: 'Senior-Resident-Tutor ',
    name: 'Mr. Sam Liu Shan 劉山',
    title: 'Senior Resident Tutor',
    bio: 'Lecturer, Faculty of Law.',
    role: 'Tutoring Group',
    imageId: 'person_Sam',
    imageSrc: '/People/Sam_Liu.jpeg',
  },
  {
    id: 'Resident-Tutor',
    name: 'Dr. Vincent Chan Nok Hang 陳諾衡',
    title: 'Resident Tutor',
    bio: 'PhD (Neo-Institutional Economics) HKU | BSc (Surv) HKU | TechArborA (UK)',
    role: 'Tutoring Group',
    imageId: 'person_fellow_1',
    imageSrc: "/People/Vincent_Chan.jpg"
  },
  {
    id: 'Tutor-1',
    name: 'Mr. Raymond Chan Sai Wai 陳世煒',
    title: 'Junior fellow',
    bio: 'BSc (Astronomy), PGDE (Physics), Registered Teacher',
    role: 'Tutoring Group',
    imageId: 'person_fellow_2',
    imageSrc: "/People/Raymond_Chan.jpeg",
    description: "As a Junior Tutor, I bring my passion for science education and commitment to fostering student growth in our hall community. Having served as Sports Captain during my university years, I experienced firsthand how hall life is a transformative space for developing leadership abilities and learning to be a contributive community member. These experiences proved invaluable to my teaching career, shaping my understanding of holistic student development. I believe residential halls offer unique opportunities for personal growth beyond academics. I look forward to supporting our residents in their academic journeys while encouraging them to embrace the full spectrum of learning experiences that hall life provides"
  },
  {
    id: 'Tutor-2',
    name: 'Mr. Jason Wong Ching Hin 黃靖軒',
    title: 'Junior fellow',
    bio: 'BSc-HKU',
    role: 'Tutoring Group',
    imageId: 'person_counselor',
    imageSrc: '/People/Jason_Wong.jpeg',
  },
  {
    id: 'Hall-Executive',
    name: 'Ms. Ivy Chan Sze Man 陳詩敏',
    title: 'Hall Executive',
    bio: '',
    role: 'Hall Officer',
    imageId: 'person_admin',
    imageSrc: "/People/Ivy_Chan.jpeg",
  },
  // Students' Association
  { id: 'sa-Chairman', name: 'Woo Chi To 胡智滔', title: 'Chairman — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-IV', name: 'Chang Crispo Shun Man 鄭舜文', title: 'Internal Vice-Chairman — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-EV', name: 'Tam Tsz Ho 譚子皓', title: 'External Vice-Chairman — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-secretary', name: 'Pathak Atharv', title: 'Honorary Secretary — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-treasurer', name: 'Fu Chit Wa 符哲華', title: 'Honorary Treasurer — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-Financial', name: 'Ho Ka Kit', title: 'Financial Secretary — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-Welfare', name: 'Lam Max Yee Hong 林以康', title: 'Welfare Secretary — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-Sports-Secretary', name: 'Kerem Bilgin', title: 'Sports Secretary — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-Sports-Captain', name: 'Aktan Rakhat', title: 'Sports Captain — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-Cultural', name: 'Zou Jiachen 邹佳辰', title: 'Cultural Secretary — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-Social', name: 'Kemausuor Winambe Tetteh-Kumah', title: 'Social Secretary — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-Publication', name: 'Chau Cheuk Hei 周倬希', title: 'Publication Secretary — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-Publicity', name: 'Devanshu Gupta', title: 'Publicity Secretary — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-AA', name: 'Huynh Duy Khoa', title: 'Alumni and Non-resident Affairs Secretary  — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-CA', name: 'Karimli Yusuf', title: 'Current Affairs Secretary — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },
  { id: 'sa-Past-Committee-Representative', name: 'Yu Pak Hin', title: 'Past Committee Representative — Students\' Association', bio: 'Section 2026-27', role: 'student-association' },

  // Alumni Association
  { id: 'aa-chair',
    name: 'Mr. SIT Loi-keung, Ken',
    title: 'Chairman — Alumni Association',
    bio: 'Section 2024-26',
    role: 'alumni-association',
    imageId:"aa-chair",
    imageSrc: "/People/Ken_Sit.jpg",
    description: "Ken SIT was a resident of University Hall from 1994 to 1997. He was the Honorary Secretary of University Hall Students Association in 1995-1996. He has joined University Hall Alumni Limited since 2018. He was the founder of Rich Beauty International Limited in 2006 and he was the President of Lions Club of Happy Valley 2023 to 2024. He is currently the President of Lions Clubs International Foundation (LCIF) and also the director of Lions Kidney Educational Centre and Research Foundation (LKEC)."
  },
  { id: 'aa-vice-chair-1',
    name: 'Mr. SHEK Ming-san',
    title: 'Vice Chairman — Alumni Association',
    bio: 'Section 2024-26',
    role: 'alumni-association',
    imageId: "aa-vice-chair-1",
    imageSrc: "/People/Shek_Ming_San.jpg",
    description:"Samuel was a resident of University Hall from 2009 to 2012. He was the Internal Vice Chairman of University Hall Students Association in 2010-2011 and Chairman in 2011-2012. He graduated with a degree of Finance from The Faculty of Business and Economics of The University of Hong Kong in 2012. He also obtained a Law Degree from The University of London in 2015. • Samuel is a senior manager in a manufacturing company. He has joined the Board of Directors of University Hall Alumni Limited since 2016. Samuel is a CFA charterholder."
  },
  { id: 'aa-Vice-chair-2',
    name: 'Mr. CHEUNG Che-tsuen, Desmond',
    title: 'Vice Chairman — Alumni Association',
    bio: 'Section 2024-26',
    role: 'alumni-association',
    imageId: "aa-vice-chair-2",
    imageSrc: "/People/Desmond_Cheung.jpg",
    description:" Desmond is a regulatory lawyer at the Hong Kong Stock Exchange. Before that, he was a disputes/ regulatory lawyer at various international law firms, including DLA Piper Hong Kong. He used to be a dragon boat team captain for the Hong Kong Law Society. He is now a keen distance runner and football player."
  },
  { id: 'aa-Secretary',
    name: 'Mr. Ng Cheuk Sau Joseph',
    title: 'Honorary Secretary — Alumni Association',
    bio: 'Section 2024-26',
    role: 'alumni-association',
    imageId: "aa-Secretary",
    imageSrc: "/People/Joseph_Ng.jpg",
    description:"Joseph read law and graduated in 2015. He completed the PCLL in 2016. He called the University Hall home for the 5 years in HKU. He was the Hockey Team Captain from 2012 to 2014. He also played alongside his brothers in various sports teams and cultural teams. We go with brothers, as they say."
  },
  { id: 'aa-Treasurer',
    name: 'Mr. SHIH Chi-san, Michael',
    title: 'Honorary Treasurer — Alumni Association',
    bio: 'Section 2024-26',
    role: 'alumni-association',
    imageId: "aa-Treasurer",
    imageSrc: "/People/Michael_Shih.jpg",
    description:"Michael had admitted as Fellow of Society of Actuaries in 2010, now working in Prudential as insurance consultant. He has joined the Board of Director of UHAL since 2016."
  },
  { id: 'aa-Director-1',
    name: 'Dr. CHENG Shing-kwong, Eric',
    title: 'Director — Alumni Association',
    bio: 'Section 2024-26',
    role: 'alumni-association',
    imageId: "aa-Director-1",
    imageSrc: "/People/Eric_Cheng.jpg",
    description:"Resided in UH 1975-1978, Eric is one of the first batch of HKU quantity surveyors. Qualified HKIS Surveyor since 1984. Helped build the HK Bank Headquarters Building at No. 1 QRC. Stayed in the academia for 37 years educating surveyors. Sidetracked to pest management including termite and bedbug research. Joined the plumbing and drainage industry and specialized in stainless steel pipe and construction contract administration. Currently a Pipe Company Director and a QS Manager in a plumbing contractor. Previously a Vice Chairman of the Hong Kong Institution of Plumbing and Drainage and a Senior Lecturer and assistant head with the City University of Hong Kong."
  },
  { id: 'aa-Director-2',
    name: 'Dr. Wai Heung-on, Jonathan',
    title: 'Director — Alumni Association',
    bio: 'Section 2024-26',
    role: 'alumni-association',
    imageId: "aa-Director-2",
    imageSrc: "/People/Jonathan_Wai.jpg",
    description:"Jonathan resided in University Hall from 1975 to 1979. \"Boot-boot\" was a sports enthusiast in representing UH and Faculty of Medicine. He is currently the Medical Superintendent of Precious Blood Hospital(Caritas); holding several professorships in teaching medical students in HKU and CUHK. He has engaged in various voluntary works and lately retired as Deputy Commissioner of the Auxiliary Medical Service of HKSAR in 2023."
  },
  { id: 'aa-Director-3',
    name: 'Mr. Danny Tsoi',
    title: 'Director — Alumni Association',
    bio: 'Section 2024-26',
    role: 'alumni-association',
    imageId: "aa-Director-3",
    imageSrc: "/People/Danny_Tsoi.jpg",
    description:"As a U hallite from 1978 to 1983, Danny was tennis and soccer team captain during his residency in U hall. He graduated with a MBBS degree in 1983 and became a specialist in Orthopaedics and Traumatology since 1993. Currently he is in private practice as Orthopaedic Surgeon. Throughout the past 40 years Danny was actively involved in many U hall alumni events especially in golf tournaments."
  },
  { id: 'aa-Director-4',
    name: 'Mr. Vincent Tang',
    title: 'Director — Alumni Association',
    bio: 'Section 2024-26',
    role: 'alumni-association',
    imageId: "aa-Director-4",
    imageSrc: "/People/Vincent_Tang.jpg",
    description:"Vincent was a resident of UHall in1981 to 1985 and he practised law after graduation. He is the founder and senier partner of Tang and Lee, Solicitors.Vincent is a good singer and an excellent debater. He used to be a director of UHAL in the 90's and is excited to serve the brothers again."
  },
  { id: 'aa-Director-5',
    name: 'Dr. WONG Lap-ching',
    title: 'Director — Alumni Association',
    bio: 'Section 2024-26',
    role: 'alumni-association',
    imageId: "aa-Director-5",
    imageSrc: "/People/Wong_Lap_ching.jpg",
    description:"Dr. Wong is a specialist of Ear, Nose & Throat in private practice and a keen golfer."
  },
  { id: 'aa-Director-6', name: 'Mr. Tristan Lau', title: 'Director — Alumni Association', bio: 'Section 2024-26', role: 'alumni-association', imageId: "aa-Director-6", imageSrc: "/People/Tristan_Lau.jpg", description:"Tristan resided at University Hall from 1994 to 1998. During the 1995-1996 academic year, he served as the Internal Vice Chairman of the University Hall Students Association. He graduated in 1998 with a degree in Engineering from the Faculty of Electrical and Electronic Engineering at The University of Hong Kong. A sports enthusiast, he captained and excelled as the best player on the soccer, tennis, and table tennis teams, earning the Llewellyn’s Cup in both 1996 and 1997.\n" +
        "\n" +
        "Currently, Tristan is the Head of Electronic Trading Services for the APAC region at an investment bank. He is also involved in various voluntary activities and mentorship programs organized by HKU, JA HK and his organisation." },
  { id: 'aa-Director-7', name: 'Mr. CHEN Songyong, Jack', title: 'Director — Alumni Association', bio: 'Section 2024-26', role: 'alumni-association', imageId: "aa-Director-7", imageSrc: "/People/Jack_Chen.jpg", description:"Now VP at a top tier investment bank as a tech lead. He is also a co-host of Codeaholics (the largest community of local software engineers) and a volunteer IT Manager at InspiringHK Sports Foundation" },
  { id: 'aa-Director-8', name: 'Mr. YUNG Albert', title: 'Director — Alumni Association', bio: 'Section 2024-26', role: 'alumni-association', imageId: "aa-Director-8", imageSrc: "/People/Albert_Yung.jpg",description:"Albert was a resident of University Hall from 2008 to 2011. He was the Internal Vice Chairman of University Hall Students Association in 2009-2010 and Chairman in 2010-2011. He graduated in 2011 with a BA . He has been working in the banking indsutry. He has joined the Board of Directors of University Hall Alumni Limited since 2020." },
  { id: 'aa-Director-9', name: 'Mr. TSE Ho-yin, Alfred', title: 'Director — Alumni Association', bio: 'Section 2024-26', role: 'alumni-association', imageId: "aa-Director-9", imageSrc: "/People/Alfred_Tse.jpg", description:"Now working in The Hong Kong Jockey Club with a focus on strategic procurement." },
  { id: 'aa-Director-10', name: 'Dr. CHAN Nok-hang, Vincent', title: 'Director — Alumni Association', bio: 'Section 2024-26', role: 'alumni-association', imageId: "aa-Director-10", imageSrc: "/People/Vincent_Chan.jpg", description:"Vincent purused his bachelor and doctorate degrees while staying at Uhall. Apart from his role as a resident tutor, he is active in working with hallmats on the archives, bridge team, and Pokfulam Village Fire Dragon Dance and Crafting. As a property right economics reseacher and surveying professional, he always extend his wam welcome to hallmates to join his field trips focusing on the conservation of Hong Kong WWII Relics." },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote:
      'Waking up in these Gothic stone walls every morning is a small, daily reminder of how extraordinary a way of life we enjoy at Uhall.',
    author: 'Chung Sun Yeung Dagan',
    role: 'Castlers 25\'',
  },
  {
    id: 'testimonial-2',
    quote:
      'What struck me most was the genuine sense of belonging. From formal dinners to late-night study sessions, every moment contributed to my growth.',
    author: 'Adrian Lee',
    role: 'Class of 2022',
  },
  {
    id: 'testimonial-3',
    quote:
      'The mentorship from academic fellows and the scholarly atmosphere at University Hall shaped my academic trajectory and professional aspirations.',
    author: 'Dr. Natasha Ivanov',
    role: 'Class of 2019, now Lecturer at HKU',
  },
]

export const STATS: StatItem[] = [
  {
    label: 'Since',
    value: '1956',
    description: 'Serving residential scholars for over a century',
  },
  {
    label: 'Residents',
    value: '108',
    description: 'Diverse community from multiple disciplines',
  },
  {
    label: 'Fellows',
    value: '4',
    description: 'Dedicated mentors and academic advisors',
  },
  {
    label: 'Alumni',
    value: '600+',
    description: 'Global network of distinguished graduates',
  },
]

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Events & Traditions', href: '/events' },
  { label: 'Life', href: '/life' },
  { label: 'People', href: '/people' },
  { label: 'Alumni', href: '/alumni' },
  { label: 'Apply', href: '/apply' },
]

export const HALL_TEAMS: HallTeam[] = [


  // New Ball
  {
    id: 'new-ball-Hockey',
    name: 'Hockey Team',
    description:
      'Join our hall; join our team. We will tell you how brotherhood can be shaped by (hockey) sticks.',
    category: 'New Ball',
    imageId: 'recreation',
    images: ['/Life/Uhall_Hockey_1.jpeg', '/Life/Uhall_Hockey_2.jpeg'],
  },
  {
    id: 'new-ball-Lacrosse',
    name: 'Lacrosse Team',
    description:
      'Lacrosse Grind Begins Today! Lacrosse team is where boys become men and brotherhood is built. Join us to experience the thrill of this prestigious sport!',
    category: 'New Ball',
    imageId: 'Uhall_Lacrosse',
    imageSrc: '/Life/Uhall_Lacrosse.jpeg',
  },
  {
    id: 'new-ball-Softball',
    name: 'Softball Team',
    description:
      'Looking for a fast-paced, intense, and unforgettable sport? Look no further than the University Hall Softball team! Join us for a strong and inclusive sport team, holistic enrichment.🥎',
    category: 'New Ball',
    imageId: 'Uhall_Softball',
    images: ['/Life/Uhall_Softball_1.jpg','/Life/Uhall_Softball_2.jpg', '/Life/Uhall_Softball_3.jpg',  '/Life/Uhall_Softball_4.jpeg'],
  },
  // Old Ball
  {
    id: 'old-ball-basketball',
    name: 'Basketball Team ',
    description:
        'We\'re a serious squad — high standards, real competition — led by a Turkish captain bringing EuroLeague culture to the court. Come find us if you want to be part of it. 🏀',
    category: 'Old Ball',
    imageId: 'recreation',
    imageSrc: '/Life/Uhall_Basketball.jpeg',
  },
  {
    id: 'old-ball-football',
    name: 'Football Team',
    description:
        'As the University Hall Football Team, we are committed to teamwork, discipline, and sportsmanship. We aim to represent University Hall with pride, strengthen our bond through football, and create a competitive and supportive environment where every player can improve and contribute.',
    category: 'Old Ball',
    imageId: 'recreation',
    imageSrc: '/Life/Uhall_Football.jpeg',
  },

  // Culture
  {
    id: 'culture-Bridge',
    name: 'Bridge Team',
    description:
      'Join the U Hall bridge team,\n' +
        '\n' +
        'where logic meets strategy;\n' +
        '\n' +
        'where tactic meets teamwork;\n' +
        '\n' +
        'where sharp minds collaborate.\n' +
        '\n' +
        'Bring your curiosity, sharpen your skills, and be part of our team that turns every contract into a successful bid!',
    category: 'Culture',
    imageId: 'common_rooms',
    imageSrc: '/Life/Uhall_Bridge.jpeg',
  },
  {
    id: 'culture-band',
    name: 'Band Team',
    description:
      'Bringing together music lovers with passion, energy, and Hall spirit, UHall Band Team turns late-night jams, Halloween Live Band, and Joint Hall Music Performance into some of the most unforgettable memories in Hall. Join us!',
    category: 'Culture',
    imageId: 'dining_hall',
    imageSrc: '/Life/Uhall_Band.jpeg',
  },
  {
    id: 'culture-dance',
    name: 'Dance Team',
    description:
      'Step into the spotlight with the University Hall Dance Team! Beyond spectacular performances and rhythm, we are a tight-knit family. Join our diverse crew to train hard, grow, and shine together!✨',
    category: 'Culture',
    imageId: 'common_rooms',
    imageSrc: '/Life/Uhall_Dance.jpeg',
  },
  {
    id: 'seasonal-dragon-boat',
    name: 'Dragon Boat',
    description:
      'Take part in the dragon boat team to experience this unique local sport. Win interhall champions with your brothers amidst oceanic splashes and sweats of passion!',
    category: 'Seasonal',
    imageId: 'library',
    imageSrc: '/Life/Uhall_DragonBoat.jpeg',
  },
]

export const AFFILIATED_MEMBERSHIP = {
  title: 'Affiliated Membership',
  description:
    'Affiliated Membership offers a pathway for students in HKU who are not currently living in University Hall to maintain a meaningful connection with the Hall community.',
  details: [
    'Successful applicants through the system only',
    'Non-residential members of University Hall',
    'Allow students in HKU who are not living in University Hall currently to remain a connection with the Hall community',
    'Approved by the Hall to participate in selected aspects of hall life, including access to designated hall facilities and participation in hall activities, events and team practices, subject to hall rules, hall operation, and the Hall\'s final discretion',
    'Does not confer residential status and does not entitle the member to accommodation in the Hall, except where overnight stay is separately applied for and approved',
  ],
  imageId: 'affiliated_membership',
  howToApply: {
    download: {
      label: 'Download Application Form',
      description: 'Download the Affiliated Membership application form in PDF format. Fill in all required fields carefully.',
      href: '/forms/affiliated-membership-application.pdf',
    },
    submitMethod: [
      'Submit the completed application form via email to uhall@connect.hku.hk',
      'Alternatively, submit the hard copy to the Hall Office during office hours',
      'Applications are reviewed by the Hall Management Committee',
      'Successful applicants will be notified via email within 2–3 weeks',
    ],
  },
}

export const MENTORSHIP_PROGRAMS: MentorshipProgram[] = [
  {
    id: 'hku-mentorship',
    title: 'HKU Mentorship Programme',
    description:
      'Every hallmate living in University Hall may benefit from the HKU Alumni Programme. Hallmates are grouped to pair with an alumni mentor based on their interests, career goals, and academic backgrounds, ensuring relevant guidance and support. Events and activities are organised to encourage networking among students, mentors, and alumni, expanding professional connections.',
    details: [
      'Open to all University Hall residents',
      'Group pairing with alumni mentors based on interests, career goals, and academic background',
      'Relevant guidance and support tailored to individual aspirations',
      'Networking events connecting students, mentors, and alumni',
      'Expand professional connections and career prospects',
    ],
  },
  {
    id: 'quo-vadis',
    title: 'Quo Vadis — Student Alumni Project',
    images: ['/Alumni/Quo_Vadis_1.jpeg','/Alumni/Quo_Vadis_2.jpg', "/Alumni/Quo_Vadis_3.JPG"],
    description:
      'University Hall highly cherishes the value of university education for our deepened knowledge and broadened horizons. Therefore, in early 2024, a group of UHall-lites edified in hall education, joining forces with aspiring talents from school, prepared this student mentorship programme, \'Quo Vadis\', an HKU Student Alumni Projects for Youths from Multi-ethnic Groups in the Pokfulam Community. It aims to establish connections between HKU and the Pokfulam Community. Our mentors run monthly workshops, forums and outings, such that participants can widen their outlook to co-curricular learning from multiple perspectives. Through heartfelt exchanges throughout the year, we also anticipate stronger ties between mentees and mentors who would stand by them as they progress. In 2025, the project extends into Yuen Long District, further benefiting more secondary students.',
    details: [
      'Student-led mentorship project for youths from multi-ethnic groups',
      'Monthly workshops, forums, and outings for co-curricular learning',
      'Establishes connections between HKU and the Pokfulam Community',
      'Heartfelt exchanges fostering strong mentor-mentee bonds',
      'Expanded to Yuen Long District in 2025 to benefit more secondary students',
    ],
  },
]

export const ASSOCIATIONS: Association[] = [
  {
    id: 'student-association',
    name: "University Hall Students' Association",
    description:
      'The UHSA is the representative body for all residents of University Hall, dedicated to enhancing residential life through social, cultural, and recreational activities. It serves as the primary channel for student voices and fosters a vibrant, inclusive community.',
    mission:
      'To enrich the residential experience of every University Hall resident by organising events, representing student interests, and building a cohesive community grounded in the hall\'s traditions of excellence and mutual respect.',
    activities: [
      'Organising hall-wide social events including High Table dinners, festivals, and gatherings',
      'Representing resident interests in hall governance and university committees',
      'Managing interest clubs and sports teams for intra- and inter-hall competitions',
      'Publishing hall newsletters and maintaining communal spaces',
    ],
    contactEmail: 'uhall@connect.hku.hk',
  },
  {
    id: 'alumni-association',
    name: 'University Hall Alumni Association',
    description:
      'The UHAA connects the global community of University Hall graduates, fostering lifelong bonds and supporting the hall\'s mission through mentorship, philanthropy, and alumni engagement programmes.',
    mission:
      'To sustain and strengthen the lifelong connection between University Hall and its alumni, supporting the hall\'s legacy of excellence through active engagement, mentorship of current residents, and contributions to the hall\'s continued development.',
    activities: [
      'Organising alumni reunions, networking events, and homecoming celebrations',
      'Providing career mentorship and internship opportunities for current residents',
      'Supporting hall scholarships and development projects',
      'Maintaining alumni directories and communications',
      'Preserving and celebrating University Hall heritage and traditions',
    ],
    website: 'https://www.uhall.com.hk/',
  },
]

export const PHILOSOPHY_PILLARS = [
  {
    title: 'Brotherhood',
    description:
      '',
  },
  {
    title: 'Unity',
    description:
      '',
  },
  {
    title: 'Strive for Excellence',
    description:
      '',
  },
  {
    title: 'Shoulder Responsibility, Give Back to Hall',
    description:
      '',
  },
]

export const FAQ_ITEMS = [
  {
    question: 'How many people share a room? How big are the rooms at University Hall?',
    answer:
      'We have rooms for 2 to 4 people, and they\'re super spacious. Most freshman rooms are between 320–440 square feet—the largest on campus!',
  },
  {
    question: 'Can senior-entry students apply for University Hall?',
    answer:
      'Definitely! Everyone is welcome to apply, and we actually have a lot of senior-entry students living in the Hall.',
  },
  {
    question: 'Is it hard to get in? Do people fight for a spot?',
    answer:
        ' Yeah, spots are pretty limited, so if you\'re interested, don\'t wait—apply early and grab your chance!',
  },
  {
    question: 'Since it\'s a male-only hall, will I not be able to meet girls? Will it be boring?',
    answer:
      'Not at all. We have tons of activities—joint floors, Halloween parties, and even formal balls. Plus, our castle is one of the prettiest spots, so bringing friends (or your crush) to visit is a guaranteed win. Visitors are always welcome too!',
  },
  {
    question: 'Can I stay all four years?',
    answer:
      'Yes! You can order delivery at all times. However, we do have a full catering service with breakfast, lunch, and dinner, served in our Dining Hall (which was literally a chapel before). Expect a rotating menu of HK classics and comfort food.',
  },
  {
    question: 'Do I need to live far away to apply?',
    answer:
      'Distance is a factor, but we care way more about who you are and how you show up in the interview. So even if you\'re nearby, you 100% can apply.',
  },
  {
    question: 'How long does it take to get to Main Campus?',
    answer:
      'Super quick. Around 5 minutes by taxi or car, and about 10 minutes by bus.',
  },
  {
    question: 'What\'s there to eat nearby?\n',
    answer:
        'We already have meals sorted, but if you want to head out, Chi Fu Plaza is nearby with a food court, restaurants, fast food, a supermarket, and more. And Pokfulam Village (our neighbour) has old-school local stores and tea shops if you want something more chill and nostalgic.',
  },
]

export interface HallTreasure {
  id: string
  name: string
  description: string
  imageId: string
  imageSrc?: string
}

export const HALL_TREASURES: HallTreasure[] = [
  {
    id: 'golden-spiral-staircase',
    name: 'Golden Spiral Staircase',
    description:
      'The beautiful and decorative cast iron spiral staircase at the corner of the chapel connects the three floors and facilitates speedy commute.',
    imageId: 'golden_staircase',
    imageSrc: '/Facilities/Golden_Spiral_Staircase.jpg',
  },
  {
    id: 'davids-deers',
    name: "David's Deers",
    description:
      'Positioned at the main entrance stairs, two adults, and one child. Students touching the deers before their graduation risk being cursed to never graduate.',
    imageId: 'davids_deers',
    imageSrc: '/Facilities/Davids_Deer.jpg',
  },
  {
    id: 'sam-so',
    name: 'Sam So',
    description:
      'A cherished figure of University Hall, Ms Yuen So Moy ("Sam So") served as a cook and motherly presence for generations. Her symbolic "Hall Blood" ritual continues to bless Castlers through life\'s milestones.',
    imageId: 'sam_so',
  },
]

export interface AlumniVisit {
  id: string
  title: string
  description: string
  images: string[]
}

export const ALUMNI_VISITS: AlumniVisit[] = [
  {
    id: 'wedding-photo',
    title: 'Wedding Photo Shooting',
    description:
      'University Hall\'s historic castle facade, Gothic architecture, and lush gardens provide a breathtaking backdrop for wedding photography. Alumni couples are welcome to return to the hall to capture their special moments amidst the heritage setting where their own stories began.',
    images: [
      '/Alumni/Uhall_Wedding_1.jpeg',
      '/Alumni/Uhall_Wedding_2.jpeg',
      '/Alumni/Uhall_Wedding_3.jpeg',
      '/Alumni/Uhall_Wedding_4.jpeg',
      '/Alumni/Uhall_wedding_5.jpeg',
      '/Alumni/Uhall_wedding_6.jpeg',
    ],
  },
  {
    id: 'family-visit',
    title: 'Family Visit',
    description:
      'Revisit the hall with your family and share the memories of your alma mater with your loved ones. Walk through the corridors, the dining hall, and the grounds — showing your family where you lived, studied, and built lifelong friendships.',
    images: [],
  },
]

export const SOCIAL_LINKS = [
  { platform: 'Instagram', url: 'https://www.instagram.com/universityhall_hku/', icon: 'instagram' },
  { platform: 'Facebook', url: 'https://www.facebook.com/uhall.hku/#', icon: 'facebook' },
  { platform: "Youtube", url: 'https://www.youtube.com/@universityhallhku2902/videos', icon: 'youtube' },
]

export const OFFICE_INFO = {
  address: '144 Pokfulam Road, Hong Kong',
  phone: '+852 2595 0966',
  fax: '+852 2550 6341',
  email: 'uhall@connect.hku.hk',
  hours: {
    weekday: '9:00 AM - 5:00 PM'
  },
}
