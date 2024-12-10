import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders Competition component for root route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Competitions')).toBeInTheDocument();
});

test('renders AceApply component for /ace-apply route', () => {
  render(
    <MemoryRouter initialEntries={['/ace-apply']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Tier 1- Innovation Grant Award Justification Narrative')).toBeInTheDocument();
});

test('renders Login component for /login route', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Welcome to PitchSuite')).toBeInTheDocument();
});

test('handles navigation to SignUpPage from Login page', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText('No Account? Click here to Sign Up'));
  expect(screen.getByText('Welcome to PitchSuite')).toBeInTheDocument();
});

test('handles navigation to Home page from Login page', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText('Home'));
  expect(screen.getByText('Competitions')).toBeInTheDocument();
});

test('renders SignUpPage component for /signup route', () => {
  render(
    <MemoryRouter initialEntries={['/signup']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Welcome to PitchSuite')).toBeInTheDocument();
});

test('handles navigation to Login page from SignUpPage', () => {
  render(
    <MemoryRouter initialEntries={['/signup']}>
      <App />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText('Login'));
  expect(screen.getByText('Welcome to PitchSuite')).toBeInTheDocument();
});

test('renders ProfilePage component for /profile route', () => {
  render(
    <MemoryRouter initialEntries={['/profile']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Applications')).toBeInTheDocument();
  expect(screen.getAllByText('First Last').length).toBeGreaterThan(0);
});

test('renders all competition cards on Competition page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Accelerate California Entrepeneurship Pitch Competition')).toBeInTheDocument();
  expect(screen.getByText('Fowler Business Concept Challenge')).toBeInTheDocument();
  expect(screen.getByText('Fowler Global Social Innovation Challenge')).toBeInTheDocument();
  expect(screen.getByText('Torero Entrepeneurship Challenge')).toBeInTheDocument();
});

test('handles navigation to AceApply page from Competition page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  fireEvent.click(screen.getAllByText('Apply Now')[0]);
  expect(screen.getByText('Tier 1- Innovation Grant Award Justification Narrative')).toBeInTheDocument();
});
