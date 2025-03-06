import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from './ProfilePage'; // Adjust path if needed

describe('ProfilePage Component', () => {
  test('renders profile card with user info', () => {
    render(<ProfilePage />);
    
    expect(screen.getByText('First Last')).toBeInTheDocument();
    expect(screen.getByText('Sample Company Name')).toBeInTheDocument();
    expect(screen.getByText('sampleemail@sample.com')).toBeInTheDocument();
    expect(screen.getByText('555.555.5555')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Edit Profile/i })).toBeInTheDocument();
  });

  test('switches to edit mode when clicking "Edit Profile"', () => {
    render(<ProfilePage />);
    
    const editButton = screen.getByRole('button', { name: /Edit Profile/i });
    fireEvent.click(editButton);
    
    expect(screen.getByRole('textbox', { name: /Name:/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  test('updates name input field and saves changes', () => {
    render(<ProfilePage />);
    
    fireEvent.click(screen.getByRole('button', { name: /Edit Profile/i }));
    
    const nameInput = screen.getByRole('textbox', { name: /Name:/i });
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    
    expect(screen.getByText('New Name')).toBeInTheDocument();
  });

  test('cancels edits and restores original data', () => {
    render(<ProfilePage />);
    
    fireEvent.click(screen.getByRole('button', { name: /Edit Profile/i }));
    
    const nameInput = screen.getByRole('textbox', { name: /Name:/i });
    fireEvent.change(nameInput, { target: { value: 'Temporary Name' } });
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    
    expect(screen.getByText('First Last')).toBeInTheDocument();
  });

  test('saves changes when Enter is pressed', () => {
    render(<ProfilePage />);
    
    fireEvent.click(screen.getByRole('button', { name: /Edit Profile/i }));
    
    const nameInput = screen.getByRole('textbox', { name: /Name:/i });
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
    fireEvent.keyDown(nameInput, { key: 'Enter', code: 'Enter' });
    
    expect(screen.getByText('Updated Name')).toBeInTheDocument();
  });
});
