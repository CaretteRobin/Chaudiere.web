// import '../public/styles/index.css';

import { renderHome } from '@/views/home';
import { renderCategories } from '@/views/categories';
import { renderEventByCategory } from '@/views/eventByCateg';
import { registerRoute, navigateTo } from '@/router';
import {renderEventDetail} from "@/views/eventDetails";
import {renderEvent} from "@/views/events";
import {renderFavorites} from "@/views/favorites";

const app = document.getElementById('app')!;

// Routes statiques
registerRoute('/', () => renderHome(app));

// Route dynamique avec paramètre
registerRoute('/evenements', () => renderEvent(app));

registerRoute('/evenements/{id}', (params) => {
  const eventId: string | undefined = params?.id;
  renderEventDetail(app, eventId);
});

registerRoute('/categories', () => renderCategories(app));

registerRoute('/categories/{id}', (params) => {
  const categoryId: string | undefined = params?.id;
  if (categoryId) {
    renderEventByCategory(app, categoryId);
  } else {
    console.error('Category ID is required');
  }
});

registerRoute('/favoris', () => renderFavorites(app));


document.addEventListener('DOMContentLoaded', () => {
  handleInitialRoute();
});

function handleInitialRoute() {
  const url = location.pathname + location.search;
  navigateTo(url);
}
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.matches('[data-link]')) {
    e.preventDefault();
    const href = target.getAttribute('href');
    if (href) navigateTo(href);
  }
});