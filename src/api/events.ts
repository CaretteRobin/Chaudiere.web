import type { Event } from '@/types/event';

export async function fetchEvents(): Promise<Event[]> {
  // const response = await fetch('http://localhost:3000/api/evenements');
  // if (!response.ok) throw new Error('Erreur de chargement des événements');
  // return response.json();
  return [
    {
      id: 1,
      titre: 'Concert de Jazz',
      artiste: 'John Doe Quartet',
      date: '2023-10-15',
      categorie: 'Musique',
      image: 'https://example.com/jazz-concert.jpg'
    },
    {
      id: 2,
      titre: 'Exposition d\'Art Contemporain',
      artiste: 'Galerie XYZ',
      date: '2023-11-01',
      categorie: 'Art',
      image: 'https://example.com/art-exhibition.jpg'
    },
    {
      id: 3,
      titre: 'Festival de Cinéma Indépendant',
      artiste: 'Cinéphiles Associés',
      date: '2023-12-05',
      categorie: 'Cinéma',
      image: 'https://example.com/film-festival.jpg'
    }
  ]
}
