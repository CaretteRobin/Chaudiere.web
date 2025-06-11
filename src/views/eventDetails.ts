export const renderEventDetail = (app: HTMLElement, paramId: string | undefined) => {

    const pageContent = homePageTemplate({ eventsContent: eventsHtml });

    app.innerHTML = layoutTemplate({ content: pageContent });



}