import React from 'react'
import { Container, Section } from '@components/common/index'
import { FadeInUp, FloorPlanInteractive } from '@components/animations/index'
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
      '',
    floor: 'B',
    images: ['/Facilities/Dining_Hall_1.jpeg', '/Facilities/Dining_Hall_2.jpg'],
    x: 72,
    y: 55,
  },
  {
    id: 'common-room',
    name: 'Common Room',
    description:
      '',
    floor: 'A',
    images: ['/Facilities/Common_Room_1.jpeg', '/Facilities/Common_Room_2.jpg'],
    x: 72,
    y: 82.5,
  },
  {
    id: 'Gym-room',
    name: 'Gym Room',
    description:
        '',
    floor: 'A',
    images: ['/Facilities/Gym_1.jpeg', '/Facilities/Gym_2.jpeg', '/Facilities/Gym_3.jpeg', '/Facilities/Gym_4.jpeg', '/Facilities/Gym_5.jpeg', '/Facilities/Gym_6.jpeg', '/Facilities/Gym_7.jpeg'],
    x: 84,
    y: 87.5,
  },
  {
    id: 'band-room',
    name: 'Band Room',
    description:
        '',
    floor: 'A',
    x: 80,
    y: 82.5,
  },
  {
    id: 'hall-library',
    name: 'Hall Library',
    description:
        '',
    floor: 'C',
    imageSrc: '/Facilities/Hall_Library_1.jpeg',
    x: 72.5,
    y: 31.5,
  },
  {
    id: 'room-a3',
    name: 'Room A3',
    description:
        '',
    floor: 'A',
    x: 43,
    y: 88,
    images: ['/TourHall/Room_A3_1.jpeg', '/TourHall/Room_A3_2.jpeg'],
  },
  {
    id: 'room-a9',
    name: 'Room A9',
    description:
        '',
    floor: 'A',
    x: 31.5,
    y: 83,
    imageSrc: '/TourHall/Room_A9.jpeg',
  },
  {
    id: 'room-a13',
    name: 'Room A13',
    description:
        '',
    floor: 'A',
    x: 25,
    y: 80.5,
  },
  {
    id: 'room-b3',
    name: 'Room B3',
    description:
        '',
    floor: 'B',
    x: 43,
    y: 60,
    images: ['/TourHall/Room_B3_1.jpeg', "/TourHall/Room_B3_2.jpeg"],
  },
  {
    id: 'room-c3',
    name: 'Room C3',
    description:
        '',
    floor: 'C',
    x: 43,
    y: 35,
  },
  {
    id: 'room-c12',
    name: 'Room C12',
    description:
        '',
    floor: 'C',
    imageSrc: '/TourHall/Room_C12_1.jpeg',
    x: 34,
    y: 26,
  },
]

const TourHall: React.FC = () => {
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
            imageSrc="/TourHall/Uhall_FloorPlan.jpeg"
            alt="University Hall Floor Plan"
          />
        </Container>
      </Section>

    </>
  )
}

export default TourHall
