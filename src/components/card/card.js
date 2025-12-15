import { cats } from '../../constants';
import './_card.scss';

const tagClassByCat = {
  marketing: 'card__tag--cat-marketing',
  management: 'card__tag--cat-management',
  'hr-recruiting': 'card__tag--cat-hr',
  design: 'card__tag--cat-design',
  development: 'card__tag--cat-dev',
};

export function createCard(course) {
  const catText = cats[course.cat] || '';
  const catClass = tagClassByCat[course.cat] || '';

  const cardHTML = `
    <img
      src="${course.image}"
      alt="${course.title}"
      loading="lazy"
      class="card__image"
    >
    <div class="card__content">
      <span class="card__tag ${catClass}">
        ${catText}
      </span>
      <h2 class="card__title">
        ${course.title}
      </h2>
      <div class="card__footer">
        <span class="card__price">
          $${course.price}
        </span>
        <span class="card__author">
          ${course.author}
        </span>
      </div>
    </div>
  `;

  const card = document.createElement('article');
  card.classList.add('card');
  card.setAttribute('data-cat', course.cat);

  card.innerHTML = cardHTML;

  return card;
}
