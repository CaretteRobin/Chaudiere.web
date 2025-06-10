import type { Event } from '@/types/event';

export async function fetchEvents(): Promise<Event[]> {
  const response = await fetch('http://localhost:8080/api/evenements');
  if (!response.ok) throw new Error('Erreur de chargement des événements');
  return response.json();
  // return [
  //   {
  //     title: 'Concert de Jazz',
  //     start_date: '2023-10-15',
  //     category: 'Musique',
  //   }
  // ]
}
