import { AbstractDiv } from '../../shared/utils/AbstractDiv';
import './Header.css';

export class Header extends AbstractDiv {
  constructor(state) {
    super();
    this.state = state;
  }

  search = () => {
    const value = this.el.querySelector('input').value;
    this.state.searchQuery = value;
  };

  render = () => {
    this.el.innerHTML = '';
    this.el.classList.add('header');

    if (!this.state) {
      this.el.innerHTML = `
      <img class="header__logo" src="https://i.imgur.com/p5P82cS.png" width="121" height="20" alt="logo">
      <div class="header__menu">
        <p class="menu__item">Главная</p>
        <p class="menu__item active">Фильмы</p>
        <p class="menu__item">Сериалы</p>
      </div>
    `;
      return this.el;
    }

    this.el.innerHTML = `
      <img class="header__logo" src="https://i.imgur.com/p5P82cS.png" width="121" height="20" alt="logo">
      <div class="header__menu">
        <p class="menu__item">Главная</p>
        <p class="menu__item active">Фильмы</p>
        <p class="menu__item">Сериалы</p>
      </div>

      <Search class="search">
        <label class="search__label" for="search">
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMuMDAwMDAwIiBoZWlnaHQ9IjEzLjAwMDAwMCIgdmlld0JveD0iMCAwIDEzIDEzIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZGVmcy8+Cgk8cGF0aCBpZD0iRWxsaXBzZSAxIChTdHJva2UpIiBkPSJNOS4wNiAxMC4wM0M4LjAzIDEwLjg0IDYuNzQgMTEuMzMgNS4zMyAxMS4zM0MyLjAxIDExLjMzIC0wLjY3IDguNjQgLTAuNjcgNS4zM0MtMC42NyAyLjAxIDIuMDEgLTAuNjcgNS4zMyAtMC42N0M4LjY0IC0wLjY3IDExLjMzIDIuMDEgMTEuMzMgNS4zM0MxMS4zMyA2LjcxIDEwLjg2IDcuOTggMTAuMDggOUwxMi41NSAxMS41NEMxMi42MSAxMS42MSAxMi42MSAxMS43MSAxMi41NSAxMS43OEwxMS43OCAxMi41NEMxMS43MSAxMi42MSAxMS42MSAxMi42MSAxMS41NCAxMi41NEw5LjA2IDEwLjAzWk0xMCA1LjMzQzEwIDcuOTEgNy45MSAxMCA1LjMzIDEwQzIuNzUgMTAgMC42NiA3LjkxIDAuNjYgNS4zM0MwLjY2IDIuNzUgMi43NSAwLjY2IDUuMzMgMC42NkM3LjkxIDAuNjYgMTAgMi43NSAxMCA1LjMzWiIgZmlsbD0iIzczNzM3MyIgZmlsbC1vcGFjaXR5PSIxLjAwMDAwMCIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPgo="
          width="13.27"
          height="13.27"
        />
        </label>
        <input class="search__input" type="search" name="search" id="search" placeholder="Поиск по сайту" value="${
          this.state.searchQuery ? this.state.searchQuery : ''
        }"/>
      </Search>
    `;

    this.el.querySelector('input').addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        this.search();
      }
    });

    return this.el;
  };
}
