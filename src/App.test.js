import { render } from '@testing-library/react';
import App from './App';
import SponsorCategoryWidget from './components/SponsorCategoryWidget';

test('renders App without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});

test('renders SponsorCategoryWidget in shared matchday mode without crashing', () => {
  const { container } = render(
    <SponsorCategoryWidget categoryParam="wedstrijdenbal" />
  );
  expect(container).toBeInTheDocument();
});

test('renders SponsorCategoryWidget with small hoofdsponsor without crashing', () => {
  const { container } = render(
    <SponsorCategoryWidget categoryParam="hoofdsponsor" size="small" />
  );
  expect(container).toBeInTheDocument();
});

test('renders SponsorCategoryWidget with individual match sponsors without crashing', () => {
  const { container: c1 } = render(
    <SponsorCategoryWidget categoryParam="wedstrijdsponsor" />
  );
  expect(c1).toBeInTheDocument();

  const { container: c2 } = render(
    <SponsorCategoryWidget categoryParam="balsponsor" />
  );
  expect(c2).toBeInTheDocument();
});

