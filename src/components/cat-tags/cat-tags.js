import { cats, INITIAL_CARDS_COUNT } from '../../constants';
import { setState, state, subscribe } from '../../store';
import { createCatTag } from '../cat-tag/cat-tag';

import './_cat-tags.scss';

let catTagsGroup;

export function createCatTags() {
  const catTags = document.createElement('form');
  catTags.action = '#';
  catTags.classList.add('cat-tags');

  catTagsGroup = document.createElement('fieldset');
  catTagsGroup.classList.add('cat-tags__group');
  const tagsLegend = document.createElement('legend');
  tagsLegend.textContent = 'Select course cat';
  tagsLegend.classList.add('cat-tags__legend');
  catTagsGroup.appendChild(tagsLegend);
  catTags.appendChild(catTagsGroup);

  catTags.addEventListener('change', (event) => {
    setState({
      selectedCat: event.target.value,
      visibleCardsCount: INITIAL_CARDS_COUNT,
    });
  });

  subscribe((state) => {
    if (state.selectedCat !== 'all' && !state.catStats[state.selectedCat]) {
      setState({
        selectedCat: 'all',
      });
    }
    renderCatTags();
  });

  return catTags;
}

export function renderCatTags() {
  catTagsGroup.innerHTML = '';
  Object.keys(cats).forEach((cat) => {
    const catTag = createCatTag(
      cat,
      state.catStats[cat],
      cat === state.selectedCat
    );
    catTagsGroup.appendChild(catTag);
  });
}
