import { fetchCategories } from "@/api/categories";
import { loadTemplate, initializePartials } from '@/utils/templateUtils';


export async function renderCategories(container: HTMLElement) {
    // Initialiser les partiels
    await initializePartials();
    
    // Récupérer les données des catégories
    const categories = await fetchCategories();
    
    // Charger les templates
    const categoryCardTemplate = await loadTemplate('/src/components/categoryList.hbs');
    const categoriesPageTemplate = await loadTemplate('/src/templates/pages/categories.hbs');
    const layoutTemplate = await loadTemplate('/src/templates/layout.hbs');
    
    // Générer le HTML des cartes de catégories
    const categoriesHtml = categories.map(category => categoryCardTemplate(category)).join('');
    
    // Insérer les cartes dans la page des catégories
    const pageContent = categoriesPageTemplate({ categoriesContent: categoriesHtml });
    // Insérer tout dans le layout
    container.innerHTML = layoutTemplate({ content: pageContent });
}