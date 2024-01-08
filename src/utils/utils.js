import { SHORT_FILM } from "../utils/constants";

export const convertMinToHours = (num) => {
  const minutes = num % 60;
  const hours = (num - minutes) / 60;
  if (hours === 0) {
    return `${minutes}м`;
  } else if (minutes === 0) {
    return `${hours}ч`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
};

export function filterShorts(movies) {
  return movies.filter((movie) => movie.duration < SHORT_FILM);
}

export function filterMovies(movies, userQuery, shortMoviesCheckbox) {
  console.dir(movies);
  const moviesByUserQuery = movies.filter((movie) => {
    console.dir(movie);
    console.log(movie.nameRU);
    const tmp = String(movie.nameRU);
    console.log(tmp);
    console.log(typeof tmp);
    const movieRu = tmp.toLowerCase().trim();
    const userMovie = userQuery.toLowerCase().trim();

    return movieRu.indexOf(userMovie) !== -1;
  });
  if (shortMoviesCheckbox) {
    return filterShorts(moviesByUserQuery);
  } else {
    return moviesByUserQuery;
  }
}

export const checkSavedCard = (moviesList, movie) => {
  return moviesList.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  });
};
