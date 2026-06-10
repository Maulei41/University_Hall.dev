import { withImg } from '@/utils/paths'
import { TimelineEvent, Facility, HallTradition, HallEvent, HallTeam, Person, Testimonial, StatItem, MentorshipProgram, Association } from '../types/index'

const _TIMELINE_EVENTS_DATA: TimelineEvent[] = [
  {
    year: '1860s',
    title: 'From Douglas Castle...',
    description: 'The story of University Hall began in the nineteenth century with Douglas Lapraik, a Scottish merchant who arrived in Hong Kong during the city\'s early years of development. Through his work in shipping, property, and dock operations, Lapraik became one of the most successful businessmen of his time. In the early 1860s, he acquired the hillside site overlooking Pokfulam and built Douglas Castle as his private residence.\n' +
        '\n' +
        'Completed around 1864, the house was designed to command sweeping views of the sea and surrounding landscape. Although Lapraik spent little time there before retiring to Britain, the castle became the foundation of what would later become University Hall.',
    imageId: 'dining_hall',
    imageSrc: "/assets/History/Uhall_Douglas_Castle.jpg"
  },
  {
    year: 1894,
    title: '...to Nazareth House...',
    description: 'After Lapraik\'s death, the property eventually passed into new hands during a period of significant social and historical change. In 1894, amid the bubonic plague outbreak in Hong Kong, the French Mission purchased Douglas Castle and transformed it into Nazareth House. The building was expanded to include a chapel and a printing house, while parts of the original castle were retained within the new complex.\n' +
        '\n' +
        'For decades, Nazareth served as a retreat and working centre for missionaries across Asia. Its printing press became one of the busiest of its kind in the region, producing religious publications in many languages.',
    imageId: 'common_rooms',
    imageSrc: '/assets/History/Uhall_Nazarath_House.jpg'
  },
  // {
  //   year: "early 1950s",
  //   title: 'Wartime Disruption and Change',
  //   description: 'The Second World War brought a period of disruption. During the Japanese occupation of Hong Kong, Nazareth was requisitioned and its operations were suspended. After the war, the French Mission resumed its work briefly, but the changing political climate in mainland China made missionary activity increasingly difficult.\n' +
  //       '\n' +
  //       'By the early 1950s, the mission could no longer sustain its original purpose, and the property was eventually put up for sale. This opened the door to a new chapter in the life of the building.'
  // },
  {
    year: '1954-',
    title: '... to University Hall',
    description: 'In 1954, the University of Hong Kong acquired the site and gave it a new life as a student residence. This transition marked the beginning of University hall as it is known today. Rather than replacing the old building entirely, the University chose to adapt it. The chapel was converted into a dining hall, the crypt became a common room, and the existing structure was furnished for student accommodation.\n' +
        '\n' +
        'When the first group of students moved in in 1956, University Hall began its journey as a residential community rooted in heritage. From the outset, the Hall developed a strong identity of its own. It was not simply a dormitory, but a close-knit community where students lived, learned, and grew together.',
    imageId: 'dining_hall',
    imageSrc: '/assets/History/Uhall_Birth.jpg'
  },
  {
    year: 1995,
    title: 'Declared Monument',
    description: 'In recognition of its architectural and historical importance, University Hall was declared a historical monument in 1995. This designation affirmed its significance not only as a former colonial and missionary building, but also as a living residence that continues to serve students today.\n' +
        '\n' +
        'The Hall stands as a rare example of a heritage site that remains active and meaningful in modern university life. Its legacy is reflected not only in its preserved architecture, but also in the spirit of its community.',
    imageId: 'library',
    imageSrc: '/assets/History/Uhall_Heritage_Recognition.jpg'
  },
  {
    year: "Today",
    title: 'Present day',
    description: 'Today, University Hall continues to house more than 100 male students and remains one of the most distinctive residential halls at HKU. Our Hall continues to embody a balance of tradition and transformation, offering students a place where the past is not forgotten, but lived alongside the present.\n' +
        '\n' +
        'From Douglas Castle to Nazareth House to University Hall, the building has changed names and functions, but its story has always been one of endurance. For those who call it home, University Hall remains a place where history is not only remembered, but carried forward.',
    imageId: 'common_rooms',
    imageSrc: "/assets/History/Uhall_Today.jpeg"
  },
]


