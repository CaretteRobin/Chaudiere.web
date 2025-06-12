import { fetchEventsByPeriod } from '@/api/events';
import { fetchCategories } from '@/api/categories';
import { loadTemplate, initializePartials } from '@/utils/templateUtils';

export async function renderEvent(app: HTMLElement) {
    await initializePartials();
    const layoutTemplate = await loadTemplate('/src/templates/layout.hbs');

    
    // Récupération de la catégorie sélectionnée depuis les paramètres de l'URL
    const params = new URLSearchParams(window.location.search);
    // Si la catégorie n'est pas spécifiée, on affiche tous les événements
    const selectedCategory = params.get('category') ?? '';
    // Chargement des événements de la période courante
    const selectedPeriod = params.get('periode') as 'courante' | 'passee' | 'futur' ?? 'courante';

    // Chargement des événements et des catégories
    let events= [];
    try {
        events = await fetchEventsByPeriod(selectedPeriod);
    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);

        app.innerHTML = layoutTemplate({ content: '<p>Impossible de charger les événements.</p>' });
        return;
    }
    let categories = [];
    try {
        categories = await fetchCategories();
    } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
        app.innerHTML = layoutTemplate({ content: '<p>Impossible de charger les catégories.</p>' });
        return;
    }

    // Filtrage des événements par catégorie
    const filteredEvents = selectedCategory
        ? events.filter(e => e.category === selectedCategory)
        : events;

    // Chargement des templates Handlebars
    const eventCardTemplate = await loadTemplate('/src/components/eventCard.hbs');
    const eventsPageTemplate = await loadTemplate('/src/templates/pages/events.hbs');
    const categoriesFilterTemplate = await loadTemplate('/src/components/categoriesFilter.hbs');
    const periodFilterTemplate = await loadTemplate('/src/components/periodFilter.hbs');

    // Génération du HTML 
    const periodFilterHtml = periodFilterTemplate({
        periods: [
            { value: 'courante', label: 'Courant', selected: selectedPeriod === 'courante' },
            { value: 'passee',  label: 'Passés',  selected: selectedPeriod === 'passee'  },
            { value: 'futur',   label: 'Futurs',  selected: selectedPeriod === 'futur'   },
        ],
        selectedCategory
    });

    const categoriesFilterHtml = categoriesFilterTemplate({
        categories: categories.map(category => ({
            ...category,
            selected: category.name === selectedCategory
        })),
        selectedCategory,
        selectedPeriod
    });

    const eventsHtml = filteredEvents.map(event => {
        if (event.url) {
            event.url = event.url.substring(4);
        }
        return eventCardTemplate(event)
    }).join('');

    // Génération de la page complète avec le layout
    const eventsPage = eventsPageTemplate({periodFilter: periodFilterHtml, categFilter: categoriesFilterHtml, eventsContent: eventsHtml });

    app.innerHTML = layoutTemplate({ content: eventsPage });
}