// import '../public/styles/index.css';

import { renderHome } from '@/views/home';
import { renderCategories } from '@/views/categories';
import { registerRoute, navigateTo } from '@/router';
import {renderEventDetail} from "@/views/eventDetails";
import {renderEvent} from "@/views/events";

const app = document.getElementById('app')!;

// Routes statiques
registerRoute('/', () => renderHome(app));

// Route dynamique avec paramètre
registerRoute('/evenements/{id}', (params) => {
  const eventId: string | undefined = params?.id;
  renderEventDetail(app, eventId);
});

registerRoute('/evenements', () => renderEvent(app));

registerRoute('/categories', () => renderCategories(app));


document.addEventListener('DOMContentLoaded', () => {
  handleInitialRoute();
});

function handleInitialRoute() {
  navigateTo(location.pathname);
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.matches('[data-link]')) {
    e.preventDefault();
    const href = target.getAttribute('href');
    if (href) navigateTo(href);
  }
});