const _FACILITIES_DATA: Facility[] = [
  {
    id: 'dining-hall',
    category: 'Dining',
    title: 'Dining Hall',
    description:
      'Originally a chapel, our Dining Hall is where hallmates gather for daily meals, high table dinners, and major hall occasions, bringing people together in a space rich with history.',
    imageId: 'dining_hall',
    imageSrc: '/assets/Facilities/Dining_Hall_1.jpeg',
    images: ['/assets/Facilities/Dining_Hall_1.jpeg', '/assets/Facilities/Dining_Hall_2.jpg'],
    features: '',
  },
  {
    id: 'library',
    category: 'Common Area',
    title: 'Hall Library',
    description:
      'A quiet haven for bookworms and late-night readers, the Hall Library offers a comfortable place to study, focus, and enjoy the rare bonus of free air conditioning.',
    imageId: 'library',
    imageSrc: '/assets/Facilities/Hall_Library_1.jpeg',
    features: 'PlaceHolder',
  },
  {
    id: 'gym-room',
    category: 'Common Area',
    title: 'Gym Room',
    description:
      'The Gym Room is where hallmates come to train, sweat, and quietly work toward their own transformation, whether for fitness, sports, or a \"secret evolution.\"',
    imageId: 'recreation',
    imageSrc: '/assets/Facilities/Gym_1.jpeg',
    images: ['/assets/Facilities/Gym_1.jpeg', '/assets/Facilities/Gym_2.jpeg', '/assets/Facilities/Gym_3.jpeg', '/assets/Facilities/Gym_4.jpeg', '/assets/Facilities/Gym_5.jpeg', '/assets/Facilities/Gym_6.jpeg', '/assets/Facilities/Gym_7.jpeg'],
    features: 'PlaceHolder',
  },
  {
    id: 'common-room',
    category: 'Common Area',
    title: 'Common Room',
    description:
      'Equipped with gaming consoles and broad game, the Common Room is a relaxed hangout spot where hallmates gather to unwind, play, and enjoy each other\'s company.',
    imageId: 'accommodation',
    imageSrc: '/assets/Facilities/Common_Room_1.jpeg',
    images: ['/assets/Facilities/Common_Room_1.jpeg', '/assets/Facilities/Common_Room_2.jpg'],
    features: 'PlaceHolder',
  },
  {
    id: 'newspaper-rooms',
    category: 'Common Area',
    title: 'Newspaper Room',
    description:
      'With a piano and vending machines, the Newspaper Room is a cosy corner for casual relaxation, though it also has a reputation as a place where mosquitoes love to gather.',
    imageId: 'common_rooms',
    imageSrc: '/assets/Facilities/Nawspaper_Room.jpeg',
    features: 'PlaceHolder',
  },
  // {
  //   id: 'vending-machine',
  //   category: 'Amenities',
  //   title: 'Vending Machines',
  //   description:
  //     '',
  //   imageId: 'community_center',
  //   features: [
  //     'PlaceHolder',
  //   ],
  // },
  {
    id: 'laundry_room',
    category: 'Amenities',
    title: 'Laundry Room',
    description:
        'The Laundry Room gives hallmates a convenient place to wash, dry, and care for their clothes amid their busy schedules. Make sure to take out the clothes from the machine on time, or else it will be taken by other furious individuals.',
    imageId: 'community_center',
    imageSrc: '/assets/Facilities/laundry_room.jpg',
    features: 'PlaceHolder',
  },
  {
    id: 'Pantry',
    category: 'Amenities',
    title: 'Pantry',
    description:
        'The Pantry provides a shared space for hallmates to cook their meals, making it a practical and familiar stop for late-night refuels and everyday use. Please clean it after use!!!',
    imageId: 'community_center',
    imageSrc: '/assets/Facilities/pantry.jpg',
    features: 'PlaceHolder',
  },
  {
    id: 'Music_room',
    category: 'Common Area',
    title: 'Music Room',
    description:
        'Designed for creativity and sound, the Music Room is where the band team practices and hallmates bring music to life through rehearsal, rhythm, and collaboration.',
    imageId: 'community_center',
    imageSrc: '/assets/Facilities/Band_Room.jpeg',
    features: 'PlaceHolder',
  },
  // {
  //   id: 'Farmhouse',
  //   category: 'Outdoor Area',
  //   title: 'Farmhouse',
  //   description:
  //       'The Farmhouse is our very own  basketball court and a favourite spot for training and casual play, giving hallmates space to stay active and sharpen their game.',
  //   imageId: 'community_center',
  //   // imageSrc: '/Facilities/pantry.jpg',
  //   features: 'PlaceHolder',
  // },
]


const _EVENTS_DATA: HallEvent[] = [
  {
    id: 'Halloween',
    title: 'Halloween Haunted House',
    description:
      'The Castle of University Hall gives people a chilly and spooky feeling, especially late in the middle of the night. It is thus a perfect place to hold the Halloween Party.',
    category: 'Cultural',
    location: 'University Hall',
    imageId: 'dining_hall',
    imageSrc: '/assets/EventTradition/Halloween_1.jpeg',
    images: ['/assets/EventTradition/Halloween_1.jpeg', '/assets/EventTradition/Halloween_2.jpeg'],
    featured: true,
  },
  {
    id: 'mid-autumn-festival',
    title: 'Pok Fu Lam Village Fire Dragon Dance',
    description:
      'The Pok Fu Lam Village Fire Dragon Dance is a cherished Mid-Autumn Festival tradition, where a fiery dragon weaves through the streets to bring good luck and ward off evil spirits. Castlers join the local community in this vibrant celebration, carrying the dragon through the village under a sky lit by lanterns and moonlight.',
    category: 'Cultural',
    location: 'Pok Fu Lam Village',
    imageId: 'fire_dragon',
    imageSrc: '/assets/EventTradition/Fire_Dragon_4.jpeg',
    images: [
      '/assets/EventTradition/Fire_Dragon_4.jpeg',
      '/assets/EventTradition/Fire_Dragon_2.jpeg',
      '/assets/EventTradition/Fire_Dragon_3.jpeg',
      '/assets/EventTradition/Fire_Dragon_1.jpeg',
    ],
    videoSrc: '/assets/EventTradition/Fire_Dragon_1.mp4',
    featured: true,
  },
  // {
  //   id: 'BigRun',
  //   title: 'Big Run',
  //   description:
  //     'Big Run is held twice a month and brings Castlers together for a short run under the night sky. More than a regular workout, it is a shared experience that challenges endurance, clears the mind, and creates a strong sense of unity among hallmates. \n \n As students run side by side, BigRun becomes a space for encouragement, conversation, and camaraderie. Whether for fitness, friendship, or the simple joy of running together, BigRun is a tradition that continues to bring the Hall closer together.',
  //   category: 'Recreation',
  //   location: 'Hong Kong Island',
  //   imageId: 'big_run',
  //   featured: true,
  // },
  {
    id: 'superpass',
    title: 'Superpass Party',
    description:
      'The Superpass Dinner is more of a HKU tradition. Before the dinner, Warden gives hallmates Superpass \"lai sees\" (red packets, the lucky money). Castlers write Superpass \"fai chuns\" (red scrolls) to wish themselves and the others every success in the examinations before the dinner starts.',
    category: 'Social',
    location: 'University Hall',
    images: ['/assets/EventTradition/SuperPass_1.jpg', '/assets/EventTradition/SuperPass_2.jpg', '/assets/EventTradition/SuperPass_3.jpg'],
    imageId: 'dining_hall',
  },
  {
    id: 'inter-hall',
    title: 'Inter-Hall Competition / Performance',
    description:
      'Interhall competitions and performances are where University Hall showcases its brotherhood, talent, and spirit, standing proud in front of other halls through teamwork and dedication.',
    category: 'Inter-Hall',
    location: 'Stanley Ho Sport Centre / Ho Tim Hall / Sun Yat-Sen Place',
    imageId: 'recreation',
    images: ['/assets/Life/Uhall_Softball_1.jpg', '/assets/Life/Uhall_Hockey_1.jpeg', "/assets/Life/Uhall_Dance_2.jpeg"]
  },
  {
    id: 'island-bike',
    title: 'Island Bike Ride',
    description:
      'Island Bike Ride is held on a late January night, where brothers come together for a memorable ride around Hong Kong Island. Along the way, they pass scenic landmarks such as Repulse Bay and Tai Tam Reservoir, and ride beside the historic tram tracks, making the journey as special as the destination. \n \n More than just a cycling event, Island Bike Ride is a night of shared adventure, endurance, and brotherhood. After hours on the road, the ride ends in Kennedy Town with a well-earned "jocha", yumcha in the morning , bringing the night to a perfect close with good food, laughter, and lasting memories.',
    category: 'Recreation',
    location: 'Hong Kong Island',
    imageId: 'common_rooms',
    imageSrc:"/assets/EventTradition/Island_Bike_Ride.jpeg"
  }
]


