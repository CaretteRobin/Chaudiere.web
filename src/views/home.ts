// import { fetchEvents } from '@/api/events';
// import eventCardTemplate from '@/components/eventCard.hbs';
// import homePage from '@/templates/pages/home.hbs';
// import layoutTemplate from '@/templates/layout.hbs';
//
// export async function renderHome(app: HTMLElement) {
//   const events = await fetchEvents();
//   // Créer le contenu des cartes d'événements
//   const eventsHtml = events.map(event => eventCardTemplate(event)).join('');
//
//   // Insérer les cartes dans la page d'accueil
//   const pageContent = homePage({ eventsContent: eventsHtml });
//
//   // Insérer tout dans le layout
//   container.innerHTML = layoutTemplate({ content: pageContent });
// }


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