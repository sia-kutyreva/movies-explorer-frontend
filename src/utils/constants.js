import defaultImage from '../images/default-image.jpg'

const PAGE_WITH_HEADER = ["/movies", "/saved-movies", "/profile"];

const PAGE_WITH_FOOTER = ["/movies", "/saved-movies"];

const PAGE_WITH_AUTH = ["/movies", "/saved-movies", "/profile"];

const PAGE_WITHOUT_AUTH = ["/signin", "/signup"];

const BASE_URL = "https://api.movies.explorer.nomoredomains.icu";
const MOVIES_API_BASE_URL = "https://api.nomoreparties.co";

const MOVIES_API_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const DEFAULT_MOVIE_IMAGE_URL = {defaultImage};
const DEFAULT_MOVIE_TRAILER_URL = 'https://www.youtube.com/watch?v=xHcPhdZBngw';
const SHORT_FILM_DURATION = 40;

export {
  PAGE_WITH_HEADER,
  PAGE_WITH_FOOTER,
  BASE_URL,
  MOVIES_API_BASE_URL,
  MOVIES_API_HEADERS,
  DEFAULT_MOVIE_IMAGE_URL,
  DEFAULT_MOVIE_TRAILER_URL,
  SHORT_FILM_DURATION,
  PAGE_WITH_AUTH,
  PAGE_WITHOUT_AUTH
};
