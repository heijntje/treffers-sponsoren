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

test('renders SponsorCategoryWidget in logo-only mode without crashing', () => {
  const { container: c1 } = render(
    <SponsorCategoryWidget categoryParam="hoofdsponsor" mode="logo" theme="transparent" />
  );
  expect(c1).toBeInTheDocument();
  expect(document.documentElement.style.backgroundColor).toBe("transparent");
  expect(document.body.style.backgroundColor).toBe("transparent");

  const { container: c2 } = render(
    <SponsorCategoryWidget categoryParam="wedstrijdsponsor" mode="logo" theme="transparent" />
  );
  expect(c2).toBeInTheDocument();

  const { container: c3 } = render(
    <SponsorCategoryWidget categoryParam="balsponsor" mode="logo" theme="transparent" />
  );
  expect(c3).toBeInTheDocument();

  const { container: c4 } = render(
    <SponsorCategoryWidget categoryParam="wedstrijdenbal" mode="logo" theme="transparent" />
  );
  expect(c4).toBeInTheDocument();
});

