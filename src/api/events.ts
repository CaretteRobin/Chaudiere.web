import type { Event } from '@/types/event';

export async function fetchEvents(): Promise<Event[]> {
  const response = await fetch('http://localhost:3000/api/evenements');
  if (!response.ok) throw new Error('Erreur de chargement des événements');
  return response.json();
}
