export const renderEventDetail = (app: HTMLElement, paramId: string | undefined) => {

    app.innerHTML = 'Event details : ' + (paramId ? paramId : 'No ID provided');



}