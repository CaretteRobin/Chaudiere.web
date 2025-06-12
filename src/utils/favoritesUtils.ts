const KEY = 'favorites';

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

export function isFavorite(eventId: string): boolean {
  return getFavorites().includes(eventId);
}

export function initFavoriteButtons() {
  const favoriteButtons = document.querySelectorAll('.favorite-btn');
  favoriteButtons.forEach(button => {
    const eventId = button.getAttribute('data-event-id');
    if (!eventId) return;
    const isFav = isFavorite(eventId);
    updateFavoriteButtonAppearance(button as HTMLElement, isFav);
    button.addEventListener('click', () => {
      toggleFavorite(eventId);
      updateFavoriteButtonAppearance(button as HTMLElement, isFavorite(eventId));
    });
  });
}

export function updateFavoriteButtonAppearance(button: HTMLElement, isFav: boolean) {
  const iconElement = button.querySelector('.favorite-icon');
  if (iconElement) {
    iconElement.innerHTML = isFav
        ? `<img src="/public/images/favorite_24dp_E3E3E3.svg" alt="Favori" width="24" height="24">`
        : `<img src="/public/images/favorite_border_24dp_E3E3E3.svg" alt="Favori" width="24" height="24">`;
  }
  if (isFav) {
    button.classList.remove('bg-gray-100', 'hover:bg-gray-200', 'text-gray-800');
    button.classList.add('bg-red-100', 'hover:bg-red-200', 'text-red-800');
  } else {
    button.classList.remove('bg-red-100', 'hover:bg-red-200', 'text-red-800');
    button.classList.add('bg-gray-100', 'hover:bg-gray-200', 'text-gray-800');
  }
}
