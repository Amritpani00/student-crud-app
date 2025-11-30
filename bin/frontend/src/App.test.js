import { render, screen } from '@testing-library/react';
import App from './App';

test('renders students list heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/Students List/i);
  expect(linkElement).toBeInTheDocument();
});
