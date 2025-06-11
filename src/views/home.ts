import { fetchEvents } from '@/api/events';
import { loadTemplate, initializePartials } from '@/utils/templateUtils';

export async function renderHome(app: HTMLElement) {

    // Initialiser les partiels
    await initializePartials();
    const layoutTemplate = await loadTemplate('/src/templates/layout.hbs');

    const homePageTemplate = await loadTemplate('/src/templates/pages/home.hbs');

    const pageContent = homePageTemplate({ content: '' });

    app.innerHTML = layoutTemplate({ content: pageContent });

}