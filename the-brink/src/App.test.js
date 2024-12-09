import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello, World! text', () => {
  render(<App />);
  const headerElement = screen.getByText(/hello, world!/i); // Match "Hello, World!" case-insensitively
  expect(headerElement).toBeInTheDocument();
});
