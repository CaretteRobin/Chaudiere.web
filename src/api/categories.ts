import type { Category } from '@/types/category';

export async function fetchCategories(): Promise<Category[]> {
  // const response = await fetch('http://localhost:3000/api/categories');
  // if (!response.ok) throw new Error('Erreur de chargement des catégories');
  // return response.json();
  return [
    { id: '1', name: 'Musique' },
    { id: '2', name: 'Art' },
    { id: '3', name: 'Cinéma' },
    { id: '4', name: 'Théâtre' },
    { id: '5', name: 'Danse' }
  ];
}