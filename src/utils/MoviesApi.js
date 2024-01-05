import { MOVIES_API_URL } from "./constants";

class MoviesApi {
  constructor(movieUrl) {
    this._movieUrl = movieUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getMovies() {
    return fetch(this._movieUrl).then((res) => this._checkResponse(res));
  }
}

const moviesApi = new MoviesApi(MOVIES_API_URL);

export default moviesApi;
