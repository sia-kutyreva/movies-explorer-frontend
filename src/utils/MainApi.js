import { BASE_URL } from "./constants";

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password })
  })
  .then((response) => {
    if (response.ok){
      return response.json();
    } else if (response.status === 409) {
      return Promise.reject(`Пользователь с таким email уже существует`);
    } else {
      return Promise.reject('При регистрации произошла ошибка');
    }
  })
};

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
  .then((response) => {
    if (response.status === 200){
      return response.json();
    } else if (response.status === 400) {
      return Promise.reject('Некорректно заполнено одно из полей');
    } else {
      return Promise.reject('При авторизации произошла ошибка');
    }
  })
};

export const getUserProfile = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((response) => {
    if (response.status === 200){
      return response.json();
    } else if (response.status === 404) {
      return Promise.reject('Пользователь не найден');
    } else if (response.status === 400) {
      return Promise.reject('При авторизации произошла ошибка');
    }
  })
};

export const updateUserProfile = (name, email, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email })
  })
  .then((response) => {
    if (response.status === 200){
      return response.json();
    } else if (response.status === 409) {
      return Promise.reject('Пользователь с такими email уже существует');
    } else if (response.status === 400) {
      return Promise.reject('При обновлении профиля произошла ошибка');
    }
  })
};

export const getSavedMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (response.status === 200){
      return response.json();
    } else {
      return Promise.reject('Ошибка при получении данных');
    }
  })
};

export const saveMovie = (movie, token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ 
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailer: movie.trailer,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      owner: movie.owner,
     })
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return Promise.reject('Ошибка при сохранении дынных фильма');
    }
  })
};

export const removeMovie = (movie, token) => {
  return fetch(`${BASE_URL}/movies/${movie._id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 403) {
      return Promise.reject('Нельзя удалить чужой фильм');
    } else {
      return Promise.reject('Ошибка при удалении');
    }
  })
};
