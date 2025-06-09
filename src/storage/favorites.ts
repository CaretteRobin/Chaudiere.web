const KEY = 'favorites';

export function getFavorites(): number[] {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function toggleFavorite(eventId: number) {
  const current = getFavorites();
  const index = current.indexOf(eventId);
  if (index >= 0) current.splice(index, 1);
  else current.push(eventId);
  localStorage.setItem(KEY, JSON.stringify(current));
}

export function isFavorite(eventId: number): boolean {
  return getFavorites().includes(eventId);
}
