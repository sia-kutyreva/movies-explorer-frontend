import React, { useEffect, useState } from 'react';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Main from '../Main/Main';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import useViewportWidth from '../../utils/useChangeViewport';
import { pageWithHeader, pageWithFooter } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/UserContext';

import { Route, Switch, useHistory, Redirect, useRouteMatch } from 'react-router';

function App() {

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: ""
  });

  const { width } = useViewportWidth();
  const history = useHistory();

  function checkViewportWidth() {
    if (width > 768) {
      setMobileMenu(false);
    } else {
      setMobileMenu(true);
    }
  }

  useEffect(() => {
    setCurrentUser({
      name: "Виталий",
      email: "email@email.com"
    });
  }, []);

  useEffect(() => {
    checkViewportWidth();
  });

  function clickMobileMenu() {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(true);
    }
  }

  function goBack() {
    history.goBack();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {
          useRouteMatch(pageWithHeader) ? (
            <>
              <Header 
                mobileMenu={mobileMenu}
                clickMenu={clickMobileMenu}
              />
              <SideBar 
                isOpen={isMobileMenuOpen}
                onClose={clickMobileMenu}
              />
            </>
          ) : (null)
        }
        <Switch>
          <Route exact path="/">
            <Main 
              mobileMenu={mobileMenu}
              clickMenu={clickMobileMenu}
              isOpen={isMobileMenuOpen}
              onClose={clickMobileMenu}
            />
          </Route>
            <Route path="/signup">
              <Register 
              />
            </Route>
            <Route path="/signin">
              <Login 
              />
            </Route>
            
            <Route path="/movies">
              <Movies
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isMobileMenuOpen={isMobileMenuOpen}  
              />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isMobileMenuOpen={isMobileMenuOpen}
              />
            </Route>
            <Route path="/profile">
              <Profile 
                isProfileChanged={isProfileChanged}
                setIsProfileChanged={setIsProfileChanged}
                profileError={profileError}
                setProfileError={setProfileError}
                setCurrentUser={setCurrentUser}
              />
            </Route>
            
            <Route path="/notFound">
              <NotFoundPage 
                onclick={goBack}
              />
            </Route>
            <Redirect from="*" to="/notFound" />
        </Switch>
        {
          useRouteMatch(pageWithFooter) ? (
            <>
              <Footer />
            </>
          ) : (null)
        }
        </div>
        
    </CurrentUserContext.Provider>
  );
}

export default App;
