import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CompetitionDetails from "./CompetitionDetails";
import AceApply from "./AceApply"
import { MemoryRouter, Route, Routes } from "react-router-dom";

test('Renders the Left Side Screen', () => {

    render(<MemoryRouter initialEntries={['/Competitions-Details-Test']}>
        <Routes>
            <Route path="/Competitions-Details-Test" element={<CompetitionDetails />} />
        </Routes>
    </MemoryRouter>);
    
    expect(screen.getByText('Background Information')).toBeInTheDocument();
    expect(screen.getByText('Requirements')).toBeInTheDocument();
    expect(screen.getByText('Important Information')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Competitions/i })).toBeInTheDocument();
});
  
test('Renders the Right Side Screen', () => {

    render(<MemoryRouter initialEntries={['/Competitions-Details-Test']}>
        <Routes>
            <Route path="/Competitions-Details-Test" element={<CompetitionDetails />} />
        </Routes>
    </MemoryRouter>);
    
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', 'aceCircleLogo.png');
    expect(imageElement).toHaveAttribute('alt', 'Ace Pitch Competition Logo');
    expect(screen.getByRole('button', { name: /Apply Here!/i })).toBeInTheDocument();
});

// test('Navigates to the Competition Application if the Apply Here Button is clicked', () => {

//     jest.mock('react-router-dom', () => ({
//         useNavigate: () => jest.fn(),
//     }));

//     render(<MemoryRouter initialEntries={['/Competitions-Details-Test']}>
//         <Routes>
//             <Route path= "/Competitions-Details-Test" element={<CompetitionDetails />} />
//             <Route path= "/Ace-Application-Test" element={<AceApply />} />
//         </Routes>
//     </MemoryRouter>);

//     const mockNavigate = jest.fn();
//     jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

//     const button = screen.getByRole('button', { name: /Apply Here!/i });
//     fireEvent.click(button);
//     expect(screen.getByText('Business Information')).toBeInTheDocument();
    
// });