import Handlebars from 'handlebars';

// Cache pour éviter de recharger les mêmes templates
const templateCache: Record<string, HandlebarsTemplateDelegate> = {};

export async function loadTemplate(templatePath: string): Promise<HandlebarsTemplateDelegate> {
    // Si le template est déjà en cache, on le renvoie
    if (templateCache[templatePath]) {
        return templateCache[templatePath];
    }

    // Sinon on le charge et on le compile
    try {
        const response = await fetch(templatePath);
        if (!response.ok) {
            throw new Error(`Impossible de charger le template: ${templatePath}`);
        }

        const source = await response.text();
        const template = Handlebars.compile(source);

        // On met en cache pour les prochaines utilisations
        templateCache[templatePath] = template;
        return template;
    } catch (error) {
        console.error('Erreur lors du chargement du template:', error);
        throw error;
    }
}

// Enregistrer des partiels (pour les composants réutilisables)
export async function registerPartial(name: string, templatePath: string): Promise<void> {
    const response = await fetch(templatePath);
    if (!response.ok) {
        throw new Error(`Impossible de charger le partial: ${templatePath}`);
    }

    const source = await response.text();
    Handlebars.registerPartial(name, source);
}

// Initialisation des partiels communs
export async function initializePartials(): Promise<void> {
    await Promise.all([
        registerPartial('header', '/src/components/header.hbs'),
        registerPartial('footer', '/src/components/footer.hbs'),
        registerPartial('eventCard', '/src/components/eventCard.hbs')
    ]);
}