import AbstractComponent from "../abstract-component.js";

export const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`,
};

const createSorter = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" data-sort-type="${SortType.DEFAULT}" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" data-sort-type="${SortType.DATE_UP}" class="board__filter">SORT BY DATE up</a>
      <a href="#" data-sort-type="${SortType.DATE_DOWN}" class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};

export default class Sorter extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
    this._sortHandler = this._sortHandler.bind(this);
  }
  getTemplate() {
    return createSorter();
  }

  getSortType() {
    return this._currenSortType;
  }

  _sortHandler(handler) {
    return (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    };
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, this._sortHandler(handler));
  }
}
