import React, { useMemo } from 'react'
import { Container, Section } from '@components/common/index'
import { FadeInUp, StaggerContainer, StaggerItem } from '@components/animations/index'
import FloorPlanInteractive from '@components/animations/FloorPlanInteractive'
import { Bed, Move, Monitor, Building } from 'lucide-react'
import type { FloorPlanPin } from '../types/index'

const FLOOR_PLAN_PINS: FloorPlanPin[] = [
  // {
  //   id: 'main-entrance',
  //   name: 'Main Entrance',
  //   description:
  //     '',
  //   floor: 'B',
  //   x: 57,
  //   y: 62,
  // },
  {
    id: 'dining-hall',
    name: 'Dining Hall',
    description:
      'Originally a chapel, our Dining Hall is where hallmates gather for daily meals, high table dinners, and major hall occasions, bringing people together in a space rich with history.',
    floor: 'B',
    images: ['/assets/Facilities/Dining_Hall_1.jpeg', '/assets/Facilities/Dining_Hall_2.jpg'],
    x: 72,
    y: 55,
  },
  {
    id: 'common-room',
    name: 'Common Room',
    description:
      'Equipped with gaming consoles and an electronic mahjong table, the Common Room is a relaxed hangout spot where hallmates gather to unwind, play, and enjoy each other’s company.',
    floor: 'A',
    images: ['/assets/Facilities/Common_Room_1.jpeg', '/assets/Facilities/Common_Room_2.jpg'],
    x: 72,
    y: 82.5,
  },
  {
    id: 'Gym-room',
    name: 'Gym Room',
    description:
        'The Gym Room is where hallmates come to train, sweat, and quietly work toward their own transformation, whether for fitness, sports, or a “secret evolution.”',
    floor: 'A',
    images: ['/assets/Facilities/Gym_1.jpeg', '/assets/Facilities/Gym_2.jpeg', '/assets/Facilities/Gym_3.jpeg', '/assets/Facilities/Gym_4.jpeg', '/assets/Facilities/Gym_5.jpeg', '/assets/Facilities/Gym_6.jpeg', '/assets/Facilities/Gym_7.jpeg'],
    x: 84,
    y: 87.5,
  },
  {
    id: 'band-room',
    name: 'Band Room',
    description:
        'Designed for creativity and sound, the Music Room is where the band team practices and hallmates bring music to life through rehearsal, rhythm, and collaboration.',
    floor: 'A',
    images: ['/assets/Facilities/Band_Room.jpeg'],
    x: 80,
    y: 82.5,
  },
  {
    id: 'hall-library',
    name: 'Hall Library',
    description:
        'A quiet haven for bookworms and late-night readers, the Hall Library offers a comfortable place to study, focus, and enjoy the rare bonus of free air conditioning.',
    floor: 'C',
    imageSrc: '/assets/Facilities/Hall_Library_1.jpeg',
    x: 72.5,
    y: 31.5,
  },
  {
    id: 'room-a3',
    name: 'Room A3',
    description:
        '',
    floor: 'A',
    roomType: 'Quadruple Room (loft bed)',
    roomSize: '~33.0m²',
    bedSize: '190cm(L) x 84cm(W) x 7.6cm(H)',
    deskSize: '142cm(L) x 80cm(W) x 74cm(H)',
    x: 43,
    y: 88,
    images: ['/assets/TourHall/Room_A3_1.jpeg', '/assets/TourHall/Room_A3_2.jpeg'],
  },
  {
    id: 'room-a9',
    name: 'Room A9',
    description:
        '',
    floor: 'A',
    roomType: 'Triple Room',
    roomSize: '~22.0m²',
    bedSize: '190cm(L) x 84cm(W) x 7.6cm(H)',
    deskSize: '142cm(L) x 80cm(W) x 74cm(H)',
    x: 31.5,
    y: 83,
    imageSrc: '/assets/TourHall/Room_A9.jpeg',
  },
  // {
  //   id: 'room-a13',
  //   name: 'Room A13',
  //   description:
  //       '',
  //   floor: 'A',
  //   x: 25,
  //   y: 80.5,
  // },
  {
    id: 'room-b3',
    name: 'Room B3',
    description:
        '',
    floor: 'B',
    roomType: 'Triple Room (loft bed)',
    roomSize: '~22.0m²',
    bedSize: '190cm(L) x 84cm(W) x 7.6cm(H)',
    deskSize: '142cm(L) x 80cm(W) x 74cm(H)',
    x: 43,
    y: 60,
    images: ['/assets/TourHall/Room_B3_1.jpeg', "/assets/TourHall/Room_B3_2.jpeg"],
  },
  {
    id: 'room-c3',
    name: 'Room C3',
    description:
        '',
    floor: 'C',
    roomType: 'Triple Room (loft bed)',
    roomSize: '~22.0m²',
    bedSize: '190cm(L) x 84cm(W) x 7.6cm(H)',
    deskSize: '142cm(L) x 80cm(W) x 74cm(H)',
    images: ['/assets/TourHall/Room_B3_1.jpeg', "/assets/TourHall/Room_B3_2.jpeg"],
    x: 43,
    y: 35,
  },
  {
    id: 'room-c12',
    name: 'Room C12',
    description:
        '',
    floor: 'C',
    roomType: 'Twin Room (loft bed)',
    roomSize: '~14.0m²',
    bedSize: '190cm(L) x 84cm(W) x 7.6cm(H)',
    deskSize: '142cm(L) x 80cm(W) x 74cm(H)',
    imageSrc: '/assets/TourHall/Room_C12_1.jpeg',
    x: 34,
    y: 26,
  },
]

