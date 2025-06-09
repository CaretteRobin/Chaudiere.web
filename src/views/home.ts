import { fetchEvents } from '@/api/events';
import eventCardTemplate from '@/components/eventCard.hbs';
import homePage from '@/templates/pages/home.hbs';
import layoutTemplate from '@/templates/layout.hbs';

export async function renderHome(container: HTMLElement) {
  const events = await fetchEvents();
  // Créer le contenu des cartes d'événements
  const eventsHtml = events.map(event => eventCardTemplate(event)).join('');

  // Insérer les cartes dans la page d'accueil
  const pageContent = homePage({ eventsContent: eventsHtml });

  // Insérer tout dans le layout
  container.innerHTML = layoutTemplate({ content: pageContent });
}