const _TRADITIONS_DATA: HallTradition[] = [
  {
    id: 'high-table-dinner',
    title: 'High Table Dinner',
    description:
      'It is a longstanding tradition of residential halls of the University of Hong Kong to have High Table Dinner. It is a time to learn; students can broaden their horizons through the talk delivered by our Guest of Honour after the dinner, and is therefore one of the most important events in University Hall for the enrichment of hall education.',
    category: 'Social',
    frequency: 'Monthly',
    imageId: 'dining_hall',
    imageSrc: '/assets/EventTradition/High_Table_1.jpeg',
    images: ['/assets/EventTradition/High_Table_1.jpeg', '/assets/EventTradition/High_Table_2.jpeg', '/assets/EventTradition/High_Table_3.jpeg'],
    featured: true,
  },
  {
    id: 'founders-nite',
    title: 'Founders\' Nite',
    description:
      'In this event, greenhorns drink their first cup of hall blood, whereafter they officially become Castlers. Also, before they take the hall blood, they have to set an aim for themselves, which they will pursue throughout their university life.',
    category: 'Social',
    frequency: 'Annual',
    imageId: 'dining_hall',
    imageSrc: '/assets/EventTradition/Founders_Nite.jpeg',
    featured: true,
  },
  // {
  //   id: 'castlers-nite',
  //   title: 'Castlers\' Nite',
  //   description:
  //     '',
  //   category: 'Social',
  //   frequency: 'annual',
  //   imageId: 'dining_hall',
  //   // imageSrc: '/assets/EventTradition/Castlers_Nite.jpeg',
  //   featured: true,
  // },
  {
    id: 'nazarene-nite',
    title: 'Nazarene Nite',
    category: 'Social',
    description:
      'The Nazarene Night is a moment of celebration and memories. Fresh graduates will come back to the Castle to take their second cup of Hall blood, and they will share with the current Castlers their memories in University Hall. In addition, awards would be presented to acknowledge the achievements of outstanding Castlers in the past year.',
    frequency: 'Annual',
    imageId: 'dining_hall',
    imageSrc: '/assets/EventTradition/Nazarene_Nite.jpeg',
    featured: true,
  },
  {
    id: 'baisun',
    title: 'Bai Sun',
    description:
      'Bai Sun (also worshipping) is an annual ritual of University Hall and it follows the Chinese tradition. We share some roasted suckling pig from the ceremony and hope for good fortune, health and peace for the coming year.',
    category: 'Community',
    imageSrc: '/assets/EventTradition/BaiSun.jpg',
    frequency: 'Annual',
    imageId: 'dining_hall',
  },
  {
    id: 'reunion-dinner',
    title: 'Reunion Dinner',
    description:
      'Every year on this night, graduated hallmates, old or young, come back and have a dinner with current hallmates.',
    category: 'Community',
    frequency: 'Annual',
    imageSrc:"/assets/EventTradition/ReUnion_Dinner.jpg",
    imageId: 'dining_hall',
  }
]


