// import { fetchEvents } from '@/api/events';
// import eventCardTemplate from '@/components/eventCard.hbs';
// import homePage from '@/templates/pages/home.hbs';
// import layoutTemplate from '@/templates/layout.hbs';
//
// export async function renderHome(container: HTMLElement) {
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

export async function renderHome(container: HTMLElement) {
  // Initialiser les partiels
  await initializePartials();

  // Récupérer les données
  const events = await fetchEvents();

  // Charger les templates
  const eventCardTemplate = await loadTemplate('/src/components/eventCard.hbs');
  const homePageTemplate = await loadTemplate('/src/templates/pages/home.hbs');
  const layoutTemplate = await loadTemplate('/src/templates/layout.hbs');

  // Générer le HTML des cartes d'événements
  const eventsHtml = events.map(event => eventCardTemplate(event)).join('');

  // Insérer les cartes dans la page d'accueil
  const pageContent = homePageTemplate({ eventsContent: eventsHtml });

  // Insérer tout dans le layout
  container.innerHTML = layoutTemplate({ content: pageContent });
}