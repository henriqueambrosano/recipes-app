import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import App from '../App';

describe('Local storage tests', () => {
  beforeEach(cleanup);
  it('Testar componentes caso ja tenha algo no localStorage inProgressRecipes', async () => {
    const { history } = renderWithRouter(<App />);
    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(Storage.prototype, 'getItem')
    localStorage.setItem('doneRecipes', JSON.stringify([{"id":"52977"}]))

    const EMAIL_INPUT = screen.getByTestId('email-input');
    const PASSWORD_INPUT = screen.getByTestId('password-input');
    const LOGIN_BTN = screen.getByTestId('login-submit-btn');
  
    userEvent.type(EMAIL_INPUT, 'trybe@gmail.com');
    userEvent.type(PASSWORD_INPUT, '123456789');
    userEvent.click(LOGIN_BTN);

    expect(history.location.pathname).toBe('/foods');

    const firstFood = await screen.findByTestId('0-card-img');

    expect(firstFood).toBeInTheDocument();

    userEvent.click(firstFood);

    expect(screen.queryByTestId('start-recipe-btn')).not.toBeInTheDocument();
  });
});