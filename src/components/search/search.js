import { INITIAL_CARDS_COUNT } from '../../constants';
import { setState } from '../../store';
import { debounce } from '../../utils';
import './_search.scss';

export function createSearch() {
  const search = document.createElement('form');
  search.action = '#';
  search.classList.add('search');

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('search__input');
  searchInput.placeholder = 'Search course...';

  searchInput.addEventListener(
    'input',
    debounce((event) => {
      setState({
        searchQuery: event.target.value.toLowerCase(),
        visibleCardsCount: INITIAL_CARDS_COUNT,
      });
    }, 300)
  );

  search.appendChild(searchInput);
  return search;
}
