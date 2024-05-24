import { AbstractDiv } from '../../shared/utils/AbstractDiv';
import './Card.css';

export class Card extends AbstractDiv {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  render = () => {
    this.el.classList.add('card');
    const { Poster, Title, imdbID } = this.cardState;
    // API не возвращает Rating если использовать search, поэтому rating статичный
    this.el.innerHTML = `
      <img class="card__poster" src="${Poster}" width="210" height="308" />
      <p class="card__name">${Title}</p>
      <p class="card__rating"> 
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTcuMDAwMDAwIiBoZWlnaHQ9IjE2LjAwMDAwMCIgdmlld0JveD0iMCAwIDE3IDE2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZGVmcy8+Cgk8cGF0aCBpZD0iVmVjdG9yIiBkPSJNOCAxMi4zOUwxMy4xNSAxNS40OUwxMS43OCA5LjY0TDE2LjMzIDUuNjlMMTAuMzQgNS4xOUw4IC0wLjM0TDUuNjUgNS4xOUwtMC4zNCA1LjY5TDQuMjEgOS42NEwyLjg1IDE1LjQ5TDggMTIuMzlaIiBmaWxsPSIjRkJCQzA5IiBmaWxsLW9wYWNpdHk9IjEuMDAwMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KPC9zdmc+Cg==" width="16.67" height="15.83" />
        8.0
      </p>
    `;

    this.el.addEventListener('click', () => {
      this.appState.selectedMovieId = imdbID;
    });

    return this.el;
  };
}
