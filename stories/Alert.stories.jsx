import { Alert } from '../react/index.js';

export default {
  title: 'Components/Alert',
  component: Alert,
  args: { children: 'Registration closes on Friday at 18:00.' },
  argTypes: { variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] } },
};

export const Info = {};
export const Success = { args: { variant: 'success', title: 'Saved', children: 'Your changes are published.' } };
export const Warning = { args: { variant: 'warning', title: 'Check the date', children: 'This event overlaps with another one.' } };
export const Danger = { args: { variant: 'danger', title: 'Could not save', children: 'Check your connection and try again.' } };
export const WithoutIcon = { args: { icon: false } };
export const LongText = {
  args: { variant: 'warning', title: 'Heads up', children: 'Long messages must wrap on a 360px phone screen without clipping, so this sentence keeps going to prove that the layout holds up when the text is much longer than usual.' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};
