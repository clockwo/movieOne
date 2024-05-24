import { AbstractDiv } from '../../shared/utils/AbstractDiv';
import { Card } from '../Card/Card';
import './CardList.css';

export class CardList extends AbstractDiv {
  constructor(appState, state) {
    super();
    this.state = state;
    this.appState = appState;
  }

  render = () => {
    if (this.state.loading) {
      this.el.innerHTML = '<h1 class="card-list__loader">Загрузка...</h1>';
      return this.el;
    }

    this.el.classList.add('card-list');
    this.el.innerHTML = `
      <h1 class="card-list__title">Результат поиска</h1>
    `;

    for (const card of this.state.list) {
      this.el.append(new Card(this.appState, card).render());
    }
    return this.el;
  };
}
