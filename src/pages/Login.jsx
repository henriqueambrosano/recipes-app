import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecepiesAppContext from '../context/RecepiesAppContext';

function Login({ history }) {
  const { setEstado,
    estado: { email, password, isDisabled } } = useContext(RecepiesAppContext);

  const handleValidation = () => {
    const PASSWORD_LENGTH = 6;
    // regex obtido através de:
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const isValidated = regex.test(email);
    if (password.length >= PASSWORD_LENGTH && isValidated) {
      setEstado((estadoAntigo) => ({ ...estadoAntigo, isDisabled: false }));
    } else {
      setEstado((estadoAntigo) => ({ ...estadoAntigo, isDisabled: true }));
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setEstado((estadoAntigo) => ({ ...estadoAntigo, [name]: value }));
    handleValidation();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const userData = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    setEstado({ email: '', password: '', isDisabled: true });
    history.push('/foods');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          data-testid="email-input"
          name="email"
          placeholder="user@email.com"
          onChange={ handleChange }
          value={ email }
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          data-testid="password-input"
          name="password"
          placeholder="******"
          onChange={ handleChange }
          value={ password }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Enter
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
