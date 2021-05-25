import React, { useEffect } from "react";
import './Login.css';
import PageWithForm from '../PageWithForm/PageWithForm';
import { useFormWithValidation } from '../../utils/useFormHook';

function Login({
  onLogin,
  handleLoginErrors,
  loginErrors,
}) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values);
    resetForm();
  }

  useEffect(()=> {
    handleLoginErrors('');
  }, [values])

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
      isValid={isValid}
      apiErrors={loginErrors}
    >
      <fieldset className="form-page__fieldset">
        <label className="form-page__label">E-mail</label>
        <input className={`form-page__input ${errors.email ? 'form-page__input-error_active' : ''}`} 
            name="email" 
            id="user-email"
            type="email"
            autoComplete="off"
            onChange={handleChange}
            value={values.email || ""}
            required
        />
        <span className='form-page__input-error form-page__input-error_active' id='email-input-error'>{errors.email}</span>
        <label className="form-page__label">Пароль</label>
        <input className={`form-page__input ${errors.password ? 'form-page__input-error_active' : ''}`} 
            name="password"
            id="user-password"
            type="password"
            autoComplete="off"
            onChange={handleChange}
            value={values.password || ""}
            required
        />
        <span className='form-page__input-error form-page__input-error_active' id='password-input-error'>{errors.password}</span>
      </fieldset>
    </PageWithForm>
  )
  
}

export default Login;
