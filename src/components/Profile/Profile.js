import React, { useContext } from 'react';
import './Profile.css';
import Button from '../Button/Button';
import { CurrentUserContext } from '../../contexts/UserContext';
import { useFormWithValidation } from '../../utils/useFormHook';


function Profile({
  signOut,
  onUpdateProfile,
  setIsLoading,
  isProcessingRequest,
  setIsProcessingRequest,
}) {

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    setIsProcessingRequest(true);
    onUpdateProfile({
      name: values.name || currentUser.name,
      email: values.email || currentUser.email,
    });
  }

  function handleSignOut() {
    setIsLoading(true);
    signOut();
  }

  const isProfileChanged = isValid && (values.name !== currentUser.name || values.email !== currentUser.email);

  const initialValue = () => {
    setValues({
      name: currentUser.name,
      email: currentUser.email
    })
  }

  React.useEffect(() => {
    initialValue();
  }, [])
 
  return (
    <>
      <section className="profile">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
              <fieldset className="profile__fieldset">
                <label className={`profile__label ${errors.name ? 'profile__label-error_active' : ''}`}>Имя
                  <input className={`profile__input ${errors.name ? 'profile__input-error_active' : ''}`} 
                    id="profile-input-name"
                    name="name" 
                    type="text"
                    minLength="2"
                    maxLength="40"
                    placeholder={currentUser.name}
                    onChange={handleChange}
                    value={values.name || ''}
                    pattern="^[а-яёА-ЯЁa-zA-Z '.-]*$"
                    autoComplete='off'
                    disabled={isProcessingRequest ? true : false}
                    required
                  />
                </label>
                <span className='profile__update-error' id='profile-update-error'>{errors.name || ''}</span>
                <label className={`profile__label ${errors.email ? 'profile__label-error_active' : ''}`}>Почта
                  <input className={`profile__input ${errors.email ? 'profile__input-error_active' : ''}`}
                    id="profile-input-email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    placeholder={currentUser.email}
                    value={values.email  || ''}
                    autoComplete='off'
                    disabled={isProcessingRequest ? true : false}
                    required
                  />
                </label>
                <span className='profile__update-error' id='profile-update-error'>{errors.email || ''}</span>
              </fieldset>
              {
                isProfileChanged ? 
                  (
                    <>
                      <Button 
                          buttonText="Сохранить"
                          buttonClassName="button__form-page"
                          buttonType="submit"
                          isDisabled={isProcessingRequest ? true : false}
                      />
                    </>) : (
                      <Button 
                        buttonText="Редактировать"
                        type="submit"
                        buttonClassName="button_type_profile profile__button_submit button_type_profile_disabled"
                        isDisabled={true}
                     />)
              }
          </form>
          {
            !isValid ? (
              <Button 
                onClick={handleSignOut}
                buttonText="Выйти из аккаунта"
                type=""
                buttonClassName="button_type_profile button_color_signout profile__button_signout"
            />
            ) : null
          }
      </section>
    </>
  );
}

export default Profile;
