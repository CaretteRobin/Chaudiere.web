import { fetchEventsCurrent } from '@/api/events';
import { fetchCategories } from '@/api/categories';
import { loadTemplate, initializePartials } from '@/utils/templateUtils';

export async function renderEvent(app: HTMLElement) {
    await initializePartials();
    const layoutTemplate = await loadTemplate('/src/templates/layout.hbs');

    let events= [];
    try {
        events = await fetchEventsCurrent();
    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);

        app.innerHTML = layoutTemplate({ content: '<p>Impossible de charger les événements.</p>' });
        return;
    }
    let categories = [];
    try {
        categories = await fetchCategories();
    } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
        app.innerHTML = layoutTemplate({ content: '<p>Impossible de charger les catégories.</p>' });
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get('category') ?? '';

    const filteredEvents = selectedCategory
        ? events.filter(e => e.category === selectedCategory)
        : events;

    const eventCardTemplate = await loadTemplate('/src/components/eventCard.hbs');
    const eventsPageTemplate = await loadTemplate('/src/templates/pages/events.hbs');
    const categoriesFilterTemplate = await loadTemplate('/src/components/categoriesFilter.hbs');
    const categoriesFilterHtml = categoriesFilterTemplate({
        categories: categories.map(category => ({
            ...category,
            selected: category.name === selectedCategory
        })),
        selectedCategory
    });

    const eventsHtml = filteredEvents.map(event => {
        if (event.url) {
            // couper les 4 premiers caractères de l'URL qui correspondent à "/api"
            event.url = event.url.substring(4);
        }
        return eventCardTemplate(event)
    }).join('');

    // const eventsHtml = events.map(event => eventCardTemplate(event)).join('');

    const eventsPage = eventsPageTemplate({categFilter: categoriesFilterHtml, eventsContent: eventsHtml });

    app.innerHTML = layoutTemplate({ content: eventsPage });
}