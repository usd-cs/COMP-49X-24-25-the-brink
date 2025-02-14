import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

beforeAll(() => {
  global.alert = jest.fn() // Mock alert to prevent pop-ups during tests
})

test('renders Competition page by default', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
  })
  const competitionHeading = screen.getByText(/Competitions/i)
  expect(competitionHeading).toBeInTheDocument()
})

test('navigates to the ACE Application Form page', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
  })
  const applyNowButton = screen.getAllByText(/Apply Now/i)[0]
  fireEvent.click(applyNowButton)
  const aceFormTitle = await screen.findByText(/Tier 1- Innovation Grant Award Justification Narrative/i)
  expect(aceFormTitle).toBeInTheDocument()
})

test('renders Login page when Login button is clicked', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
  })
  const loginButton = screen.getByText(/Login/i)
  fireEvent.click(loginButton)
  const loginPageText = await screen.findByText(/Welcome to PitchSuite/i)
  expect(loginPageText).toBeInTheDocument()
})

test('renders Sign-Up page from Login page', async () => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    )
  })
  const signUpLink = screen.getByText(/No Account\? Click here to Sign Up/i)
  fireEvent.click(signUpLink)
  const signUpHeading = await screen.findByText(/Welcome to PitchSuite/i)
  expect(signUpHeading).toBeInTheDocument()
})

/**
 * FIXED TEST: Provide all required fields so validation passes
 * and the "Form Submitted Successfully!" alert is triggered.
 */
test('form submission on ACE Application Form works', async () => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/ace-apply']}>
        <App />
      </MemoryRouter>
    );
  });

  // Fill out the required fields
  fireEvent.change(screen.getByLabelText(/Corporate Name\*:/i), { target: { value: 'Sample Corp' } });
  fireEvent.change(screen.getByLabelText(/Address\*:/i), { target: { value: '123 Sample St' } });
  fireEvent.change(screen.getByLabelText(/dba\*:/i), { target: { value: 'Sample DBA' } });
  fireEvent.change(screen.getByLabelText(/DUNS\*:/i), { target: { value: '123456789' } });
  fireEvent.change(screen.getByLabelText(/NAICS\*:/i), { target: { value: '1234' } });

  // If you have 4 separate radio groups for hubZone, rural, womenOwned, and disasterImpacted,
  // you likely have four "Yes" radios. Let's click them all:
  const yesRadios = screen.getAllByRole('radio', { name: /Yes/i });
  // Adjust indices if your "Yes" radios appear in a different order
  fireEvent.click(yesRadios[0]); // hubZone
  fireEvent.click(yesRadios[1]); // rural
  fireEvent.click(yesRadios[2]); // womenOwned
  fireEvent.click(yesRadios[3]); // disasterImpacted

  // Primary contact required fields
  fireEvent.change(screen.getByLabelText(/Primary Contact\*.*Name/i), { target: { value: 'Alice' } });
  fireEvent.change(screen.getByLabelText(/Primary Contact\*.*Title/i), { target: { value: 'CEO' } });
  fireEvent.change(screen.getByLabelText(/Primary Contact\*.*Phone/i), { target: { value: '5551234567' } });
  fireEvent.change(screen.getByLabelText(/Primary Contact\*.*Email/i), { target: { value: 'alice@test.com' } });

  // Secondary contact required fields
  fireEvent.change(screen.getByLabelText(/Secondary Contact\*.*Name/i), { target: { value: 'Bob' } });
  fireEvent.change(screen.getByLabelText(/Secondary Contact\*.*Title/i), { target: { value: 'CFO' } });
  fireEvent.change(screen.getByLabelText(/Secondary Contact\*.*Phone/i), { target: { value: '5557654321' } });
  fireEvent.change(screen.getByLabelText(/Secondary Contact\*.*Email/i), { target: { value: 'bob@test.com' } });

  // SBIR/STTR details
  fireEvent.change(screen.getByLabelText(/Agency\*:/i), { target: { value: 'NASA' } });
  fireEvent.change(screen.getByLabelText(/Award Amount\*:/i), { target: { value: '1000' } });
  fireEvent.change(screen.getByLabelText(/Contract Number\*:/i), { target: { value: 'ABC123' } });
  fireEvent.change(screen.getByLabelText(/Grant Start-End Date\*:/i), { target: { value: '2025-01-01 to 2025-12-31' } });

  // Submit the form
  const submitButton = screen.getByRole('button', { name: /Submit/i });
  fireEvent.click(submitButton);

  // Expect the success alert
  expect(global.alert).toHaveBeenCalledWith('Form Submitted Successfully!');
});

test('renders Profile page with correct user data', async () => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <App />
      </MemoryRouter>
    )
  })
  const userName = screen.getByText((content, element) => element.tagName === 'STRONG' && content === 'First Last')
  const userEmail = screen.getByText(/sampleemail@sample.com/i)
  expect(userName).toBeInTheDocument()
  expect(userEmail).toBeInTheDocument()
})

test('renders all competition cards on Competition page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByText('Accelerate California Entrepeneurship Pitch Competition')).toBeInTheDocument()
  expect(screen.getByText('Fowler Business Concept Challenge')).toBeInTheDocument()
  expect(screen.getByText('Fowler Global Social Innovation Challenge')).toBeInTheDocument()
  expect(screen.getByText('Torero Entrepeneurship Challenge')).toBeInTheDocument()
})

test('handles navigation to AceApply page from Competition page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )
  fireEvent.click(screen.getAllByText('Apply Now')[0])
  expect(screen.getByText('Tier 1- Innovation Grant Award Justification Narrative')).toBeInTheDocument()
})
