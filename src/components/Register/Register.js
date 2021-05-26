import React, { useEffect } from "react";
import './Register.css';
import PageWithForm from '../PageWithForm/PageWithForm';
import { useFormWithValidation } from '../../utils/useFormHook';

function Register({
  onRegister,
  registerErrors,
  handleRegisterErrors,
  isProcessingRequest,
  setIsProcessingRequest,
}) 
{
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values);
    setIsProcessingRequest(true);
  }

  useEffect(()=> {
    handleRegisterErrors('');
  }, [values])

  useEffect(()=> {
    return resetForm();
  }, [])

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
      isValid={isValid}
      apiErrors={registerErrors}
      isProcessingRequest={isProcessingRequest}
    >
      <fieldset className="form-page__fieldset">
        <label className="form-page__label">Имя</label>
        <input className={`form-page__input ${errors.name ? 'form-page__input-error_active' : ''}`} 
            name="name" 
            id="user-name"
            type="text"
            minLength="2"
            maxLength="40"
            autoComplete="off"
            onChange={handleChange}
            value={values.name || ""}
            pattern="^[а-яёА-ЯЁa-zA-Z '.-]*$"
            disabled={isProcessingRequest ? true : false}
            required
        />
        <span className='form-page__input-error' id='name-input-error'>{errors.name || ''}</span>
        <label className="form-page__label">E-mail</label>
        <input className={`form-page__input ${errors.email ? 'form-page__input-error_active' : ''}`} 
            name="email" 
            id="user-email"
            type="email"
            autoComplete="off"
            onChange={handleChange}
            value={values.email || ""}
            disabled={isProcessingRequest ? true : false}
            required
        />
        <span className='form-page__input-error' id='email-input-error'>{errors.email || ''}</span>
        <label className="form-page__label">Пароль</label>
        <input className={`form-page__input ${errors.password ? 'form-page__input-error_active' : ''}`} 
            name="password"
            id="user-password"
            type="password"
            minLength="8"
            autoComplete="off"
            onChange={handleChange}
            value={values.password || ""}
            disabled={isProcessingRequest ? true : false}
            required
        />
        <span className='form-page__input-error' id='password-input-error'>{errors.password || ''}</span>
      </fieldset>
    </PageWithForm>
  )
  
}

export default Register;
