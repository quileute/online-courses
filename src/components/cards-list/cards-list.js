import { state, subscribe } from '../../store';
import { createCard } from '../card/card';

import './_cards-list.scss';

let cardsList;

export function createCardsList() {
  cardsList = document.createElement('main');
  cardsList.classList.add('cards-list');

  subscribe((_store) => {
    renderCardsList();
  });

  return cardsList;
}

export function renderCardsList() {
  cardsList.innerHTML = '';
  if (state.visibleCourses.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent =
      'Sorry, no courses found matching your criteria.';
    noResultsMessage.classList.add('cards-list__no-results-message');
    cardsList.appendChild(noResultsMessage);
  } else {
    state.visibleCourses.forEach((course) => {
      const card = createCard(course);
      cardsList.appendChild(card);
    });
  }
}
