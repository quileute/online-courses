import './_decor.scss';

export function initDecorations(container) {
  const positions = ['top-right', 'bottom-left', 'middle-right'];

  positions.forEach((pos) => {
    const decor = document.createElement('div');
    decor.classList.add('decor', `decor--${pos}`);
    decor.setAttribute('aria-hidden', 'true');
    container.appendChild(decor);
  });
}
