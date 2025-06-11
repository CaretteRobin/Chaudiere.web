import {initializePartials, loadTemplate} from "@/utils/templateUtils";
import {fetchEventDetail} from "@/api/events";
import {formatDate} from "@/utils/dateUtils";

export const renderEventDetail = async (app: HTMLElement, paramId: string | undefined) => {

    if (!paramId) {
        app.innerHTML = '<p>Event ID is required.</p>';
        return;
    }

    // Initialiser les partiels
    await initializePartials();
    const layoutTemplate = await loadTemplate('/src/templates/layout.hbs');

    let eventData = null;
    try {
        eventData = await fetchEventDetail(paramId);
    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
        app.innerHTML = layoutTemplate({ content: '<p>Impossible de charger les événements.</p>' });
        return;
    }


    const formattedEventData = {
        ...eventData,
        start_date: formatDate(eventData.start_date),
        end_date: formatDate(eventData.end_date),
        created_at: formatDate(eventData.created_at),
    };

    const eventDetailsPageTemplate = await loadTemplate('/src/templates/pages/eventDetails.hbs');

    const pageContent = eventDetailsPageTemplate(formattedEventData);


    app.innerHTML = layoutTemplate({ content: pageContent });



}