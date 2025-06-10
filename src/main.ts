// import '../public/styles/index.css';

import { renderHome } from '@/views/home';
import { renderCategories } from '@/views/categories';
import { registerRoute, navigateTo } from '@/router';
import {renderEventDetail} from "@/views/eventDetails";

const app = document.getElementById('app')!;

// Routes statiques
registerRoute('/', () => renderHome(app));

// Route dynamique avec paramètre
registerRoute('/evenements/{id}', (params) => {
  const eventId: string | undefined = params?.id;
  renderEventDetail(app, eventId);
});

registerRoute('/categories', () => renderCategories(app));


document.addEventListener('DOMContentLoaded', () => {
  handleInitialRoute();
});

function handleInitialRoute() {
  // Au lieu d'enregistrer une route spécifique pour le chemin initial
  // on utilise navigateTo qui utilisera les routes déjà enregistrées
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