import { MainPage } from '../pages/main/main';
import { Movie } from '../pages/movie/movie';
import '../shared/utils/reset.css';
import './index.css';

class App {
  routes = [{ path: '', page: MainPage }];
  appState = {
    selectedMovieId: null,
    routeToMovie: null,
  };
  constructor() {
    this.appState.routeToMovie = this.routeToMovie;
    window.addEventListener('hashchange', this.route);
    this.route();
    console.log(this.appState);
  }

  routeToMovie = (movieId) => {
    this.routes.push({ path: `#${movieId}`, page: Movie });
    console.log(this.routes);
    window.location.hash = `${movieId}`;
    this.route();
  };

  route = () => {
    if (this.currentPage) {
      this.currentPage.destroy();
    }
    const page = this.routes.find(
      (route) => route.path === window.location.hash
    ).page;
    this.currentPage = new page(this.appState);
    this.currentPage.render();
  };
}

new App();
