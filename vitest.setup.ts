import '@testing-library/jest-dom';

if (typeof window !== 'undefined' && typeof window.ResizeObserver === 'undefined') {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: ResizeObserver,
  });
  Object.defineProperty(global, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: ResizeObserver,
  });
}
