import { LOAD_MORE_COUNT } from '../../constants';
import { setState, state, subscribe } from '../../store';
import './_load-more-button.scss';

export function createLoadMoreButton() {
  const loadMoreButton = document.createElement('button');
  loadMoreButton.classList.add('load-more-button');
  loadMoreButton.textContent = 'Load more';

  loadMoreButton.addEventListener('click', () => {
    setState({
      visibleCardsCount: Math.min(
        state.catQueryCourses.length,
        state.visibleCardsCount + LOAD_MORE_COUNT
      ),
    });
  });

  subscribe((state) => {
    if (state.visibleCardsCount >= state.catQueryCourses.length) {
      loadMoreButton.classList.add('load-more-button--hidden');
    } else {
      loadMoreButton.classList.remove('load-more-button--hidden');
    }
  });

  return loadMoreButton;
}
