import {fetchEventsByPeriod} from '@/api/events';
import {fetchCategories} from '@/api/categories';
import {initializePartials, loadTemplate} from '@/utils/templateUtils';
import {initFavoriteButtons} from "@/utils/favoritesUtils";
import {formatDate} from "@/utils/dateUtils";

export async function renderEvent(app: HTMLElement) {
    await initializePartials();
    const layoutTemplate = await loadTemplate('/src/templates/layout.hbs');


    // Récupération de la catégorie sélectionnée depuis les paramètres de l'URL
    const params = new URLSearchParams(window.location.search);
    // Si la catégorie n'est pas spécifiée, on affiche tous les événements
    const selectedCategory = params.get('category') ?? '';
    // Chargement des événements de la période sélectionnée
    const selectedPeriod = params.get('periode') as 'courante' | 'passee' | 'futur' ?? 'courante';
    // Chargement du type de trie souhaité
    const sortBy = params.get('sort') as 'date-asc' | 'date-desc' | 'titre' | 'categorie' ?? 'date-asc';


    // Chargement des événements et des catégories
    let events = [];
    try {
        events = await fetchEventsByPeriod(selectedPeriod);
    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);

        app.innerHTML = layoutTemplate({content: '<p>Impossible de charger les événements.</p>'});
        return;
    }
    let categories = [];
    try {
        categories = await fetchCategories();
    } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
        app.innerHTML = layoutTemplate({content: '<p>Impossible de charger les catégories.</p>'});
        return;
    }

    // Filtrage des événements par catégorie
    const filteredEventsCateg = selectedCategory
        ? events.filter(e => e.category === selectedCategory)
        : events;

    // Tri des événements selon le critère choisi
    const filteredEvents = filteredEventsCateg.sort((a, b) => {
        switch (sortBy) {
            case 'date-asc':
                return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
            case 'date-desc':
                return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
            case 'titre':
                return a.title.localeCompare(b.title);
            case 'categorie':
                return a.category.localeCompare(b.category);
            default:
                return 0; // Pas de tri
        }
    });

    // Chargement des templates Handlebars
    const eventCardTemplate = await loadTemplate('/src/components/eventCard.hbs');
    const eventsPageTemplate = await loadTemplate('/src/templates/pages/events.hbs');
    const categoriesFilterTemplate = await loadTemplate('/src/components/categoriesFilter.hbs');
    const periodFilterTemplate = await loadTemplate('/src/components/periodFilter.hbs');
    const sortByTemplate = await loadTemplate('/src/components/sortBy.hbs');

    // Génération du HTML
    const periodFilterHtml = periodFilterTemplate({
        periods: [
            {value: 'courante', label: 'Courant', selected: selectedPeriod === 'courante'},
            {value: 'passee', label: 'Passés', selected: selectedPeriod === 'passee'},
            {value: 'futur', label: 'Futurs', selected: selectedPeriod === 'futur'},
        ],
        selectedCategory,
        sortBy
    });

    const categoriesFilterHtml = categoriesFilterTemplate({
        categories: categories.map(category => ({
            ...category,
            selected: category.name === selectedCategory
        })),
        selectedCategory,
        selectedPeriod,
        sortBy
    });

    const sortByHtml = sortByTemplate({
        sort: [
            {value: 'date-asc', label: 'Date croissante', selected: sortBy === 'date-asc'},
            {value: 'date-desc', label: 'Date décroissante', selected: sortBy === 'date-desc'},
            {value: 'titre', label: 'Titre', selected: sortBy === 'titre'},
            {value: 'categorie', label: 'Catégorie', selected: sortBy === 'categorie'}
        ],
        selectedCategory,
        selectedPeriod,
        sortBy
    });

    const eventsHtml = filteredEvents.map(event => {
        if (event.url) {
            event.id = event.url.split('/').pop() || undefined; // Extraire l'ID de l'URL
            event.start_date = formatDate(event.start_date);
            event.url = event.url.substring(4);
        }
        return eventCardTemplate(event)
    }).join('');

    const eventsPage = eventsPageTemplate({
        periodFilter: periodFilterHtml,
        categFilter: categoriesFilterHtml,
        eventSorted: sortByHtml,
        eventsContent: eventsHtml
    });
    app.innerHTML = layoutTemplate({content: eventsPage});

    const updateAndRender = () => {
        const qp = new URLSearchParams(window.location.search);
        const cat = (document.getElementById('category-select') as HTMLSelectElement).value;
        const per = (document.getElementById('period-select') as HTMLSelectElement).value;
        const sor = (document.getElementById('sort-select') as HTMLSelectElement).value;
        if (cat) qp.set('category', cat); else qp.delete('category');
        if (per) qp.set('periode', per); else qp.delete('periode');
        if (sor) qp.set('sort', sor); else qp.delete('sort');
        history.pushState(null, '', window.location.pathname + (qp.toString() ? `?${qp}` : ''));
        renderEvent(app);
    };

    document.getElementById('category-select')?.addEventListener('change', updateAndRender);
    document.getElementById('period-select')?.addEventListener('change', updateAndRender);
    document.getElementById('sort-select')?.addEventListener('change', updateAndRender);

    window.addEventListener('popstate', () => renderEvent(app));
    initFavoriteButtons();
}