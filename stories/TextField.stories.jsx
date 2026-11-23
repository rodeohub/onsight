import { TextField } from '../react/index.js';

export default {
  title: 'Components/TextField',
  component: TextField,
  args: { label: 'Email address', name: 'email', type: 'email' },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
};

export const Default = {};
export const WithHelp = { args: { help: 'We only use it to confirm your registration.' } };
export const Optional = { args: { label: 'Club name', type: 'text', optional: true } };
export const Error = { args: { error: 'Enter an email address like name@example.com.', defaultValue: 'name@' } };
export const HelpAndError = {
  args: { help: 'We only use it to confirm your registration.', error: 'Enter an email address like name@example.com.', defaultValue: 'name@' },
};
export const Disabled = { args: { disabled: true, defaultValue: 'locked@example.com' } };
export const Required = { args: { required: true } };
export const LongLabel = {
  args: { label: 'Name of the person who will collect the starter pack at the event on the first day', type: 'text' },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
};
