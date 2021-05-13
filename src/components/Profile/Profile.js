import React, { useContext } from 'react';
import './Profile.css';
import Button from '../Button/Button';
import { CurrentUserContext } from '../../contexts/UserContext';


function Profile({
  setIsProfileChanged,
  isProfileChanged,
  profileError,
  })
{
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const inputName = document.getElementById('profile-input-name');
  const inputEmail = document.getElementById('profile-input-email');

  function handleChangeName(e) {
    setName(e.target.value);
    if (inputName.value === "") {
      return setIsProfileChanged(false);
    }
    setIsProfileChanged(true);
  }
  
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    if (inputEmail.value === "") {
      return setIsProfileChanged(false);
    }
    setIsProfileChanged(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <section className="profile">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
              <fieldset className="profile__fieldset">
                <label className="profile__label">Имя
                  <input className="profile__input" 
                    id="profile-input-name"
                    name="name" 
                    type="text"
                    min="2"
                    max="40"
                    placeholder={currentUser.name}
                    onChange={handleChangeName}
                    value={name || ""}
                    required
                  />
                </label>
                <label className="profile__label">Почта
                  <input className="profile__input" 
                    id="profile-input-email"
                    name="email" 
                    type="email"
                    onChange={handleChangeEmail}
                    placeholder={currentUser.email}
                    value={email  || ""}
                    required
                  />
                </label>
              </fieldset>
              {
                isProfileChanged ? 
                  (
                    <>
                      <span className='profile__update-error' id='profile-update-error'>{profileError}</span>
                      <Button 
                          buttonText="Сохранить"
                          buttonClassName="button__form-page"
                          buttonType="submit"
                      />
                    </>) : (
                      <Button 
                        buttonText="Редактировать"
                        type="submit"
                        buttonClassName="button_type_profile profile__button_submit"
                     />)
              }
          </form>
          {
            !isProfileChanged ? (
              <Button 
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
