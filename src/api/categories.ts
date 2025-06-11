import type { Category } from '@/types/category';

export async function fetchCategories(): Promise<Category[]> {
 const response = await fetch('http://localhost:8080/api/categories');
 if (!response.ok) throw new Error('Erreur de chargement des catégories');
 return response.json();
 
}