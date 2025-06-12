import { fetchCategories } from "@/api/categories";
import { fetchEventsByCategory } from '@/api/events';
import {formatDate} from "@/utils/dateUtils";
import { loadTemplate, initializePartials } from '@/utils/templateUtils';
import {initFavoriteButtons} from "@/utils/favoritesUtils";
import {Event} from "@/types/event";
import {EventDetail} from "@/types/eventDetail";

export async function renderEventByCategory(app: HTMLElement, categoryId: string) {
    // Initialiser les partiels
    await initializePartials();
    const layoutTemplate = await loadTemplate('/src/templates/layout.hbs');

    let category = null;
    try {
        category = await fetchCategories();
        category = category.find(c => c.id === categoryId);
    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);

        app.innerHTML = layoutTemplate({ content: '<p>Impossible de charger les événements.</p>' });
        return;
    }

    const eventsByCategoryTemplate = await loadTemplate('/src/templates/pages/eventByCategorie.hbs');
    const categHeaderTemplate = await loadTemplate('/src/components/categorieHeader.hbs');
    const eventCardTemplate = await loadTemplate('/src/components/eventCard.hbs');
    
    let events = [];
    try {
        events = await fetchEventsByCategory(categoryId);
    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);

        app.innerHTML = layoutTemplate({ content: '<p>Impossible de charger les événements.</p>' });
        return;
    }

    const categorieHeader = categHeaderTemplate(category);
    const eventsHtml = events.map(eventDetail => {

        const event: Event = {
            id: eventDetail.id,
            title: eventDetail.title,
            start_date: formatDate(eventDetail.start_date),
            category: eventDetail.category.name,
            url: `/evenements/${eventDetail.id}`,
            image_url: eventDetail.images.url
        }

        return eventCardTemplate(event);
    }).join('');

    const eventsPage = eventsByCategoryTemplate({ categHeader: categorieHeader, eventsContent: eventsHtml });
    app.innerHTML = layoutTemplate({ content: eventsPage });
    initFavoriteButtons();
}