
export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'member' | 'organizer' | 'admin';
}

export interface Group {
  id: string;
  title: string;
  description: string;
  photoURL: string;
  creatorId: string;
  memberCount: number;
  isPrivate?: boolean;
  createdAt?: string;
}

export interface Event {
  id: string;
  groupId: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  attendeeCount: number;
  coverImage: string;
  organizerId: string;
  ratingAverage?: number;
}

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Jean D.', avatar: 'https://picsum.photos/seed/user1/100/100', role: 'organizer' },
  { id: 'u2', name: 'Marie L.', avatar: 'https://picsum.photos/seed/user2/100/100', role: 'member' },
  { id: 'u3', name: 'Pierre B.', avatar: 'https://picsum.photos/seed/user3/100/100', role: 'admin' },
];

export const MOCK_GROUPS: Group[] = [
  {
    id: 'g1',
    title: 'Randonneurs Toulousains',
    description: 'Explorons les sentiers autour de Toulouse et les Pyrénées ensemble.',
    photoURL: 'https://picsum.photos/seed/hiking/800/400',
    creatorId: 'u1',
    memberCount: 125,
    isPrivate: false,
    createdAt: '2023-01-15T10:00:00Z'
  },
  {
    id: 'g2',
    title: 'Code & Cassoulet',
    description: 'Le groupe pour les passionnés de tech qui aiment aussi la bonne bouffe.',
    photoURL: 'https://picsum.photos/seed/tech/800/400',
    creatorId: 'u2',
    memberCount: 89,
    isPrivate: false,
    createdAt: '2023-03-20T14:30:00Z'
  },
  {
    id: 'g3',
    title: 'Photographes de la Ville Rose',
    description: 'Capturons la beauté de Toulouse, du lever au coucher du soleil.',
    photoURL: 'https://picsum.photos/seed/toulouse1/800/400',
    creatorId: 'u3',
    memberCount: 54,
    isPrivate: true,
    createdAt: '2023-05-10T09:15:00Z'
  },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    groupId: 'g1',
    title: 'Balade à la Forêt de Bouconne',
    description: 'Une marche de 10km accessible à tous pour profiter de l\'air frais.',
    date: '2024-06-15',
    time: '10:00',
    location: 'Forêt de Bouconne, Lévignac',
    maxParticipants: 20,
    attendeeCount: 12,
    coverImage: 'https://picsum.photos/seed/forest/800/400',
    organizerId: 'u1',
    ratingAverage: 4.8
  },
  {
    id: 'e2',
    groupId: 'g2',
    title: 'Meetup React & Pizza',
    description: 'Discussions autour de Next.js et dégustation de pizzas.',
    date: '2024-06-20',
    time: '19:00',
    location: 'At Home Café, Toulouse',
    maxParticipants: 30,
    attendeeCount: 28,
    coverImage: 'https://picsum.photos/seed/pizza/800/400',
    organizerId: 'u2',
    ratingAverage: 4.5
  },
  {
    id: 'e3',
    groupId: 'g3',
    title: 'Sortie Photo : Coucher de soleil au Pont Neuf',
    description: 'Apprenez à capturer l\'heure dorée sur le monument le plus emblématique de Toulouse.',
    date: '2024-06-18',
    time: '20:30',
    location: 'Pont Neuf, Toulouse',
    maxParticipants: 15,
    attendeeCount: 10,
    coverImage: 'https://picsum.photos/seed/toulouse2/800/400',
    organizerId: 'u3',
    ratingAverage: 4.9
  }
];