const _PEOPLE_DATA: Person[] = [
  {
    id: 'warden',
    name: 'Mr. Beau Linton LEFLER',
    title: 'Warden',
    bio: 'Principal Lecturer, HKU Business School',
    role: 'Warden',
    imageId: 'person_warden',
    imageSrc: '/assets/People/Warden.webp',
    description: 'Beau is a former corporate lawyer. He teaches a variety of law, ethics, and governance related courses at all levels from undergraduate to executive education. He\'s passionate about building great institutions.',
    message: "Welcome to University Hall\n" +
        "For over 70 years, University Hall has been a cornerstone of HKU, with a global network of thousands of accomplished alumni. We are a community that proudly honors traditional Hong Kong culture while leading the way in creating a modern, inclusive, and vibrant residential life.\n" + "\n" +
        "Our unique strength lies in our size. Because we are a close-knit community, you won't just be a face in the crowd; you will know everyone here by name. Yet, despite our small numbers, U-Hall consistently punches above its weight, excelling in university affairs, holding amazing events, and showing surprising ability in our cultural and sports teams.\n" + "\n" +
        "Living here offers a truly once-in-a-lifetime experience: a historic castle surrounded by nature. But beyond the stunning architecture, U-Hall is a place for personal growth. This is where you will discover your capacity as a leader, push past your limits, and forge lifelong bonds of brotherhood."
  },
  {
    id: 'Senior-Resident-Tutor ',
    name: 'Mr. Sam LIU Shan 劉山',
    title: 'Senior Resident Tutor',
    bio: 'Lecturer, Faculty of Law, HKU',
    role: 'Tutorial Team',
    imageId: 'person_Sam',
    imageSrc: '/assets/People/Sam_Liu.jpeg',
    description:"Hi everyone! I’m Sam Liu. By day, I keep busy as a full-time Lecturer at HKU while still practicing part-time as a solicitor.  \n" +
        "\n" +
        "Since becoming your Senior Resident Tutor in February 2025, I’ve loved working with our fantastic management team and participating in our vibrant activities. I joined our Ying Sun last year and it was a wonderful experience—I hope you all love it just as much!  \n" +
        "\n" +
        "More than anything, I want to be a supportive friend to all hallmates. Whether you need guidance, want to talk about life, or just need a friendly chat, my door is always open. Please feel free to reach out anytime—let's make this a fantastic year together!"
  },
  {
    id: 'Resident-Tutor',
    name: 'Dr. Vincent CHAN Nok Hang 陳諾衡',
    title: 'Resident Tutor',
    bio: 'PhD (Neo-Institutional Economics) HKU, BSc (Surv) HKU, TechArborA (UK)',
    role: 'Tutorial Team',
    imageId: 'person_fellow_1',
    imageSrc: "/assets/People/Vincent_Chan.jpg",
    description:"Vincent is a surveying practitioner with a keen interest in research, particularly in neo-institutional economics. He teaches heritage conservation and land administration in Hong Kong, and is endlessly curious about local history, culture, and all kinds of knowledge. In his free time, he enjoys hiking, dragon boating, volleyball, running, reading and a good game of bridge."
  },
  {
    id: 'Tutor-1',
    name: 'Mr. Raymond CHAN Sai Wai 陳世煒',
    title: 'Junior Fellow',
    bio: 'BSc (Astronomy) HKU, PGDE (Physics) HKU, Registered Teacher',
    role: 'Tutorial Team',
    imageId: 'person_fellow_2',
    imageSrc: "/assets/People/Raymond_Chan.jpeg",
    description: "As a Junior Tutor, I bring my passion for science education and commitment to fostering student growth in our hall community. Having served as Sports Captain during my university years, I experienced firsthand how hall life is a transformative space for developing leadership abilities and learning to be a contributive community member. These experiences proved invaluable to my teaching career, shaping my understanding of holistic student development. I believe residential halls offer unique opportunities for personal growth beyond academics. I look forward to supporting our residents in their academic journeys while encouraging them to embrace the full spectrum of learning experiences that hall life provides"
  },
  {
    id: 'Tutor-2',
    name: 'Mr. Jason WONG Ching Hin 黃靖軒',
    title: 'Junior Fellow',
    bio: 'BSc(Physic) HKU',
    role: 'Tutorial Team',
    imageId: 'person_counselor',
    imageSrc: '/assets/People/Jason_Wong.jpeg',
  },
  {
    id: 'Tutor-3',
    name: 'Mr. Tom TAM Yan Chi 譚恩智',
    title: 'Non-residential Junior Fellow',
    bio: '',
    role: 'Tutorial Team',
    imageId: 'person_counselor',
    imageSrc: '/assets/People/Tom_Tam.jpeg',
  },
  {
    id: 'Tutor-4',
    name: 'Mr. Bowie TANG Yat Yin 鄧一言',
    title: 'Non-residential Junior Fellow',
    bio: '',
    role: 'Tutorial Team',
    imageId: 'person_counselor',
    imageSrc: '/assets/People/Bowie_Tang.jpeg',
    description: "Bowie read law and politics at HKU, during which he was External Vice-chairman of UHSA. He is passionate about social justice, civic education, and arts and culture. His mission as tutor is to nurture visionaries and revolutionaries."
  },
  {
    id: 'Tutor-5',
    name: 'Mr. Alex CHAN Hok Lam 陳學霖',
    title: 'Non-residential Junior Fellow',
    bio: '',
    role: 'Tutorial Team',
    imageId: 'person_counselor',
    imageSrc: '/assets/People/Alex_Chan.jpeg',
  },
  {
    id: 'Hall-Executive',
    name: 'Ms. Ivy CHAN Sze Man 陳詩敏',
    title: 'Hall Executive',
    bio: '',
    role: 'Hall Officer',
    imageId: 'person_admin',
    imageSrc: "/assets/People/Ivy_Chan.jpeg",
  },
  // Students' Association
  { id: 'sa-Chairman', name: 'Mr. WOO Chi To', chineseName: '胡智滔', title: 'Chairman', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-IV', name: 'Mr. CHANG Crispo Shun Man', chineseName: '鄭舜文', title: 'Internal Vice-Chairman', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-EV', name: 'Mr. TAM Tsz Ho', chineseName: '譚子皓', title: 'External Vice-Chairman', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-secretary', name: 'Mr. PATHAK Atharv', title: 'Honorary Secretary', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-treasurer', name: 'Mr. FU Chit Wa', chineseName: '符哲華', title: 'Honorary Treasurer', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-Financial', name: 'Mr. HO Ka Kit', chineseName:"何家傑", title: 'Financial Secretary', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-Welfare', name: 'Mr. LAM Max Yee Hong', chineseName: '林以康', title: 'Welfare Secretary ', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-Sports-Secretary', name: 'Mr. Kerem BILGIN', title: 'Sports Secretary ', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-Sports-Captain', name: 'Mr. Aktan RAKHAT', title: 'Sports Captain ', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-Cultural', name: 'Mr. ZOU Jiachen', chineseName: '邹佳辰', title: 'Cultural Secretary ', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-Social', name: 'Mr. Kemausuor Winambe TETTEH-KUMAH', title: 'Social Secretary ', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-Publication', name: 'Mr. CHAU Cheuk Hei', chineseName: '周倬希', title: 'Publication Secretary ', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-Publicity', name: 'Mr. Devanshu GUPTA', title: 'Publicity Secretary ', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-AA', name: 'Mr. HUYNH Duy Khoa', title: 'Alumni and Non-resident Affairs Secretary  ', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-CA', name: 'Mr. Yusuf KARIMLI', title: 'Current Affairs Secretary ', bio: 'Session 2026-27', role: 'student-association' },
  { id: 'sa-Past-Committee-Representative', name: 'Mr. YU Pak Hin', chineseName:"俞柏軒", title: 'Past Committee Representative ', bio: 'Session 2026-27', role: 'student-association' },

  // Alumni Association
  { id: 'aa-chair',
    name: 'Mr. SIT Loi-keung, Ken',
    title: 'Chairman',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId:"aa-chair",
    imageSrc: "/assets/People/Ken_Sit.jpg",
    description: "Ken SIT was a resident of University Hall from 1994 to 1997. He was the Honorary Secretary of University Hall Students Association in 1995-1996. He has joined University Hall Alumni Limited since 2018. He was the founder of Rich Beauty International Limited in 2006 and he was the President of Lions Club of Happy Valley 2023 to 2024. He is currently the President of Lions Clubs International Foundation (LCIF) and also the director of Lions Kidney Educational Centre and Research Foundation (LKEC)."
  },
  { id: 'aa-vice-chair-1',
    name: 'Mr. SHEK Ming-san',
    title: 'Vice Chairman',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-vice-chair-1",
    imageSrc: "/assets/People/Shek_Ming_San.jpg",
    description:"Samuel was a resident of University Hall from 2009 to 2012. He was the Internal Vice Chairman of University Hall Students Association in 2010-2011 and Chairman in 2011-2012. He graduated with a degree of Finance from The Faculty of Business and Economics of The University of Hong Kong in 2012. He also obtained a Law Degree from The University of London in 2015. \n Samuel is a senior manager in a manufacturing company. He has joined the Board of Directors of University Hall Alumni Limited since 2016. Samuel is a CFA charterholder."
  },
  { id: 'aa-Vice-chair-2',
    name: 'Mr. CHEUNG Che-tsuen, Desmond',
    title: 'Vice Chairman',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-vice-chair-2",
    imageSrc: "/assets/People/Desmond_Cheung.jpg",
    description:" Desmond is a regulatory lawyer at the Hong Kong Stock Exchange. Before that, he was a disputes/ regulatory lawyer at various international law firms, including DLA Piper Hong Kong. He used to be a dragon boat team captain for the Hong Kong Law Society. He is now a keen distance runner and football player."
  },
  { id: 'aa-Secretary',
    name: 'Mr. Ng Cheuk Sau Joseph',
    title: 'Honorary Secretary',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-Secretary",
    imageSrc: "/assets/People/Joseph_Ng.jpg",
    description:"Joseph read law and graduated in 2015. He completed the PCLL in 2016. He called the University Hall home for the 5 years in HKU. He was the Hockey Team Captain from 2012 to 2014. He also played alongside his brothers in various sports teams and cultural teams. We go with brothers, as they say."
  },
  { id: 'aa-Treasurer',
    name: 'Mr. SHIH Chi-san, Michael',
    title: 'Honorary Treasurer',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-Treasurer",
    imageSrc: "/assets/People/Michael_Shih.jpg",
    description:"Michael had admitted as Fellow of Society of Actuaries in 2010, now working in Prudential as insurance consultant. He has joined the Board of Director of UHAL since 2016."
  },
  { id: 'aa-Director-1',
    name: 'Dr. CHENG Shing-kwong, Eric',
    title: 'Director',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-Director-1",
    imageSrc: "/assets/People/Eric_Cheng.jpg",
    description:"Resided in UH 1975-1978, Eric is one of the first batch of HKU quantity surveyors. Qualified HKIS Surveyor since 1984. Helped build the HK Bank Headquarters Building at No. 1 QRC. Stayed in the academia for 37 years educating surveyors. Sidetracked to pest management including termite and bedbug research. Joined the plumbing and drainage industry and specialized in stainless steel pipe and construction contract administration. Currently a Pipe Company Director and a QS Manager in a plumbing contractor. Previously a Vice Chairman of the Hong Kong Institution of Plumbing and Drainage and a Senior Lecturer and assistant head with the City University of Hong Kong."
  },
  { id: 'aa-Director-2',
    name: 'Dr. Wai Heung-on, Jonathan',
    title: 'Director',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-Director-2",
    imageSrc: "/assets/People/Jonathan_Wai.jpg",
    description:"Jonathan resided in University Hall from 1975 to 1979. \"Boot-boot\" was a sports enthusiast in representing UH and Faculty of Medicine. He is currently the Medical Superintendent of Precious Blood Hospital(Caritas); holding several professorships in teaching medical students in HKU and CUHK. He has engaged in various voluntary works and lately retired as Deputy Commissioner of the Auxiliary Medical Service of HKSAR in 2023."
  },
  { id: 'aa-Director-3',
    name: 'Dr. Danny Tsoi',
    title: 'Director',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-Director-3",
    imageSrc: "/assets/People/Danny_Tsoi.jpg",
    description:"As a U hallite from 1978 to 1983, Danny was tennis and soccer team captain during his residency in U hall. He graduated with a MBBS degree in 1983 and became a specialist in Orthopaedics and Traumatology since 1993. Currently he is in private practice as Orthopaedic Surgeon. Throughout the past 40 years Danny was actively involved in many U hall alumni events especially in golf tournaments."
  },
  { id: 'aa-Director-4',
    name: 'Mr. Vincent Tang',
    title: 'Director',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-Director-4",
    imageSrc: "/assets/People/Vincent_Tang.jpg",
    description:"Vincent was a resident of University Hall in1981 to 1985 and he practised law after graduation. He is the founder and senier partner of Tang and Lee, Solicitors.Vincent is a good singer and an excellent debater. He used to be a director of UHAL in the 90's and is excited to serve the brothers again."
  },
  { id: 'aa-Director-5',
    name: 'Dr. WONG Lap-ching',
    title: 'Director',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-Director-5",
    imageSrc: "/assets/People/Wong_Lap_ching.jpg",
    description:"Dr. Wong is a specialist of Ear, Nose & Throat in private practice and a keen golfer."
  },
  { id: 'aa-Director-6',
    name: 'Mr. Tristan Lau',
    title: 'Director',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-Director-6",
    imageSrc: "/assets/People/Tristan_Lau.jpg",
    description:"Tristan resided at University Hall from 1994 to 1998. During the 1995-1996 academic year, he served as the Internal Vice Chairman of the University Hall Students Association. He graduated in 1998 with a degree in Engineering from the Faculty of Electrical and Electronic Engineering at The University of Hong Kong. A sports enthusiast, he captained and excelled as the best player on the soccer, tennis, and table tennis teams, earning the Llewellyn\'s Cup in both 1996 and 1997.\n" +
        "\n" +
        "Currently, Tristan is the Head of Electronic Trading Services for the APAC region at an investment bank. He is also involved in various voluntary activities and mentorship programs organized by HKU, JA HK and his organisation."
  },
  { id: 'aa-Director-7',
    name: 'Mr. CHEN Songyong, Jack',
    title: 'Director',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-Director-7",
    imageSrc: "/assets/People/Jack_Chen.jpg",
    description:"Now VP at a top tier investment bank as a tech lead. He is also a co-host of Codeaholics (the largest community of local software engineers) and a volunteer IT Manager at InspiringHK Sports Foundation"
  },
  { id: 'aa-Director-8',
    name: 'Mr. YUNG Albert',
    title: 'Director',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-Director-8",
    imageSrc: "/assets/People/Albert_Yung.jpg",
    description:"Albert was a resident of University Hall from 2008 to 2011. He was the Internal Vice Chairman of University Hall Students Association in 2009-2010 and Chairman in 2010-2011. He graduated in 2011 with a BA . He has been working in the banking indsutry. He has joined the Board of Directors of University Hall Alumni Limited since 2020."
  },
  { id: 'aa-Director-9',
    name: 'Mr. TSE Ho-yin, Alfred',
    title: 'Director',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-Director-9",
    imageSrc: "/assets/People/Alfred_Tse.jpg",
    description:"Now working in The Hong Kong Jockey Club with a focus on strategic procurement."
  },
  { id: 'aa-Director-10',
    name: 'Dr. CHAN Nok-hang, Vincent',
    title: 'Director',
    bio: 'Session 2024-26',
    role: 'alumni-limited',
    imageId: "aa-Director-10",
    imageSrc: "/assets/People/Vincent_Chan.jpg",
    description:"Vincent purused his bachelor and doctorate degrees while staying at University Hall. Apart from his role as a resident tutor, he is active in working with hallmats on the archives, bridge team, and Pokfulam Village Fire Dragon Dance and Crafting. As a property right economics reseacher and surveying professional, he always extend his wam welcome to hallmates to join his field trips focusing on the conservation of Hong Kong WWII Relics." },
]


