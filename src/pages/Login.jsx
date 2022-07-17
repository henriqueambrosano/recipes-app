import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecepiesAppContext from '../context/RecepiesAppContext';

function Login({ history }) {
  const { setEmail, email,
    setPassword, password, setToggle } = useContext(RecepiesAppContext);

  const handleValidation = () => {
    const PASSWORD_LENGTH = 6;
    // regex obtido através de:
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const isValidated = regex.test(email);
    if (password.length >= PASSWORD_LENGTH && isValidated) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  const handleEmail = ({ target: { value } }) => {
    console.log(value);
    setEmail(value);
    handleValidation();
  };
  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
    handleValidation();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
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
          onChange={ handleEmail }
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          data-testid="password-input"
          name="password"
          placeholder="******"
          onChange={ handlePassword }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        // onClick={ handleValidation }
        disabled={ handleValidation }
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
