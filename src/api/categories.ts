// src/api/categories.ts
import type { Category } from '@/types/category';
import {API_BASE_URL} from "@/config/config";

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error('Erreur de chargement des catégories');
  return response.json();
}