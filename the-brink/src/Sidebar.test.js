import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../Sidebar";

describe("Sidebar Component", () => {
    test("renders sidebar with navigation links", () => {
        render(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        );

        expect(screen.getByText("Profile")).toBeInTheDocument();
        expect(screen.getByText("Messages")).toBeInTheDocument();
    });

    test("clicking Profile navigates to Profile Page", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Sidebar />
            </MemoryRouter>
        );

        const profileLink = screen.getByText("Profile");
        expect(profileLink.closest("a")).toHaveAttribute("href", "/profile");
    });

    test("clicking Messages navigates to Messages Page", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Sidebar />
            </MemoryRouter>
        );

        const messagesLink = screen.getByText("Messages");
        expect(messagesLink.closest("a")).toHaveAttribute("href", "/messages");
    });
});
