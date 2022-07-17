import React from 'react';

function Login() {
  // const handleChange = ({target:{name, value}} => ())
  const handleSubmit = (evt) => {
    evt.preventDefault();
  };
  return (
    <main>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          data-testid="email-input"
          name="email"
          placeholder="user@email.com"
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          data-testid="password-input"
          name="password"
          placeholder="******"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
      >
        Enter
      </button>
    </main>
  );
}

export default Login;
