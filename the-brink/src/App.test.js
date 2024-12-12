import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeAll(() => {
  global.alert = jest.fn(); // Mock alert to prevent pop-ups during tests
});

test('renders Competition page by default', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
  const competitionHeading = screen.getByText(/Competitions/i);
  expect(competitionHeading).toBeInTheDocument();
});

test('navigates to the ACE Application Form page', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
  const applyNowButton = screen.getAllByText(/Apply Now/i)[0];
  fireEvent.click(applyNowButton);
  const aceFormTitle = await screen.findByText(/Tier 1- Innovation Grant Award Justification Narrative/i);
  expect(aceFormTitle).toBeInTheDocument();
});

test('renders Login page when Login button is clicked', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
  const loginButton = screen.getByText(/Login/i);
  fireEvent.click(loginButton);
  const loginPageText = await screen.findByText(/Welcome to PitchSuite/i);
  expect(loginPageText).toBeInTheDocument();
});

test('renders Sign-Up page from Login page', async () => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
  });
  const signUpLink = screen.getByText(/No Account\? Click here to Sign Up/i);
  fireEvent.click(signUpLink);
  const signUpHeading = await screen.findByText(/Welcome to PitchSuite/i);
  expect(signUpHeading).toBeInTheDocument();
});

test('form submission on ACE Application Form works', async () => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/ace-apply']}>
        <App />
      </MemoryRouter>
    );
  });
  const corporateNameInput = screen.getByLabelText(/Corporate Name\*:/i);
  const addressInput = screen.getByLabelText(/Address\*:/i);
  const submitButton = screen.getByRole('button', { name: /Submit/i });
  fireEvent.change(corporateNameInput, { target: { value: 'Sample Corp' } });
  fireEvent.change(addressInput, { target: { value: '123 Sample St' } });
  fireEvent.click(submitButton);
  expect(global.alert).toHaveBeenCalledWith('Form Submitted Successfully!');
});

test('renders Profile page with correct user data', async () => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <App />
      </MemoryRouter>
    );
  });
  const userName = screen.getByText((content, element) => element.tagName === 'STRONG' && content === 'First Last');
  const userEmail = screen.getByText(/sampleemail@sample.com/i);
  expect(userName).toBeInTheDocument();
  expect(userEmail).toBeInTheDocument();
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
