type RouteHandler = () => void;

const routes: Record<string, RouteHandler> = {};

export function registerRoute(path: string, handler: RouteHandler) {
  routes[path] = handler;
}

export function navigateTo(path: string) {
  history.pushState({}, '', path);
  routes[path]?.();
}

window.addEventListener('popstate', () => {
  routes[location.pathname]?.();
});
