import { AbstractPage } from '../../shared/utils/AbstractPage';
import { CardList } from '../../widgets/CardList/CardList';
import { Header } from '../../widgets/Header/Header';
import axios from 'axios';
import onChange from 'on-change';

const PREFIX = 'http://www.omdbapi.com/?apikey=aa9bba5c';

export class MainPage extends AbstractPage {
  state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    offset: 0,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.setTitle('Главная страница');
    this.state = onChange(this.state, this.stateHook);
    this.appState = onChange(this.appState, this.appHook);
  }

  destroy = () => {
    onChange.unsubscribe(this.state);
    onChange.unsubscribe(this.appState);
  };

  fetchMovies = async () => {
    // API не возвращает Rating, если использовать search
    const { data } = await axios.get(`${PREFIX}`, {
      params: {
        s: this.state.searchQuery,
      },
    });
    console.log(data);
    return data;
  };

  appHook = (path) => {
    if (path === 'selectedMovieId') {
      console.log(this.appState);
      this.appState.routeToMovie(this.appState.selectedMovieId);
    }
  };

  stateHook = async (path) => {
    if (path === 'searchQuery') {
      this.state.loading = true;
      const data = await this.fetchMovies();
      this.state.loading = false;
      this.state.list = data.Search;
      console.log(this.state.list);
    }
    if (path === 'list' || path === 'loading') {
      this.render();
    }
  };

  render = () => {
    const main = document.createElement('div');
    main.append(new CardList(this.appState, this.state).render());
    this.app.innerHTML = '';
    this.renderHeader();
    this.app.append(main);
  };

  renderHeader = () => {
    const header = new Header(this.state).render();
    this.app.prepend(header);
  };
}
