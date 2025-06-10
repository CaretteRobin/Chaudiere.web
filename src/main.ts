// import '../public/styles/index.css';

import { renderHome } from '@/views/home';
import { renderCategories } from '@/views/categories';
import { registerRoute, navigateTo } from '@/router';

const app = document.getElementById('app')!;

document.addEventListener('DOMContentLoaded', () => {
  console.log(location.pathname);
  registerRoute(location.pathname, () => renderHome(app));
  registerRoute('/categories', () => renderCategories(app));
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