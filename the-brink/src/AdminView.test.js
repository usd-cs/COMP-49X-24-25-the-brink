import { render, screen, fireEvent } from '@testing-library/react';
import AdminView from './AdminView';
import '@testing-library/jest-dom/extend-expect';

// Test Suite for AdminView
describe('AdminView Component', () => {
  test('renders competition dropdown with default value', () => {
    render(<AdminView />);
    const competitionDropdown = screen.getByRole('combobox', { name: /competition/i });
    expect(competitionDropdown).toBeInTheDocument();
    expect(competitionDropdown).toHaveValue('Ace Competition');
  });

  test('renders user type dropdown with default value', () => {
    render(<AdminView />);
    const userTypeDropdown = screen.getByRole('combobox', { name: /user type/i });
    expect(userTypeDropdown).toBeInTheDocument();
    expect(userTypeDropdown).toHaveValue('Founders');
  });

  test('changes competition when a new value is selected', () => {
    render(<AdminView />);
    const competitionDropdown = screen.getByRole('combobox', { name: /competition/i });
    fireEvent.change(competitionDropdown, { target: { value: 'Fowler Business Concept Challenge' } });
    expect(competitionDropdown).toHaveValue('Fowler Business Concept Challenge');
  });

  test('changes user type when a new value is selected', () => {
    render(<AdminView />);
    const userTypeDropdown = screen.getByRole('combobox', { name: /user type/i });
    fireEvent.change(userTypeDropdown, { target: { value: 'Judges' } });
    expect(userTypeDropdown).toHaveValue('Judges');
  });

  test('renders the competition table with correct headers', () => {
    render(<AdminView />);
    const headers = ['Name', 'Address', 'DBA', 'DUNS', 'NAICS', 'Hubzone', 'Rural', 'Women-Owned', 'Minority-Owned'];
    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('renders correct application data in the table', () => {
    render(<AdminView />);
    expect(screen.getByText('ABC Corp')).toBeInTheDocument();
    expect(screen.getByText('123 Business St')).toBeInTheDocument();
    expect(screen.getByText('XYZ Innovations')).toBeInTheDocument();
    expect(screen.getByText('456 Tech Ave')).toBeInTheDocument();
  });
});
