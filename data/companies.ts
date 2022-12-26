import { Mode } from '@prisma/client';

export const COMPANIES = [
  {
    name: 'Astound Commerce',
    email: 'astound-commerce@astound.com',
    budget: 1000.0,
    staff: 1553,
    ceo: 'Michael Kahn',
    hirings: {
      create: [
        {
          title: 'We are hiring!',
          description: 'Looking for a passionate, motivated developers.',
          position: 'Middle/Senior React FE developer',
          salary: 3200,
          mode: Mode.FLEXIBLE,
        },
        {
          title: 'Wonderful offer',
          description: 'We need you, for scaling our business.',
          position: 'Business Analyst',
          salary: 1600,
          mode: Mode.OFFICE,
        },
        {
          title: 'Mission: Solution Architect',
          description:
            'If you dream of the best possible offer, then welcome on board!',
          position: 'Technical Solution Architect',
          salary: 5250,
          mode: Mode.REMOTE,
        },
      ],
    },
  },
  {
    name: 'Formidable Labs',
    email: 'formidablelabs@io.com',
    budget: 420.2,
    staff: 160,
    ceo: 'Ryan Eastridge',
    hirings: {
      create: [
        {
          title: "Don't hesitate.",
          description: 'Looking for a new carrer? We are hiring!',
          position: 'Client Engagement Manager',
          salary: 2700,
          mode: Mode.REMOTE,
        },
        {
          title: 'UI Designs',
          description:
            'Our product and development team would like to welcome a Product Designer',
          position: 'Product Designer',
          salary: 3300,
          mode: Mode.FLEXIBLE,
        },
      ],
    },
  },
  {
    name: 'Crimson IT',
    email: 'crimsondotit@gmail.com',
    budget: 532.0,
    staff: 240,
    ceo: 'Mac Hudson',
    hirings: {
      create: [
        {
          title: 'Crimson is here',
          description: 'DevOps, where are you?',
          position: 'DevOps Engineer',
          salary: 5400,
          mode: Mode.OFFICE,
        },
      ],
    },
  },
  {
    name: 'DATAART',
    email: 'dataart-london@data.net',
    budget: 1899.55,
    staff: 3015,
    ceo: 'Eugene Goland',
    hirings: {
      create: [
        {
          title: 'Something special!',
          description:
            'If you love to do 3D animations, you are the one we are looking for!',
          position: '3D Animator',
          salary: 2250,
          mode: Mode.REMOTE,
        },
      ],
    },
  },
  {
    name: 'Go IT',
    email: 'go-it-company@gmail.com',
    budget: 232.0,
    staff: 112,
    ceo: 'Anton Chornyi',
    hirings: {
      create: [
        {
          title: 'Come to IT',
          description:
            'Great team, comfortable office. We search for new talents.',
          position: 'Junior Javascript Engineer',
          salary: 1000,
          mode: Mode.OFFICE,
        },
      ],
    },
  },
];
