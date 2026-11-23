import { Card, CardGrid, Badge, Button } from '../react/index.js';

// A plain inline picture, so the stories need no network.
const image = {
  src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'><rect width='320' height='180' fill='%23d9e6dd'/><path d='M0 120 L90 60 L170 110 L240 50 L320 100 V180 H0Z' fill='%23527a63'/></svg>",
  alt: 'Mountain valley with a highline between two peaks',
};

export default {
  title: 'Components/Card',
  component: Card,
  args: { title: 'Swiss Highline Open', meta: 'Bern, Switzerland · 14 to 16 August', children: <p>Open competition for all levels, with a youth category.</p> },
  argTypes: { layout: { control: 'inline-radio', options: ['vertical', 'horizontal'] }, titleAs: { control: 'select', options: ['h2', 'h3', 'h4', 'h5', 'h6'] } },
  decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>],
};

export const Default = {};
export const WithImage = { args: { image } };
export const Clickable = { args: { image, href: '/events/42' } };
export const Elevated = { args: { image, elevated: true } };
export const Horizontal = { args: { image, layout: 'horizontal' } };
export const WithFooter = {
  args: { image, footer: <><Badge color="blue">Highline</Badge> <Button size="small" variant="secondary">Register</Button></> },
};
export const LongTitle = {
  args: { image, title: 'European Slackline Championship with the highline, trickline and waterline competitions' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};
export const Grid = {
  render: () => (
    <CardGrid>
      {['Swiss Highline Open', 'Trickline Masters', 'Waterline Cup'].map((t) => (
        <Card key={t} title={t} image={image} meta="August" href="#" />
      ))}
    </CardGrid>
  ),
  decorators: [(Story) => <div style={{ maxWidth: 960 }}><Story /></div>],
};
