import { Badge } from '../react/index.js';

const categories = ['neutral', 'brand', 'red', 'green', 'blue', 'teal', 'orange', 'yellow', 'pink', 'violet', 'purple'];
const statuses = ['success', 'danger', 'warning', 'info'];

export default {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Youth' },
  argTypes: {
    color: { control: 'select', options: [...categories, ...statuses] },
    variant: { control: 'inline-radio', options: ['soft', 'outline'] },
  },
};

export const Default = {};
export const Outline = { args: { variant: 'outline' } };

const row = (colors, variant) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    {colors.map((c) => <Badge key={c} color={c} variant={variant}>{c}</Badge>)}
  </div>
);
export const AllCategoryColors = { render: () => row(categories) };
export const AllStatusColors = { render: () => row(statuses) };
export const AllOutline = { render: () => row([...categories, ...statuses], 'outline') };
