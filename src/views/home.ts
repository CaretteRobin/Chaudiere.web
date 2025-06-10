import { fetchEvents } from '@/api/events';
import { loadTemplate, initializePartials } from '@/utils/templateUtils';

export async function renderHome(app: HTMLElement) {
  // Initialiser les partiels
  await initializePartials();
  const layoutTemplate = await loadTemplate('/src/templates/layout.hbs');

  let events= [];
  try {
    events = await fetchEvents();
  } catch (error) {
    console.error('Erreur lors du chargement des événements:', error);

    app.innerHTML = layoutTemplate({ content: '<p>Impossible de charger les événements.</p>' });
    return;
  }

  const eventCardTemplate = await loadTemplate('/src/components/eventCard.hbs');
  const homePageTemplate = await loadTemplate('/src/templates/pages/home.hbs');

  const eventsHtml = events.map(event => eventCardTemplate(event)).join('');

  const pageContent = homePageTemplate({ eventsContent: eventsHtml });

  app.innerHTML = layoutTemplate({ content: pageContent });
}