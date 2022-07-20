import React from 'react';
import { screen, cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Header from '../components/Header';
import userEvent from '@testing-library/user-event';
import Provider from '../context/Provider';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Header component tests', () => {
  beforeEach(cleanup);
  it('Testar se os componentes do header estão aparecendo', () => {

  });
 
});
