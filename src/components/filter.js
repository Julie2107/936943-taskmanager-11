import AbstractComponent from "./abstract-component.js";

const createFilterItem = (filter, isChecked) => {
  const {name, count} = filter;
  const checkState = isChecked ? `checked` : ``;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${checkState}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`
  );
};

const createFilter = (filters) => {
  const filtersMarkup = filters.map((filter, i) => createFilterItem(filter, i === 0)).join(`\n`);
  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilter(this._filters);
  }
}
