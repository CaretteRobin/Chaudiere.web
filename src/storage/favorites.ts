const KEY = 'favorites';

// event id's are UUIDs

export function getFavorites(): string[] {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function toggleFavorite(eventId: string) {
  const current = getFavorites();
  const index = current.indexOf(eventId);
  if (index === -1) {
    current.push(eventId);
  } else {
    current.splice(index, 1);
  }
  localStorage.setItem(KEY, JSON.stringify(current));
}

export function isFavorite(eventId: number): boolean {
  return getFavorites().includes(eventId);
}
