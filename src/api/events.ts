import type { Event } from '@/types/event';
import {EventDetail} from "@/types/EventDetail";

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

export const fetchEventDetail = async (id: string): Promise<EventDetail> => {
    const response = await fetch(`http://localhost:8080/api/evenements/${id}`);
    if (!response.ok) throw new Error('Erreur de chargement des détails de l\'événement');
    return response.json();
}

export async function fetchEventsByCategory(categoryId: string): Promise<Event[]> {
  const response = await fetch(`http://localhost:8080/api/categories/${categoryId}/evenements`);
  if (!response.ok) throw new Error('Erreur de chargement des événements par catégorie');
  return response.json();
}