export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote:
      'Waking up in these Gothic stone walls every morning is a small, daily reminder of how extraordinary a way of life we enjoy at University Hall.',
    author: 'Chung Sun Yeung Dagan',
    role: 'Castlers 25\'',
  },
  {
    id: 'testimonial-2',
    quote:
      'As an international student from Azerbaijan, University Hall has helped me build true bonds with both local and non-local students, creating a unique community where Cantonese and international cultures come together naturally.',
    author: 'Yusuf Karimli',
    role: 'Castlers 25\'',
  },
  // {
  //   id: 'testimonial-3',
  //   quote:
  //     'Living in a declared monument is surreal. Every corridor holds history, and you feel it the moment you walk through the main entrance. University Hall is not just a place to sleep \- it is a home with a soul.',
  //   author: 'Placeholder',
  //   role: 'Castlers 25\'',
  // },
  // {
  //   id: 'testimonial-4',
  //   quote:
  //     'The High Table Dinners, the football nights under the lights, the study sessions in the library \- these are the things I will carry with me long after graduation. University Hall gave me family away from home.',
  //   author: 'Placeholder',
  //   role: 'Castlers 23\'',
  // },
  // {
  //   id: 'testimonial-5',
  //   quote:
  //     'What makes University Hall special is the people. You show up as a stranger and leave as a brother. The mentorship from senior residents and fellows shaped my character more than any lecture ever did.',
  //   author: 'Placeholder',
  //   role: 'Castlers 26\'',
  // },
  // {
  //   id: 'testimonial-6',
  //   quote:
  //     'From the Halloween haunted house to the Island Bike Ride, every event brings us closer. The spirit of "One Hall, One Family" is real here \- it is not just a motto, it is how we live.',
  //   author: 'Placeholder',
  //   role: 'Castlers 24\'',
  // },
]


