import {
  createCatTags,
  renderCatTags,
} from './components/cat-tags/cat-tags.js';
import { createSearch } from './components/search/search.js';
import {
  createCardsList,
  renderCardsList,
} from './components/cards-list/cards-list.js';
import { createLoadMoreButton } from './components/load-more-button/load-more-button.js';

import './styles/base.scss';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.querySelector('.app-container');

  const decorationMiddleRight = document.createElement('div');
  decorationMiddleRight.classList.add('decoration-middle-right');
  appContainer.appendChild(decorationMiddleRight);

  const container = document.createElement('div');
  container.classList.add('container');

  const subHeading = document.createElement('h6');
  subHeading.classList.add('subheading');
  subHeading.textContent = 'Enjoy your studying!';

  const heading = document.createElement('h1');
  heading.classList.add('heading');
  heading.textContent = 'Our online courses';

  const header = document.createElement('header');
  header.classList.add('header');

  const catTags = createCatTags();
  catTags.classList.add('header__cat-tags');

  header.appendChild(catTags);
  header.appendChild(createSearch());

  const cardsList = createCardsList();

  const loadMoreButton = createLoadMoreButton();
  loadMoreButton.classList.add('container__load-more-button');

  container.appendChild(subHeading);
  container.appendChild(heading);
  container.appendChild(header);
  container.appendChild(cardsList);
  container.appendChild(loadMoreButton);

  appContainer.appendChild(container);

  renderCatTags();
  renderCardsList();
});
