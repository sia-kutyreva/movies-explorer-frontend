import React from "react";
import './Register.css';
import PageWithForm from '../PageWithForm/PageWithForm';

function Register(props) {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <PageWithForm 
      name="type_register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      buttonClassName="button__form-page"
      buttonType="submit"
      onSubmit={handleSubmit}
      link="link"
      text="text"
      authText="Уже зарегистрированы?"
      authLink="Войти"
      path="/signin"
    >
      <fieldset className="form-page__fieldset">
        <label className="form-page__label">Имя</label>
        <input className="form-page__input" 
            name="name" 
            id="user-name"
            type="text"
            min="2"
            max="40"
            autoComplete="on"
            onChange={handleChangeName}
            value={name || ""}
            required
        />
        <span className='form-page__input-error form-page__input-error_active' id='name-input-error'></span>
        <label className="form-page__label">E-mail</label>
        <input className="form-page__input" 
            name="email" 
            id="user-email"
            type="password"
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
            type="text"
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
