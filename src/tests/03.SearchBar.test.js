import React from 'react';
import { screen, cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import Provider from '../context/Provider';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('SearchBar component tests', () => {
  afterEach(cleanup);
  it('Testar se os componentes do header estão aparecendo ao pesquisar por name', () => {
    jest.spyOn(global, 'fetch');
    const history = createMemoryHistory();
    render(<Provider><SearchBar title="Foods" history={ history } /></Provider>)
    const SEARCH_INPUT = screen.getByTestId('search-input');
    const INGRE_RADIO = screen.getByTestId('ingredient-search-radio');
    const NAME_RADIO = screen.getByTestId('name-search-radio');
    const FIRST_RADIO = screen.getByTestId('first-letter-search-radio');
    const BTN_SEARCH = screen.getByTestId('exec-search-btn');

    expect(SEARCH_INPUT).toBeInTheDocument();
    expect(INGRE_RADIO).toBeInTheDocument();
    expect(NAME_RADIO).toBeInTheDocument();
    expect(FIRST_RADIO).toBeInTheDocument();
    expect(BTN_SEARCH).toBeInTheDocument();

    userEvent.type(SEARCH_INPUT, 'chicken');
    userEvent.click(NAME_RADIO);
    userEvent.click(BTN_SEARCH);

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken");

    userEvent.click(INGRE_RADIO);
    userEvent.click(BTN_SEARCH);

    expect(fetch).toHaveBeenCalledTimes(4);
    expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken");

    render(<Provider><SearchBar title="Foods" history={ history } /></Provider>)

    userEvent.type(FIRST_RADIO, 'a');
    userEvent.click(NAME_RADIO);
    userEvent.click(BTN_SEARCH);
    
    expect(fetch).toHaveBeenCalledTimes(7);
  });
});
