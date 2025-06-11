import { fetchEvents } from '@/api/events';
import { loadTemplate, initializePartials } from '@/utils/templateUtils';

export async function renderHome(app: HTMLElement) {

    const events = await fetchEvents();

    // Initialiser les partiels
    await initializePartials();
    const layoutTemplate = await loadTemplate('/src/templates/layout.hbs');
    const eventCardTemplate = await loadTemplate('/src/components/eventCard.hbs');
    const homePageTemplate = await loadTemplate('/src/templates/pages/home.hbs');

    // Récupérer les événements
    const eventsHTML = events.map(event => eventCardTemplate(event)).join('');

    const pageContent = homePageTemplate({ eventsContent: eventsHTML });

    app.innerHTML = layoutTemplate({ content: pageContent });

}