import { Mode } from "@prisma/client";

export const HIRINGS = [
  {
    title: 'We are hiring!',
    description: 'Looking for a passionate, motivated developers.',
    position: 'Middle/Senior React FE developer',
    salary: 3200,
    mode: Mode.FLEXIBLE,
    companyId: 1
  },
  {
    title: 'Wonderful offer',
    description: 'We need you, for scaling our business.',
    position: 'Business Analyst',
    salary: 1600,
    mode: Mode.OFFICE,
    companyId: 1
  },
  {
    title: 'Don\'t hesitate.',
    description: 'Looking for a new carrer? We are hiring!',
    position: 'Client Engagement Manager',
    salary: 2700,
    mode: Mode.REMOTE,
    companyId: 2
  },
  {
    title: 'Crimson is here',
    description: 'DevOps, where are you?',
    position: 'DevOps Engineer',
    salary: 5400,
    mode: Mode.OFFICE,
    companyId: 3
  },
  {
    title: 'Something special!',
    description: 'If you love to do 3D animations, you are the one we are looking for!',
    position: '3D Animator',
    salary: 2250,
    mode: Mode.REMOTE,
    companyId: 4
  },
  {
    title: 'Come to IT',
    description: 'Great team, comfortable office. We search for new talents.',
    position: 'Junior Javascript Engineer',
    salary: 1000,
    mode: Mode.OFFICE,
    companyId: 5
  },
  {
    title: 'UI Designs',
    description: 'Our product and development team would like to welcome a Product Designer',
    position: 'Product Designer',
    salary: 3300,
    mode: Mode.FLEXIBLE,
    companyId: 2
  },
]