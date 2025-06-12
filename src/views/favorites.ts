import { fetchEventDetail } from '@/api/events';
import {getFavorites, initFavoriteButtons} from '@/utils/favoritesUtils';
import { loadTemplate, initializePartials } from '@/utils/templateUtils';
import { Event } from '@/types/event';
import {EventDetail} from "@/types/eventDetail";
import {formatDate} from "@/utils/dateUtils";

export async function renderFavorites(app: HTMLElement) {
    await initializePartials();
    const layoutTemplate = await loadTemplate('/src/templates/layout.hbs');
    const favoritesTemplate = await loadTemplate('/src/templates/pages/favorites.hbs');
    const eventCardTemplate = await loadTemplate('/src/components/eventCard.hbs');

    // Récupérer les IDs des favoris depuis localStorage
    const favoriteIds = getFavorites();
    const hasFavorites = favoriteIds.length > 0;

    let favoritesContent = '';

    if (hasFavorites) {
        try {
            // Récupérer les détails de chaque événement favori
            const favoriteEvents = await Promise.all(
                favoriteIds.map(async (id: string) => {
                    try {
                        const eventDetail: EventDetail = await fetchEventDetail(id);

                        const event: Event = {
                            id: eventDetail.id,
                            title: eventDetail.title,
                            start_date: formatDate(eventDetail.start_date),
                            category: eventDetail.category.name,
                            url: `/evenements/${eventDetail.id}`
                        }

                        return event;
                    } catch (error) {
                        console.error(`Erreur lors du chargement de l'événement ${id}:`, error);
                        return null;
                    }
                })
            );

            // Filtrer les événements null (en cas d'erreur) et générer le HTML
            favoritesContent = favoriteEvents
                .filter((event): event is Event => event !== null)
                .map(event => eventCardTemplate(event))
                .join('');
        } catch (error) {
            console.error('Erreur lors du chargement des événements favoris:', error);
            app.innerHTML = layoutTemplate({
                content: '<p>Impossible de charger les événements favoris.</p>'
            });
            return;
        }
    }

    const favoritesPage = favoritesTemplate({
        hasFavorites,
        favoritesContent
    });

    app.innerHTML = layoutTemplate({ content: favoritesPage });

    // Initialiser les boutons de favoris comme dans la page events
    if (hasFavorites) {
        initFavoriteButtons();
    }
}
