import { Button } from '../react/index.js';

export default {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Save changes' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'neutral', 'ghost', 'danger', 'danger-secondary'] },
    size: { control: 'inline-radio', options: ['medium', 'small'] },
  },
};

export const Primary = {};
export const Secondary = { args: { variant: 'secondary' } };
export const Neutral = { args: { variant: 'neutral' } };
export const Ghost = { args: { variant: 'ghost' } };
export const Danger = { args: { variant: 'danger', children: 'Delete event' } };
export const DangerSecondary = { args: { variant: 'danger-secondary', children: 'Delete event' } };
export const Small = { args: { size: 'small' } };
export const Disabled = { args: { disabled: true } };
export const Loading = { args: { loading: true, children: 'Saving…' } };
export const FullWidth = { args: { fullWidth: true } };
export const AsLink = { args: { href: '/events', variant: 'secondary', children: 'See events' } };
export const IconOnly = {
  args: { iconOnly: true, variant: 'ghost', 'aria-label': 'Close', children: '×' },
};
export const LongLabel = {
  args: { children: 'Register for the European Slackline Championship highline competition' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};
