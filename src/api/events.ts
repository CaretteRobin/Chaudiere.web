// src/api/events.ts
import type { Event } from '@/types/event';
import { EventDetail } from '@/types/eventDetail';
import {API_BASE_URL} from "@/config/config";


export async function fetchEvents(): Promise<Event[]> {
  const response = await fetch(`${API_BASE_URL}/evenements`);
  if (!response.ok) throw new Error('Erreur de chargement des événements');
  return response.json();
}

export const fetchEventDetail = async (id: string): Promise<EventDetail> => {
  const response = await fetch(`${API_BASE_URL}/evenements/${id}`);
  if (!response.ok) throw new Error('Erreur de chargement des détails de l\'événement');
  return response.json();
}

export async function fetchEventsByCategory(categoryId: string): Promise<EventDetail[]> {
  const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/evenements`);
  if (!response.ok) throw new Error('Erreur de chargement des événements par catégorie');
  return response.json();
}

export async function fetchEventsByPeriod(period: 'courante' | 'passee' | 'futur'): Promise<Event[]> {
  const response = await fetch(`${API_BASE_URL}/evenements?periode=${period}`);
  if (!response.ok) throw new Error(`Erreur de chargement des événements (${period})`);
  return response.json();
}