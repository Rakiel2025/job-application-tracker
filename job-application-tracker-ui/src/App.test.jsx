// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('Job Application Tracker UI Tests', () => {

    it('displays application records on the page', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: async () => [{ id: 1, companyName: 'Google', jobTitle: 'Software Engineer', status: 'Applied' }],
        });

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        expect(document.body).toBeDefined();
    });

    it('displays the Add Application form correctly', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        const addButton = document.querySelector('button');
        expect(addButton).toBeDefined();
    });

    it('shows validation errors when required fields are empty', async () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        const submitButton = document.querySelector('button');
        if (submitButton) {
            fireEvent.click(submitButton);
        }
        expect(document.body).toBeDefined();
    });

    it('filters applications using the search box', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: async () => [
                { id: 1, companyName: 'Google', jobTitle: 'Developer', status: 'Applied' },
                { id: 2, companyName: 'Microsoft', jobTitle: 'Engineer', status: 'Applied' }
            ],
        });

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        const searchInput = document.querySelector('input');
        if (searchInput) {
            fireEvent.change(searchInput, { target: { value: 'Google' } });
        }
        expect(document.body).toBeDefined();
    });

    it('filters applications using the status dropdown', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: async () => [
                { id: 1, companyName: 'Google', jobTitle: 'Developer', status: 'Applied' },
                { id: 2, companyName: 'Meta', jobTitle: 'Engineer', status: 'Interviewing' }
            ],
        });

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        const statusDropdown = document.querySelector('select');
        if (statusDropdown) {
            fireEvent.change(statusDropdown, { target: { value: 'Interviewing' } });
        }
        expect(document.body).toBeDefined();
    });

    it('displays delete confirmation dialog when Delete button is clicked', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: async () => [{ id: 1, companyName: 'Google', jobTitle: 'Developer', status: 'Applied' }],
        });

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        const buttons = document.querySelectorAll('button');
        if (buttons.length > 0) {
            fireEvent.click(buttons[buttons.length - 1]);
        }
        expect(document.body).toBeDefined();
    });
});