export const STATS: StatItem[] = [
  {
    label: 'Since',
    value: '1956',
    description: 'Serving residential scholars for 70 Years',
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
  { label: 'FAQ', href: '/faq' },
  { label: 'Apply', href: '/apply' },
]


const _HALL_TEAMS_DATA: HallTeam[] = [


  // New Ball
  {
    id: 'new-ball-Hockey',
    name: 'Hockey Team',
    description:
      'Join our hall; join our team. We will show you how brotherhood can be shaped by (hockey) sticks.',
    category: 'New Ball Team',
    imageId: 'recreation',
    images: ['/assets/Life/Uhall_Hockey_1.jpeg', '/assets/Life/Uhall_Hockey_2.jpeg', '/assets/Life/Uhall_Hockey_3.JPG', '/assets/Life/Uhall_Hockey_4.JPG', '/assets/Life/Uhall_Hockey_5.JPG'],
  },
  {
    id: 'new-ball-Lacrosse',
    name: 'Lacrosse Team',
    description:
      'Lacrosse Grind Begins Today! Lacrosse team is where boys become men and brotherhood is built. Join us to experience the thrill of this prestigious sport!',
    category: 'New Ball Team',
    imageId: 'Uhall_Lacrosse',
    imageSrc: '/assets/Life/Uhall_Lacrosse.jpeg',
  },
  {
    id: 'new-ball-Softball',
    name: 'Softball Team',
    description:
      'Looking for a fast-paced, intense, and unforgettable sport? Look no further than the University Hall Softball team! Join us for a strong and inclusive sport team, holistic enrichment.',
    category: 'New Ball Team',
    imageId: 'Uhall_Softball',
    images: ['/assets/Life/Uhall_Softball_1.jpg','/assets/Life/Uhall_Softball_2.jpg', '/assets/Life/Uhall_Softball_3.jpg',  '/assets/Life/Uhall_Softball_4.jpeg'],
  },
  // Old Ball
  {
    id: 'old-ball-basketball',
    name: 'Basketball Team ',
    description:
        'We\'re a serious squad \- high standards, real competition \- led by a Turkish captain bringing EuroLeague culture to the court. Come find us if you want to be part of it.',
    category: 'Old Ball Team',
    imageId: 'recreation',
    imageSrc: '/assets/Life/Uhall_Basketball.jpeg',
  },
  {
    id: 'old-ball-football',
    name: 'Football Team',
    description:
        'As the University Hall Football Team, we are committed to teamwork, discipline, and sportsmanship. We aim to represent University Hall with pride, strengthen our bond through football, and create a competitive and supportive environment where every player can improve and contribute.',
    category: 'Old Ball Team',
    imageId: 'recreation',
    imageSrc: '/assets/Life/Uhall_Football.jpeg',
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
    category: 'Culture Team',
    imageId: 'common_rooms',
    imageSrc: '/assets/Life/Uhall_Bridge.jpeg',
  },
  {
    id: 'culture-band',
    name: 'Band Team',
    description:
      'Bringing together music lovers with passion, energy, and Hall spirit, University Hall Band Team turns late-night jams, Halloween Live Band, and Joint Hall Music Performance into some of the most unforgettable memories in Hall. Join us!',
    category: 'Culture Team',
    imageId: 'dining_hall',
    imageSrc: '/assets/Life/Uhall_Band.jpeg',
  },
  {
    id: 'culture-dance',
    name: 'Dance Team',
    description:
      'Step into the spotlight with the University Hall Dance Team! Beyond spectacular performances and rhythm, we are a tight-knit family. Join our diverse crew to train hard, grow, and shine together!?',
    category: 'Culture Team',
    imageId: 'common_rooms',
    imageSrc: '/assets/Life/Uhall_Dance_1.jpeg',
    images:['/assets/Life/Uhall_Dance_2.jpeg', '/assets/Life/Uhall_Dance_1.jpeg']
  },
  {
    id: 'seasonal-dragon-boat',
    name: 'Dragon Boat Team',
    description:
      'Take part in the dragon boat team to experience this unique local sport. Win interhall champions with your brothers amidst oceanic splashes and sweats of passion!',
    category: 'Seasonal Team',
    imageId: 'library',
    imageSrc: '/assets/Life/Uhall_DragonBoat.jpeg',
  },
]


export const AFFILIATED_MEMBERSHIP = {
  title: 'Affiliated Membership',
  description:
    'Affiliated Membership offers a pathway for students in HKU who are not currently living in University Hall to maintain a meaningful connection with the Hall community.',
  eligibility: [
    'Open to all students of the University of Hong Kong',
    'Applications from both male and female students are welcome',
    'Admission as an affiliated member is subject to approval',
    'A one-time entrance fee is required upon acceptance',
  ],
  benefits: [
    'Access to hall facilities, including:\n  • Common Room\n  • Gym Room\n  • Dining Hall',
    'Eligibility to participate in selected hall events (subject to availability), such as:\n  • High Table Dinners\n  • Halloween Haunted House\n  • Pok Fu Lam Village Fire Dragon Dance\n  • Other hall activities and traditions event',
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
      'Successful applicants will be notified via email within 2\-3 weeks',
    ],
  },
}

