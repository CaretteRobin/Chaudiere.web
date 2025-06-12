import { fetchEventsCurrent } from '@/api/events';
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

    const eventCardTemplate = await loadTemplate('/src/components/eventCard.hbs');
    const eventsPageTemplate = await loadTemplate('/src/templates/pages/events.hbs');

    const eventsHtml = events.map(event => {
        if (event.url) {
            // couper les 4 premiers caractères de l'URL qui correspondent à "/api"
            event.url = event.url.substring(4);
        }
        return eventCardTemplate(event)
    }).join('');

    // const eventsHtml = events.map(event => eventCardTemplate(event)).join('');

    console.log(eventsHtml);

    const eventsPage = eventsPageTemplate({ eventsContent: eventsHtml });
    console.log(eventsPage);

    app.innerHTML = layoutTemplate({ content: eventsPage });
}