import { renderHome } from '@/views/home';
import { registerRoute, navigateTo } from '@/router';

const app = document.getElementById('app')!;

registerRoute('/', () => renderHome(app));

document.addEventListener('DOMContentLoaded', () => {
  registerRoute(location.pathname, () => renderHome(app));
  navigateTo(location.pathname);
});

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.matches('[data-link]')) {
    e.preventDefault();
    const href = target.getAttribute('href');
    if (href) navigateTo(href);
  }
});