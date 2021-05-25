import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, Redirect, useRouteMatch } from 'react-router';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import LoadingPopup from '../LoadingPopup/LoadingPopup';
import { useLocation } from 'react-router-dom';

import useViewportWidth from '../../utils/useChangeViewport';
import { PAGE_WITH_HEADER,
  PAGE_WITH_FOOTER,
  MOVIES_API_BASE_URL,
  DEFAULT_MOVIE_IMAGE_URL,
  DEFAULT_MOVIE_TRAILER_URL, 
} from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/UserContext';
import * as MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi'

function App() {
  
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [notAction, setNotAction] = useState(true);
  const [isSavedArray, setIsSavedArray] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [messageText, setMessageText] = useState('');

  const [registerErrors, setRegisterErrors] = useState('');
  const [loginErrors, setLoginErrors] = useState('');

  const [searchMassages, setSearchMassages] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFail, setIsSearchiFail] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [filteredSavedArray, setFilteredSavedArray] = useState([]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: ""
  });

  const { pathname } = useLocation();
  const { width } = useViewportWidth();
  const history = useHistory();

  const [maxNumberOfCards, setMaxNumberOfCards] = useState(null);
  const [numberOfCards, setNumberOfCards] = useState(null);

  function checkWindowWidth() {
    if (width > 1274) {
      setMaxNumberOfCards(12);
      setNumberOfCards(3);
      setMobileMenu(false);
    } else if (width > 768) {
      setMaxNumberOfCards(8);
      setNumberOfCards(2);
      setMobileMenu(false);
    } else if (width > 500) {
      setMaxNumberOfCards(8);
      setNumberOfCards(2);
      setMobileMenu(true);
    } else if (width < 500) {
      setMobileMenu(true);
      setMaxNumberOfCards(5);
      setNumberOfCards(2);
    }
  }

  function clickMobileMenu() {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(true);
    }
  }

  function onLogin(data) {
    setIsLoading(true);
    MainApi.authorization(data.email, data.password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setCurrentUser(res);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setLoginErrors(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function onRegister(data) {
    setIsLoading(true);
    MainApi.register(data.name, data.email, data.password)
      .then(() => {
        setMessageText('Регистрация прошла успешно =)');
        setIsConfirmOpen(true);
        onLogin(data);
      })
      .catch((err) => {
        console.log(err);
        setRegisterErrors(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      setLoggedIn(true);
    }
  }

  function signOut() {
    setLoggedIn(false);
    setIsLoading(false);
    setFilteredMovies([]);
    history.push('/');
    setCurrentUser({
      name: "",
      email: ""
    });
    localStorage.clear();
  }

  function onUpdateProfile(data) {
    setIsLoading(true);
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      MainApi.updateUserProfile(data.name, data.email, jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setMessageText('Обновление прошло успешно!');
            setIsConfirmOpen(true);
            history.push("/movies");
          }
        })
        .catch((err) => {
          console.log(err)
          setMessageText('При обновлении произошла ошибка =(');
          setIsConfirmOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }

  function handleSaveMovie(data) {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      MainApi.saveMovie(data, jwt)
        .then((movie) => {
          if (movie) {
            const newSavedMovie = allMovies.find(element => element.nameRU === movie.nameRU)
            newSavedMovie.saved = true;
            newSavedMovie._id = movie._id;
            const newArray = allMovies.map((item) => item.nameRU === newSavedMovie.nameRU ? newSavedMovie : item);
            setAllMovies(newArray);
            setSavedMovies([movie, ...savedMovies]);
            localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
            localStorage.setItem('all-movies', JSON.stringify(newArray));
          }
        })
        .catch((err) => {
          console.log(err);
          setMessageText(err);
          setIsConfirmOpen(true);
        })
    }
  }

  function handleDeleteMovie(data) {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      MainApi.removeMovie(data, jwt)
        .then((movie) => {
          if (movie) {
            const newSavedArray = savedMovies.filter((item) => item._id !== data._id);
            setFilteredSavedArray(newSavedArray);
            setSavedMovies(newSavedArray);
            const newDelMovie = allMovies.find(element => element._id === data._id)
            newDelMovie.saved = false;
            const newArray = allMovies.map((item) => item._id === newDelMovie._id ? newDelMovie : item);
            setAllMovies(newArray);
            localStorage.setItem('saved-movies', JSON.stringify(newSavedArray));
            localStorage.setItem('all-movies', JSON.stringify(newArray));
          }
        })
        .catch((err) => {
          console.log(err);
          setMessageText(err);
          setIsConfirmOpen(true);
        })
    }
  }

  function handleSubmitMovies(keywords, short) {
    setNotAction(false);
    const moviesArray = pathname === '/saved-movies' ? savedMovies : allMovies;
    if (keywords) {
      const filterResult = [];
      moviesArray.forEach(element => {
        const keywordsFilter = element.nameRU.toLowerCase().includes(keywords.toLowerCase()) || element.nameEN.toLowerCase().includes(keywords.toLowerCase());
        const durationFilter = short ? (element.duration <= 40) : (element.duration > 40);
        if (keywordsFilter && durationFilter) {
          filterResult.push(element);
        }
      });
      if (filterResult.length === 0) {
        setIsSearchiFail(true);
        setSearchMassages('Фильмов по данным ключевым словам не найдено');
      } else {
        setIsSearchiFail(false);
      }
      if (pathname === '/saved-movies') {
        setFilteredSavedArray(filterResult);
      } else {
        setFilteredMovies(filterResult);
      }
    } else if (!keywords) {
      if (pathname === '/movies') {
        setSearchMassages('Нужно ввести ключевое слово');
        setIsSearchiFail(true);
        setIsSearching(false);
      } else if (short) {
        const filterResult = [];
        moviesArray.forEach(element => {
          const durationFilter = short ? (element.duration <= 40) : (element.duration > 40);
          if (durationFilter) {
            filterResult.push(element);
          }
        });
        if (filterResult.length === 0) {
          setIsSearchiFail(true);
          setSearchMassages('Фильмов с заданной длительностью не найдено');
        } else {
          setIsSearchiFail(false);
        }
        if (pathname === '/saved-movies') {
          setFilteredSavedArray(filterResult);
        } else {
          setFilteredMovies(filterResult);
        }
      } else {
        setFilteredSavedArray(savedMovies);
      }
    }
    setIsSearching(false);
  }

  function handleConfirmClose() {
    setIsConfirmOpen(false);
    setSearchMassages('');
    setIsSearchiFail(false);
  }

  function closePopupOverlay(evt) {
    evt.target.classList.contains('confirm_type_opend') && handleConfirmClose();
  }

  function closePopupEscape(evt) {
    if (evt.key === "Escape") {
      handleConfirmClose();
    }
  }

  function checkSavedMovies(moviesArray, savedArray) {
    moviesArray.forEach((item) => {
      const movieSaved = savedArray.find(element => element.nameRU === item.nameRU)
      if (movieSaved) {
        item._id = movieSaved._id;
        item.saved = true;
      }
    })
    setAllMovies(moviesArray);
    localStorage.setItem('all-movies', JSON.stringify(moviesArray));
  }

  function getUserProfile(jwt) {
    MainApi.getUserProfile(jwt)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
        setMessageText(err);
        setIsConfirmOpen(true);
      })
  }

  useEffect(() => {
    checkToken();
    if (loggedIn) {
      if (localStorage.getItem('all-movies')) {
        history.push('/movies');
        const movies = JSON.parse(localStorage.getItem('all-movies'));
        const savedMovies = JSON.parse(localStorage.getItem('saved-movies'));
        setSavedMovies(savedMovies);
        checkSavedMovies(movies, savedMovies);
        getUserProfile(localStorage.getItem('jwt'));
      } else {
        history.push('/movies');
        const jwt = localStorage.getItem('jwt');
        Promise.all([MoviesApi.getMovies(), MainApi.getSavedMovies(jwt), MainApi.getUserProfile(jwt)])
          .then((res) => {
            const [ allArray, savedArray, userProfile ]  = res;
            setSavedMovies(savedArray);
            localStorage.setItem('saved-movies', JSON.stringify(savedArray));
            setCurrentUser(userProfile);
            const moviesArray = allArray.map((item) => ({
              country: item?.country ? item?.country : 'Страна не указана',
              director: item?.director || 'Режисер не указана',
              duration: item?.duration || 0,
              year: item?.year || 'Год не указан',
              description: item?.description || 'Описание не указано',
              image: item?.image?.url ? `${MOVIES_API_BASE_URL}${item.image.url}` : DEFAULT_MOVIE_IMAGE_URL,
              trailer: item?.trailerLink || DEFAULT_MOVIE_TRAILER_URL,
              thumbnail: `${MOVIES_API_BASE_URL}${item?.image?.formats?.thumbnail.url}`,
              movieId: item?.id || 0,
              nameRU: item?.nameRU || 'Название не указано',
              nameEN: item?.nameEN || 'Название не указано',
              saved: false,
            }))
            checkSavedMovies(moviesArray, savedArray);
          })
          .catch((err) => {
            console.log(err);
            setMessageText(err);
            setIsConfirmOpen(true);
          })
          .finally(() => {
            setIsLoading(false);
          })
      }
    }
  }, [loggedIn])

  useEffect(() => {
    checkWindowWidth();
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {
          useRouteMatch(PAGE_WITH_HEADER) ? (
            <>
              <Header 
                mobileMenu={mobileMenu}
                clickMenu={clickMobileMenu}
                loggedIn={loggedIn}
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
              loggedIn={loggedIn}
            />
          </Route>
            <Route path="/signup">
              {
                loggedIn ? <Redirect to="/movies" /> : (
                  <Register 
                    onRegister={onRegister}
                    handleRegisterErrors={setRegisterErrors}
                    registerErrors={registerErrors}
                  />
                )
              }
            </Route>
            <Route path="/signin">
              {
                loggedIn ? <Redirect to="/movies" /> : (
                  <Login 
                    onLogin={onLogin}
                    handleLoginErrors={setLoginErrors}
                    loginErrors={loginErrors}
                  />
                )
              }
            </Route>
            
            <ProtectedRoute path="/movies"
              searchMassages={searchMassages}
              setIsSearchiFail={setIsSearchiFail}
              component={Movies}
              loggedIn={loggedIn}
              isSearching={isSearching}
              setIsSearching={setIsSearching}
              isMobileMenuOpen={isMobileMenuOpen}
              handleSubmitMovies={handleSubmitMovies}
              filteredMovies={filteredMovies}
              isSearchFail={isSearchFail}
              notAction={notAction}
              onSavedMovie={handleSaveMovie}
              removeMovie={handleDeleteMovie}
              width={width}
              maxNumberOfCards={maxNumberOfCards}
              numberOfCards={numberOfCards}
              isSavedArray={isSavedArray}
              setIsSavedArray={setIsSavedArray}  
              savedMovies={savedMovies}
            />

            <ProtectedRoute path="/saved-movies"
              setIsSearchiFail={setIsSearchiFail}
              searchMassages={searchMassages}
              isSearchFail={isSearchFail}
              component={SavedMovies}
              loggedIn={loggedIn}
              isSearching={isSearching}
              setIsSearching={setIsSearching}
              isMobileMenuOpen={isMobileMenuOpen}
              savedMovies={savedMovies}
              removeMovie={handleDeleteMovie}
              width={width}
              isSavedArray={isSavedArray}
              setIsSavedArray={setIsSavedArray}
              maxNumberOfCards={maxNumberOfCards}
              numberOfCards={numberOfCards}
              handleSubmitMovies={handleSubmitMovies}
              filteredSavedArray={filteredSavedArray}
            />

            <ProtectedRoute path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              signOut={signOut}
              onUpdateProfile={onUpdateProfile}
              setIsLoading={setIsLoading}
            />
            
            <Route path="/notFound">
              <NotFoundPage 
                history={history}
              />
            </Route>
            <Redirect from="*" to="/notFound" />
        </Switch>
        {
          useRouteMatch(PAGE_WITH_FOOTER) ? (
            <>
              <Footer />
            </>
          ) : (null)
        }
        </div>
        <ConfirmationDialog
          bodyText={messageText}
          buttonText='ok'
          isOpen={isConfirmOpen}
          onClose={handleConfirmClose}
          closePopupOverlay={closePopupOverlay}
          closePopupEscape={closePopupEscape}
        />

        <LoadingPopup
          isLoading={isLoading}
        />
        
    </CurrentUserContext.Provider>
  );
}

export default App;