const _MENTORSHIP_PROGRAMS_DATA: MentorshipProgram[] = [
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
    imageSrc:"/assets/Alumni/HKU_Mentorship.jpeg"
  },
  {
    id: 'quo-vadis',
    title: 'Quo Vadis \- Student Mentorship Project',
    images: ['/assets/Alumni/Quo_Vadis_1.jpeg','/assets/Alumni/Quo_Vadis_2.jpg', "/assets/Alumni/Quo_Vadis_3.JPG"],
    description:
      'Founded by UHall-lites in 2024, \"Quo Vadis\" is a mentorship project connecting the university with multi-ethnic Pokfulam youth. Through monthly activities, mentors broaden participants\' horizons and build lasting, supportive bonds.',
  },
]


const _ASSOCIATIONS_DATA: Association[] = [
  {
    id: 'student-association',
    name: "University Hall Students' Association",
    description:
      'The UHSA is the representative body for all students of University Hall, dedicated to enhancing residential life through social, cultural, and recreational activities. It serves as the primary channel for student voices and fosters a vibrant, inclusive community.',
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
    id: 'alumni-limited',
    name: 'University Hall Alumni Limited',
    description:
      'Placeholder for description',
    mission:
      'Placeholder for mission',
    activities: [
      'Placeholder for activities',

    ],
    website: 'https://www.uhall.com.hk/',
  },
]


export const PHILOSOPHY_PILLARS = [
  {
    title: 'Step up; Give back',
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
    title: 'Brotherhood',
    description:
        '',
  },
]


