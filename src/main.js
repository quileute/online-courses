import { courses as initialCourses } from './courses.js';
import './style.scss';

const categories = {
  all: 'All',
  marketing: 'Marketing',
  management: 'Management',
  'hr-recruiting': 'HR & Recruting',
  design: 'Design',
  development: 'Development',
};

const tagClassByCategory = {
  marketing: 'card__tag--category-marketing',
  management: 'card__tag--category-management',
  'hr-recruiting': 'card__tag--category-hr',
  design: 'card__tag--category-design',
  development: 'card__tag--category-dev',
};

const INITIAL_CARDS_COUNT = 9;
const LOAD_MORE_COUNT = 6;

const state = {
  selectedCategory: 'all',
  searchQuery: '',
  currentCardsCount: INITIAL_CARDS_COUNT,
};

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function getFilteredCourses(courses, category, searchQuery) {
  return courses.filter((course) => {
    const categoryMatch = category === 'all' || course.category === category;
    const searchMatch =
      searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.author.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });
}

function generateCategoryTags(courses) {
  const formElement = document.querySelector('.tags');
  if (!formElement) return;

  const counts = courses.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {});

  counts['all'] = courses.length;

  let tagsHTML = `
    <fieldset class="course-category-group">
      <legend class="course-category-group__legend">Select course category</legend>
  `;

  Object.keys(categories).forEach((cat) => {
    const count = counts[cat] || 0;

    tagsHTML += `
        <label for="${cat}" class="tag">
            <input
              class="tag__input"
              type="radio"
              id="${cat}"
              name="course-category"
              value="${cat}"
              ${cat === 'all' ? 'checked' : ''}
            />
            <div class="tag__content">
              <span class="tag__text">${categories[cat]}</span>
              <sup class="tag__counter">${count}</sup>
            </div>
          </label>
        `;
  });
  tagsHTML += `</fieldset>`;
  formElement.innerHTML = tagsHTML;
}

function updateTagCounters(courses) {
  const counts = courses.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {});

  counts['all'] = courses.length;

  document.querySelectorAll('.tag').forEach((tagLabel) => {
    const categoryValue = tagLabel.htmlFor;
    const counterElement = tagLabel.querySelector('.tag__counter');
    const count = counts[categoryValue] || 0;

    if (counterElement) {
      counterElement.textContent = count;
    }

    const inputElement = tagLabel.querySelector('.tag__input');

    if (count === 0 && categoryValue !== 'all') {
      tagLabel.classList.add('tag--disabled');
      inputElement.disabled = true;
    } else {
      tagLabel.classList.remove('tag--disabled');
      inputElement.disabled = false;
    }
  });
}

function createCard(course) {
  const image = document.createElement('img');
  image.src = course.image;
  image.alt = course.title;
  image.loading = 'lazy';
  image.classList.add('card__image');

  const tag = document.createElement('span');
  tag.classList.add('card__tag');
  if (categories[course.category]) {
    tag.textContent = categories[course.category];
  }
  if (tagClassByCategory[course.category]) {
    tag.classList.add(tagClassByCategory[course.category]);
  }

  const title = document.createElement('h2');
  title.classList.add('card__title');
  title.textContent = course.title;

  const price = document.createElement('span');
  price.classList.add('card__price');
  price.textContent = `$${course.price}`;

  const author = document.createElement('span');
  author.classList.add('card__author');
  author.textContent = course.author;

  const footer = document.createElement('div');
  footer.classList.add('card__footer');
  footer.appendChild(price);
  footer.appendChild(author);

  const content = document.createElement('div');
  content.classList.add('card__content');
  content.appendChild(tag);
  content.appendChild(title);
  content.appendChild(footer);

  const card = document.createElement('article');
  card.classList.add('card');
  card.setAttribute('data-category', course.category);
  card.appendChild(image);
  card.appendChild(content);

  return card;
}

function renderCards(courses, limit) {
  const limitedCourses = limit ? courses.slice(0, limit) : courses;
  const cardContainer = document.querySelector('main.main');
  cardContainer.innerHTML = '';

  if (limitedCourses.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent =
      'Sorry, no courses found matching your criteria.';
    noResultsMessage.classList.add('no-results-message');
    cardContainer.appendChild(noResultsMessage);
  } else {
    limitedCourses.forEach((course) => {
      const card = createCard(course);
      cardContainer.appendChild(card);
    });
  }

  if (limitedCourses.length >= courses.length) {
    loadMoreButton.classList.add('load-more__button--hidden');
  } else {
    loadMoreButton.classList.remove('load-more__button--hidden');
  }
}

document.querySelector('.tags').addEventListener('change', (event) => {
  state.currentCardsCount = INITIAL_CARDS_COUNT;
  state.selectedCategory = event.target.value;
  const filteredCourses = getFilteredCourses(
    initialCourses,
    state.selectedCategory,
    state.searchQuery
  );
  renderCards(filteredCourses, state.currentCardsCount);
});

const searchInput = document.querySelector('.search__input');
if (searchInput) {
  searchInput.addEventListener(
    'input',
    debounce((event) => {
      state.currentCardsCount = INITIAL_CARDS_COUNT;
      state.searchQuery = event.target.value.toLowerCase();
      const coursesByQuery = getFilteredCourses(
        initialCourses,
        'all',
        state.searchQuery
      );
      updateTagCounters(coursesByQuery);
      const coursesByQueryAndCategory = getFilteredCourses(
        initialCourses,
        state.selectedCategory,
        state.searchQuery
      );
      renderCards(coursesByQueryAndCategory, state.currentCardsCount);
    }, 300)
  );
}

const loadMoreButton = document.querySelector('.load-more__button');
loadMoreButton.addEventListener('click', () => {
  const filteredCourses = getFilteredCourses(
    initialCourses,
    state.selectedCategory,
    state.searchQuery
  );
  state.currentCardsCount = Math.min(
    state.currentCardsCount + LOAD_MORE_COUNT,
    filteredCourses.length
  );
  renderCards(filteredCourses, state.currentCardsCount);
});

generateCategoryTags(initialCourses);
renderCards(initialCourses, state.currentCardsCount);
