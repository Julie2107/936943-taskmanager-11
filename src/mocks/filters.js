import {getRandomInteger} from "../components/utils.js";

const RANDOM_RANGE = 10;
const filterNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

const generateFilters = () => filterNames.map((filter) => {
  return {
    name: filter,
    count: getRandomInteger(RANDOM_RANGE),
  };
});

export {generateFilters};
