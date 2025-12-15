import { cats } from '../../constants';
import './_cat-tag.scss';

export function createCatTag(cat, count, checked) {
  const catTag = document.createElement('label');
  catTag.htmlFor = cat;
  catTag.classList.add('cat-tag');

  const isTagDisabled = !count && cat !== 'all';
  if (isTagDisabled) {
    catTag.classList.add('cat-tag--disabled');
  }

  const catTagHTML = `
    <input
      class="cat-tag__input"
      type="radio"
      id="${cat}"
      name="course-cat"
      value="${cat}"
      ${checked ? 'checked' : ''}
      ${isTagDisabled ? 'disabled' : ''}
    />
    <div class="cat-tag__content">
      <span class="cat-tag__text">${cats[cat]}</span>
      <sup class="cat-tag__counter">${count || 0}</sup>
    </div>
  `;

  catTag.innerHTML = catTagHTML;
  return catTag;
}
