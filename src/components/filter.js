import {generateFilters} from "../mocks/filters.js";

const filters = generateFilters();
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

const filtersMarkup = filters.map((it, i) => createFilterItem(it, i === 0)).join(`\n`);

const createFilter = () => {
  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export default createFilter;
