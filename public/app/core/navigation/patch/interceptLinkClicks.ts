import { locationService, navigationLogger } from '@grafana/runtime';

export function interceptLinkClicks(e: MouseEvent) {
  const anchor = getParentAnchor(e.target as HTMLElement);

  if (anchor) {
    const href = anchor.getAttribute('href');
    const target = anchor.getAttribute('target');

    if (href && !target) {
      navigationLogger('utils', false, 'intercepting link click', e);
      e.preventDefault();
      locationService.push(href);
    }
  }
}

function getParentAnchor(element: HTMLElement | null): HTMLElement | null {
  while (element !== null && element.tagName) {
    if (element.tagName.toUpperCase() === 'A') {
      return element;
    }
    element = element.parentNode as HTMLElement;
  }

  return null;
}