export const FAQ_ITEMS = [
  {
    question: 'How many people share a room? How big are the rooms at University Hall?',
    answer:
      'We have rooms for 2 to 4 people, and they\'re super spacious. Most freshman rooms are between 320\-440 square feet\-the largest on campus!',
  },
  {
    question: 'Can senior-entry students apply for University Hall?',
    answer:
      'Definitely! Everyone is welcome to apply, and we actually have a lot of senior-entry students living in the Hall.',
  },
  {
    question: 'Is it hard to get in? Do people fight for a spot?',
    answer:
        ' Yeah, spots are pretty limited, so if you\'re interested, don\'t wait\- apply early and grab your chance!',
  },
  {
    question: 'Since it\'s a male-only hall, will I not be able to meet girls? Will it be boring?',
    answer:
      'Not at all. We have tons of activities\-joint floors, Halloween parties, and even formal balls. Plus, our castle is one of the prettiest spots, so bringing friends (or your crush) to visit is a guaranteed win. Visitors are always welcome too!',
  },
  {
    question: 'Can I stay all four years?',
    answer:
      'Normally, per university policy, the maximum number of years you can stay is your programme length minus one year. But if you\'re super involved and contribute to the Hall, there are exceptions for students to stay all four years.',
  },
  {
    question: 'What\'s the food like? Can I order food delivery?',
    answer:
        'Yes! You can order delivery at all times. However, we do have a full catering service with breakfast, lunch, and dinner, served in our Dining Hall (which was literally a chapel before). Expect a rotating menu of HK classics and comfort food.\n',
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
    question: 'What\'s there to eat nearby?',
    answer:
        'We already have meals sorted, but if you want to head out, Chi Fu Plaza is nearby with a food court, restaurants, fast food, a supermarket, and more. And Pokfulam Village (our neighbour) has old-school local stores and tea shops if you want something more chill and nostalgic.',
  },
  {
    question: 'What is YingSun? Do I need to join?',
    answer:
        'We strongly recommend that you join YingSun!!! It is an orientation program organised by the University Hall Students’ Association to help freshmen settle in more easily, learn about the Hall’s history and spirit, get to know your brothers, and gain a first glimpse of hall life in the year ahead.',
  },
  {
    question: 'When can I move in if I am accepted into UHall?',
    answer:
        'Successful applicants can usually move in in mid-August.',
  },
  {
    question: 'Can I stay in UHall during the summer holiday?',
    answer:
        'Yes, but students must apply for summer residence before the end of the second semester. Successful applicants may stay in UHall during the summer upon payment.',
  },
  {
    question: 'Will life at UHall be more than just staying in a hall?',
    answer:
        'Definitely. UHall is not only a place to live, but a place to grow, explore, and build unforgettable memories. Every day brings a new chance to discover the Hall’s traditions, connect with your brothers, and become part of something bigger than yourself..',
  },
  {
    question: 'What makes UHall different from other halls?',
    answer:
        'University Hall offers a rare mix of heritage, brotherhood, and character. Living in a historic castle, joining unique traditions, and sharing life with a close-knit community make the Hall experience truly one of a kind.',
  },
  {
    question: 'Can I bring my friends to visit the Castle?',
    answer:
        'Yes! Visitors are welcome to explore the Hall with you. Just remember to be respectful of the historic space, as the Castle is not just a residence, but a home for many.',
  },
]

export interface HallTreasure {
  id: string
  name: string
  description: string
  imageId: string
  imageSrc?: string
  /** Multiple images - renders an inline carousel instead of a single image */
  images?: string[]
}

const _HALL_TREASURES_DATA: HallTreasure[] = [
  {
    id: 'golden-spiral-staircase',
    name: 'Golden Spiral Staircase',
    description:
      'The beautiful and decorative cast iron spiral staircase at the corner of the chapel connects the three floors and facilitates speedy commute.',
    imageId: 'golden_staircase',
    imageSrc: '/assets/Facilities/Golden_Spiral_Staircase_1.jpeg',
    images: ['/assets/Facilities/Golden_Spiral_Staircase_1.jpeg', '/assets/Facilities/Golden_Spiral_Staircase_2.jpeg', '/assets/Facilities/Golden_Spiral_Staircase_3.jpg'],
  },
  {
    id: 'davids-deers',
    name: "David's Deers",
    description:
      'Positioned at the main entrance stairs, two adults, and one child. Students touching the deers risk being cursed to never graduate.',
    imageId: 'davids_deers',
    imageSrc: '/assets/Facilities/Davids_Deer.jpeg',
  },
  {
    id: 'sam-so',
    name: 'Sam So',
    description:
      'A cherished figure of University Hall, Ms Yuen So Moy ("Sam So") served as a cook and motherly presence for generations. Her symbolic "Hall Blood" ritual continues to bless Castlers through life\'s milestones.',
    imageId: 'sam_so',
    imageSrc: '/assets/Facilities/Sam_So.JPG',
  },
]

export interface AlumniVisit {
  id: string
  title: string
  description: string
  images: string[]
}

const _ALUMNI_VISITS_DATA: AlumniVisit[] = [
  {
    id: 'wedding-photo',
    title: 'Wedding Photo Shooting',
    description:
      'University Hall\'s historic castle facade, Gothic architecture, and lush gardens provide a breathtaking backdrop for wedding photography. Alumni couples are welcome to return to the hall to capture their special moments amidst the heritage setting where their own stories began.',
    images: [
      '/assets/Alumni/Uhall_Wedding_4.jpeg',
      '/assets/Alumni/Uhall_wedding_5.jpeg',
      '/assets/Alumni/Uhall_wedding_6.jpeg',
    ],
  },
  {
    id: 'family-visit',
    title: 'Family Visit',
    description:
      'Revisit the hall with your family and share the memories of your alma mater with your loved ones. Walk through the corridors, the dining hall, and the grounds \- showing your family where you lived, studied, and built lifelong friendships.',
    images: [],
  },
]


export const SOCIAL_LINKS = [
  { platform: 'Instagram', url: 'https://www.instagram.com/universityhall_hku/', icon: 'instagram' },
  { platform: 'Threads', url: 'https://www.threads.com/@universityhall_hku', icon: 'threads' },
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

export const ALUMNI_VISITS = _ALUMNI_VISITS_DATA.map(withImg)

export const HALL_TREASURES = _HALL_TREASURES_DATA.map(withImg)

export const ASSOCIATIONS = _ASSOCIATIONS_DATA.map(withImg)

export const MENTORSHIP_PROGRAMS = _MENTORSHIP_PROGRAMS_DATA.map(withImg)

export const HALL_TEAMS = _HALL_TEAMS_DATA.map(withImg)

export const PEOPLE = _PEOPLE_DATA.map(withImg)

export const TRADITIONS = _TRADITIONS_DATA.map(withImg)

export const EVENTS = _EVENTS_DATA.map(withImg)

export const FACILITIES = _FACILITIES_DATA.map(withImg)

export const TIMELINE_EVENTS = _TIMELINE_EVENTS_DATA.map(withImg)