const ROOM_TYPES: FloorPlanPin[] = [
  {
    id: 'room-a3',
    name: 'Room A3',
    floor: 'A',
    roomType: 'Quadruple Room (loft bed)',
    roomSize: '~33.0m²',
    bedSize: '190cm(L) x 84cm(W) x 7.6cm(H)',
    deskSize: '142cm(L) x 80cm(W) x 74cm(H)',
    description: '',
    x: 0,
    y: 0,
  },
  {
    id: 'room-a3',
    name: 'Room A8',
    floor: 'A',
    roomType: 'Triple Room (loft bed)',
    roomSize: '~22.0m²',
    bedSize: '190cm(L) x 84cm(W) x 7.6cm(H)',
    deskSize: '142cm(L) x 80cm(W) x 74cm(H)',
    description: '',
    x: 0,
    y: 0,
  },
  {
    id: 'room-a9',
    name: 'Room A9',
    floor: 'A',
    roomType: 'Triple Room',
    roomSize: '~22.0m²',
    bedSize: '190cm(L) x 84cm(W) x 7.6cm(H)',
    deskSize: '142cm(L) x 80cm(W) x 74cm(H)',
    description: '',
    x: 0,
    y: 0,
  },
  {
    id: 'room-b3',
    name: 'Room B3',
    floor: 'B',
    roomType: 'Triple Room (loft bed)',
    roomSize: '~22.0m²',
    bedSize: '190cm(L) x 84cm(W) x 7.6cm(H)',
    deskSize: '142cm(L) x 80cm(W) x 74cm(H)',
    description: '',
    x: 0,
    y: 0,
  },
  {
    id: 'room-c1',
    name: 'Room C1',
    floor: 'C',
    roomType: 'Quadruple Room',
    roomSize: '~33.0m²',
    bedSize: '190cm(L) x 84cm(W) x 7.6cm(H)',
    deskSize: '142cm(L) x 80cm(W) x 74cm(H)',
    description: '',
    x: 0,
    y: 0,
  },
  {
    id: 'room-c3',
    name: 'Room C3',
    floor: 'C',
    roomType: 'Triple Room (loft bed)',
    roomSize: '~22.0m²',
    bedSize: '190cm(L) x 84cm(W) x 7.6cm(H)',
    deskSize: '142cm(L) x 80cm(W) x 74cm(H)',
    description: '',
    x: 0,
    y: 0,
  },
  {
    id: 'room-c12',
    name: 'Room C12',
    floor: 'C',
    roomType: 'Twin Room (loft bed)',
    roomSize: '~14.0m²',
    bedSize: '190cm(L) x 84cm(W) x 7.6cm(H)',
    deskSize: '142cm(L) x 80cm(W) x 74cm(H)',
    description: '',
    x: 0,
    y: 0,
  },
]

const TourHall: React.FC = () => {
  const roomsByFloor = useMemo(() => {
    const rooms = ROOM_TYPES
    const grouped: { floor: string; rooms: FloorPlanPin[] }[] = []
    for (const f of ['A', 'B', 'C'] as const) {
      const r = rooms.filter((p) => p.floor === f)
      if (r.length > 0) grouped.push({ floor: f, rooms: r })
    }
    return grouped
  }, [])

  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Tour the Hall
            </h1>
            <p className="text-xl text-brand-text-muted max-w-3xl">
              Explore the heritage, architecture, and living spaces of University Hall
              — a declared historical monument with over a century of tradition.
            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* Room Overview by Floor */}
      <Section>
        <Container>
          <FadeInUp>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-gold text-center mb-2">
              Room Type
            </h2>
            <p className="text-brand-text-muted text-center mb-12 max-w-2xl mx-auto">
              University Hall offers a range of room types across three floors,
              each designed for comfortable residential living.
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {roomsByFloor.map(({ floor, rooms }) => (
              <StaggerContainer key={floor}>
                <div className="bg-brand-surface rounded-card border border-brand-border overflow-hidden">
                  {/* Floor header */}
                  <div className="px-5 py-4 border-b border-brand-border/50 flex items-center gap-3">
                    <Building size={20} className="text-brand-gold" />
                    <h3 className="font-display text-xl font-semibold text-brand-text-primary">
                      {floor} Floor
                    </h3>
                  </div>

                  {/* Room cards */}
                  <div className="divide-y divide-brand-border/50">
                    {rooms.map((room) => (
                      <StaggerItem key={room.id}>
                        <div className="px-5 py-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-display text-lg font-semibold text-brand-text-primary">
                              {room.roomType}
                            </h4>
                          </div>
                          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                            <div className="flex items-center gap-1.5">
                              <Move size={13} className="text-brand-gold/70 flex-shrink-0" />
                              <span className="text-sm text-brand-text-muted">{room.roomSize}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Bed size={13} className="text-brand-gold/70 flex-shrink-0" />
                              <span className="text-sm text-brand-text-muted">{room.bedSize}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Monitor size={13} className="text-brand-gold/70 flex-shrink-0" />
                              <span className="text-sm text-brand-text-muted">{room.deskSize}</span>
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </div>
                </div>
              </StaggerContainer>
            ))}
          </div>
        </Container>
      </Section>

      {/* Floor Plan */}
      <Section>
        <Container>
          <FadeInUp>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-gold text-center mb-2">
              Interactive Floor Plan
            </h2>
            <p className="text-brand-text-muted text-center mb-10 max-w-2xl mx-auto">
              Explore the layout of University Hall — hover over pins to identify locations,
              and click for detailed information about each space.
            </p>
          </FadeInUp>

          <FloorPlanInteractive
            pins={FLOOR_PLAN_PINS}
            imageSrc="/assets/TourHall/Uhall_FloorPlan.jpeg"
            alt="University Hall Floor Plan"
          />
        </Container>
      </Section>

    </>
  )
}

export default TourHall
