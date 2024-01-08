import { BASE_API_URL } from "./constants";

class MainApi {
  constructor(url) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

 register = (name, email, password) => {
    return this._request(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, 
        email, 
        password 
      }),
    });
  };

  login = (email, password) => {
    return this._request(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
  };

  checkToken(jwt) {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  }

  setUserInfo(data, jwt) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    });
  }

  getSaveMovies() {
    return this._request(`${this._url}/movies`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-type": "application/json",
      },
    });
  }

  saveMovie(movie, jwt) {
    return this._request(`${this._url}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    });
  }

  deleteMovie(id, jwt) {
    return this._request(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
  }
}
const mainApi = new MainApi(BASE_API_URL);

export default mainApi;
