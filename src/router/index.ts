type RouteParams = Record<string, string>;
type RouteHandler = (params?: RouteParams) => void;

interface Route {
  pattern: RegExp;
  handler: RouteHandler;
  params: string[];
}

const routes: Route[] = [];

export function registerRoute(path: string, handler: RouteHandler) {
  // Recherche des paramètres dans le chemin (format: {paramName})
  const paramNames: string[] = [];
  const pattern = path.replace(/{([^/]+)}/g, (_, paramName) => {
    paramNames.push(paramName);
    return '([^/]+)';
  });

  // Création de l'expression régulière pour matcher le chemin
  const regExp = new RegExp(`^${pattern}$`);

  routes.push({
    pattern: regExp,
    handler,
    params: paramNames
  });
}

function findRouteMatch(path: string): { route: Route; params: RouteParams } | null {
  for (const route of routes) {
    const match = path.match(route.pattern);
    if (match) {
      const params: RouteParams = {};
      // Premier élément est le match complet, on commence à l'index 1
      route.params.forEach((paramName, index) => {
        params[paramName] = match[index + 1];
      });
      return { route, params };
    }
  }
  return null;
}

export function navigateTo(path: string) {
  history.pushState({}, '', path);
  handleRouteChange();
}

function handleRouteChange() {
  const path = location.pathname;
  const routeMatch = findRouteMatch(path);

  if (routeMatch) {
    routeMatch.route.handler(routeMatch.params);
  } else {
    console.warn(`Route non trouvée: ${path}`);
    // Option: rediriger vers une page 404 ou la page d'accueil
  }
}

window.addEventListener('popstate', handleRouteChange);