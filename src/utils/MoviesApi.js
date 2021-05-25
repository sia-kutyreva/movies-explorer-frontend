import { MOVIES_API_BASE_URL, MOVIES_API_HEADERS } from "./constants";

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      headers: this._headers,
    })
    .then(res => this._getResponseData(res));
  }
}

const api = new MoviesApi({
  baseUrl: MOVIES_API_BASE_URL,
  headers: MOVIES_API_HEADERS,
});

export default api;