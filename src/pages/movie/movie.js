import { AbstractPage } from '../../shared/utils/AbstractPage';
import { Header } from '../../widgets/Header/Header';
import axios from 'axios';
import onChange from 'on-change';
import './movie.css';

const PREFIX = 'http://www.omdbapi.com/?apikey=aa9bba5c';

export class Movie extends AbstractPage {
  constructor(appState) {
    super();
    this.appState = appState;
    this.setTitle('Фильм');
    this.appState = onChange(this.appState, this.appHook);
  }

  fetchMovieById = async () => {
    const { data } = await axios.get(`${PREFIX}`, {
      params: {
        i: this.appState.selectedMovieId,
        plot: 'full',
      },
    });
    console.log(data);
    return data;
  };

  appHook = (path) => {
    if (path === 'selectedMovieId') {
    }
  };

  render = async () => {
    const movie = document.createElement('div');
    movie.className = 'movie';
    const { Title, Poster, Rated, imdbRating, Released, Plot, Genre } =
      await this.fetchMovieById();
    movie.innerHTML = `
      <div class="image-wrapper">
        <img src="${Poster}" alt="Movie Poster" class="movie__poster" />
        <h1 class="movie__title">${Title}</h1>
      </div>
      <div class="bottom-content">
        <div class="flex">
          <p class="movie__rating">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTcuMDAwMDAwIiBoZWlnaHQ9IjE2LjAwMDAwMCIgdmlld0JveD0iMCAwIDE3IDE2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZGVmcy8+Cgk8cGF0aCBpZD0iVmVjdG9yIiBkPSJNOCAxMi4zOUwxMy4xNSAxNS40OUwxMS43OCA5LjY0TDE2LjMzIDUuNjlMMTAuMzQgNS4xOUw4IC0wLjM0TDUuNjUgNS4xOUwtMC4zNCA1LjY5TDQuMjEgOS42NEwyLjg1IDE1LjQ5TDggMTIuMzlaIiBmaWxsPSIjRkJCQzA5IiBmaWxsLW9wYWNpdHk9IjEuMDAwMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KPC9zdmc+Cg==" width="16.67" height="15.83" />
            ${imdbRating}
          </p>
          <span>|</span>
          <p class="movie__released">${Released}</p>
        </div>

        <p class="movie__rated">${Rated}</p>
        <p class="movie__genre">${Genre}</p>
        <p class="movie__plot">${Plot}</p>
      </div>
    `;

    this.app.innerHTML = '';
    this.renderHeader();
    this.app.append(movie);
  };

  renderHeader = () => {
    const header = new Header(this.state).render();
    this.app.prepend(header);
  };
}
