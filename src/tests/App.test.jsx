import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders header', () => {
  render(<App />);
  const header = screen.getByText(/REST Countries Explorer/i);
  expect(header).toBeInTheDocument();
});
