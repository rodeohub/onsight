// Onsight Storybook: loads the built CSS and adds a light/dark switch in the toolbar.
import '../dist/fonts.css';
import '../dist/tokens.css';
import '../dist/components.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  globalTypes: {
    theme: {
      description: 'Onsight theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      // Roles change with data-theme on <html> (docs/foundations/theming.md).
      document.documentElement.dataset.theme = context.globals.theme;
      return (
        <div style={{ background: 'var(--isa-color-surface-default)', color: 'var(--isa-color-text-default)', padding: '1.5rem', minHeight: '100%', fontFamily: 'var(--isa-font-family-body)' }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
    a11y: {
      // 'error' fails the test run on accessibility violations (WCAG rules are Onsight's baseline).
      test: 'error',
    },
  },
};

export default preview;
