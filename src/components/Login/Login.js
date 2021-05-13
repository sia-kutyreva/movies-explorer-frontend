import React from "react";
import './Login.css';
import PageWithForm from '../PageWithForm/PageWithForm';

function Register(props) {


  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    //setErrors([{ key: "email", value: false }]);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    //setErrors([{ key: "password", value: false }]);
  };

  const handleSubmit = (e) => {
    e.prevent.default();
  };

  return (
    <PageWithForm 
      name="type_login"
      title="Рады видеть!"
      buttonText="Войти"
      buttonClassName="button__form-page"
      buttonType="submit"
      onSubmit={handleSubmit}
      link="link"
      text="text"
      authText="Ещё не зарегистрированы?"
      authLink="Регистрация"
      path="/signup"
    >
      <fieldset className="form-page__fieldset">
        <label className="form-page__label">E-mail</label>
        <input className="form-page__input" 
            name="email" 
            id="user-email"
            type="email"
            autoComplete="on"
            onChange={handleChangeEmail}
            value={email || ""}
            required
        />
        <span className='form-page__input-error form-page__input-error_active' id='email-input-error'></span>
        <label className="form-page__label">Пароль</label>
        <input className="form-page__input" 
            name="password"
            id="user-password"
            type="password"
            min="6"
            autoComplete="on"
            onChange={handleChangePassword}
            value={password || ""}
            required
        />
        <span className='form-page__input-error form-page__input-error_active' id='password-input-error'></span>
      </fieldset>
    </PageWithForm>
  )
  
}

export default Register;
